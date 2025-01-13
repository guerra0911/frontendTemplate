import React from "react";
import { Animated, StyleSheet, I18nManager, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 * We can let ThemedAnimatedText just reuse the 'textDefaultXxx' pattern or create
 * a separate enumeration. Let's do a separate enumeration for clarity, e.g.
 * animatedTextPrimary, etc.
 */
type ThemeColorType =
  | "animatedTextPrimary"
  | "animatedTextSecondary"
  | "animatedTextTertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 */
export interface ThemedAnimatedTextProps
  extends React.ComponentProps<typeof Animated.Text> {
  /**
   * Overridable color as { light?: string; dark?: string }, else fallback to theme.
   */
  color?: { light?: string; dark?: string };

  /**
   * If you want to pick a color set (primary, secondary, tertiary).
   */
  themeType?: "primary" | "secondary" | "tertiary";

  style?: TextStyle | TextStyle[];
  testID?: string;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 * A minimal AnimatedText that uses your theming approach
 * for text color, plus standard styling props.
 */
const ThemedAnimatedText: React.FC<ThemedAnimatedTextProps> = ({
  color = {}, // default to empty => no undefined
  themeType = "primary",
  style,
  testID = "themed-animated-text",
  ...rest
}) => {
  // 1) Build color key, e.g. "animatedTextPrimary"
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${capitalize(variant)}` as ThemeColorType;
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const colorKey = getColorKey("animatedText", themeType);

  // 2) Resolve color via theme
  const resolvedColor = useThemeColor(color, colorKey);

  // 3) For RTL support
  const writingDirection = I18nManager.isRTL ? "rtl" : "ltr";

  return (
    <Animated.Text
      testID={testID}
      {...rest}
      style={[
        styles.default,
        { color: resolvedColor, writingDirection },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    textAlign: "left",
  },
});

export default React.memo(ThemedAnimatedText);
