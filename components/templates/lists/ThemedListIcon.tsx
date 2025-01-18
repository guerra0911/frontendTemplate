import React from "react";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import ThemedIcon from "@/components/templates/icons/ThemedIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 */
type ListIconTextColorType =
  | "listItemTextColorPrimary"
  | "listItemTextColorSecondary"
  | "listItemTextColorTertiary";

export type ThemedListIconType = "primary" | "secondary" | "tertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 */
export interface ThemedListIconProps {
  icon: string;
  iconLibrary?: "Ionicons" | "MaterialIcons" | "FontAwesome";
  color?: string; // If user wants to override
  style?: StyleProp<ViewStyle>;
  size?: number;
  themeType?: ThemedListIconType;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
export default function ThemedListIcon({
  icon,
  iconLibrary,
  color,
  style,
  size = 24,
  themeType = "primary",
}: ThemedListIconProps) {
  // If user doesn't pass a color => fallback from theme
  const colorKey = (`listItemTextColor${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListIconTextColorType);

  const defaultColor = useThemeColor({}, colorKey);

  return (
    <View style={[styles.container, style]} pointerEvents="box-none">
      <ThemedIcon
        iconName={icon}
        iconLibrary={iconLibrary || "Ionicons"}
        size={size}
        color={color || defaultColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
