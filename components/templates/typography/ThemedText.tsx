import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
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
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 * Applies:
 * 1) The appropriate text style from our internal styles (fontSize, weight, etc.).
 * 2) The theme-based color, fallback to user override if provided.
 */
export function ThemedText({
  style,
  type = "default",
  themeType = "primary",
  color = {}, // default to empty object => no undefined
  ...rest
}: ThemedTextProps) {
  // 1) Build the color key, e.g. "textDefaultPrimary" if type="default" & themeType="primary".
  const getColorKey = (
    textVariant: "default" | "title" | "defaultSemiBold" | "subtitle" | "link",
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    /**
     * e.g. textDefaultPrimary, textTitleSecondary, etc.
     */
    const base = `text${capitalize(textVariant)}`;
    return `${base}${capitalize(variant)}` as ThemeColorType;
  };

  // 2) Helper to capitalize the first letter
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const colorKey = getColorKey(type, themeType);
  // 3) Resolve text color via theme
  const resolvedColor = useThemeColor(color, colorKey);

  return (
    <Text
      style={[
        { color: resolvedColor },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
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
 * These define font size, weight, line height, etc. The *color* now comes from
 * the theme-based approach via `useThemeColor` with the relevant keys.
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
    // The color is determined by theme, but we can keep a fallback style if needed
  },
});
