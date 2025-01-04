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
  ImageSourcePropType,
  ImageBackground,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedIcon from "../icons/ThemedIcon";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

/* ================================================================== */
/* THEME COLOR TYPE
   Here we define all possible color keys for ThemedImageButton props. */
/* ================================================================== */
type ThemeColorType =
  // DISABLED
  | "imageButtonDisabledBackgroundPrimary"
  | "imageButtonDisabledTextPrimary"
  | "imageButtonDisabledBackgroundSecondary"
  | "imageButtonDisabledTextSecondary"
  | "imageButtonDisabledBackgroundTertiary"
  | "imageButtonDisabledTextTertiary"

  // BACKGROUND
  | "imageButtonBackgroundPrimary"
  | "imageButtonBackgroundSecondary"
  | "imageButtonBackgroundTertiary"

  // TEXT
  | "imageButtonTextPrimary"
  | "imageButtonTextSecondary"
  | "imageButtonTextTertiary"

  // ICON
  | "imageButtonIconColorPrimary"
  | "imageButtonIconColorSecondary"
  | "imageButtonIconColorTertiary"

  // BORDERS
  | "imageButtonBorderColorPrimary"
  | "imageButtonBorderColorSecondary"
  | "imageButtonBorderColorTertiary"

  // SHADOWS
  | "imageButtonShadowColorPrimary"
  | "imageButtonShadowColorSecondary"
  | "imageButtonShadowColorTertiary"

  // PADDING
  | "imageButtonPaddingColorPrimary"
  | "imageButtonPaddingColorSecondary"
  | "imageButtonPaddingColorTertiary"

  // LOADING SPINNER
  | "imageButtonLoadingColorPrimary"
  | "imageButtonLoadingColorSecondary"
  | "imageButtonLoadingColorTertiary";

/* ================================================================== */
/* SUPPORTED ICON LIBRARIES */
/* ================================================================== */
type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

/* ================================================================== */
/* COMPONENT PROPS */
/* ================================================================== */
export interface ThemedImageButtonProps {
  /* FUNCTIONALITY */
  title?: string;                     // Button label
  children?: React.ReactNode;         // Alternative to title
  onPress: () => void;                // Press callback
  disabled?: boolean;                 // Disable the button
  style?: StyleProp<ViewStyle>;       // Custom outer styles
  themeType?: "primary" | "secondary" | "tertiary";
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;

  /* DIMENSIONS */
  customHeight?: number;
  customWidth?: number;
  customRadius?: number | "factor";
  roundedAllCorners?: boolean;

  /* ANIMATION */
  animatedPress?: boolean;

  /* DISABLED */
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

  /* BACKGROUND IMAGE */
  imageSource?: ImageSourcePropType; // The background image for the button

  /* TEXT */
  text?: {
    style?: TextStyle;
    color?: {
      light?: string;
      dark?: string;
    };
  };

  /* ICONS */
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

  /* BORDERS */
  borders?: {
    color?: { light?: string; dark?: string };
    width?: number;
    style?: "solid" | "dashed" | "dotted";
  };

  /* SHADOWS */
  shadows?: {
    color?: string;
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  };

  /* PADDING */
  padding?: {
    internal?: number;
    color?: { light?: string; dark?: string };
  };

  /* LOADING */
  loading?: {
    isLoading: boolean;
    text?: string;
    color?: string;
  };
}

