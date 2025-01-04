/**
 * ThemedTouchableRippleColors.ts
 *
 * Defines the color keys for ThemedTouchableRipple, used for ripple,
 * underlay, and hover effects in both light and dark modes.
 *
 * You will merge these into your global Colors object (Colors.ts), so
 * ThemedTouchableRipple can access them through useThemeColor without
 * importing this file directly.
 */

const ThemedTouchableRippleColors = {
    light: {
      // Default ripple color for light mode
      touchableRippleColor: "rgba(0, 0, 0, 0.2)",
      // Underlay color for older Android versions / iOS
      touchableUnderlayColor: "rgba(0, 0, 0, 0.1)",
      // Hover color for web
      touchableHoverColor: "rgba(0, 0, 0, 0.05)",
    },
    dark: {
      // Default ripple color for dark mode
      touchableRippleColor: "rgba(255, 255, 255, 0.2)",
      // Underlay color for older Android versions / iOS in dark mode
      touchableUnderlayColor: "rgba(255, 255, 255, 0.1)",
      // Hover color for web (dark mode)
      touchableHoverColor: "rgba(255, 255, 255, 0.05)",
    },
  };
  
  export default ThemedTouchableRippleColors;
  