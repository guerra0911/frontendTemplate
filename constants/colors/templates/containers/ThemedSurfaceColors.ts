/**
 * ThemedSurfaceColors.ts
 *
 * Defines the color keys (light and dark) used by ThemedSurface.
 * You can expand this file to add more keys if you need more modes/variations.
 */

const ThemedSurfaceColors = {
    light: {
      // For surfaces that are meant to be "flat" (no elevation)
      surfaceBackgroundFlat: "#ffffff",
  
      // For surfaces that are meant to be "elevated" (with elevation/shadow)
      surfaceBackgroundElevated: "#f5f5f5",
  
      // Shadow color for light mode
      surfaceShadowColor: "#000000",
    },
    dark: {
      // Dark theme flat background
      surfaceBackgroundFlat: "#1f1f1f",
  
      // Dark theme elevated background
      surfaceBackgroundElevated: "#2c2c2c",
  
      // Shadow color for dark mode
      surfaceShadowColor: "#000000",
    },
  };
  
  export default ThemedSurfaceColors;
  