import React from "react";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../typography/ThemedText";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 */
type ListSubheaderColorType =
  | "listSubheaderTextColorPrimary"
  | "listSubheaderTextColorSecondary"
  | "listSubheaderTextColorTertiary";

export type ThemedListSubheaderType = "primary" | "secondary" | "tertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 */
export interface ThemedListSubheaderProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  themeType?: ThemedListSubheaderType;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
export default function ThemedListSubheader({
  children,
  style,
  themeType = "primary",
}: ThemedListSubheaderProps) {
  const colorKey = `listSubheaderTextColor${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListSubheaderColorType;

  const resolvedTextColor = useThemeColor({}, colorKey);

  return (
    <ThemedText
      style={[
        styles.container,
        { color: resolvedTextColor, fontWeight: "500" },
        style,
      ]}
      numberOfLines={1}
    >
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
  },
});
