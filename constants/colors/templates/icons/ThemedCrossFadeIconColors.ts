/**
 * ThemedCrossFadeIconColors.ts
 *
 * Defines color keys for a cross-fade icon in light/dark mode,
 * supporting primary, secondary, and tertiary variants.
 *
 * Merge these into your global Colors object (Colors.ts)
 * so that useThemeColor can retrieve them by the typed keys.
 */

const ThemedCrossFadeIconColors = {
    light: {
      // Primary
      crossFadeIconColorPrimary: "#333333",
      // Secondary
      crossFadeIconColorSecondary: "#666666",
      // Tertiary
      crossFadeIconColorTertiary: "#999999",
    },
    dark: {
      // Primary
      crossFadeIconColorPrimary: "#cccccc",
      // Secondary
      crossFadeIconColorSecondary: "#aaaaaa",
      // Tertiary
      crossFadeIconColorTertiary: "#888888",
    },
  };
  
  export default ThemedCrossFadeIconColors;
  