import { View, type ViewProps, StyleProp, ViewStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

// ----------------------------------------------------------------------------
// THEME COLOR TYPE
// ----------------------------------------------------------------------------
type ThemeColorType =
  | "themedViewBackgroundPrimary"
  | "themedViewBackgroundSecondary"
  | "themedViewBackgroundTertiary";

// ----------------------------------------------------------------------------
// PROPS
// ----------------------------------------------------------------------------
export interface ThemedViewProps extends ViewProps {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  style?: StyleProp<ViewStyle>;
}

/**
 * ThemedView
 *
 * A simple container that uses a theme-based background color (instead of the
 * old approach with "lightColor" / "darkColor").
 */
export function ThemedView({
  style,
  themeType = "primary",
  backgroundColor = {},
  ...otherProps
}: ThemedViewProps) {
  // Build color key
  const getColorKey = (base: string, variant: "primary" | "secondary" | "tertiary") =>
    `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;

  const backgroundKey = getColorKey("themedViewBackground", themeType);

  // Resolve background color
  const resolvedBackgroundColor = useThemeColor(backgroundColor, backgroundKey);

  return <View style={[{ backgroundColor: resolvedBackgroundColor }, style]} {...otherProps} />;
}
