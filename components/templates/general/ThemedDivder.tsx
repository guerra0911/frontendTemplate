import React from "react";
import {
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  StyleProp,
  Platform,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 * We define color keys for "dividerColorPrimary", "dividerColorSecondary",
 * "dividerColorTertiary" across light/dark in ThemedDividerColors.
 */
type DividerColorType =
  | "dividerColorPrimary"
  | "dividerColorSecondary"
  | "dividerColorTertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 */
export interface ThemedDividerProps extends Omit<ViewProps, "style"> {
  /**
   * Which theme color to apply (primary, secondary, tertiary).
   * @default "primary"
   */
  themeType?: "primary" | "secondary" | "tertiary";

  /**
   * Optional color override (light/dark). If not provided, defaults come from color file.
   */
  color?: { light?: string; dark?: string };

  /**
   * Whether divider has a left inset (like indentation).
   * @default false
   */
  leftInset?: boolean;

  /**
   * Whether the divider has horizontal insets on both sides.
   * @default false
   */
  horizontalInset?: boolean;

  /**
   * Whether the divider should be bold (height = 1).
   * Otherwise, uses hairlineWidth.
   * @default false
   */
  bold?: boolean;

  /**
   * Additional style for the divider container.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 * A thin (or bold) line used to group content in lists or page layouts.
 * Adheres to your theming approach with an optional color override.
 */
export function ThemedDivider({
  themeType = "primary",
  color = {},
  leftInset = false,
  horizontalInset = false,
  bold = false,
  style,
  ...rest
}: ThemedDividerProps) {
  // 1) Build the color key (dividerColorPrimary, etc.)
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): DividerColorType => {
    return `${base}${capitalize(variant)}` as DividerColorType;
  };

  // Helper to capitalize
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const dividerColorKey = getColorKey("dividerColor", themeType);
  const resolvedDividerColor = useThemeColor(color, dividerColorKey);

  // 2) Determine base height
  const hairlineWidth = StyleSheet.hairlineWidth; // typically ~0.5 on iOS, ~1 on some devices
  const lineHeight = bold ? 1 : hairlineWidth;

  // 3) Determine insets
  const containerStyles: ViewStyle = {
    height: lineHeight,
    backgroundColor: resolvedDividerColor,
  };

  if (leftInset) {
    // If you want a bigger standard left inset, choose a default marginLeft
    containerStyles.marginLeft = 16; // or 72 if you want a bigger inset
  }
  if (horizontalInset) {
    containerStyles.marginLeft = 16;
    containerStyles.marginRight = 16;
  }

  return (
    <View
      {...rest}
      style={[containerStyles, style]}
      // No children expected, as it’s a horizontal line
    />
  );
}
