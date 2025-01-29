// app/components/screens/ThemedAbsoluteHeaderBlurSurface.tsx

import React, { ReactNode } from "react";
import { StyleSheet, View, RefreshControl } from "react-native";
import {
  FadingView,
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  ScalingView,
  ScrollViewWithHeaders,
  SurfaceComponentProps,
} from "@codeherence/react-native-header";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<typeof ScrollViewWithHeaders>;

type ThemeColorType =
  | "absoluteHeaderBlurSurfaceBackgroundPrimary"
  | "absoluteHeaderBlurSurfaceBackgroundSecondary"
  | "absoluteHeaderBlurSurfaceBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface LocalHeaderProps {
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
  headerStyle?: any;
  headerLeftStyle?: any;
  headerCenterStyle?: any;
  headerRightStyle?: any;
  headerLeftFadesIn?: boolean;
  headerCenterFadesIn?: boolean;
  headerRightFadesIn?: boolean;
  ignoreTopSafeArea?: boolean;
  noBottomBorder?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface LocalLargeHeaderProps {
  renderLargeHeader?: (scrollY: any, showNavBar: any) => ReactNode;
  enableScaling?: boolean;
  headerStyle?: any;
}

export interface ThemedAbsoluteHeaderBlurSurfaceProps
  extends Omit<
    ScrollViewWithHeadersExtendedProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  surfaceProps?: Partial<SurfaceComponentProps> & {
    fadingViewProps?: Partial<React.ComponentProps<typeof FadingView>>;
    blurViewProps?: Partial<React.ComponentProps<typeof BlurView>>;
  };

  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;

  /** Add optional refresh props */
  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  children?: ReactNode;
}

const HeaderSurface: React.FC<SurfaceComponentProps & {
  themeType: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  fadingViewProps?: Partial<React.ComponentProps<typeof FadingView>>;
  blurViewProps?: Partial<React.ComponentProps<typeof BlurView>>;
}> = ({
  showNavBar,
  themeType,
  backgroundColor = {},
  fadingViewProps = {},
  blurViewProps = {},
}) => {
  const colorKey = `absoluteHeaderBlurSurfaceBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBgColor = useThemeColor(backgroundColor, colorKey);

  return (
    <FadingView
      opacity={showNavBar}
      style={StyleSheet.absoluteFill}
      {...fadingViewProps}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        tint="light"
        intensity={50}
        {...blurViewProps}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: resolvedBgColor, opacity: 0.2 },
        ]}
      />
    </FadingView>
  );
};

export function ThemedAbsoluteHeaderBlurSurface(props: ThemedAbsoluteHeaderBlurSurfaceProps) {
  const {
    themeType = "primary",
    backgroundColor,
    surfaceProps,
    headerProps = {},
    largeHeaderProps = {},
    style,
    contentContainerStyle,
    isRefreshable,
    refreshing,
    onRefresh,
    ...scrollProps
  } = props;

  const insets = useSafeAreaInsets();
  const {
    fadingViewProps,
    blurViewProps,
    ...restSurfaceProps
  } = surfaceProps || {};

  const {
    renderLeft,
    renderCenter,
    renderRight,
    headerStyle,
    headerLeftStyle,
    headerCenterStyle,
    headerRightStyle,
    headerLeftFadesIn,
    headerCenterFadesIn,
    headerRightFadesIn,
    ignoreTopSafeArea,
    noBottomBorder,
    initialBorderColor,
    borderColor,
    borderWidth,
  } = headerProps;

  const {
    renderLargeHeader,
    enableScaling,
    headerStyle: largeHeaderStyle,
  } = largeHeaderProps;

  /** Build refreshControl if needed */
  const maybeRefreshControl = isRefreshable && onRefresh ? (
    <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
  ) : undefined;

  const mergedContentContainerStyle = [
      { paddingBottom: BOTTOM_FOOTER_HEIGHT },
      contentContainerStyle,
    ];
    
  const HeaderComponent = ({ showNavBar }: { showNavBar: any }) => {
    return (
      <LibHeader
        showNavBar={showNavBar}
        noBottomBorder={noBottomBorder}
        headerStyle={[{ height: 44 + insets.top }, headerStyle]}
        headerLeft={renderLeft ? renderLeft() : <ThemedHeaderBackButton onPress={() => router.back()} />}
        headerLeftStyle={headerLeftStyle}
        headerLeftFadesIn={headerLeftFadesIn}
        headerCenter={renderCenter?.()}
        headerCenterStyle={headerCenterStyle}
        headerCenterFadesIn={headerCenterFadesIn}
        headerRight={renderRight?.()}
        headerRightStyle={headerRightStyle}
        headerRightFadesIn={headerRightFadesIn}
        ignoreTopSafeArea={ignoreTopSafeArea}
        initialBorderColor={initialBorderColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
        SurfaceComponent={(sProps) => (
          <HeaderSurface
            {...sProps}
            {...restSurfaceProps}
            themeType={themeType}
            backgroundColor={backgroundColor}
            fadingViewProps={fadingViewProps}
            blurViewProps={blurViewProps}
          />
        )}
      />
    );
  };

  const LargeHeaderComponent = ({ scrollY, showNavBar }: { scrollY: any; showNavBar: any }) => {
    if (!renderLargeHeader) return null;
    return (
      <LibLargeHeader headerStyle={largeHeaderStyle}>
        {enableScaling ? (
          <ScalingView scrollY={scrollY}>{renderLargeHeader(scrollY, showNavBar)}</ScalingView>
        ) : (
          renderLargeHeader(scrollY, showNavBar)
        )}
      </LibLargeHeader>
    );
  };

  return (
    <ScrollViewWithHeaders
      absoluteHeader
      HeaderComponent={HeaderComponent}
      LargeHeaderComponent={LargeHeaderComponent}
      refreshControl={maybeRefreshControl}
      style={[styles.container, style]}
      contentContainerStyle={mergedContentContainerStyle}
      {...scrollProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -100,
  },
});
