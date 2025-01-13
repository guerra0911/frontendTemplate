/**
 * ThemedCardColors.ts
 *
 * Defines color keys for a Card in light/dark mode,
 * supporting primary, secondary, and tertiary variants,
 * as well as typed border colors.
 */
const ThemedCardColors = {
  light: {
    // Background (for "contained" or general card background)
    cardBackgroundPrimary: "#FFFFFF",
    cardBackgroundSecondary: "#F5F5F5",
    cardBackgroundTertiary: "#EFEFEF",

    // Border
    cardBorderPrimary: "#CCCCCC",
    cardBorderSecondary: "#BBBBBB",
    cardBorderTertiary: "#AAAAAA",
  },
  dark: {
    // Background
    cardBackgroundPrimary: "#2C2C2C",
    cardBackgroundSecondary: "#333333",
    cardBackgroundTertiary: "#3A3A3A",

    // Border
    cardBorderPrimary: "#555555",
    cardBorderSecondary: "#666666",
    cardBorderTertiary: "#777777",
  },
};

export default ThemedCardColors;
