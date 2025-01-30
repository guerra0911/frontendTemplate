/**
 * ThemedHideOnScrollHeaderColors
 *
 * Defines background color keys for HideOnScrollHeader in light/dark mode.
 * We include header background, scrollView background, and top safe area background
 * for "primary", "secondary", and "tertiary".
 */
const ThemedHideOnScrollHeaderColors = {
  light: {
    hideOnScrollHeaderBackgroundPrimary: "#ffffff",
    hideOnScrollHeaderBackgroundSecondary: "#f5f5f5",
    hideOnScrollHeaderBackgroundTertiary: "#ebebeb",

    hideOnScrollScrollViewBackgroundPrimary: "#ffffff",
    hideOnScrollScrollViewBackgroundSecondary: "#f5f5f5",
    hideOnScrollScrollViewBackgroundTertiary: "#ebebeb",

    hideOnScrollTopSafeAreaBackgroundPrimary: "#ffffff",
    hideOnScrollTopSafeAreaBackgroundSecondary: "#f5f5f5",
    hideOnScrollTopSafeAreaBackgroundTertiary: "#ebebeb",
  },
  dark: {
    hideOnScrollHeaderBackgroundPrimary: "#000000",
    hideOnScrollHeaderBackgroundSecondary: "#1a1a1a",
    hideOnScrollHeaderBackgroundTertiary: "#333333",

    hideOnScrollScrollViewBackgroundPrimary: "#121212",
    hideOnScrollScrollViewBackgroundSecondary: "#1e1e1e",
    hideOnScrollScrollViewBackgroundTertiary: "#2b2b2b",

    hideOnScrollTopSafeAreaBackgroundPrimary: "#000000",
    hideOnScrollTopSafeAreaBackgroundSecondary: "#1a1a1a",
    hideOnScrollTopSafeAreaBackgroundTertiary: "#333333",
  },
};

export default ThemedHideOnScrollHeaderColors;
