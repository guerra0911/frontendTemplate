// components/ui/headers/ThemedCustomHeader.tsx

import React from "react";
import {
  View,
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedHeaderBackButton from "./ThemedHeaderBackButton";
import ThemedButton from "@/components/templates/buttons/ThemedButton";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** ThemeColorType enumerates the possible color keys for ThemedCustomHeader. */
type ThemeColorType =
  | "headerBackgroundPrimary"
  | "headerBackgroundSecondary"
  | "headerBackgroundTertiary";

/** Define IconName based on the glyph maps of the icon libraries */
type IconName =
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof FontAwesome.glyphMap;

/** Define SupportedIconLibraries */
type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

/** Props for ThemedCustomHeader */
export interface ThemedCustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;

  // Optional icons and callbacks
  leftIcon?: IconName;
  onLeftPress?: () => void;
  rightIcon?: IconName;
  onRightPress?: () => void;
  rightElement?: React.ReactNode;

  // The default theme type: "primary", "secondary", "tertiary"
  type?: "primary" | "secondary" | "tertiary";

  /**
   * You can override the background color if you prefer:
   * e.g. backgroundColor={{ light: "#FF0000", dark: "#00FF00" }} or just "#FF0000"
   */
  backgroundColor?: { light?: string; dark?: string } | string;

  /**
   * Optional style overrides for the container
   */
  style?: StyleProp<ViewStyle>;
}

export default function ThemedCustomHeader({
  title,
  showBackButton = false,
  onBackPress,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  rightElement,
  type = "primary",
  backgroundColor,
  style,
}: ThemedCustomHeaderProps) {
  const insets = useSafeAreaInsets();

  // 1) Build the color key
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  // 2) Resolve Background Color
  let resolvedBg: string;
  if (typeof backgroundColor === "string") {
    // direct string like "#FF0000"
    resolvedBg = backgroundColor;
  } else {
    // either an object or undefined
    resolvedBg = useThemeColor(
      backgroundColor ?? {},
      getColorKey("headerBackground", type)
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: resolvedBg,
          paddingTop: insets.top, // Push content below status bar/notch
          height: HEADER_HEIGHT + insets.top,
        },
        style,
      ]}
    >
      {/* Left Section */}
      <View style={styles.leftContainer}>
        {showBackButton && onBackPress && (
          <ThemedHeaderBackButton
            onPress={onBackPress}
            style={styles.backButton}
          />
        )}
        {leftIcon && onLeftPress && (
          <ThemedButton
            onPress={onLeftPress}
            icons={{
              iconName: leftIcon,
              iconLibrary: "Ionicons",
              iconPosition: "left",
              iconSize: 24,
            }}
            background={{
              light: "transparent",
              dark: "transparent",
            }}
            themeType="primary"
            style={styles.iconButton}
          />
        )}
      </View>

      {/* Middle => Title */}
      <View style={styles.titleContainer}>
        <ThemedText type="subtitle" style={styles.titleText as TextStyle}>
          {title}
        </ThemedText>
      </View>

      {/* Right Section */}
      <View style={styles.rightContainer}>
        {rightIcon && onRightPress && (
          <ThemedButton
            onPress={onRightPress}
            icons={{
              iconName: rightIcon,
              iconLibrary: "Ionicons",
              iconPosition: "right",
              iconSize: 24,
            }}
            background={{
              light: "transparent",
              dark: "transparent",
            }}
            themeType="primary"
            style={styles.iconButton}
          />
        )}
        {rightElement}
      </View>
    </View>
  );
}

const HEADER_HEIGHT = 56;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end", // so icon/text is at bottom if you want
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingHorizontal: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 60,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 8, // optional if you want some spacing
  },
  titleText: {
    fontWeight: "600",
    textAlign: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 60,
    justifyContent: "flex-end",
  },
});
