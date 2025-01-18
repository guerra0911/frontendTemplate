import React from "react";
import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedListSubheader from "./ThemedListSubheader";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 */
type ListSectionBackgroundType =
  | "listSectionBackgroundPrimary"
  | "listSectionBackgroundSecondary"
  | "listSectionBackgroundTertiary";

export type ThemedListSectionType = "primary" | "secondary" | "tertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 */
export interface ThemedListSectionProps extends ViewProps {
  title?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  themeType?: ThemedListSectionType;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
export default function ThemedListSection({
  title,
  children,
  style,
  titleStyle,
  themeType = "primary",
  ...rest
}: ThemedListSectionProps) {
  const backgroundKey = `listSectionBackground${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListSectionBackgroundType;

  const resolvedBackgroundColor = useThemeColor({}, backgroundKey);

  return (
    <View
      {...rest}
      style={[{ backgroundColor: resolvedBackgroundColor }, styles.container, style]}
    >
      {title ? (
        <ThemedListSubheader style={titleStyle} themeType={themeType}>
          {title}
        </ThemedListSubheader>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
