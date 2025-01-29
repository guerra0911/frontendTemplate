// app/components/screens/ThemedInverted.tsx

import React, { ReactNode } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import {
  Header as LibHeader,
  FlatListWithHeaders,
  SurfaceComponentProps,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";

type FlatListWithHeadersExtendedProps<T> = React.ComponentProps<typeof FlatListWithHeaders<T>>;
type SurfaceComponentExtendedProps = React.ComponentProps<typeof LibHeader>["SurfaceComponent"];

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

type ThemeColorType =
  | "invertedBackgroundPrimary"
  | "invertedBackgroundSecondary"
  | "invertedBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedInvertedProps<T>
  extends Omit<FlatListWithHeadersExtendedProps<T>, "HeaderComponent"> {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  surfaceProps?: LocalSurfaceProps;
  headerProps?: Partial<LocalHeaderProps>;
}

const HeaderSurface: React.FC<SurfaceComponentProps & {
  themeType: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  blurViewProps?: Partial<React.ComponentProps<typeof BlurView>>;
}> = ({
  showNavBar,
  themeType,
  backgroundColor = {},
  blurViewProps,
}) => {
  const colorKey = `invertedBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  return (
    <BlurView
      style={StyleSheet.absoluteFill}
      tint="dark"
      intensity={70}
      {...blurViewProps}
    >
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: resolvedBg, opacity: 0.3 }]}
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

  const HeaderComponent = ({ showNavBar }: { showNavBar: any }) => (
    <LibHeader
      showNavBar={showNavBar}
      noBottomBorder={noBottomBorder}
      headerStyle={headerStyle}
      ignoreTopSafeArea={ignoreTopSafeArea}
      headerLeft={renderLeft ? renderLeft() : <ThemedHeaderBackButton onPress={() => {}} />}
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
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      {...listProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
