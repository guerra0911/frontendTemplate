/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import ThemedSegmentedControlColors from "./templates/buttons/ThemedSegmentedControlColors";
import ThemedButtonColors from "./templates/buttons/ThemedButtonColors";
import ThemedIconColors from "./templates/icons/ThemedIconColors";
import ThemedImageButtonColors from "./templates/buttons/ThemedImageButtonColors";
import ThemedTextButtonColors from "./templates/buttons/ThemedTextButtonColors";
import ThemedToggleSwitchColors from "./templates/buttons/ThemedToggleSwitchColors";
import ThemedToggleButtonColors from "./templates/buttons/ThemedToggleButtonColors";
import ThemedChoiceChipsColors from "./templates/buttons/ThemedChoiceChipsColors";
import ThemedCheckBoxColors from "./templates/buttons/ThemedCheckBoxColors";
import ThemedRadioButtonColors from "./templates/buttons/ThemedRadioButtonColors";
import ThemedFABColors from "./templates/buttons/ThemedFABColors";
import ThemedDateTimeSelectorColors from "./templates/dateTime/ThemedDateTimeSelectorColors";
import ThemedCalendarSelectorColors from "./templates/dateTime/ThemedCalendarSelectorColors";
import ThemedContextMenuColors from "./templates/containers/ThemedContextMenuColors";
import ThemedDropDownPickerColors from "./templates/buttons/ThemedDropDownPickerColors";
import ThemedCardColors from "./templates/cards/ThemedCardColors";
import ThemedSurfaceColors from "./templates/containers/ThemedSurfaceColors";
import ThemedTouchableRippleColors from "./templates/buttons/ThemedTouchableRippleColors";
import ThemedActivityIndicatorColors from "./templates/loaders/ThemedActivityIndicatorColors";
import ThemedCrossFadeIconColors from "./templates/icons/ThemedCrossFadeIconColors";


const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    headerBackground: "#f5f5f5",
    tint: tintColorLight,
    icon: "#151718",
    loneIcon: "#151718",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#ddd",

    // Icon Colors
    ...ThemedIconColors.light,

    // Cross Fade Icon Colors
    ...ThemedCrossFadeIconColors.light,

    // Button Colors
    ...ThemedButtonColors.light,

    // Image Button Colors
    ...ThemedImageButtonColors.light,

    // Text Button Colors
    ...ThemedTextButtonColors.light,

    // Toggle Button Colors
    ...ThemedToggleButtonColors.light,

    // Toggle Switch Colors
    ...ThemedToggleSwitchColors.light,

    // Segmented Control Colors
    ...ThemedSegmentedControlColors.light,

    // Choice Chips Colors
    ...ThemedChoiceChipsColors.light,

    // Check Box Colors
    ...ThemedCheckBoxColors.light,

    // Radio Button Colors
    ...ThemedRadioButtonColors.light,

    // FAB Colors
    ...ThemedFABColors.light,

    // Date Time Selector Colors
    ...ThemedDateTimeSelectorColors.light,

    // Calendar Selector Colors
    ...ThemedCalendarSelectorColors.light,

    // Context Menu Colors
    ...ThemedContextMenuColors.light,

    // Drop Down Picker Colors
    ...ThemedDropDownPickerColors.light,

    // Card Colors
    ...ThemedCardColors.light,

    // Surface Colors
    ...ThemedSurfaceColors.light,

    // Touchable Ripple Colors
    ...ThemedTouchableRippleColors.light,

    // Activity Indicator Colors
    ...ThemedActivityIndicatorColors.light,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    headerBackground: "#1f1f1f",
    tint: tintColorDark,
    icon: "#fff",
    loneIcon: "#fff",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: "#555",

    // Icon Colors
    ...ThemedIconColors.dark,

    // Cross Fade Icon Colors
    ...ThemedCrossFadeIconColors.dark,

    // Button Colors
    ...ThemedButtonColors.dark,

    // Image Button Colors
    ...ThemedImageButtonColors.dark,

    // Text Button Colors
    ...ThemedTextButtonColors.dark,

    // Toggle Button Colors
    ...ThemedToggleButtonColors.dark,

    // Toggle Switch Colors
    ...ThemedToggleSwitchColors.dark,

    // Segmented Control Colors
    ...ThemedSegmentedControlColors.dark,

    // Choice Chips Colors
    ...ThemedChoiceChipsColors.dark,

    // Check Box Colors
    ...ThemedCheckBoxColors.dark,

    // Radio Button Colors
    ...ThemedRadioButtonColors.dark,

    // FAB Colors
    ...ThemedFABColors.dark,

    // Date Time Selector Colors
    ...ThemedDateTimeSelectorColors.dark,

    // Calendar Selector Colors
    ...ThemedCalendarSelectorColors.dark,

    // Context Menu Colors
    ...ThemedContextMenuColors.dark,

    // Drop Down Picker Colors
    ...ThemedDropDownPickerColors.dark,

    // Card Colors
    ...ThemedCardColors.dark,

     // Surface Colors
     ...ThemedSurfaceColors.dark,
     
    // Touchable Ripple Colors
    ...ThemedTouchableRippleColors.dark,

    // Activity Indicator Colors
    ...ThemedActivityIndicatorColors.dark,
  },
};