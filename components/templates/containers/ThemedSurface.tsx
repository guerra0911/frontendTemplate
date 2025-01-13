/**
 * ThemedSurface.tsx
 *
 * Updated to match React Native Paper's Surface component logic for:
 * - Elevation (iOS shadow + Android elevation)
 * - Mode for flat vs elevated
 * - Theming with your new approach (themeType).
 */
import React, { useMemo } from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Animated,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * For each themeType (primary, secondary, tertiary),
 * we have a "flat" background, an "elevated" background, and a "shadow" color.
 * Optionally, we also have "disabled" states if you want that logic.
 */
type ThemeColorType =
  // PRIMARY
  | "surfaceBackgroundFlatPrimary"
  | "surfaceBackgroundElevatedPrimary"
  | "surfaceShadowColorPrimary"
  | "surfaceBackgroundFlatDisabledPrimary"
  | "surfaceBackgroundElevatedDisabledPrimary"
  | "surfaceShadowColorDisabledPrimary"

  // SECONDARY
  | "surfaceBackgroundFlatSecondary"
  | "surfaceBackgroundElevatedSecondary"
  | "surfaceShadowColorSecondary"
  | "surfaceBackgroundFlatDisabledSecondary"
  | "surfaceBackgroundElevatedDisabledSecondary"
  | "surfaceShadowColorDisabledSecondary"

  // TERTIARY
  | "surfaceBackgroundFlatTertiary"
  | "surfaceBackgroundElevatedTertiary"
  | "surfaceShadowColorTertiary"
  | "surfaceBackgroundFlatDisabledTertiary"
  | "surfaceBackgroundElevatedDisabledTertiary"
  | "surfaceShadowColorDisabledTertiary";

// ################################################################################
// SURFACE MODE
// ################################################################################

export type SurfaceMode = "flat" | "elevated";

// ################################################################################
// PROPS
// ################################################################################

export interface ThemedSurfaceProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;

  /**
   * Mode controls whether the surface is "flat" or "elevated."
   * - flat => minimal or no shadow
   * - elevated => shadow/elevation
   */
  mode?: SurfaceMode;

  /**
   * elevation => Android elevation + iOS shadow
   * Typically 0-6, but can be any number.
   */
  elevation?: number;

  /**
   * Theming category for the surface
   */
  themeType?: "primary" | "secondary" | "tertiary";

  /**
   * If you need a "disabled" style or logic, you can unify that
   * or do so through other props. Example approach:
   * `disabled?: boolean;`
   * For brevity, let's keep it simple. If you need disabled states,
   * you can pass `themeType="primary"` and handle "disabled" externally,
   * or incorporate that logic inside.
   */

  /**
   * Overridable background color (light/dark).
   */
  backgroundColor?: {
    light?: string;
    dark?: string;
  };

  /**
   * Overridable shadow color (light/dark).
   */
  shadowColor?: {
    light?: string;
    dark?: string;
  };
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedSurface: React.FC<ThemedSurfaceProps> = ({
  children,
  style,
  testID,
  mode = "flat",
  elevation = 0,
  themeType = "primary", // default
  backgroundColor={},
  shadowColor={},
}) => {
  // 1) HELPER: Build the color key for backgrounds
  const getBackgroundColorKey = (
    isFlat: boolean,
    variant: "primary" | "secondary" | "tertiary"
  ) => {
    // e.g. "surfaceBackgroundFlatPrimary" or "surfaceBackgroundElevatedPrimary"
    const base = isFlat ? "surfaceBackgroundFlat" : "surfaceBackgroundElevated";
    return `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  // 2) For shadow color
  const getShadowColorKey = (variant: "primary" | "secondary" | "tertiary") => {
    // e.g. "surfaceShadowColorPrimary"
    return `surfaceShadowColor${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  // 3) Determine the final color keys
  const backgroundColorKey = getBackgroundColorKey(mode === "flat", themeType);
  const shadowColorKey = getShadowColorKey(themeType);

  // 4) Resolve the background color via useThemeColor
  const resolvedBackgroundColor = useThemeColor(
    backgroundColor,
    backgroundColorKey
  );

  // 5) Resolve the shadow color
  const resolvedShadowColor = useThemeColor(
    shadowColor,
    shadowColorKey
  );

  // 6) Compute the iOS + Android shadow style if mode=elevated and elevation>0
  const computedShadowStyle = useMemo(() => {
    if (mode === "flat" || elevation <= 0) {
      return {};
    }

    // On iOS
    const iosShadow = {
      shadowColor: resolvedShadowColor,
      shadowOffset: { width: 0, height: elevation * 0.5 },
      shadowOpacity: 0.2 + 0.05 * Math.min(elevation, 5),
      shadowRadius: elevation,
    };

    // On Android
    const androidShadow = {
      elevation,
    };

    return { ...iosShadow, ...androidShadow };
  }, [mode, elevation, resolvedShadowColor]);

  // 7) RENDER
  return (
    <Animated.View
      testID={testID}
      style={[
        styles.container,
        // Our computed background color
        { backgroundColor: resolvedBackgroundColor },
        // Computed shadow/elevation
        computedShadowStyle,

        // + any custom style from user
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
  },
});

export default React.memo(ThemedSurface);
