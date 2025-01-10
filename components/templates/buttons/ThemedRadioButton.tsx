import React, { useRef, useCallback } from "react";
import * as Haptics from "expo-haptics";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Animated,
  Easing,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedIcon from "../icons/ThemedIcon";
import ThemedActivityIndicator from "../loaders/ThemedActivityIndicator";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

type ThemeColorType =
  // UNSELECTED
  | "radioBackgroundPrimary"
  | "radioInnerDotColorPrimary"
  | "radioBorderColorPrimary"

  | "radioBackgroundSecondary"
  | "radioInnerDotColorSecondary"
  | "radioBorderColorSecondary"

  | "radioBackgroundTertiary"
  | "radioInnerDotColorTertiary"
  | "radioBorderColorTertiary"

  // SELECTED
  | "radioSelectedBackgroundPrimary"
  | "radioSelectedInnerDotColorPrimary"
  | "radioSelectedBorderColorPrimary"

  | "radioSelectedBackgroundSecondary"
  | "radioSelectedInnerDotColorSecondary"
  | "radioSelectedBorderColorSecondary"

  | "radioSelectedBackgroundTertiary"
  | "radioSelectedInnerDotColorTertiary"
  | "radioSelectedBorderColorTertiary"

  // DISABLED
  | "radioDisabledBackgroundPrimary"
  | "radioDisabledInnerDotColorPrimary"
  | "radioDisabledBorderColorPrimary"

  | "radioDisabledBackgroundSecondary"
  | "radioDisabledInnerDotColorSecondary"
  | "radioDisabledBorderColorSecondary"

  | "radioDisabledBackgroundTertiary"
  | "radioDisabledInnerDotColorTertiary"
  | "radioDisabledBorderColorTertiary"

  // SHADOWS
  | "radioShadowColorPrimary"
  | "radioShadowColorSecondary"
  | "radioShadowColorTertiary"

  // PADDING
  | "radioPaddingColorPrimary"
  | "radioPaddingColorSecondary"
  | "radioPaddingColorTertiary"

  // LOADING
  | "radioLoadingColorPrimary"
  | "radioLoadingColorSecondary"
  | "radioLoadingColorTertiary";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

export interface ThemedRadioButtonProps {
  // FUNCTIONALITY
  value: boolean; // on/off (selected/unselected)
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  themeType?: "primary" | "secondary" | "tertiary";
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;
  animatedPress?: boolean;

  // DIMENSIONS
  customSize?: number; // radio button is circular, so one dimension
  customRadius?: number | "factor"; // rounding factor
  roundedAllCorners?: boolean; // for uniform rounding (often circular anyway)

  // COLORS (UNSELECTED)
  backgroundUnselected?: { light?: string; dark?: string };
  innerDotColorUnselected?: { light?: string; dark?: string };
  borderColorUnselected?: { light?: string; dark?: string };

  // COLORS (SELECTED)
  backgroundSelected?: { light?: string; dark?: string };
  innerDotColorSelected?: { light?: string; dark?: string };
  borderColorSelected?: { light?: string; dark?: string };

  // ICON (if you want to display a custom icon when selected, optional)
  // Default will be a filled circle (inner dot). If iconName provided, use icon instead of dot.
  iconName?: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap | keyof typeof FontAwesome.glyphMap;
  iconLibrary?: SupportedIconLibraries;
  iconSize?: number;

  // BORDERS
  borders?: {
    width?: number;
    style?: "solid" | "dashed" | "dotted";
  };

  // SHADOWS
  shadows?: {
    color?: string;
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  };

  // PADDING
  padding?: {
    internal?: number;
    color?: { light?: string; dark?: string };
  };

  // LOADING
  loading?: {
    isLoading: boolean;
    color?: string;
  };
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedRadioButton: React.FC<ThemedRadioButtonProps> = ({
  // FUNCTIONALITY
  value,
  onValueChange,
  disabled = false,
  style,
  themeType = "primary",
  hapticFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  animatedPress = false,

  // DIMENSIONS
  customSize = 24,
  customRadius = "factor", // by default factor to get a circle
  roundedAllCorners = true,

  // COLORS UNSELECTED
  backgroundUnselected = {},
  innerDotColorUnselected = {},
  borderColorUnselected = {},

  // COLORS SELECTED
  backgroundSelected = {},
  innerDotColorSelected = {},
  borderColorSelected = {},

  // ICON
  iconName,
  iconLibrary = "Ionicons",
  iconSize = 14,

  // BORDERS
  borders = {},

  // SHADOWS
  shadows = {},

  // PADDING
  padding = {},

  // LOADING
  loading = {
    isLoading: false,
  },
}) => {
  // ############################################################################
  // HELPER
  // ############################################################################

  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType;
  };

  const isSelected = value;
  const isDisabled = disabled || loading.isLoading;

  // ############################################################################
  // COLORS
  // ############################################################################

  // UNSELECTED COLORS
  const unselectedBgColor = useThemeColor(
    backgroundUnselected,
    getColorKey("radioBackground", themeType)
  );

  const unselectedInnerDotColor = useThemeColor(
    innerDotColorUnselected,
    getColorKey("radioInnerDotColor", themeType)
  );

