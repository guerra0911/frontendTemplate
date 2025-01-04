// components/ThemedSegmentedControl.tsx

import React, { useRef, useEffect } from "react";
import * as Haptics from "expo-haptics";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  TextStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedIcon from "../icons/ThemedIcon";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

////////////////////////////////////////////////////////////////////////////////
// INTERFACES
////////////////////////////////////////////////////////////////////////////////

/**
 * Define all possible color keys in Colors.ts
 */
type ThemeColorType =
  // BACKGROUND
  | "segmentedUnselectedBackgroundPrimary"
  | "segmentedSelectedBackgroundPrimary"
  | "segmentedUnselectedBackgroundSecondary"
  | "segmentedSelectedBackgroundSecondary"
  | "segmentedUnselectedBackgroundTertiary"
  | "segmentedSelectedBackgroundTertiary"

  // TEXT
  | "segmentedUnselectedTextPrimary"
  | "segmentedSelectedTextPrimary"
  | "segmentedUnselectedTextSecondary"
  | "segmentedSelectedTextSecondary"
  | "segmentedUnselectedTextTertiary"
  | "segmentedSelectedTextTertiary"

  // ICON
  | "segmentedIconColorSelectedPrimary"
  | "segmentedIconColorUnselectedPrimary"
  | "segmentedIconColorSelectedSecondary"
  | "segmentedIconColorUnselectedSecondary"
  | "segmentedIconColorSelectedTertiary"
  | "segmentedIconColorUnselectedTertiary"

  // SEPARATORS
  | "segmentedSeparatorColorPrimary"
  | "segmentedSeparatorColorSecondary"
  | "segmentedSeparatorColorTertiary"

  // BORDERS
  | "segmentedMainBorderColorPrimary"
  | "segmentedSelectedBorderColorPrimary"
  | "segmentedUnselectedBorderColorPrimary"
  | "segmentedMainBorderColorSecondary"
  | "segmentedSelectedBorderColorSecondary"
  | "segmentedUnselectedBorderColorSecondary"
  | "segmentedMainBorderColorTertiary"
  | "segmentedSelectedBorderColorTertiary"
  | "segmentedUnselectedBorderColorTertiary"

  // SHADOWS
  | "segmentedShadowColorPrimary"
  | "segmentedHighlightShadowColorPrimary"
  | "segmentedSegmentShadowColorPrimary"
  | "segmentedShadowColorSecondary"
  | "segmentedHighlightShadowColorSecondary"
  | "segmentedSegmentShadowColorSecondary"
  | "segmentedShadowColorTertiary"
  | "segmentedHighlightShadowColorTertiary"
  | "segmentedSegmentShadowColorTertiary"

  // DISABLED
  | "segmentedDisabledBackgroundPrimary"
  | "segmentedDisabledTextPrimary"
  | "segmentedDisabledBackgroundSecondary"
  | "segmentedDisabledTextSecondary"
  | "segmentedDisabledBackgroundTertiary"
  | "segmentedDisabledTextTertiary"

  // PADDING
  | "segmentedPaddingColorPrimary"
  | "segmentedPaddingColorSecondary"
  | "segmentedPaddingColorTertiary";

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

/**
 * Props interface for ThemedSegmentedControl
 */
export interface ThemedSegmentedControlProps {
  // FUNCTIONALITY
  /** The labels for each segment */
  values: string[];
  /** The currently selected index */
  selectedIndex: number;
  /** Callback when the segment changes */
  onChange: (index: number) => void;
  /** Custom styles for the container */
  style?: StyleProp<ViewStyle>;
  /** Theme type to apply (primary, secondary, tertiary) */
  themeType?: "primary" | "secondary" | "tertiary";
  /** Haptic feedback style on press */
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;

  // DIMENSIONS
  /** Custom height for the segmented control */
  customHeight?: number;
  /** Custom width for the segmented control */
  customWidth?: number;
  /** Custom border radius for the segmented control */
  customRadius?: number | "factor";
  /** Spacing between segments */
  segmentSpacing?: number;
  /** Whether to round all corners */
  roundedAllCorners?: boolean;

  // ANIMATION
  /** Enable animated switch for the selected segment */
  animatedSwitch?: boolean;

  // BACKGROUND
  /** Custom background colors for selected and unselected segments */
  background?: {
    light?: {
      selected?: string;
      unselected?: string;
    };
    dark?: {
      selected?: string;
      unselected?: string;
    };
  };

