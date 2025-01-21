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
 * Configuration for rendering an underline instead of a filled highlight
 */
export interface SelectedIndicatorConfig {
  /**
   * If true, uses a bottom underline as the highlight,
   * rather than a filled container.
   */
  useUnderline?: boolean;

  /**
   * The thickness (height) of the underline in pixels.
   * @default 4
   */
  underlineThickness?: number;

  /**
   * The underline width in pixels, or "auto" to match
   * the segment’s exact width.
   * @default "auto"
   */
  underlineWidth?: number | "auto";

  /**
   * Alignment of the underline within the segment.
   * "left" | "center" | "right".
   * @default "center"
   */
  underlineAlignment?: "left" | "center" | "right";
}

/**
 * Props interface for ThemedSegmentedControl
 */
export interface ThemedSegmentedControlProps {
  // FUNCTIONALITY
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  themeType?: "primary" | "secondary" | "tertiary";
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;

  // DIMENSIONS
  customHeight?: number;
  customWidth?: number;
  customRadius?: number | "factor";
  segmentSpacing?: number;
  roundedAllCorners?: boolean;

  // ANIMATION
  animatedSwitch?: boolean;

  // BACKGROUND
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
  icons?: {
    definitions?: {
      iconName:
        | keyof typeof Ionicons.glyphMap
        | keyof typeof MaterialIcons.glyphMap
        | keyof typeof FontAwesome.glyphMap;
      iconLibrary?: SupportedIconLibraries;
      iconSize?: number;
      iconPosition?: "left" | "right" | "top" | "bottom";
      iconPadding?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
      };
    }[];
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
  separator?: {
    show?: boolean;
    width?: number;
    height?: number;
    colors?: {
      light?: string;
      dark?: string;
    };
  };

  // BORDERS
  borders?: {
    main?: {
      color?: { light?: string; dark?: string };
      width?: number;
      style?: "solid" | "dashed" | "dotted";
    };
    selected?: {
      color?: { light?: string; dark?: string };
      width?: number;
      style?: "solid" | "dashed" | "dotted";
    };
    unselected?: {
      color?: { light?: string; dark?: string };
      width?: number;
      style?: "solid" | "dashed" | "dotted";
    };
  };

  // SHADOWS
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
  disabled?: {
    indices?: number[];
    style?: ViewStyle;
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
  padding?: {
    internal?: number;
    color?: { light?: string; dark?: string };
  };

  /**
   * Configuration for the selected segment indicator
   */
  selectedIndicator?: SelectedIndicatorConfig;
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedSegmentedControl: React.FC<ThemedSegmentedControlProps> = ({
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

  // SELECTED INDICATOR
  selectedIndicator = {},
}) => {
  //////////////////////////////////////////////////////////////////////////////
  // HELPER: Build color keys
  //////////////////////////////////////////////////////////////////////////////

  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType;
  };

  // Whether we're using the bottom underline for the selected segment
  const useUnderline = selectedIndicator.useUnderline === true;
  const underlineThickness = selectedIndicator.underlineThickness ?? 4;
  const underlineWidth = selectedIndicator.underlineWidth ?? "auto";
  const underlineAlignment = selectedIndicator.underlineAlignment ?? "center";

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
    shadowColor: main.color ?? "transparent",
    shadowOffset: main.offset ?? { width: 0, height: 0 },
    shadowOpacity: main.opacity ?? 0,
    shadowRadius: main.radius ?? 0,
    elevation: main.elevation ?? 0,
  };

  const resolvedHighlightShadowStyle = {
    shadowColor: highlight.color ?? "transparent",
    shadowOffset: highlight.offset ?? { width: 0, height: 0 },
    shadowOpacity: highlight.opacity ?? 0,
    shadowRadius: highlight.radius ?? 0,
    elevation: highlight.elevation ?? 0,
  };

