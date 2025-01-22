import React from "react";
import {
  Text,
  StyleSheet,
  TextProps,
  TextStyle,
  StyleProp,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 * We enumerate each text type (default, title, defaultSemiBold, subtitle, link)
 * combined with primary, secondary, tertiary.
 */
type ThemeColorType =
  | "textDefaultPrimary"
  | "textDefaultSecondary"
  | "textDefaultTertiary"
  | "textTitlePrimary"
  | "textTitleSecondary"
  | "textTitleTertiary"
  | "textDefaultSemiBoldPrimary"
  | "textDefaultSemiBoldSecondary"
  | "textDefaultSemiBoldTertiary"
  | "textSubtitlePrimary"
  | "textSubtitleSecondary"
  | "textSubtitleTertiary"
  | "textLinkPrimary"
  | "textLinkSecondary"
  | "textLinkTertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 */
export interface ThemedTextProps extends TextProps {
  /**
   * The variant/type of text style to apply.
   */
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";

  /**
   * Which theme color set (primary, secondary, tertiary).
   */
  themeType?: "primary" | "secondary" | "tertiary";

  /**
   * Optional color override (light/dark).
   */
  color?: { light?: string; dark?: string };

  /**
   * Horizontal alignment: left, right, center, justify...
   * @default "center"
   */
  textAlign?: TextStyle["textAlign"];

  /**
   * Overall margin around the text (all sides).
   * @default 4
   */
  margin?: number;

  /**
   * Overall padding around the text (all sides).
   * @default 4
   */
  padding?: number;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 * Applies:
 * 1) The appropriate text style from our internal styles (fontSize, weight, etc.).
 * 2) The theme-based color, fallback to user override if provided.
 * 3) Additional user-specified textAlign, margin, padding with sensible defaults.
 */
export function ThemedText({
  style,
  type = "default",
  themeType = "primary",
  color = {}, // default to empty object => no undefined
  textAlign = "center",
  margin = 4,
  padding = 4,
  ...rest
}: ThemedTextProps) {
  // 1) Build the color key
  const getColorKey = (
    textVariant: "default" | "title" | "defaultSemiBold" | "subtitle" | "link",
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    // e.g. textDefaultPrimary, textTitleSecondary, etc.
    const base = `text${capitalize(textVariant)}`;
    return `${base}${capitalize(variant)}` as ThemeColorType;
  };

  // 2) Helper to capitalize the first letter
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const colorKey = getColorKey(type, themeType);
  // 3) Resolve text color via theme
  const resolvedColor = useThemeColor(color, colorKey);

  /**
   * Build a "base style" for alignment/margins/padding.
   * The user can still override via the final `style` prop.
   */
  const baseLayoutStyle: StyleProp<TextStyle> = {
    textAlign,
    margin,
    padding,
  };

  return (
    <Text
      style={[
        // Step 1) apply variant style
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        // Step 2) apply base layout style (alignment, margin, padding)
        baseLayoutStyle,
        // Step 3) apply color & user style
        { color: resolvedColor },
        style,
      ]}
      {...rest}
    />
  );
}

/**
 * -----------------------------------------------------------------------------
 * INTERNAL STYLES
 * -----------------------------------------------------------------------------
 */
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
  },
});
