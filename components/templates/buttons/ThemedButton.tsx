// components/ThemedButton.tsx

import React from "react";
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

////////////////////////////////////////////////////////////////////////////////
// INTERFACES
////////////////////////////////////////////////////////////////////////////////

/**
 * Define all possible color keys in ThemedButtonColors.ts
 * These should match your color configuration (e.g., ThemedButtonColors).
 */
type ThemeColorType =
  // DISABLED
  | "buttonDisabledBackgroundPrimary"
  | "buttonDisabledTextPrimary"
  | "buttonDisabledBackgroundSecondary"
  | "buttonDisabledTextSecondary"
  | "buttonDisabledBackgroundTertiary"
  | "buttonDisabledTextTertiary"

  // BACKGROUND
  | "buttonBackgroundPrimary"
  | "buttonBackgroundSecondary"
  | "buttonBackgroundTertiary"

  // TEXT
  | "buttonTextPrimary"
  | "buttonTextSecondary"
  | "buttonTextTertiary"

  // ICON
  | "buttonIconColorPrimary"
  | "buttonIconColorSecondary"
  | "buttonIconColorTertiary"

  // BORDERS
  | "buttonBorderColorPrimary"
  | "buttonBorderColorSecondary"
  | "buttonBorderColorTertiary"

  // SHADOWS
  | "buttonShadowColorPrimary"
  | "buttonShadowColorSecondary"
  | "buttonShadowColorTertiary"

  // PADDING
  | "buttonPaddingColorPrimary"
  | "buttonPaddingColorSecondary"
  | "buttonPaddingColorTertiary"

  // LOADING SPINNER
  | "buttonLoadingColorPrimary"
  | "buttonLoadingColorSecondary"
  | "buttonLoadingColorTertiary";

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

/**
 * Props interface for ThemedButton
 */
export interface ThemedButtonProps {
  // FUNCTIONALITY
  /** The label for the button */
  title?: string;
  /** Alternative to title */
  children?: React.ReactNode;
  /** Callback when the button is pressed */
  onPress: () => void;
  /** Disable the button */
  disabled?: boolean;
  /** Custom styles for the button */
  style?: StyleProp<ViewStyle>;
  /** Theme type to apply (primary, secondary, tertiary) */
  themeType?: "primary" | "secondary" | "tertiary";
  /** Haptic feedback style on press */
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;

  // DIMENSIONS
  /** Custom height for the button */
  customHeight?: number;
  /** Custom width for the button */
  customWidth?: number;
  /** Custom border radius for the button */
  customRadius?: number | "factor";
  /** Whether to round all corners */
  roundedAllCorners?: boolean;

  // ANIMATION
  /** Enable press animation */
  animatedPress?: boolean;

