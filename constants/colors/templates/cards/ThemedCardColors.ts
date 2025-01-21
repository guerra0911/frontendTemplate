/**
 * ThemedCardColors.ts
 *
 * Contains color keys for ThemedCard with "elevated", "outlined", "contained" modes
 * across primary, secondary, and tertiary.
 * 
 * The naming scheme is flexible: 
 *   cardBackground{Mode}{ThemeType}, cardBorder{Mode}{ThemeType}, etc.
 */

const ThemedCardColors = {
  light: {
    // ELEVATED mode background
    cardBackgroundElevatedPrimary: "#fff",
    cardBackgroundElevatedSecondary: "#fefefe",
    cardBackgroundElevatedTertiary: "#fdfdfd",

    // CONTAINED mode background
    cardBackgroundContainedPrimary: "#e7fdff",
    cardBackgroundContainedSecondary: "#e7fdff",
    cardBackgroundContainedTertiary: "#e7fdff",

    // OUTLINED mode background
    cardBackgroundOutlinedPrimary: "#fff",
    cardBackgroundOutlinedSecondary: "#fff",
    cardBackgroundOutlinedTertiary: "#fff",

    // Borders for OUTLINED mode
    cardBorderOutlinedPrimary: "#cccccc",
    cardBorderOutlinedSecondary: "#bdbdbd",
    cardBorderOutlinedTertiary: "#aaaaaa",

    // Shadows
    cardShadowColorPrimary: "#000",
    cardShadowColorSecondary: "#000",
    cardShadowColorTertiary: "#000",
  },
  dark: {
    // ELEVATED
    cardBackgroundElevatedPrimary: "#1e1e1e",
    cardBackgroundElevatedSecondary: "#1f1f1f",
    cardBackgroundElevatedTertiary: "#202020",

    // CONTAINED
    cardBackgroundContainedPrimary: "#1c1c1c",
    cardBackgroundContainedSecondary: "#1c1c1c",
    cardBackgroundContainedTertiary: "#1c1c1c",

    // OUTLINED
    cardBackgroundOutlinedPrimary: "#1c1c1c",
    cardBackgroundOutlinedSecondary: "#1c1c1c",
    cardBackgroundOutlinedTertiary: "#1c1c1c",

    cardBorderOutlinedPrimary: "#555555",
    cardBorderOutlinedSecondary: "#666666",
    cardBorderOutlinedTertiary: "#777777",

    // Shadows
    cardShadowColorPrimary: "#000",
    cardShadowColorSecondary: "#000",
    cardShadowColorTertiary: "#000",
  },
};

export default ThemedCardColors;
