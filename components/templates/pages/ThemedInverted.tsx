// app/components/screens/ThemedInverted.tsx

import React, { ReactNode } from "react";
import {
  StyleSheet,
  RefreshControl,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  Header as LibHeader,
  FlatListWithHeaders,
  SurfaceComponentProps,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type FlatListWithHeadersExtendedProps<T> = React.ComponentProps<
  typeof FlatListWithHeaders<T>
>;

type ThemeColorType =
  | "invertedBackgroundPrimary"
  | "invertedBackgroundSecondary"
  | "invertedBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

interface LocalSurfaceProps extends Partial<SurfaceComponentProps> {
  blurViewProps?: Partial<React.ComponentProps<typeof BlurView>>;
}

export interface ThemedInvertedProps<T>
  extends Omit<
    FlatListWithHeadersExtendedProps<T>,
    "HeaderComponent" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  surfaceProps?: LocalSurfaceProps;
  headerProps?: Partial<LocalHeaderProps>;

  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const HeaderSurface: React.FC<
  SurfaceComponentProps & {
    themeType: "primary" | "secondary" | "tertiary";
    backgroundColor?: { light?: string; dark?: string };
    blurViewProps?: Partial<React.ComponentProps<typeof BlurView>>;
  }
> = ({ showNavBar, themeType, backgroundColor = {}, blurViewProps }) => {
  const colorKey = `invertedBackground${capitalize(
    themeType
  )}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  return (
    <BlurView
      style={StyleSheet.absoluteFill}
      tint="dark"
      intensity={70}
      {...blurViewProps}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: resolvedBg, opacity: 0.3 },
        ]}
      />
    </BlurView>
  );
};

export function ThemedInverted<T>(props: ThemedInvertedProps<T>) {
  const {
    themeType = "primary",
    backgroundColor,
    surfaceProps,
    headerProps = {},
    isRefreshable,
    refreshing,
    onRefresh,
    style,
    contentContainerStyle,
    ...listProps
  } = props;

  const { blurViewProps, ...restSurface } = surfaceProps || {};

  const {
    renderLeft,
    renderCenter,
    renderRight,
    headerStyle,
    noBottomBorder,
    ignoreTopSafeArea,
  } = headerProps;

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
    ) : undefined;

  const mergedContentContainerStyle = [
    { paddingBottom: BOTTOM_FOOTER_HEIGHT },
    contentContainerStyle,
  ];

  const HeaderComponent = ({ showNavBar }: { showNavBar: any }) => (
    <LibHeader
      showNavBar={showNavBar}
      noBottomBorder={noBottomBorder}
      headerStyle={headerStyle}
      ignoreTopSafeArea={ignoreTopSafeArea}
      headerLeft={
        renderLeft ? (
          renderLeft()
        ) : (
          <ThemedHeaderBackButton onPress={() => router.back()} />
        )
      }
      headerCenter={renderCenter?.()}
      headerRight={renderRight?.()}
      SurfaceComponent={(sProps) => (
        <HeaderSurface
          {...sProps}
          {...restSurface}
          themeType={themeType}
          backgroundColor={backgroundColor}
          blurViewProps={blurViewProps}
        />
      )}
    />
  );

  return (
    <FlatListWithHeaders
      HeaderComponent={HeaderComponent}
      inverted
      absoluteHeader
      refreshControl={maybeRefreshControl}
      style={[styles.container, style]}
      contentContainerStyle={mergedContentContainerStyle}
      {...listProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