/* ================================================================== */
/* MAIN COMPONENT */
/* ================================================================== */
const ThemedImageButton: React.FC<ThemedImageButtonProps> = ({
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

  // BACKGROUND IMAGE
  imageSource,

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
  /* ================================================================== */
  /* HELPER FUNCTIONS */
  /* ================================================================== */
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType;
  };

  /* ================================================================== */
  /* DISABLED COLORS */
  /* ================================================================== */
  const { colors: disabledColors = {}, style: disabledCustomStyle = {} } =
    disabledStyles;

  const disabledBackgroundColor = useThemeColor(
    {
      light: disabledColors.light?.background,
      dark: disabledColors.dark?.background,
    },
    getColorKey("imageButtonDisabledBackground", themeType)
  );

  const disabledTextColor = useThemeColor(
    {
      light: disabledColors.light?.text,
      dark: disabledColors.dark?.text,
    },
    getColorKey("imageButtonDisabledText", themeType)
  );

  /* ================================================================== */
  /* TEXT COLORS */
  /* ================================================================== */
  const { style: textStyle = {}, color: textColors = {} } = text;
  const textColor = useThemeColor(
    {
      light: textColors.light,
      dark: textColors.dark,
    },
    getColorKey("imageButtonText", themeType)
  );

  /* ================================================================== */
  /* BORDERS */
  /* ================================================================== */
  const {
    color: borderColor = {},
    width: borderWidth = 0,
    style: borderStyle = "solid",
  } = borders;

  const resolvedBorderColor = useThemeColor(
    borderColor,
    getColorKey("imageButtonBorderColor", themeType)
  );

  /* ================================================================== */
  /* SHADOWS */
  /* ================================================================== */
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
    getColorKey("imageButtonShadowColor", themeType)
  );

  const shadowStyle = {
    shadowColor: resolvedShadowColor,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };

  /* ================================================================== */
  /* PADDING */
  /* ================================================================== */
  const {
    internal: customInternalPadding = 10,
    color: customPaddingColor = {},
  } = padding;

  const paddingColor = useThemeColor(
    {
      light: customPaddingColor.light,
      dark: customPaddingColor.dark,
    },
    getColorKey("imageButtonPaddingColor", themeType)
  );

  /* ================================================================== */
  /* LOADING SPINNER */
  /* ================================================================== */
  const resolvedLoadingColor = loading.color
    ? loading.color
    : useThemeColor({}, getColorKey("imageButtonLoadingColor", themeType));

  /* ================================================================== */
  /* DIMENSIONS & RADIUS */
  /* ================================================================== */
  const effectiveBorderRadius = roundedAllCorners
    ? customHeight / 2
    : customRadius === "factor"
    ? customHeight / 2
    : customRadius ?? 8;

  /* ================================================================== */
  /* ANIMATION (PRESS SCALE) */
  /* ================================================================== */
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (!disabled && !loading.isLoading) {
      if (hapticFeedbackStyle) {
        Haptics.impactAsync(hapticFeedbackStyle);
      }
      onPress();
    }
  };

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

  /* ================================================================== */
  /* TEXT & ICON ELEMENTS */
  /* ================================================================== */
  let textElement: React.ReactNode = null;
  if (title) {
    textElement = (
      <Text
        style={[
          styles.text,
          { color: disabled ? disabledTextColor : textColor },
          textStyle,
        ]}
      >
        {title}
      </Text>
    );
  } else if (children) {
    // If children is passed, that supersedes title
    textElement = children;
  }

  const {
    iconName,
    iconLibrary,
    iconPosition = "left",
    iconSize = 20,
    iconPadding = {},
  } = icons ?? {};

  let iconElement: React.ReactNode = null;
  let iconContainerStyle: StyleProp<ViewStyle> = {};
  let contentFlexStyle: StyleProp<ViewStyle> = {};

  if (iconName) {
    iconElement = (
      <ThemedIcon
        iconName={iconName}
        iconLibrary={iconLibrary || "Ionicons"}
        size={iconSize}
        color={disabled ? disabledTextColor : textColor}
      />
    );

    // Decide container margin based on icon position
    switch (iconPosition) {
      case "left":
        iconContainerStyle = {
          marginRight: textElement ? iconPadding.right ?? 8 : 0,
        };
        break;
      case "right":
        iconContainerStyle = {
          marginLeft: textElement ? iconPadding.left ?? 8 : 0,
        };
        break;
      case "top":
        iconContainerStyle = {
          marginBottom: textElement ? iconPadding.bottom ?? 8 : 0,
        };
        break;
      case "bottom":
        iconContainerStyle = {
          marginTop: textElement ? iconPadding.top ?? 8 : 0,
        };
        break;
      default:
        iconContainerStyle = { marginRight: textElement ? 8 : 0 };
    }
  }

  // Decide row/column layout based on icon position
  switch (iconPosition) {
    case "left":
      contentFlexStyle = styles.row;
      break;
    case "right":
      contentFlexStyle = styles.rowReverse;
      break;
    case "top":
      contentFlexStyle = styles.column;
      break;
    case "bottom":
      contentFlexStyle = styles.columnReverse;
      break;
    default:
      contentFlexStyle = styles.row;
  }

  /* ================================================================== */
  /* RENDER COMPONENT */
  /* ================================================================== */
  return (
    <Animated.View
      style={[
        shadowStyle,
        style,
        {
          height: customHeight,
          width: customWidth,
  
          // 1) Remove any undesired background color or set it to "transparent"
          backgroundColor: disabled ? disabledBackgroundColor : "transparent",
  
          borderRadius: effectiveBorderRadius,
          borderColor: disabled ? "transparent" : resolvedBorderColor,
          borderWidth: disabled ? 0 : borderWidth,
          borderStyle: borderStyle,
  
          // 2) Hide any content that goes outside the container's rounded corners
          overflow: "hidden", // IMPORTANT
  
          transform: [{ scale: animatedPress ? scaleAnim : 1 }],
        },
      ]}
    >
      {/* Use ImageBackground instead of a plain View to fill entire area */}
      <ImageBackground
        source={imageSource} // Your image prop
        style={{ flex: 1 }}
        resizeMode="cover" // 3) Ensures the image covers the whole container
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
              // 4) Also set the same borderRadius if needed
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
              {loading.text ? (
                <Text
                  style={[
                    styles.text,
                    { color: textColor },
                    textStyle,
                  ]}
                >
                  {loading.text}
                </Text>
              ) : null}
            </View>
          ) : (
            <View style={contentFlexStyle}>
              {iconElement && (
                <View style={textElement ? iconContainerStyle : styles.iconOnly}>
                  {iconElement}
                </View>
              )}
              {textElement && <View>{textElement}</View>}
            </View>
          )}
        </TouchableOpacity>
      </ImageBackground>
    </Animated.View>
  );
};

/* ================================================================== */
/* STYLESHEET */
/* ================================================================== */
const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 8,
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
  iconOnly: {
    // No margin needed if there's no text
  },
});

export default React.memo(ThemedImageButton);
