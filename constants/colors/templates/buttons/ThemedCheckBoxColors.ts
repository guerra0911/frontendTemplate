// ThemedCheckBoxColors.ts

/**
 * Color definitions for ThemedCheckBox in light and dark themes.
 * Keys match the ThemeColorType in ThemedCheckBox.
 * Adjust these as desired for your design system.
 */

const ThemedCheckBoxColors = {
    light: {
      // UNCHECKED
      checkBoxBackgroundPrimary: "#ffffff",
      checkBoxIconColorPrimary: "#ffffff", // icon won't show if unchecked
      checkBoxBorderColorPrimary: "#cccccc",
  
      checkBoxBackgroundSecondary: "#ffffff",
      checkBoxIconColorSecondary: "#ffffff",
      checkBoxBorderColorSecondary: "#cccccc",
  
      checkBoxBackgroundTertiary: "#ffffff",
      checkBoxIconColorTertiary: "#ffffff",
      checkBoxBorderColorTertiary: "#cccccc",
  
      // CHECKED
      checkBoxCheckedBackgroundPrimary: "#007AFF",
      checkBoxCheckedIconColorPrimary: "#ffffff",
      checkBoxCheckedBorderColorPrimary: "#007AFF",
  
      checkBoxCheckedBackgroundSecondary: "#34C759",
      checkBoxCheckedIconColorSecondary: "#ffffff",
      checkBoxCheckedBorderColorSecondary: "#34C759",
  
      checkBoxCheckedBackgroundTertiary: "#5856D6",
      checkBoxCheckedIconColorTertiary: "#ffffff",
      checkBoxCheckedBorderColorTertiary: "#5856D6",
  
      // DISABLED
      checkBoxDisabledBackgroundPrimary: "#f2f2f2",
      checkBoxDisabledIconColorPrimary: "#aaaaaa",
      checkBoxDisabledBorderColorPrimary: "#dddddd",
  
      checkBoxDisabledBackgroundSecondary: "#f2f2f2",
      checkBoxDisabledIconColorSecondary: "#aaaaaa",
      checkBoxDisabledBorderColorSecondary: "#dddddd",
  
      checkBoxDisabledBackgroundTertiary: "#f2f2f2",
      checkBoxDisabledIconColorTertiary: "#aaaaaa",
      checkBoxDisabledBorderColorTertiary: "#dddddd",
  
      // SHADOWS
      checkBoxShadowColorPrimary: "#000000",
      checkBoxShadowColorSecondary: "#000000",
      checkBoxShadowColorTertiary: "#000000",
  
      // PADDING
      checkBoxPaddingColorPrimary: "transparent",
      checkBoxPaddingColorSecondary: "transparent",
      checkBoxPaddingColorTertiary: "transparent",
  
      // LOADING
      checkBoxLoadingColorPrimary: "#ffffff",
      checkBoxLoadingColorSecondary: "#ffffff",
      checkBoxLoadingColorTertiary: "#ffffff",
    },
    dark: {
      // UNCHECKED
      checkBoxBackgroundPrimary: "#1C1C1E",
      checkBoxIconColorPrimary: "#1C1C1E", // same as bg, effectively invisible
      checkBoxBorderColorPrimary: "#666666",
  
      checkBoxBackgroundSecondary: "#1C1C1E",
      checkBoxIconColorSecondary: "#1C1C1E",
      checkBoxBorderColorSecondary: "#666666",
  
      checkBoxBackgroundTertiary: "#1C1C1E",
      checkBoxIconColorTertiary: "#1C1C1E",
      checkBoxBorderColorTertiary: "#666666",
  
      // CHECKED
      checkBoxCheckedBackgroundPrimary: "#0A84FF",
      checkBoxCheckedIconColorPrimary: "#ffffff",
      checkBoxCheckedBorderColorPrimary: "#0A84FF",
  
      checkBoxCheckedBackgroundSecondary: "#32D74B",
      checkBoxCheckedIconColorSecondary: "#ffffff",
      checkBoxCheckedBorderColorSecondary: "#32D74B",
  
      checkBoxCheckedBackgroundTertiary: "#5E5CE6",
      checkBoxCheckedIconColorTertiary: "#ffffff",
      checkBoxCheckedBorderColorTertiary: "#5E5CE6",
  
      // DISABLED
      checkBoxDisabledBackgroundPrimary: "#333333",
      checkBoxDisabledIconColorPrimary: "#777777",
      checkBoxDisabledBorderColorPrimary: "#555555",
  
      checkBoxDisabledBackgroundSecondary: "#333333",
      checkBoxDisabledIconColorSecondary: "#777777",
      checkBoxDisabledBorderColorSecondary: "#555555",
  
      checkBoxDisabledBackgroundTertiary: "#333333",
      checkBoxDisabledIconColorTertiary: "#777777",
      checkBoxDisabledBorderColorTertiary: "#555555",
  
      // SHADOWS
      checkBoxShadowColorPrimary: "#000000",
      checkBoxShadowColorSecondary: "#000000",
      checkBoxShadowColorTertiary: "#000000",
  
      // PADDING
      checkBoxPaddingColorPrimary: "transparent",
      checkBoxPaddingColorSecondary: "transparent",
      checkBoxPaddingColorTertiary: "transparent",
  
      // LOADING
      checkBoxLoadingColorPrimary: "#ffffff",
      checkBoxLoadingColorSecondary: "#ffffff",
      checkBoxLoadingColorTertiary: "#ffffff",
    },
  };
  
  export default ThemedCheckBoxColors;
  