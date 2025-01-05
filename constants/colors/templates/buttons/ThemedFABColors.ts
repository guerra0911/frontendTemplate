/**
 * ThemedFABColors.ts
 *
 * Defines color keys for a FAB in light/dark mode,
 * supporting primary, secondary, and tertiary variants.
 *
 * Now includes border color keys as well (fabBorderPrimary, etc.).
 */

const ThemedFABColors = {
  light: {
    // Background
    fabBackgroundPrimary: "#0a7ea4",
    fabBackgroundSecondary: "#FF6347",
    fabBackgroundTertiary: "#34C759",

    // Text/Icon
    fabTextPrimary: "#FFFFFF",
    fabTextSecondary: "#FFFFFF",
    fabTextTertiary: "#FFFFFF",

    // Ripple
    fabRipplePrimary: "rgba(255, 255, 255, 0.2)",
    fabRippleSecondary: "rgba(255, 255, 255, 0.2)",
    fabRippleTertiary: "rgba(255, 255, 255, 0.2)",

    // NEW: Border
    // By default we set them to "transparent". You can override in props.
    fabBorderPrimary: "transparent",
    fabBorderSecondary: "transparent",
    fabBorderTertiary: "transparent",
  },
  dark: {
    // Background
    fabBackgroundPrimary: "#444444",
    fabBackgroundSecondary: "#BB3333",
    fabBackgroundTertiary: "#228B22",

    // Text/Icon
    fabTextPrimary: "#FFFFFF",
    fabTextSecondary: "#FFFFFF",
    fabTextTertiary: "#FFFFFF",

    // Ripple
    fabRipplePrimary: "rgba(255, 255, 255, 0.2)",
    fabRippleSecondary: "rgba(255, 255, 255, 0.2)",
    fabRippleTertiary: "rgba(255, 255, 255, 0.2)",

    // NEW: Border
    fabBorderPrimary: "transparent",
    fabBorderSecondary: "transparent",
    fabBorderTertiary: "transparent",
  },
};

export default ThemedFABColors;
