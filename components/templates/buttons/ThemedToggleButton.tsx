import React, { useRef, useCallback } from "react";
import * as Haptics from "expo-haptics";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedIcon from "../icons/ThemedIcon";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

type ThemeColorType =
  // UNTOGGLED BACKGROUND/TEXT
  | "toggleButtonBackgroundPrimary"
  | "toggleButtonTextPrimary"
  | "toggleButtonIconColorPrimary"

  | "toggleButtonBackgroundSecondary"
  | "toggleButtonTextSecondary"
  | "toggleButtonIconColorSecondary"

  | "toggleButtonBackgroundTertiary"
  | "toggleButtonTextTertiary"
  | "toggleButtonIconColorTertiary"

  // TOGGLED BACKGROUND/TEXT (Inverted)
  | "toggleButtonToggledBackgroundPrimary"
  | "toggleButtonToggledTextPrimary"
  | "toggleButtonToggledIconColorPrimary"

  | "toggleButtonToggledBackgroundSecondary"
  | "toggleButtonToggledTextSecondary"
  | "toggleButtonToggledIconColorSecondary"

  | "toggleButtonToggledBackgroundTertiary"
  | "toggleButtonToggledTextTertiary"
  | "toggleButtonToggledIconColorTertiary"

  // DISABLED
  | "toggleButtonDisabledBackgroundPrimary"
  | "toggleButtonDisabledTextPrimary"
  | "toggleButtonDisabledIconColorPrimary"

  | "toggleButtonDisabledBackgroundSecondary"
  | "toggleButtonDisabledTextSecondary"
  | "toggleButtonDisabledIconColorSecondary"

  | "toggleButtonDisabledBackgroundTertiary"
  | "toggleButtonDisabledTextTertiary"
  | "toggleButtonDisabledIconColorTertiary"

  // BORDERS
  | "toggleButtonBorderColorPrimary"
  | "toggleButtonBorderColorSecondary"
  | "toggleButtonBorderColorTertiary"

  // SHADOWS
  | "toggleButtonShadowColorPrimary"
  | "toggleButtonShadowColorSecondary"
  | "toggleButtonShadowColorTertiary"

  // PADDING
  | "toggleButtonPaddingColorPrimary"
  | "toggleButtonPaddingColorSecondary"
  | "toggleButtonPaddingColorTertiary"

  // LOADING
  | "toggleButtonLoadingColorPrimary"
  | "toggleButtonLoadingColorSecondary"
  | "toggleButtonLoadingColorTertiary";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

export interface ThemedToggleButtonProps {
  // FUNCTIONALITY
  value: boolean; // Current toggle state
  onValueChange: (value: boolean) => void; // Callback on toggle
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  themeType?: "primary" | "secondary" | "tertiary";
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;
  animatedPress?: boolean; // Press animation

  // DIMENSIONS
  customHeight?: number;
  customWidth?: number;
  customRadius?: number | "factor";
  roundedAllCorners?: boolean;

  // BACKGROUND
  // For untoggled state
  backgroundUntoggled?: {
    light?: string;
    dark?: string;
  };
  textIconUntoggledColor?: {
    light?: string;
    dark?: string;
  };

  // For toggled state (inverted by default)
  backgroundToggled?: {
    light?: string;
    dark?: string;
  };
  textIconToggledColor?: {
    light?: string;
    dark?: string;
  };

  // TEXT
  title?: string;
  children?: React.ReactNode;
  text?: {
    style?: TextStyle;
  };

  // ICONS
  icons?: {
    iconName?:
      | keyof typeof Ionicons.glyphMap
      | keyof typeof MaterialIcons.glyphMap
      | keyof typeof FontAwesome.glyphMap;
    iconLibrary?: SupportedIconLibraries;
    iconPosition?: "left" | "right" | "top" | "bottom";
    iconSize?: number;
    iconPadding?: {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    };
  };

