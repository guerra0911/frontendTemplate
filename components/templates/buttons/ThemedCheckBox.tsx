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
  // UNCHECKED
  | "checkBoxBackgroundPrimary"
  | "checkBoxIconColorPrimary"
  | "checkBoxBorderColorPrimary"
  | "checkBoxBackgroundSecondary"
  | "checkBoxIconColorSecondary"
  | "checkBoxBorderColorSecondary"
  | "checkBoxBackgroundTertiary"
  | "checkBoxIconColorTertiary"
  | "checkBoxBorderColorTertiary"

  // CHECKED
  | "checkBoxCheckedBackgroundPrimary"
  | "checkBoxCheckedIconColorPrimary"
  | "checkBoxCheckedBorderColorPrimary"
  | "checkBoxCheckedBackgroundSecondary"
  | "checkBoxCheckedIconColorSecondary"
  | "checkBoxCheckedBorderColorSecondary"
  | "checkBoxCheckedBackgroundTertiary"
  | "checkBoxCheckedIconColorTertiary"
  | "checkBoxCheckedBorderColorTertiary"

  // DISABLED
  | "checkBoxDisabledBackgroundPrimary"
  | "checkBoxDisabledIconColorPrimary"
  | "checkBoxDisabledBorderColorPrimary"
  | "checkBoxDisabledBackgroundSecondary"
  | "checkBoxDisabledIconColorSecondary"
  | "checkBoxDisabledBorderColorSecondary"
  | "checkBoxDisabledBackgroundTertiary"
  | "checkBoxDisabledIconColorTertiary"
  | "checkBoxDisabledBorderColorTertiary"

  // SHADOWS
  | "checkBoxShadowColorPrimary"
  | "checkBoxShadowColorSecondary"
  | "checkBoxShadowColorTertiary"

  // PADDING
  | "checkBoxPaddingColorPrimary"
  | "checkBoxPaddingColorSecondary"
  | "checkBoxPaddingColorTertiary"

  // LOADING
  | "checkBoxLoadingColorPrimary"
  | "checkBoxLoadingColorSecondary"
  | "checkBoxLoadingColorTertiary";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

export interface ThemedCheckBoxProps {
  // FUNCTIONALITY
  value: boolean; // checked/unchecked
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  themeType?: "primary" | "secondary" | "tertiary";
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;
  animatedPress?: boolean; // if the checkbox should scale on press

  // DIMENSIONS
  customSize?: number; // single dimension for a square checkbox
  customRadius?: number | "factor"; // for rounding the corners
  roundedAllCorners?: boolean; // if true, applies full rounding

  // BACKGROUND COLORS
  // For unchecked state
  backgroundUnchecked?: { light?: string; dark?: string };
  iconColorUnchecked?: { light?: string; dark?: string };
  borderColorUnchecked?: { light?: string; dark?: string };

  // For checked state
  backgroundChecked?: { light?: string; dark?: string };
  iconColorChecked?: { light?: string; dark?: string };
  borderColorChecked?: { light?: string; dark?: string };

  // ICONS (CHECKMARK)
  // Default will be a standard "checkmark" icon if none provided
  iconName?:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof FontAwesome.glyphMap;
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
    internal?: number; // internal padding inside the box
    color?: { light?: string; dark?: string };
  };

  // LOADING STATE
  loading?: {
    isLoading: boolean;
    color?: string;
  };
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedCheckBox: React.FC<ThemedCheckBoxProps> = ({
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
  customRadius = 4,
  roundedAllCorners = false,

  // BACKGROUND COLORS
  backgroundUnchecked = {},
  iconColorUnchecked = {},
  borderColorUnchecked = {},
  backgroundChecked = {},
  iconColorChecked = {},
  borderColorChecked = {},

  // ICONS
  iconName,
  iconLibrary = "Ionicons",
  iconSize = 16, // slightly smaller than the box

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
    return `${base}${
      theme.charAt(0).toUpperCase() + theme.slice(1)
    }` as ThemeColorType;
  };

  const isChecked = value;
  const isDisabled = disabled || loading.isLoading;

  // ############################################################################
  // COLORS
  // ############################################################################

  // UNCHECKED COLORS
  const uncheckedBgColor = useThemeColor(
    backgroundUnchecked,
    getColorKey("checkBoxBackground", themeType)
  );

  const uncheckedIconColor = useThemeColor(
    iconColorUnchecked,
    getColorKey("checkBoxIconColor", themeType)
  );

  const uncheckedBorderColorResolved = useThemeColor(
    borderColorUnchecked,
    getColorKey("checkBoxBorderColor", themeType)
  );

  // CHECKED COLORS
  const checkedBgColor = useThemeColor(
    backgroundChecked,
    getColorKey("checkBoxCheckedBackground", themeType)
  );

  const checkedIconColor = useThemeColor(
    iconColorChecked,
    getColorKey("checkBoxCheckedIconColor", themeType)
  );

  const checkedBorderColorResolved = useThemeColor(
    borderColorChecked,
    getColorKey("checkBoxCheckedBorderColor", themeType)
  );

  // DISABLED COLORS
  const disabledBgColor = useThemeColor(
    {},
    getColorKey("checkBoxDisabledBackground", themeType)
  );

  const disabledIconColor = useThemeColor(
    {},
    getColorKey("checkBoxDisabledIconColor", themeType)
  );

  const disabledBorderColor = useThemeColor(
    {},
    getColorKey("checkBoxDisabledBorderColor", themeType)
  );

  // CHOSEN COLORS BASED ON STATE
  const currentBgColor = isDisabled
    ? disabledBgColor
    : isChecked
    ? checkedBgColor
    : uncheckedBgColor;

  const currentIconColor = isDisabled
    ? disabledIconColor
    : isChecked
    ? checkedIconColor
    : uncheckedIconColor;

  const currentBorderColor = isDisabled
    ? disabledBorderColor
    : isChecked
    ? checkedBorderColorResolved
    : uncheckedBorderColorResolved;

  // ############################################################################
  // BORDERS
  // ############################################################################
  const { width: borderWidth = 1, style: borderStyle = "solid" } = borders;

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
    getColorKey("checkBoxShadowColor", themeType)
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
    getColorKey("checkBoxPaddingColor", themeType)
  );

  // ############################################################################
  // LOADING
  // ############################################################################
  const resolvedLoadingColor = loading.color
    ? loading.color
    : useThemeColor({}, getColorKey("checkBoxLoadingColor", themeType));

  // ############################################################################
  // DIMENSIONS
  // ############################################################################
  const effectiveBorderRadius = roundedAllCorners
    ? customSize / 2
    : customRadius === "factor"
    ? customSize / 2
    : customRadius ?? 4;

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
  // ICON
  // ############################################################################
  const defaultIconName = iconName || (isChecked ? "checkmark" : "");
  // If not checked, we might show no icon. Or you can choose a faint icon for unchecked state.
  // Let's show no icon when unchecked.
  const showIcon = isChecked && defaultIconName !== "";

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
        ) : (
          showIcon && (
            <ThemedIcon
              iconName={defaultIconName as keyof typeof Ionicons.glyphMap}
              iconLibrary={iconLibrary}
              size={iconSize}
              color={currentIconColor}
            />
          )
        )}
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

export default React.memo(ThemedCheckBox);