  const unselectedBorderColorResolved = useThemeColor(
    borderColorUnselected,
    getColorKey("radioBorderColor", themeType)
  );

  // SELECTED COLORS
  const selectedBgColor = useThemeColor(
    backgroundSelected,
    getColorKey("radioSelectedBackground", themeType)
  );

  const selectedInnerDotColor = useThemeColor(
    innerDotColorSelected,
    getColorKey("radioSelectedInnerDotColor", themeType)
  );

  const selectedBorderColorResolved = useThemeColor(
    borderColorSelected,
    getColorKey("radioSelectedBorderColor", themeType)
  );

  // DISABLED COLORS
  const disabledBgColor = useThemeColor(
    {},
    getColorKey("radioDisabledBackground", themeType)
  );

  const disabledInnerDotColor = useThemeColor(
    {},
    getColorKey("radioDisabledInnerDotColor", themeType)
  );

  const disabledBorderColor = useThemeColor(
    {},
    getColorKey("radioDisabledBorderColor", themeType)
  );

  // CURRENT COLORS BASED ON STATE
  const currentBgColor = isDisabled
    ? disabledBgColor
    : isSelected
    ? selectedBgColor
    : unselectedBgColor;

  const currentInnerDotColor = isDisabled
    ? disabledInnerDotColor
    : isSelected
    ? selectedInnerDotColor
    : unselectedInnerDotColor;

  const currentBorderColor = isDisabled
    ? disabledBorderColor
    : isSelected
    ? selectedBorderColorResolved
    : unselectedBorderColorResolved;

  // ############################################################################
  // BORDERS
  // ############################################################################
  const {
    width: borderWidth = 1,
    style: borderStyle = "solid",
  } = borders;

  // ############################################################################
  // SHADOWS
  // ############################################################################
  const {
    color: shadowColor,
    offset = { width: 0, height: 1 },
    opacity = 0.2,
    radius = 2,
    elevation = 2,
  } = shadows;

  const resolvedShadowColor = useThemeColor(
    { light: shadowColor, dark: shadowColor },
    getColorKey("radioShadowColor", themeType)
  );

  const shadowStyle = {
    shadowColor: resolvedShadowColor,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };

  // ############################################################################
  // PADDING
  // ############################################################################
  const {
    internal: customInternalPadding = 2,
    color: customPaddingColor = {},
  } = padding;

  const paddingColor = useThemeColor(
    customPaddingColor,
    getColorKey("radioPaddingColor", themeType)
  );

  // ############################################################################
  // LOADING
  // ############################################################################
  const resolvedLoadingColor = loading.color
    ? loading.color
    : useThemeColor({}, getColorKey("radioLoadingColor", themeType));

  // ############################################################################
  // DIMENSIONS
  // ############################################################################
  const effectiveBorderRadius = roundedAllCorners
    ? customSize / 2
    : customRadius === "factor"
    ? customSize / 2
    : (customRadius as number) ?? 4;

  // ############################################################################
  // ANIMATION
  // ############################################################################
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      if (hapticFeedbackStyle) {
        Haptics.impactAsync(hapticFeedbackStyle);
      }
      onValueChange(!value);
    }
  }, [isDisabled, hapticFeedbackStyle, onValueChange, value]);

  const onPressIn = () => {
    if (animatedPress && !loading.isLoading) {
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start();
    }
  };

  const onPressOut = () => {
    if (animatedPress && !loading.isLoading) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start();
    }
  };

  // ############################################################################
  // INNER DOT / ICON
  // ############################################################################
  // By default: if selected and no icon, show a smaller filled circle.
  // If iconName is provided, show that icon instead of a dot.
  const showIcon = isSelected && iconName;
  const showDot = isSelected && !iconName;

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <Animated.View
      style={[
        shadowStyle,
        style,
        {
          width: customSize,
          height: customSize,
          backgroundColor: currentBgColor,
          borderRadius: effectiveBorderRadius,
          borderColor: currentBorderColor,
          borderWidth: borderWidth,
          borderStyle: borderStyle,
          transform: [{ scale: animatedPress ? scaleAnim : 1 }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={isDisabled}
        style={[
          styles.button,
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: customInternalPadding,
            backgroundColor: paddingColor,
            borderRadius: effectiveBorderRadius,
          },
        ]}
      >
        {loading.isLoading ? (
          <ThemedActivityIndicator
          animating={loading.isLoading}
          color={{ light: resolvedLoadingColor, dark: resolvedLoadingColor }} // Customize based on your theme
          size={16} // Adjust the size as needed (ThemedActivityIndicator expects a number)
          hidesWhenStopped={true} // Optional, defaults to true
        />
        ) : showIcon ? (
          <ThemedIcon
            iconName={iconName!}
            iconLibrary={iconLibrary}
            size={iconSize}
            color={currentInnerDotColor}
          />
        ) : showDot ? (
          <View
            style={{
              width: customSize / 2,
              height: customSize / 2,
              borderRadius: (customSize / 2) / 2,
              backgroundColor: currentInnerDotColor,
            }}
          />
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

// ################################################################################
// EXPORT
// ################################################################################

export default React.memo(ThemedRadioButton);