  // BORDERS
  borders?: {
    color?: { light?: string; dark?: string };
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
    text?: string;
    color?: string;
  };
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedToggleButton: React.FC<ThemedToggleButtonProps> = ({
  // FUNCTIONALITY
  value,
  onValueChange,
  disabled = false,
  style,
  themeType = "primary",
  hapticFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  animatedPress = false,

  // DIMENSIONS
  customHeight = 50,
  customWidth = 200,
  roundedAllCorners = false,
  customRadius = 8,

  // BACKGROUND
  backgroundUntoggled = {},
  textIconUntoggledColor = {},
  backgroundToggled = {},
  textIconToggledColor = {},

  // TEXT
  title,
  children,
  text = {},

  // ICONS
  icons = {},

  // BORDERS
  borders = {},

  // SHADOWS
  shadows = {},

  // PADDING
  padding = {},

  // LOADING
  loading = {
    isLoading: false,
    text: "",
    color: "",
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

  // ############################################################################
  // THEME COLORS
  // ############################################################################

  // If untoggled:
  // - background uses "toggleButtonBackground"
  // - text/icon use "toggleButtonText" and "toggleButtonIconColor"

  // If toggled:
  // - background uses "toggleButtonToggledBackground"
  // - text/icon use "toggleButtonToggledText" and "toggleButtonToggledIconColor"

  // DISABLED overrides all text/icon/background with disabled colors

  // UNTOGGLED COLORS
  const untoggledBackgroundColor = useThemeColor(
    backgroundUntoggled,
    getColorKey("toggleButtonBackground", themeType)
  );

  const untoggledTextColor = useThemeColor(
    textIconUntoggledColor,
    getColorKey("toggleButtonText", themeType)
  );

  const untoggledIconColor = useThemeColor(
    textIconUntoggledColor,
    getColorKey("toggleButtonIconColor", themeType)
  );

  // TOGGLED COLORS
  const toggledBackgroundColor = useThemeColor(
    backgroundToggled,
    getColorKey("toggleButtonToggledBackground", themeType)
  );

  const toggledTextColor = useThemeColor(
    textIconToggledColor,
    getColorKey("toggleButtonToggledText", themeType)
  );

  const toggledIconColor = useThemeColor(
    textIconToggledColor,
    getColorKey("toggleButtonToggledIconColor", themeType)
  );

  // DISABLED COLORS
  const disabledBackgroundColor = useThemeColor(
    {},
    getColorKey("toggleButtonDisabledBackground", themeType)
  );

  const disabledTextColor = useThemeColor(
    {},
    getColorKey("toggleButtonDisabledText", themeType)
  );

  const disabledIconColor = useThemeColor(
    {},
    getColorKey("toggleButtonDisabledIconColor", themeType)
  );

  // ############################################################################
  // CHOSEN COLORS BASED ON STATE
  // ############################################################################
  const isToggled = value;
  const isDisabled = disabled || loading.isLoading;

  const currentBackgroundColor = isDisabled
    ? disabledBackgroundColor
    : isToggled
    ? toggledBackgroundColor
    : untoggledBackgroundColor;

  const currentTextColor = isDisabled
    ? disabledTextColor
    : isToggled
    ? toggledTextColor
    : untoggledTextColor;

  const currentIconColor = isDisabled
    ? disabledIconColor
    : isToggled
    ? toggledIconColor
    : untoggledIconColor;

  // ############################################################################
  // TEXT ELEMENT
  // ############################################################################
  let textElement: React.ReactNode = null;
  const { style: textStyle = {} } = text;

  if (title) {
    textElement = (
      <Text
        style={[
          styles.text,
          {
            color: currentTextColor,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    );
  } else if (children) {
    textElement = (
      <Text
        style={[
          styles.text,
          {
            color: currentTextColor,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    );
  }

  // ############################################################################
  // ICONS
  // ############################################################################
  const {
    iconName,
    iconLibrary,
    iconPosition = "left",
    iconSize = 20,
    iconPadding = {},
  } = icons;

  let iconElement: React.ReactNode = null;

  if (iconName) {
    iconElement = (
      <ThemedIcon
        iconName={iconName}
        iconLibrary={iconLibrary || "Ionicons"}
        size={iconSize}
        color={currentIconColor}
      />
    );
  }

  // Arrange content based on iconPosition
  let contentStyle: StyleProp<ViewStyle> = {};
  let iconContainerStyle: StyleProp<ViewStyle> = {};
  // textElement spacing handled similarly to ThemedButton

  switch (iconPosition) {
    case "left":
      contentStyle = styles.row;
      if (iconElement) iconContainerStyle = { marginRight: textElement ? iconPadding.right ?? 8 : 0 };
      break;
    case "right":
      contentStyle = styles.rowReverse;
      if (iconElement) iconContainerStyle = { marginLeft: textElement ? iconPadding.left ?? 8 : 0 };
      break;
    case "top":
      contentStyle = styles.column;
      if (iconElement) iconContainerStyle = { marginBottom: textElement ? iconPadding.bottom ?? 8 : 0 };
      break;
    case "bottom":
      contentStyle = styles.columnReverse;
      if (iconElement) iconContainerStyle = { marginTop: textElement ? iconPadding.top ?? 8 : 0 };
      break;
    default:
      contentStyle = styles.row;
  }

  // ############################################################################
  // BORDERS
  // ############################################################################
  const {
    color: borderColor = {},
    width: borderWidth = 0,
    style: borderStyle = "solid",
  } = borders;

  const resolvedBorderColor = useThemeColor(
    borderColor,
    getColorKey("toggleButtonBorderColor", themeType)
  );

  // ############################################################################
  // SHADOWS
  // ############################################################################
  const {
    color: shadowColor,
    offset = { width: 0, height: 2 },
    opacity = 0.2,
    radius = 4,
    elevation = 5,
  } = shadows;

  const resolvedShadowColor = useThemeColor(
    { light: shadowColor, dark: shadowColor },
    getColorKey("toggleButtonShadowColor", themeType)
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
    internal: customInternalPadding = 10,
    color: customPaddingColor = {},
  } = padding;

  const paddingColor = useThemeColor(
    customPaddingColor,
    getColorKey("toggleButtonPaddingColor", themeType)
  );

  // ############################################################################
  // LOADING
  // ############################################################################
  const resolvedLoadingColor = loading.color
    ? loading.color
    : useThemeColor({}, getColorKey("toggleButtonLoadingColor", themeType));

  // ############################################################################
  // DIMENSIONS
  // ############################################################################
  const effectiveBorderRadius = roundedAllCorners
    ? customHeight / 2
    : customRadius === "factor"
    ? customHeight / 2
    : customRadius ?? 8;

  // ############################################################################
  // ANIMATION
  // ############################################################################
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      if (hapticFeedbackStyle) {
        Haptics.impactAsync(hapticFeedbackStyle);
      }
      // Toggle the value
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
  // RENDER
  // ############################################################################

  return (
    <Animated.View
      style={[
        shadowStyle,
        style,
        {
          height: customHeight,
          width: customWidth,
          backgroundColor: currentBackgroundColor,
          borderRadius: effectiveBorderRadius,
          borderColor: isDisabled ? "transparent" : resolvedBorderColor,
          borderWidth: isDisabled ? 0 : borderWidth,
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
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="small"
              color={resolvedLoadingColor}
              style={styles.loadingIndicator}
            />
            {loading.text && (
              <Text
                style={[
                  styles.text,
                  {
                    color: currentTextColor,
                  },
                  textStyle,
                ]}
              >
                {loading.text}
              </Text>
            )}
          </View>
        ) : (
          <View style={contentStyle}>
            {iconElement && (
              <View style={textElement ? iconContainerStyle : styles.iconOnly}>
                {iconElement}
              </View>
            )}
            {textElement && <View style={styles.textSpacing}>{textElement}</View>}
          </View>
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
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingIndicator: {
    marginRight: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowReverse: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  columnReverse: {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  iconOnly: {},
  textSpacing: {},
});

// ################################################################################
// EXPORT
// ################################################################################

export default React.memo(ThemedToggleButton);
