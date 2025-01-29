// colors.ts

/**
 * colors.ts
 * Updated to include ThemedPageColors and ThemedHeaderColors.
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
import ThemedChasingDotLoadingIndicatorColors from "./templates/loaders/ThemedChasingDotLoadingIndicatorColors";
import ThemedCrossFadeIconColors from "./templates/icons/ThemedCrossFadeIconColors";
import ThemedAnimatedScrollViewColors from "./templates/containers/ThemedAnimatedScrollViewColors";
import ThemedScrollContainerColors from "./templates/containers/ThemedScrollContainerColors";
import ThemedTabbedScrollContainerColors from "./templates/containers/ThemedTabbedScrollContainerColors";
import ThemedViewColors from "./templates/containers/ThemedViewColors";
import ThemedParallaxScrollContainerColors from "./templates/containers/ThemedParallaxScrollViewColors";
import ThemedCollapsibleColors from "./templates/general/ThemedCollapsibleColors";
import ThemedTextColors from "./templates/typography/ThemedTextColors";
import ThemedAnimatedTextColors from "./templates/typography/ThemedAnimatedTextColors";
import ThemedExternalLinkColors from "./templates/typography/ThemedExternalLinkColors";
import ThemedAvatarColors from "./templates/avatars/ThemedAvatarColors";
import ThemedDividerColors from "./templates/general/ThemedDividerColors";
import ThemedListColors from "./templates/lists/ThemedListColors";
import ThemedCustomHeaderColors from "./templates/headers/ThemedCustomHeaderColors";
import ThemedPageColors from "./templates/pages/ThemedPageColors";
import ThemedHeaderColors from "./templates/headers/ThemedHeaderColors";

import ThemedAbsoluteHeaderBlurSurfaceColors from "./templates/pages/ThemedAbsoluteHeaderBlurSurfaceColors";
import ThemedArbitraryYTransitionHeaderColors from "./templates/pages/ThemedArbitraryYTransitionHeaderColors";
import ThemedCustomWorkletColors from "./templates/pages/ThemedCustomWorkletColors";
import ThemedFlashListColors from "./templates/pages/ThemedFlashListColors";
import ThemedFlatListColors from "./templates/pages/ThemedFlatListColors";
import ThemedStaticHeaderColors from "./templates/pages/ThemedStaticHeaderColors";
import ThemedScrollingHeaderColors from "./templates/pages/ThemedScrollingHeaderColors";
import ThemedInvertedColors from "./templates/pages/ThemedInvertedColors";
import ThemedMasonryFlashListColors from "./templates/pages/ThemedMasonryFlashListColors";
import ThemedSectionListColors from "./templates/pages/ThemedSectionListColors";
import ThemedSimpleColors from "./templates/pages/ThemedSimpleColors";
import ThemedSurfaceComponentColors from "./templates/pages/ThemedSurfaceComponentColors";

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

    // Text Colors
    ...ThemedTextColors.light,

    // Animated Text
    ...ThemedAnimatedTextColors.light,
    // External Link
    ...ThemedExternalLinkColors.light,

    // Animated Scroll View
    ...ThemedAnimatedScrollViewColors.light,
    // Parallax Scroll
    ...ThemedParallaxScrollContainerColors.light,
    // Scroll Container
    ...ThemedScrollContainerColors.light,
    // Tabbed Scroll Container
    ...ThemedTabbedScrollContainerColors.light,

    // View
    ...ThemedViewColors.light,
    // Collapsible
    ...ThemedCollapsibleColors.light,

    // Icon
    ...ThemedIconColors.light,
    // Cross Fade Icon
    ...ThemedCrossFadeIconColors.light,

    // Buttons
    ...ThemedButtonColors.light,
    ...ThemedImageButtonColors.light,
    ...ThemedTextButtonColors.light,
    ...ThemedToggleButtonColors.light,
    ...ThemedToggleSwitchColors.light,
    ...ThemedSegmentedControlColors.light,
    ...ThemedChoiceChipsColors.light,
    ...ThemedCheckBoxColors.light,
    ...ThemedRadioButtonColors.light,
    ...ThemedFABColors.light,

    // Date Time, Calendar
    ...ThemedDateTimeSelectorColors.light,
    ...ThemedCalendarSelectorColors.light,

    // Context Menu
    ...ThemedContextMenuColors.light,
    // Drop Down
    ...ThemedDropDownPickerColors.light,

    // Card
    ...ThemedCardColors.light,
    // Surface
    ...ThemedSurfaceColors.light,
    // Ripple
    ...ThemedTouchableRippleColors.light,
    // Activity Indicator
    ...ThemedActivityIndicatorColors.light,
    // Chasing Dot
    ...ThemedChasingDotLoadingIndicatorColors.light,
    // Avatar
    ...ThemedAvatarColors.light,
    // Divider
    ...ThemedDividerColors.light,
    // List
    ...ThemedListColors.light,

    // Themed Custom Header
    ...ThemedCustomHeaderColors.light,

    // Themed Page
    ...ThemedPageColors.light,

    // Themed Header
    ...ThemedHeaderColors.light,

    // Pages
    ...ThemedAbsoluteHeaderBlurSurfaceColors.light,
    ...ThemedArbitraryYTransitionHeaderColors.light,
    ...ThemedCustomWorkletColors.light,
    ...ThemedFlashListColors.light,
    ...ThemedFlatListColors.light,
    ...ThemedInvertedColors.light,
    ...ThemedMasonryFlashListColors.light,
    ...ThemedSectionListColors.light,
    ...ThemedSimpleColors.light,
    ...ThemedSurfaceComponentColors.light,
    ...ThemedStaticHeaderColors.light,
    ...ThemedScrollingHeaderColors.light,
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

    // Text
    ...ThemedTextColors.dark,
    // Animated Text
    ...ThemedAnimatedTextColors.dark,
    // External Link
    ...ThemedExternalLinkColors.dark,

    // Animated Scroll
    ...ThemedAnimatedScrollViewColors.dark,
    // Parallax
    ...ThemedParallaxScrollContainerColors.dark,
    // Scroll Container
    ...ThemedScrollContainerColors.dark,
    // Tabbed Scroll
    ...ThemedTabbedScrollContainerColors.dark,

    // View
    ...ThemedViewColors.dark,
    // Collapsible
    ...ThemedCollapsibleColors.dark,

    // Icons
    ...ThemedIconColors.dark,
    // Cross Fade
    ...ThemedCrossFadeIconColors.dark,

    // Buttons
    ...ThemedButtonColors.dark,
    ...ThemedImageButtonColors.dark,
    ...ThemedTextButtonColors.dark,
    ...ThemedToggleButtonColors.dark,
    ...ThemedToggleSwitchColors.dark,
    ...ThemedSegmentedControlColors.dark,
    ...ThemedChoiceChipsColors.dark,
    ...ThemedCheckBoxColors.dark,
    ...ThemedRadioButtonColors.dark,
    ...ThemedFABColors.dark,

    // Date/Calendar
    ...ThemedDateTimeSelectorColors.dark,
    ...ThemedCalendarSelectorColors.dark,

    // Context Menu
    ...ThemedContextMenuColors.dark,
    // Drop Down
    ...ThemedDropDownPickerColors.dark,

    // Card
    ...ThemedCardColors.dark,
    // Surface
    ...ThemedSurfaceColors.dark,
    // Ripple
    ...ThemedTouchableRippleColors.dark,
    // Activity Indicator
    ...ThemedActivityIndicatorColors.dark,
    // Chasing Dot
    ...ThemedChasingDotLoadingIndicatorColors.dark,
    // Avatar
    ...ThemedAvatarColors.dark,
    // Divider
    ...ThemedDividerColors.dark,
    // List
    ...ThemedListColors.dark,

    // Themed Custom Header
    ...ThemedCustomHeaderColors.dark,

    // Themed Page
    ...ThemedPageColors.dark,

    // Themed Header
    ...ThemedHeaderColors.dark,

    // Pages
    ...ThemedAbsoluteHeaderBlurSurfaceColors.dark,
    ...ThemedArbitraryYTransitionHeaderColors.dark,
    ...ThemedCustomWorkletColors.dark,
    ...ThemedFlashListColors.dark,
    ...ThemedFlatListColors.dark,
    ...ThemedInvertedColors.dark,
    ...ThemedMasonryFlashListColors.dark,
    ...ThemedSectionListColors.dark,
    ...ThemedSimpleColors.dark,
    ...ThemedSurfaceComponentColors.dark,
    ...ThemedStaticHeaderColors.dark,
    ...ThemedScrollingHeaderColors.dark,
  },
};
