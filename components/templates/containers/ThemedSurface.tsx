/**
 * ThemedSurface.tsx
 *
 * A container component with optional elevation (shadow).
 * It adapts to your global Colors and useThemeColor hook
 * to render the appropriate background & shadow for light/dark themes.
 */

import React, { useMemo } from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Animated,
  Platform,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor"; // Your custom theme color hook

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

/**
 * Possible surface modes in your custom approach:
 * - 'flat' => No elevation/shadow
 * - 'elevated' => Shadow/elevation
 */
export type SurfaceMode = "flat" | "elevated";

/**
 * Props for ThemedSurface
 */
export interface ThemedSurfaceProps {
  /** Child elements rendered inside the surface. */
  children?: React.ReactNode;

  /** Additional styles for the container (padding, margin, etc.). */
  style?: StyleProp<ViewStyle>;

  /**
   * Surface mode:
   * - 'flat': no elevation/shadow
   * - 'elevated': renders a shadow based on `elevation`
   * @default 'flat'
   */
  mode?: SurfaceMode;

  /**
   * The elevation level for shadow effect. Higher = bigger shadow.
   * @default 0
   */
  elevation?: number;

  /**
   * Override the background color for light/dark modes.
   * For instance, { light: "#fff", dark: "#333" }
   */
  backgroundColor?: {
    light?: string;
    dark?: string;
  };

  /**
   * Override the shadow color for light/dark modes.
   * For instance, { light: "#000", dark: "#fff" }
   */
  shadowColor?: {
    light?: string;
    dark?: string;
  };
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedSurface: React.FC<ThemedSurfaceProps> = ({
  children,
  style,
  mode = "flat",
  elevation = 0,
  backgroundColor,
  shadowColor,
}) => {
  //////////////////////////////////////////////////////////////////////////
  // THEME COLORS
  //////////////////////////////////////////////////////////////////////////

  /**
   * We rely on global `Colors` via `useThemeColor`:
   * - `surfaceBackgroundFlat` for flat surfaces
   * - `surfaceBackgroundElevated` for elevated surfaces
   * - `surfaceShadowColor` for shadow color
   */
  const bgColorKey = mode === "flat" ? "surfaceBackgroundFlat" : "surfaceBackgroundElevated";

  const resolvedBackgroundColor = useThemeColor(
    {
      light: backgroundColor?.light,
      dark: backgroundColor?.dark,
    },
    bgColorKey // e.g. "surfaceBackgroundFlat" or "surfaceBackgroundElevated"
  );

  const resolvedShadowColor = useThemeColor(
    {
      light: shadowColor?.light,
      dark: shadowColor?.dark,
    },
    "surfaceShadowColor"
  );

  //////////////////////////////////////////////////////////////////////////
  // SHADOW STYLES
  //////////////////////////////////////////////////////////////////////////

  const computedShadowStyle = useMemo(() => {
    if (mode === "flat" || elevation <= 0) {
      // No shadow in flat mode or zero elevation
      return {};
    }

    // Basic iOS shadow
    const iosShadow = {
      shadowColor: resolvedShadowColor,
      shadowOffset: { width: 0, height: elevation * 0.5 },
      shadowOpacity: 0.2 + 0.05 * Math.min(elevation, 5), // A simple formula
      shadowRadius: elevation,
    };

    // Android uses elevation prop directly
    const androidShadow = {
      elevation,
    };

    // Combine, RN will ignore platform-irrelevant keys
    return { ...iosShadow, ...androidShadow };
  }, [mode, elevation, resolvedShadowColor]);

  //////////////////////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////////////////////

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: resolvedBackgroundColor },
        computedShadowStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    // By default, let shadow be visible outside the container
    overflow: "visible",
    // For a clipped surface, set overflow to 'hidden', but that cuts the shadow
  },
});

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////

export default React.memo(ThemedSurface);
