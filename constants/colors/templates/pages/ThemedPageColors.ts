// components/templates/pages/ThemedPageColors.ts

/**
 * ThemedPageColors.ts
 *
 * Defines color schemes for ThemedPage component for light and dark modes,
 * including primary, secondary, and tertiary colors.
 */

const ThemedPageColors = {
  light: {
    // PRIMARY THEME
    pageBackgroundPrimary: "#ffffff",
    refreshControlColorPrimary: "#0a7ea4", // Match tintColorLight
    primaryBackgroundLight: "#f0f0f0",

    // SECONDARY THEME
    pageBackgroundSecondary: "#f0f0f0",
    refreshControlColorSecondary: "#34C759",
    secondaryBackgroundLight: "#e0e0e0",

    // TERTIARY THEME
    pageBackgroundTertiary: "#e8e8e8",
    refreshControlColorTertiary: "#5856D6",
    tertiaryBackgroundLight: "#d0d0d0",
  },
  dark: {
    // PRIMARY THEME
    pageBackgroundPrimary: "#151718",
    refreshControlColorPrimary: "#0A84FF", // Match tintColorDark
    primaryBackgroundDark: "#1a1a1a",

    // SECONDARY THEME
    pageBackgroundSecondary: "#1c1c1e",
    refreshControlColorSecondary: "#30D158",
    secondaryBackgroundDark: "#2a2a2a",

    // TERTIARY THEME
    pageBackgroundTertiary: "#2c2c2e",
    refreshControlColorTertiary: "#5E5CE6",
    tertiaryBackgroundDark: "#3a3a3a",
  },
};

export default ThemedPageColors;