  // TEXT
  /** Custom text styles and colors for selected and unselected segments */
  text?: {
    selectedStyle?: TextStyle;
    unselectedStyle?: TextStyle;
    colors?: {
      light?: {
        selected?: string;
        unselected?: string;
      };
      dark?: {
        selected?: string;
        unselected?: string;
      };
    };
  };

  // ICONS
  /** Configuration for icons within the segments */
  icons?: {
    definitions?: {
      /** Name of the icon */
      iconName:
        | keyof typeof Ionicons.glyphMap
        | keyof typeof MaterialIcons.glyphMap
        | keyof typeof FontAwesome.glyphMap;
      /** Library of the icon */
      iconLibrary?: SupportedIconLibraries;
      /** Size of the icon */
      iconSize?: number;
      /** Position of the icon relative to the text */
      iconPosition?: "left" | "right" | "top" | "bottom";
      /** Padding around the icon */
      iconPadding?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
      };
    }[];
    /** Colors for icons based on selection and theme */
    colors?: {
      light?: {
        selected?: string;
        unselected?: string;
      };
      dark?: {
        selected?: string;
        unselected?: string;
      };
    };
  };

  // SEPARATORS
  /** Configuration for separators between segments */
  separator?: {
    /** Whether to show separators */
    show?: boolean;
    /** Thickness of the separator */
    width?: number;
    /** Relative height of the separator */
    height?: number;
    /** Colors of the separator based on theme */
    colors?: {
      light?: string;
      dark?: string;
    };
  };

  // BORDERS
  /** Custom border styles for main, selected, and unselected segments */
  borders?: {
    main?: {
      color?: { light?: string; dark?: string };
      width?: number;
      style?: "solid" | "dashed" | "dotted"; // New Prop
    };
    selected?: {
      color?: { light?: string; dark?: string };
      width?: number;
      style?: "solid" | "dashed" | "dotted"; // New Prop
    };
    unselected?: {
      color?: { light?: string; dark?: string };
      width?: number;
      style?: "solid" | "dashed" | "dotted"; // New Prop
    };
  };

  // SHADOWS
  /** Custom shadow styles for main, highlight, and segment shadows */
  shadows?: {
    main?: {
      color?: string;
      offset?: { width: number; height: number };
      opacity?: number;
      radius?: number;
      elevation?: number;
    };
    highlight?: {
      color?: string;
      offset?: { width: number; height: number };
      opacity?: number;
      radius?: number;
      elevation?: number;
    };
    segment?: {
      color?: string;
      offset?: { width: number; height: number };
      opacity?: number;
      radius?: number;
      elevation?: number;
    };
    /** Theme-based shadow colors */
    colors?: {
      light?: {
        main?: string;
        highlight?: string;
        segment?: string;
      };
      dark?: {
        main?: string;
        highlight?: string;
        segment?: string;
      };
    };
  };

  // DISABLED
  /** Configuration for disabled segments */
  disabled?: {
    /** Indices of segments that are disabled */
    indices?: number[];
    /** Custom styles for disabled segments */
    style?: ViewStyle;
    /** Colors for disabled segments based on theme */
    colors?: {
      light?: {
        background?: string;
        text?: string;
      };
      dark?: {
        background?: string;
        text?: string;
      };
    };
  };

  // PADDING
  /** Custom padding styles */
  padding?: {
    /** Internal padding for the segmented control */
    internal?: number;
    /** Padding color based on theme */
    color?: { light?: string; dark?: string };
  };
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

/**
 * ThemedSegmentedControl
 *
 * A themed and animated segmented control component that adapts to the current theme.
 * It supports custom icons, animations, disabled states, and extensive styling options.
 *
 * @param {ThemedSegmentedControlProps} props - Props for configuring the segmented control.
 * @returns {React.ReactElement} The themed segmented control component.
 */
