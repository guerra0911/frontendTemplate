/**
 * ThemedListColors.ts
 *
 * Defines color keys for ThemedList in light/dark mode, e.g.:
 * - listItemTitleColorPrimary, listItemTitleColorSecondary, ...
 * - listItemDescriptionColorPrimary, ...
 * - listDividerColorPrimary, ...
 * - etc.
 *
 * Feel free to expand as needed to match your usage.
 */
const ThemedListColors = {
    light: {
      listItemTitleColorPrimary: "#11181C",
      listItemTitleColorSecondary: "#333333",
      listItemTitleColorTertiary: "#666666",
  
      listItemDescriptionColorPrimary: "#444444",
      listItemDescriptionColorSecondary: "#555555",
      listItemDescriptionColorTertiary: "#777777",
  
      // If you want separate color for icons, subheaders, etc.:
      listIconColorPrimary: "#11181C",
      listIconColorSecondary: "#333333",
      listIconColorTertiary: "#666666",
  
      listSubheaderColorPrimary: "#11181C",
      listSubheaderColorSecondary: "#333333",
      listSubheaderColorTertiary: "#666666",
    },
    dark: {
      listItemTitleColorPrimary: "#ECEDEE",
      listItemTitleColorSecondary: "#cccccc",
      listItemTitleColorTertiary: "#aaaaaa",
  
      listItemDescriptionColorPrimary: "#cccccc",
      listItemDescriptionColorSecondary: "#aaaaaa",
      listItemDescriptionColorTertiary: "#888888",
  
      listIconColorPrimary: "#ECEDEE",
      listIconColorSecondary: "#cccccc",
      listIconColorTertiary: "#aaaaaa",
  
      listSubheaderColorPrimary: "#ECEDEE",
      listSubheaderColorSecondary: "#cccccc",
      listSubheaderColorTertiary: "#aaaaaa",
    },
  };
  
  export default ThemedListColors;
  