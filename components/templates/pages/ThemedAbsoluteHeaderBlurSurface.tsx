// app/components/screens/ThemedAbsoluteHeaderBlurSurface.tsx

import React, { ReactNode } from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
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

// ---------------------------------------------------
// 1) Define local typed props for the library
// ---------------------------------------------------
type ScrollViewWithHeadersExtendedProps = React.ComponentProps<typeof ScrollViewWithHeaders>;
type FadingViewExtendedProps = React.ComponentProps<typeof FadingView>;

/**
 * Props for the smaller header portion (LibHeader).
 * We replicate what's in the docs: headerStyle, noBottomBorder, etc.
 */
interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  headerLeftStyle?: StyleProp<ViewStyle>;
  headerCenterStyle?: StyleProp<ViewStyle>;
  headerRightStyle?: StyleProp<ViewStyle>;
  headerLeftFadesIn?: boolean;
  headerCenterFadesIn?: boolean;
  headerRightFadesIn?: boolean;
  ignoreTopSafeArea?: boolean;
  noBottomBorder?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

/**
 * For the large header portion (LargeHeader).
 */
interface LocalLargeHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  // Potentially "renderLargeHeader?: (scrollY: number, showNavBar: number) => ReactNode"
  // BUT we use 'any' to avoid sharedValue mismatch:
  renderLargeHeader?: (scrollY: any, showNavBar: any) => ReactNode;
  enableScaling?: boolean;
}

// ---------------------------------------------------
// 2) Theme Color Keys
// ---------------------------------------------------
type ThemeColorType =
  | "absoluteHeaderBlurSurfaceBackgroundPrimary"
  | "absoluteHeaderBlurSurfaceBackgroundSecondary"
  | "absoluteHeaderBlurSurfaceBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---------------------------------------------------
// 3) The main component props
// ---------------------------------------------------
export interface ThemedAbsoluteHeaderBlurSurfaceProps
  extends Omit<
    ScrollViewWithHeadersExtendedProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  // "surfaceProps" for customizing the FadingView + BlurView
  surfaceProps?: Partial<SurfaceComponentProps> & {
    fadingViewProps?: Partial<FadingViewExtendedProps>;
    blurViewProps?: Partial<React.ComponentProps<typeof BlurView>>;
  };

  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;

  /** The scrollable content below the headers */
  children?: ReactNode;
}

// A small surface subcomponent for blur + fading
const HeaderSurface: React.FC<SurfaceComponentProps & {
  themeType: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  fadingViewProps?: Partial<FadingViewExtendedProps>;
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

// ---------------------------------------------------
// 4) The main ThemedAbsoluteHeaderBlurSurface
// ---------------------------------------------------
export function ThemedAbsoluteHeaderBlurSurface(props: ThemedAbsoluteHeaderBlurSurfaceProps) {
  const {
    themeType = "primary",
    backgroundColor,
    surfaceProps,
    headerProps = {},
    largeHeaderProps = {},
    style,
    contentContainerStyle,
    ...scrollProps
  } = props;

  const insets = useSafeAreaInsets();

  // destructure from surfaceProps
  const {
    fadingViewProps,
    blurViewProps,
    ...restSurfaceProps
  } = surfaceProps || {};

  // destructure from headerProps
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

  // destructure from largeHeaderProps
  const { renderLargeHeader, enableScaling, headerStyle: largeHeaderStyle } = largeHeaderProps;

  // The small (regular) header
  const HeaderComponent = ({ showNavBar }: { showNavBar: any }) => {
    return (
      <LibHeader
        showNavBar={showNavBar}
        noBottomBorder={noBottomBorder}
        headerStyle={[{ height: 44 + insets.top }, headerStyle]}
        headerLeft={renderLeft ? renderLeft() : <ThemedHeaderBackButton onPress={() => {}} />}
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

  // The large header
  const LargeHeaderComponent = ({ scrollY, showNavBar }: { scrollY: any; showNavBar: any }) => {
    if (!renderLargeHeader) return null;
    return (
      <LibLargeHeader headerStyle={largeHeaderStyle}>
        {enableScaling ? (
          <ScalingView scrollY={scrollY}>
            {renderLargeHeader(scrollY, showNavBar)}
          </ScalingView>
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
      style={[styles.container, style]}
      contentContainerStyle={[{ paddingBottom: insets.bottom }, contentContainerStyle]}
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