const ThemedSegmentedControl: React.FC<ThemedSegmentedControlProps> = ({
  // FUNCTIONALITY
  values,
  selectedIndex,
  onChange,
  style,
  themeType = "primary",
  hapticFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,

  // DIMENSIONS
  customHeight = 40,
  customWidth = 300,
  roundedAllCorners = false,
  customRadius = 8,
  segmentSpacing = 0,

  // ANIMATION
  animatedSwitch = false,

  // BACKGROUND
  background = {},

  // TEXT
  text = {},

  // ICONS
  icons = {},

  // SEPARATORS
  separator = {
    show: false,
    width: 1,
    height: 0.8,
    colors: {},
  },

  // BORDERS
  borders = {},

  // SHADOWS
  shadows = {},

  // DISABLED
  disabled = {},

  // PADDING
  padding = {},
}) => {
  //////////////////////////////////////////////////////////////////////////////
  // HELPERS
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Helper: generate color key from base + themeType
   *
   * @param {string} base - Base name of the color key
   * @param {"primary" | "secondary" | "tertiary"} theme - Current theme type
   * @returns {ThemeColorType} - Generated color key
   */
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${
      theme.charAt(0).toUpperCase() + theme.slice(1)
    }` as ThemeColorType;
  };

  //////////////////////////////////////////////////////////////////////////////
  // THEME COLORS
  //////////////////////////////////////////////////////////////////////////////

  // BACKGROUND COLORS
  const selectedBackgroundColor = useThemeColor(
    {
      light: background.light?.selected,
      dark: background.dark?.selected,
    },
    getColorKey("segmentedSelectedBackground", themeType)
  );

  const unselectedBackgroundColor = useThemeColor(
    {
      light: background.light?.unselected,
      dark: background.dark?.unselected,
    },
    getColorKey("segmentedUnselectedBackground", themeType)
  );

  // TEXT COLORS
  const {
    selectedStyle: selectedTextStyle = {},
    unselectedStyle: unselectedTextStyle = {},
    colors: textColors = {},
  } = text;

  const selectedTextColor = useThemeColor(
    {
      light: textColors.light?.selected,
      dark: textColors.dark?.selected,
    },
    getColorKey("segmentedSelectedText", themeType)
  );

  const unselectedTextColor = useThemeColor(
    {
      light: textColors.light?.unselected,
      dark: textColors.dark?.unselected,
    },
    getColorKey("segmentedUnselectedText", themeType)
  );

  // ICON COLORS
  const { definitions = [], colors: iconColors = {} } = icons;
  const selectedIconColor = useThemeColor(
    {
      light: iconColors.light?.selected,
      dark: iconColors.dark?.selected,
    },
    getColorKey("segmentedIconColorSelected", themeType)
  );

  const unselectedIconColor = useThemeColor(
    {
      light: iconColors.light?.unselected,
      dark: iconColors.dark?.unselected,
    },
    getColorKey("segmentedIconColorUnselected", themeType)
  );

  // SEPARATOR COLORS
  const separatorResolvedColor = useThemeColor(
    separator.colors ?? {},
    getColorKey("segmentedSeparatorColor", themeType)
  );

  // BORDERS
  const {
    main: {
      color: mainBorderColor = {},
      width: mainBorderWidth = 0,
      style: mainBorderStyle = "solid",
    } = {},
    selected: {
      color: selectedBorderColor = {},
      width: selectedBorderWidth = 0,
      style: selectedBorderStyle = "solid",
    } = {},
    unselected: {
      color: unselectedBorderColor = {},
      width: unselectedBorderWidth = 0,
      style: unselectedBorderStyle = "solid",
    } = {},
  } = borders;

  const mainBorderColorResolved = useThemeColor(
    mainBorderColor,
    getColorKey("segmentedMainBorderColor", themeType)
  );

  const selectedBorderColorResolved = useThemeColor(
    selectedBorderColor,
    getColorKey("segmentedSelectedBorderColor", themeType)
  );

  const unselectedBorderColorResolved = useThemeColor(
    unselectedBorderColor,
    getColorKey("segmentedUnselectedBorderColor", themeType)
  );

  // SHADOWS
  const { main = {}, highlight = {}, segment = {}, colors = {} } = shadows;

  const resolvedMainShadowStyle = {
    shadowColor: main.color ?? 'transparent',
    shadowOffset: main.offset ?? { width: 0, height: 0 },
    shadowOpacity: main.opacity ?? 0,
    shadowRadius: main.radius ?? 0,
    elevation: main.elevation ?? 0,
  };

  const resolvedHighlightShadowStyle = {
    shadowColor: highlight.color ?? 'transparent',
    shadowOffset: highlight.offset ?? { width: 0, height: 0 },
    shadowOpacity: highlight.opacity ?? 0,
    shadowRadius: highlight.radius ?? 0,
    elevation: highlight.elevation ?? 0,
  };

  const resolvedSegmentShadowStyle = {
    shadowColor: segment.color ?? 'transparent',
    shadowOffset: segment.offset ?? { width: 0, height: 0 },
    shadowOpacity: segment.opacity ?? 0,
    shadowRadius: segment.radius ?? 0,
    elevation: segment.elevation ?? 0,
  };

  // DISABLED SEGMENTS
  const {
    indices: disabledIndices = [],
    style: disabledStyle = {},
    colors: disabledColors = {},
  } = disabled;

  const disabledBackgroundColor = useThemeColor(
    {
      light: disabledColors.light?.background,
      dark: disabledColors.dark?.background,
    },
    getColorKey("segmentedDisabledBackground", themeType)
  );

  const disabledTextColor = useThemeColor(
    {
      light: disabledColors.light?.text,
      dark: disabledColors.dark?.text,
    },
    getColorKey("segmentedDisabledText", themeType)
  );

  /**
   * Determines if a segment at the given index is disabled
   *
   * @param {number} index - Index of the segment
   * @returns {boolean} - True if the segment is disabled, else false
   */
  const isDisabled = (index: number) =>
    disabledIndices?.includes(index) ?? false;

  // PADDING
  const {
    internal: customInternalPadding = 0,
    color: customPaddingColor = {},
  } = padding;

  const paddingColor = useThemeColor(
    {
      light: customPaddingColor.light,
      dark: customPaddingColor.dark,
    },
    getColorKey("segmentedPaddingColor", themeType)
  );

  //////////////////////////////////////////////////////////////////////////////
  // DIMENSIONS
  //////////////////////////////////////////////////////////////////////////////

  const separatorThickness = separator?.width ?? 1;
  const separatorRelativeHeight = separator?.height ?? 0.8;
  const effectiveBorderRadius = roundedAllCorners
    ? customHeight / 2 // Apply full rounding
    : customRadius === "factor"
    ? customHeight / 2 // Factor logic for pill shape
    : customRadius ?? 8; // Default to 8
  const adjustedHeight =
    customHeight - mainBorderWidth * 2 - customInternalPadding * 2;
  const adjustedWidth =
    customWidth - mainBorderWidth * 2 - customInternalPadding * 2;
  const segmentWidth =
    (adjustedWidth - segmentSpacing * (values.length - 1)) / values.length;

  //////////////////////////////////////////////////////////////////////////////
  // ANIMATION
  //////////////////////////////////////////////////////////////////////////////

  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animatedSwitch && segmentWidth) {
      Animated.timing(translateAnim, {
        toValue: selectedIndex * (segmentWidth + segmentSpacing),
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [
    selectedIndex,
    animatedSwitch,
    segmentSpacing,
    segmentWidth,
    translateAnim,
  ]);

  //////////////////////////////////////////////////////////////////////////////
  // FUNCTIONALITY
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Handles the press action on a segment
   *
   * @param {number} index - Index of the pressed segment
   */
  const handlePress = (index: number) => {
    if (!isDisabled(index)) {
      if (hapticFeedbackStyle) {
        Haptics.impactAsync(hapticFeedbackStyle);
      }
      onChange(index);
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////////////////////////

  return (
    <View
      style={[
        styles.container,
        resolvedMainShadowStyle,
        style,
        {
          height: customHeight,
          width: customWidth,
          backgroundColor: paddingColor,
          borderRadius: effectiveBorderRadius,
          borderColor: mainBorderColorResolved,
          borderWidth: mainBorderWidth,
          borderStyle: borders.main?.style ?? "solid",
          padding: customInternalPadding,
        },
      ]}
    >
      <View
        style={[
          styles.innerContainer,
          {
            borderRadius: effectiveBorderRadius,
            height: adjustedHeight,
            width: adjustedWidth,
            backgroundColor: unselectedBackgroundColor,
          },
        ]}
      >
        {animatedSwitch && segmentWidth && (
          <Animated.View
            style={[
              styles.highlight,
              resolvedHighlightShadowStyle,
              {
                backgroundColor: selectedBackgroundColor,
                width: segmentWidth,
                height: adjustedHeight,
                top: 0,
                left: 0,
                transform: [{ translateX: translateAnim }],
                borderRadius: roundedAllCorners ? effectiveBorderRadius : 0,
                borderColor: selectedBorderColorResolved,
                borderWidth: selectedBorderWidth,
                borderStyle: borders.selected?.style ?? "solid",
              },
            ]}
          />
        )}
        {values.map((value, index) => {
          const isSelected = index === selectedIndex;
          const isFirst = index === 0;
          const isLast = index === values.length - 1;
          const icon = definitions[index];

          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={() => !isDisabled(index) && handlePress(index)}
                disabled={isDisabled(index)}
                style={[
                  styles.segment,
                  resolvedSegmentShadowStyle,
                  {
                    height: adjustedHeight,
                    backgroundColor: isDisabled(index)
                      ? disabledBackgroundColor
                      : !animatedSwitch && isSelected
                      ? selectedBackgroundColor
                      : "transparent",
                    borderTopLeftRadius: isFirst ? effectiveBorderRadius : 0,
                    borderBottomLeftRadius: isFirst ? effectiveBorderRadius : 0,
                    borderTopRightRadius: isLast ? effectiveBorderRadius : 0,
                    borderBottomRightRadius: isLast ? effectiveBorderRadius : 0,
                    borderColor: !isDisabled(index)
                      ? !isSelected
                        ? unselectedBorderColorResolved
                        : selectedBorderColorResolved
                      : "transparent",
                    borderWidth: !isDisabled(index)
                      ? !isSelected
                        ? unselectedBorderWidth
                        : selectedBorderWidth
                      : 0,
                    borderStyle: !isDisabled(index)
                      ? !isSelected
                        ? unselectedBorderStyle
                        : selectedBorderStyle
                      : "solid",
                    marginRight: index < values.length - 1 ? segmentSpacing : 0,
                  },
                ]}
              >
                {icon ? (
                  <View
                    style={[
                      styles.iconContainer,
                      {
                        flexDirection:
                          icon.iconPosition === "left" ||
                          icon.iconPosition === "right"
                            ? "row"
                            : "column",
                        alignItems: "center", // Ensure center alignment
                        justifyContent: "center",
                      },
                    ]}
                  >
                    {icon.iconPosition === "right" ||
                    icon.iconPosition === "bottom" ? (
                      <>
                        {value.trim() !== "" && (
                          <Text
                            style={[
                              styles.text,
                              {
                                color: isDisabled(index)
                                  ? disabledTextColor
                                  : isSelected
                                  ? selectedTextColor
                                  : unselectedTextColor,
                              },
                              isSelected
                                ? selectedTextStyle
                                : unselectedTextStyle,
                              icon.iconPosition === "right"
                                ? { marginRight: icon.iconPadding?.left ?? 8 }
                                : { marginTop: icon.iconPadding?.top ?? 8 },
                            ]}
                          >
                            {value}
                          </Text>
                        )}
                        <ThemedIcon
                          iconName={icon.iconName}
                          iconLibrary={icon.iconLibrary || "Ionicons"}
                          size={icon.iconSize ?? 20}
                          color={
                            isDisabled(index)
                              ? disabledTextColor
                              : isSelected
                              ? selectedIconColor
                              : unselectedIconColor
                          }
                        />
                      </>
                    ) : (
                      <>
                        <ThemedIcon
                          iconName={icon.iconName}
                          iconLibrary={icon.iconLibrary || "Ionicons"}
                          size={icon.iconSize ?? 20}
                          color={
                            isDisabled(index)
                              ? disabledTextColor
                              : isSelected
                              ? selectedIconColor
                              : unselectedIconColor
                          }
                        />
                        {value.trim() !== "" && (
                          <Text
                            style={[
                              styles.text,
                              {
                                color: isDisabled(index)
                                  ? disabledTextColor
                                  : isSelected
                                  ? selectedTextColor
                                  : unselectedTextColor,
                              },
                              isSelected
                                ? selectedTextStyle
                                : unselectedTextStyle,
                              icon.iconPosition === "left"
                                ? { marginLeft: icon.iconPadding?.right ?? 8 }
                                : {
                                    marginBottom: icon.iconPadding?.bottom ?? 8,
                                  },
                            ]}
                          >
                            {value}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.text,
                      {
                        color: isDisabled(index)
                          ? disabledTextColor
                          : isSelected
                          ? selectedTextColor
                          : unselectedTextColor,
                      },
                      isSelected ? selectedTextStyle : unselectedTextStyle,
                    ]}
                  >
                    {value}
                  </Text>
                )}
              </TouchableOpacity>
              {separator?.show &&
                index < values.length - 1 &&
                (!animatedSwitch ||
                  (index !== selectedIndex && index + 1 !== selectedIndex)) && (
                  <View
                    style={[
                      styles.separator,
                      {
                        backgroundColor: separatorResolvedColor,
                        width: separatorThickness,
                        height:
                          (adjustedHeight - customInternalPadding * 2) *
                          separatorRelativeHeight,
                        zIndex: animatedSwitch ? -1 : 1,
                      },
                    ]}
                  />
                )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  segment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    fontWeight: "600",
  },
  highlight: {
    position: "absolute",
    zIndex: 0,
  },
  separator: {
    alignSelf: "center",
    position: "relative",
  },
  iconContainer: {
    alignItems: "center", // Ensure icons and text are centered
    justifyContent: "center",
  },
});

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////

export default React.memo(ThemedSegmentedControl);
