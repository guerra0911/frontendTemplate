import React, { useMemo } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * ThemeColorType enumerates the possible color keys for icons:
 * iconColorPrimary, iconColorSecondary, iconColorTertiary
 */
type ThemeColorType =
  | "iconColorPrimary"
  | "iconColorSecondary"
  | "iconColorTertiary";

/**
 * A plain string is allowed (any valid icon name).
 * Or known glyphMap keys from Ionicons/MaterialIcons/FontAwesome.
 */
export type IconName =
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof FontAwesome.glyphMap
  | string;

export type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

/**
 * We allow either:
 * - a direct string color ("#FF0000"), or
 * - a light/dark override object ({ light: "#FF0000", dark: "#00FF00" })
 */
export interface ThemedIconProps {
  iconName: IconName;
  iconLibrary?: SupportedIconLibraries;
  type?: "primary" | "secondary" | "tertiary";
  size?: number;
  style?: StyleProp<TextStyle>;
  color?: string | { light?: string; dark?: string };
  accessibilityLabel?: string;
}

const ThemedIcon: React.FC<ThemedIconProps> = ({
  iconName,
  iconLibrary = "Ionicons",
  type = "primary",
  size = 24,
  style,
  color,
  accessibilityLabel,
}) => {
  // Helper to build the color key, e.g. "iconColorPrimary"
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType;
  };

  // Decide which icon library to render
  const IconComponent = useMemo(() => {
    switch (iconLibrary) {
      case "MaterialIcons":
        return MaterialIcons;
      case "FontAwesome":
        return FontAwesome;
      case "Ionicons":
      default:
        return Ionicons;
    }
  }, [iconLibrary]);

  /**
   * Determine final color:
   * - If color is a string => use it directly
   * - If color is an object (or undefined) => useThemeColor with the theming key
   */
  let resolvedColor: string;
  if (typeof color === "string") {
    resolvedColor = color;
  } else {
    // color is either an object or undefined
    resolvedColor = useThemeColor(
      color ?? {},
      getColorKey("iconColor", type)
    );
  }

  const iconStyle = [{ fontSize: size, color: resolvedColor }, style];

  return (
    <IconComponent
      name={iconName as any}
      size={size}
      color={resolvedColor}
      style={iconStyle}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

export default React.memo(ThemedIcon);
