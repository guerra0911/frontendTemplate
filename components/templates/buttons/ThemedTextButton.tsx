import React from "react";
import * as Haptics from "expo-haptics";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Define all possible color keys for ThemedTextButton.
 * These should match whatever you configure in your color template (e.g. ThemedTextButtonColors).
 */
type ThemeColorType =
  // DISABLED
  | "textButtonDisabledTextPrimary"
  | "textButtonDisabledTextSecondary"
  | "textButtonDisabledTextTertiary"

  // TEXT
  | "textButtonTextPrimary"
  | "textButtonTextSecondary"
  | "textButtonTextTertiary"

  // LOADING
  | "textButtonLoadingColorPrimary"
  | "textButtonLoadingColorSecondary"
  | "textButtonLoadingColorTertiary";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

export interface ThemedTextButtonProps {
  // FUNCTIONALITY
  onPress: () => void;
  disabled?: boolean;
  themeType?: "primary" | "secondary" | "tertiary";
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;

  // TEXT
  title?: string;             // The label for the text button
  children?: React.ReactNode; // Alternative to title
  style?: StyleProp<TextStyle>; // Custom text styling
  text?: {
    style?: TextStyle;
    color?: {
      light?: string;
      dark?: string;
    };
  };

  /**
   * Optional: specify a font size. If also specified in `style` or `textStyle`,
   * whichever is last in the array will override.
   */
  fontSize?: number;

  // ANIMATION
  animatedPress?: boolean; // Whether the button scales on press

  // LOADING
  loading?: {
    isLoading: boolean; // Indicates if the button is in loading state
    text?: string;      // Text to display during loading
    color?: string;     // Optional: override the loading spinner color
  };
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedTextButton: React.FC<ThemedTextButtonProps> = ({
  // FUNCTIONALITY
  onPress,
  disabled = false,
  themeType = "primary",
  hapticFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,

  // TEXT
  title,
  children,
  style,
  text = {},

  // Optional font size
  fontSize,

  // ANIMATION
  animatedPress = false,

  // LOADING
  loading = {
    isLoading: false,
    text: "",
    color: "",
  },
}) => {
  // ############################################################################
  // HELPER: generate color key from base + themeType
  // ############################################################################
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${
      theme.charAt(0).toUpperCase() + theme.slice(1)
    }` as ThemeColorType;
  };

  // ############################################################################
  // DISABLED & REGULAR TEXT COLOR
  // ############################################################################
  const { style: textStyle = {}, color: textColors = {} } = text;

  const disabledTextColor = useThemeColor(
    {},
    getColorKey("textButtonDisabledText", themeType)
  );

  const resolvedTextColor = useThemeColor(
    {
      light: textColors.light,
      dark: textColors.dark,
    },
    getColorKey("textButtonText", themeType)
  );

  // ############################################################################
  // LOADING
  // ############################################################################
  const resolvedLoadingColor = loading.color
    ? loading.color
    : useThemeColor({}, getColorKey("textButtonLoadingColor", themeType));

  // ############################################################################
  // ANIMATION
  // ############################################################################
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

  // ############################################################################
  // TEXT ELEMENT
  // ############################################################################
  let textElement: React.ReactNode = null;

  // Common style array for main text
  const combinedTextStyle = StyleSheet.flatten([
    styles.text,
    {
      color: disabled ? disabledTextColor : resolvedTextColor,
      ...(fontSize && { fontSize }),
    },
    textStyle,
    style,
  ]);

  if (title) {
    textElement = <Text style={combinedTextStyle}>{title}</Text>;
  } else if (children) {
    textElement = <Text style={combinedTextStyle}>{children}</Text>;
  }

  // ############################################################################
  // RENDER
  // ############################################################################
  return (
    <Animated.View
      style={{
        transform: [{ scale: animatedPress ? scaleAnim : 1 }],
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled || loading.isLoading}
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
                  combinedTextStyle,
                  // If the user wants a custom loading text, use fontSize:
                  // (We already have it in combinedTextStyle above).
                ]}
              >
                {loading.text}
              </Text>
            ) : null}
          </View>
        ) : (
          textElement
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
    // You can define a default fontSize here if desired, for example:
    // fontSize: 16,
    includeFontPadding: false,
    textAlignVertical: "center",
    margin: 0,
    padding: 0,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingIndicator: {
    marginRight: 8, // Space between spinner and text
  },
});

// ################################################################################
// EXPORT
// ################################################################################

export default React.memo(ThemedTextButton);
