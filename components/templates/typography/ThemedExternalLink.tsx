import React from "react";
import { Platform, StyleProp, TextStyle, GestureResponderEvent } from "react-native";
import { Link, LinkProps } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 * Enumerates possible keys for "externalLinkColor" across primary, secondary,
 * tertiary in both light and dark mode.
 */
type ThemeColorType =
  | "externalLinkColorPrimary"
  | "externalLinkColorSecondary"
  | "externalLinkColorTertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 * We fix the href type by allowing either a string or LinkProps["href"] object.
 */
type FixedHref = LinkProps["href"] | string;

export interface ThemedExternalLinkProps
  extends Omit<LinkProps, "href" | "style" | "onPress"> {
  /**
   * The path or URL to navigate to. Can be a string, or an
   * object like { pathname: '/user/[id]', params: { id: 'bacon' } }.
   */
  href: FixedHref;

  /**
   * Theme color variant (primary, secondary, or tertiary).
   */
  themeType?: "primary" | "secondary" | "tertiary";

  /**
   * Optional color override. If not provided, defaults come from color file.
   */
  color?: { light?: string; dark?: string };

  /**
   * Additional style applied to the link text.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Custom onPress logic if needed. We also handle in-app browser launching.
   */
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
export function ThemedExternalLink({
  href,
  themeType = "primary",
  color = {}, // default to empty => no undefined
  style,
  onPress,
  ...rest
}: ThemedExternalLinkProps) {
  // Helper function to capitalize the first letter of a string.
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Builds color key, e.g., "externalLinkColorPrimary"
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${capitalize(variant)}` as ThemeColorType;
  };

  // Converts a fixed href (which can be an object) to a string.
  const hrefToString = (h: FixedHref): string => {
    if (typeof h === "string") {
      return h;
    }
    // If it's an object, reconstruct by combining pathname and query string (if any).
    let pathString = h.pathname || "";
    if (h.params) {
      const query = new URLSearchParams(h.params as Record<string, string>);
      if (query.toString()) {
        pathString += `?${query.toString()}`;
      }
    }
    return pathString;
  };

  const colorKey = getColorKey("externalLinkColor", themeType);
  const resolvedColor = useThemeColor(color, colorKey);

  // Note: We cast href to the type expected by Link.
  const linkHref = href as LinkProps["href"];

  // Handle press event. We wrap the asynchronous call inside an IIFE to keep this function synchronous.
  const handlePress = (event: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement>) => {
    // If a user provided an onPress, call it.
    onPress?.(event as GestureResponderEvent);

    if (!event.defaultPrevented && Platform.OS !== "web") {
      // Prevent default link opening in system browser.
      event.preventDefault();
      // Wrap async logic in an IIFE.
      (async () => {
        const url = typeof href === "string" ? href : hrefToString(href);
        try {
          await openBrowserAsync(url);
        } catch (error) {
          console.error("Error opening browser:", error);
        }
      })();
    }
  };

  return (
    <Link
      href={linkHref}
      {...rest}
      onPress={handlePress}
      style={[{ color: resolvedColor, textDecorationLine: "underline" }, style]}
    />
  );
}