  // DISABLED
  /** Custom styles and colors when the button is disabled */
  disabledStyles?: {
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

  // BACKGROUND
  /** Custom background colors */
  background?: {
    light?: string;
    dark?: string;
  };

  // TEXT
  /** Custom text styles and colors */
  text?: {
    style?: TextStyle;
    color?: {
      light?: string;
      dark?: string;
    };
  };

  // ICONS
  /** Configuration for icons within the button */
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
  /** Custom border styles */
  borders?: {
    color?: { light?: string; dark?: string };
    width?: number;
    style?: "solid" | "dashed" | "dotted";
  };

  // SHADOWS
  /** Custom shadow styles */
  shadows?: {
    color?: string;
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  };

  // PADDING
  /** Custom padding styles */
  padding?: {
    internal?: number;
    color?: { light?: string; dark?: string };
  };

  // LOADING
  /** Loading state configurations */
  loading?: {
    isLoading: boolean; // Indicates if the button is in loading state
    text?: string; // Text to display during loading
    color?: string; // Optional: Override the loading spinner color
  };
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

/**
 * ThemedButton
 *
 * A themed and animated button component that adapts to the current theme.
 * It supports custom icons, loading states, animations, and extensive styling options.
 *
 * @param {ThemedButtonProps} props - Props for configuring the button.
 * @returns {React.ReactElement} The themed button component.
 */
const ThemedButton: React.FC<ThemedButtonProps> = ({
  // FUNCTIONALITY
  title,
  children,
  onPress,
  disabled = false,
  style,
  themeType = "primary",
  hapticFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,

  // DIMENSIONS
  customHeight = 50,
  customWidth = 200,
  roundedAllCorners = false,
  customRadius = 8,

  // ANIMATION
  animatedPress = false,

  // DISABLED
  disabledStyles = {},

  // BACKGROUND
  background = {},

  // TEXT
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
  //////////////////////////////////////////////////////////////////////////////
  // HELPERS
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Helper: Generate color key from base + themeType
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

  // DISABLED COLORS
  const { colors: disabledColors = {}, style: disabledCustomStyle = {} } =
    disabledStyles;

  const disabledBackgroundColor = useThemeColor(
    {
      light: disabledColors.light?.background,
      dark: disabledColors.dark?.background,
    },
    getColorKey("buttonDisabledBackground", themeType)
  );

  const disabledTextColor = useThemeColor(
    {
      light: disabledColors.light?.text,
      dark: disabledColors.dark?.text,
    },
    getColorKey("buttonDisabledText", themeType)
  );

  // BACKGROUND COLOR
  const backgroundColor = useThemeColor(
    {
      light: background.light,
      dark: background.dark,
    },
    getColorKey("buttonBackground", themeType)
  );

  // TEXT COLOR
  const { style: textStyle = {}, color: textColors = {} } = text;

  const textColor = useThemeColor(
    {
      light: textColors.light,
      dark: textColors.dark,
    },
    getColorKey("buttonText", themeType)
  );

  // NOTE: Always call the icon hook; then conditionally use it:
  const resolvedIconColor = useThemeColor(
    {},
    getColorKey("buttonIconColor", themeType)
  );
  const iconColor = disabled ? disabledTextColor : resolvedIconColor;

  // BORDERS
  const {
    color: borderColor = {},
    width: borderWidth = 0,
    style: borderStyle = "solid",
  } = borders;

  const resolvedBorderColor = useThemeColor(
    borderColor,
    getColorKey("buttonBorderColor", themeType)
  );

  // SHADOWS
  const {
    color: shadowColor,
    offset = { width: 0, height: 2 },
    opacity = 0.2,
    radius = 4,
    elevation = 5,
  } = shadows;

  const resolvedShadowColor = useThemeColor(
    {
      light: shadowColor,
      dark: shadowColor,
    },
    getColorKey("buttonShadowColor", themeType)
  );

  const shadowStyle = {
    shadowColor: resolvedShadowColor,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };

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
    getColorKey("buttonPaddingColor", themeType)
  );

  // LOADING SPINNER COLOR
  const resolvedLoadingColor = loading.color
    ? loading.color
    : useThemeColor({}, getColorKey("buttonLoadingColor", themeType));

  //////////////////////////////////////////////////////////////////////////////
  // DIMENSIONS
  //////////////////////////////////////////////////////////////////////////////

  const effectiveBorderRadius = roundedAllCorners
    ? customHeight / 2 // Apply full rounding
    : customRadius === "factor"
    ? customHeight / 2 // Factor logic for pill shape
    : customRadius ?? 8; // Default to 8

  //////////////////////////////////////////////////////////////////////////////
  // ANIMATION
  //////////////////////////////////////////////////////////////////////////////

  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  /**
   * Handles the press action.
   * Triggers haptic feedback and the onPress callback if not disabled or loading.
   */
  const handlePress = () => {
    if (!disabled && !loading.isLoading) {
      if (hapticFeedbackStyle) {
        Haptics.impactAsync(hapticFeedbackStyle);
      }
      onPress();
    }
  };

  /**
   * Handles the press-in animation.
   */
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

  /**
   * Handles the press-out animation.
   */
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

  //////////////////////////////////////////////////////////////////////////////
  // TEXT ELEMENT
  //////////////////////////////////////////////////////////////////////////////

  let textElement: React.ReactNode = null;

  if (title) {
    textElement = (
      <Text
        style={[
          styles.text,
          {
            color: disabled ? disabledTextColor : textColor,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    );
  }

  if (children) {
    textElement = children;
  }

  //////////////////////////////////////////////////////////////////////////////
  // ICON ELEMENT
  //////////////////////////////////////////////////////////////////////////////

  const {
    iconName,
    iconLibrary,
    iconPosition = "left",
    iconSize = 20,
    iconPadding = {},
  } = icons ?? {};

  let iconElement: React.ReactNode = null;
  let contentStyle: StyleProp<ViewStyle> = {};
  let iconContainerStyle: StyleProp<ViewStyle> = {};
  let textContainerStyle: StyleProp<ViewStyle> = {};

  if (iconName) {
    iconElement = (
      <ThemedIcon
        iconName={iconName}
        iconLibrary={iconLibrary || "Ionicons"}
        size={iconSize}
        color={iconColor}
      />
    );

    switch (iconPosition) {
      case "left":
        iconContainerStyle = {
          marginRight: textElement ? iconPadding.right ?? 0 : 0,
        };
        break;
      case "right":
        iconContainerStyle = {
          marginLeft: textElement ? iconPadding.left ?? 0 : 0,
        };
        break;
      case "top":
        iconContainerStyle = {
          marginBottom: textElement ? iconPadding.bottom ?? 0 : 0,
        };
        break;
      case "bottom":
        iconContainerStyle = {
          marginTop: textElement ? iconPadding.top ?? 0 : 0,
        };
        break;
      default:
        iconContainerStyle = { marginRight: textElement ? 0 : 0 };
    }
  }

  if (textElement) {
    switch (iconPosition) {
      case "left":
      case "right":
        textContainerStyle = {};
        break;
      case "top":
      case "bottom":
        textContainerStyle = {};
        break;
      default:
        textContainerStyle = {};
    }
  }

  switch (iconPosition) {
    case "left":
      contentStyle = styles.row;
      break;
    case "right":
      contentStyle = styles.rowReverse;
      break;
    case "top":
      contentStyle = styles.column;
      break;
    case "bottom":
      contentStyle = styles.columnReverse;
      break;
    default:
      contentStyle = styles.row;
  }

  //////////////////////////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////////////////////////

  return (
    <Animated.View
      style={[
        shadowStyle,
        style,
        {
          height: customHeight,
          width: customWidth,
          backgroundColor: disabled
            ? disabledBackgroundColor
            : backgroundColor,
          borderRadius: effectiveBorderRadius,
          borderColor: disabled ? "transparent" : resolvedBorderColor,
          borderWidth: disabled ? 0 : borderWidth,
          borderStyle: borderStyle,
          transform: [{ scale: animatedPress ? scaleAnim : 1 }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled || loading.isLoading}
        style={[
          styles.button,
          disabledCustomStyle,
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: customInternalPadding,
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
                    color: textColor,
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
            {textElement && (
              <View style={styles.textSpacing}>{textElement}</View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

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
    marginRight: 8, // Space between spinner and text
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
  iconOnly: {
    // No margin when there is only an icon
  },
  textSpacing: {
    // Can add additional spacing if needed
  },
});

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////

export default React.memo(ThemedButton);
