// components/templates/headers/ThemedHeaderColors.ts

/**
 * ThemedHeaderColors.ts
 *
 * Defines color schemes for ThemedHeader component for light and dark modes,
 * including primary, secondary, and tertiary colors.
 */

const ThemedHeaderColors = {
  light: {
    // PRIMARY THEME
    headerBackgroundPrimary: "#f5f5f5",
    headerTextPrimary: "#11181C",

    // SECONDARY THEME
    headerBackgroundSecondary: "#e0e0e0",
    headerTextSecondary: "#333333",

    // TERTIARY THEME
    headerBackgroundTertiary: "#d0d0d0",
    headerTextTertiary: "#555555",
  },
  dark: {
    // PRIMARY THEME
    headerBackgroundPrimary: "#1f1f1f",
    headerTextPrimary: "#ECEDEE",

    // SECONDARY THEME
    headerBackgroundSecondary: "#2a2a2a",
    headerTextSecondary: "#cccccc",

    // TERTIARY THEME
    headerBackgroundTertiary: "#3a3a3a",
    headerTextTertiary: "#aaaaaa",
  },
};

export default ThemedHeaderColors;
