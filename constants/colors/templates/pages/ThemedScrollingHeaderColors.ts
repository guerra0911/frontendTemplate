// app/constants/colors/templates/headers/ThemedScrollingHeaderColors.ts

/**
 * ThemedScrollingHeaderColors
 *
 * We define background color keys for ThemedScrollingHeader,
 * which has a header that scrolls away with the content.
 */
const ThemedScrollingHeaderColors = {
  light: {
    scrollingHeaderBackgroundPrimary: "#ffffff",
    scrollingHeaderBackgroundSecondary: "#f5f5f5",
    scrollingHeaderBackgroundTertiary: "#ebebeb",
    scrollViewBackgroundPrimary: "#ffffff",
    scrollViewBackgroundSecondary: "#f0f0f0", 
    scrollViewBackgroundTertiary: "#e0e0e0", 
  },
  dark: {
    scrollingHeaderBackgroundPrimary: "#000000",
    scrollingHeaderBackgroundSecondary: "#1a1a1a",
    scrollingHeaderBackgroundTertiary: "#333333",
    scrollViewBackgroundPrimary: "#121212", // Added
    scrollViewBackgroundSecondary: "#1e1e1e", // Added
    scrollViewBackgroundTertiary: "#2b2b2b", // Added
  },
};

export default ThemedScrollingHeaderColors;
