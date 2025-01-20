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
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedIcon from "../icons/ThemedIcon";
import ThemedActivityIndicator from "../loaders/ThemedActivityIndicator";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

////////////////////////////////////////////////////////////////////////////////
// INTERFACES
////////////////////////////////////////////////////////////////////////////////

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

export interface ThemedButtonProps {
  // FUNCTIONALITY
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  themeType?: "primary" | "secondary" | "tertiary";
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;

  // DIMENSIONS
  customHeight?: number;
  customWidth?: number;
  customRadius?: number | "factor";
  roundedAllCorners?: boolean;

  // ANIMATION
  animatedPress?: boolean;

  // NEW or UPDATED:
  /** Elevation for the button (shadows). Defaults to 0, can be animated on press. */
  elevation?: number;

  // DISABLED
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
  background?: {
    light?: string;
    dark?: string;
  };

  // TEXT
  text?: {
    style?: TextStyle;
    color?: {
      light?: string;
      dark?: string;
    };
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
    /** Keep this around, but it’ll be overridden if elevation is also set top-level. */
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

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

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

  // NEW or UPDATED:
  // default the top-level elevation to 0
  elevation = 0,

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

  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType;
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

  // ICON COLOR
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
    // renamed to avoid clashing with top-level `elevation`
    elevation: shadowElevation,
  } = shadows;

  // We use the top-level elevation if provided; otherwise, fallback to shadows.elevation or 0
  const baseElevation = elevation ?? shadowElevation ?? 0;

  const resolvedShadowColor = useThemeColor(
    {
      light: shadowColor,
      dark: shadowColor,
    },
    getColorKey("buttonShadowColor", themeType)
  );

  // NEW or UPDATED: create an Animated.Value for the elevation
  const elevationAnim = React.useRef(new Animated.Value(baseElevation)).current;

  const shadowStyle = {
    shadowColor: resolvedShadowColor,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    // IMPORTANT: apply the animated value here
    elevation: elevationAnim,
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
    ? customHeight / 2
    : customRadius === "factor"
    ? customHeight / 2
    : customRadius;

  //////////////////////////////////////////////////////////////////////////////
  // ANIMATION (scale + elevation)
  //////////////////////////////////////////////////////////////////////////////

  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  /**
   * Handle onPress
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
   * Handle press-in: if animated, slightly shrink and raise elevation
   */
  const onPressIn = () => {
    if (animatedPress && !disabled && !loading.isLoading) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(elevationAnim, {
          toValue: baseElevation + 2, // you can adjust how much you raise it on press
          duration: 100,
          useNativeDriver: false,
          easing: Easing.out(Easing.quad),
        }),
      ]).start();
    }
  };

  /**
   * Handle press-out: revert scale and elevation
   */
  const onPressOut = () => {
    if (animatedPress && !disabled && !loading.isLoading) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(elevationAnim, {
          toValue: baseElevation,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.out(Easing.quad),
        }),
      ]).start();
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
    // For demonstration, you could add more styling here if needed
    textContainerStyle = {};
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
          backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
          borderRadius: effectiveBorderRadius,
          borderColor: disabled ? "transparent" : resolvedBorderColor,
          borderWidth: disabled ? 0 : borderWidth,
          borderStyle: borderStyle,
          // also apply scale to the container
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
            <ThemedActivityIndicator
              animating={loading.isLoading}
              color={{
                light: resolvedLoadingColor,
                dark: resolvedLoadingColor,
              }}
              size={16}
              hidesWhenStopped
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
            {textElement && <View style={styles.textSpacing}>{textElement}</View>}
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

export default React.memo(ThemedButton);