  const resolvedSegmentShadowStyle = {
    shadowColor: segment.color ?? "transparent",
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
    ? customHeight / 2
    : customRadius === "factor"
    ? customHeight / 2
    : customRadius ?? 8;
  const adjustedHeight =
    customHeight - mainBorderWidth * 2 - customInternalPadding * 2;
  const adjustedWidth =
    customWidth - mainBorderWidth * 2 - customInternalPadding * 2;
  const segmentWidth =
    (adjustedWidth - segmentSpacing * (values.length - 1)) / values.length;

  //////////////////////////////////////////////////////////////////////////////
  // ANIMATION & UNDERLINE POSITION
  //////////////////////////////////////////////////////////////////////////////

  // We'll store the final X coordinate of the highlight line in an Animated.Value.
  const xAnim = useRef(new Animated.Value(0)).current;

  // Recompute the "target" X for the underline or highlight whenever selectedIndex changes.
  useEffect(() => {
    if (segmentWidth == null) return; // Not yet laid out

    // If "auto", underline = the full segment width
    const actualUnderlineWidth =
      underlineWidth === "auto" ? segmentWidth : underlineWidth;

    // Compute alignment offset:
    let alignmentOffset = 0;
    if (useUnderline) {
      switch (underlineAlignment) {
        case "center":
          alignmentOffset =
            (segmentWidth - (actualUnderlineWidth ?? 0)) / 2;
          break;
        case "right":
          alignmentOffset =
            segmentWidth - (actualUnderlineWidth ?? 0);
          break;
        case "left":
        default:
          alignmentOffset = 0;
      }
    }

    // The base translation is the segment index times (segmentWidth + spacing).
    // Then we add alignmentOffset if we're using underline.
    const baseX = selectedIndex * (segmentWidth + segmentSpacing);
    const finalX = baseX + alignmentOffset;

    if (animatedSwitch) {
      Animated.timing(xAnim, {
        toValue: finalX,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    } else {
      // If not animated, just snap to final
      xAnim.setValue(finalX);
    }
  }, [
    selectedIndex,
    animatedSwitch,
    segmentSpacing,
    segmentWidth,
    useUnderline,
    underlineWidth,
    underlineAlignment,
    xAnim,
  ]);

  //////////////////////////////////////////////////////////////////////////////
  // HANDLERS
  //////////////////////////////////////////////////////////////////////////////

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
          borderStyle: mainBorderStyle,
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
            // If we are using underline, the container is always the unselected BG
            backgroundColor: unselectedBackgroundColor,
          },
        ]}
      >
        {/** If useUnderline => place a single line at the bottom (animated).
             If not => we do the classic highlight container if animatedSwitch is true. **/}

        {useUnderline ? (
          <Animated.View
            style={[
              styles.highlight,
              resolvedHighlightShadowStyle,
              {
                backgroundColor: selectedBackgroundColor,
                height: underlineThickness,
                // Anchor to bottom
                bottom: 0,
                left: 0,
                width: underlineWidth === "auto" ? segmentWidth : underlineWidth,
                transform: [{ translateX: xAnim }],
              },
            ]}
          />
        ) : (
          animatedSwitch && (
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
                  transform: [{ translateX: xAnim }],
                  borderRadius: roundedAllCorners ? effectiveBorderRadius : 0,
                  borderColor: selectedBorderColorResolved,
                  borderWidth: selectedBorderWidth,
                  borderStyle: selectedBorderStyle,
                },
              ]}
            />
          )
        )}

        {values.map((value, index) => {
          const isSelected = index === selectedIndex;
          const isFirst = index === 0;
          const isLast = index === values.length - 1;
          const icon = definitions[index];

          // For non-animatedSwitch + no underline => fill the selected segment
          // For underline => always keep the segment background transparent, unless disabled
          const backgroundColorSegment =
            useUnderline || (animatedSwitch && !isDisabled(index))
              ? "transparent"
              : isDisabled(index)
              ? disabledBackgroundColor
              : isSelected
              ? selectedBackgroundColor
              : "transparent";

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
                      : backgroundColorSegment,
                    borderTopLeftRadius: isFirst ? effectiveBorderRadius : 0,
                    borderBottomLeftRadius: isFirst ? effectiveBorderRadius : 0,
                    borderTopRightRadius: isLast ? effectiveBorderRadius : 0,
                    borderBottomRightRadius: isLast
                      ? effectiveBorderRadius
                      : 0,
                    borderColor: !isDisabled(index)
                      ? // If not using underline or not animating => highlight border
                        isSelected && !useUnderline && !animatedSwitch
                        ? selectedBorderColorResolved
                        : unselectedBorderColorResolved
                      : "transparent",
                    borderWidth: !isDisabled(index)
                      ? // same logic
                        isSelected && !useUnderline && !animatedSwitch
                        ? selectedBorderWidth
                        : unselectedBorderWidth
                      : 0,
                    borderStyle: !isDisabled(index)
                      ? // same logic
                        isSelected && !useUnderline && !animatedSwitch
                        ? selectedBorderStyle
                        : unselectedBorderStyle
                      : "solid",
                    marginRight:
                      index < values.length - 1 ? segmentSpacing : 0,
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
                        alignItems: "center",
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
                                    marginBottom:
                                      icon.iconPadding?.bottom ?? 8,
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
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(ThemedSegmentedControl);
