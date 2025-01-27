// components/ui/headers/ThemedStickyHeader.tsx

import React from "react";
import { View, StyleSheet, TextStyle } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedHeaderBackButton from "./ThemedHeaderBackButton";
import ThemedButton from "@/components/templates/buttons/ThemedButton";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** ThemeColorType enumerates the possible color keys for ThemedStickyHeader. */
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

/** Props for ThemedStickyHeader */
interface ThemedStickyHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  type?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string } | string;

  // Optional icons/callbacks
  leftIcon?: IconName;
  onLeftPress?: () => void;
  rightIcon?: IconName;
  onRightPress?: () => void;
  rightElement?: React.ReactNode;
}

export default function ThemedStickyHeader({
  title,
  showBackButton = false,
  onBackPress,
  type = "primary",
  backgroundColor,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  rightElement,
}: ThemedStickyHeaderProps) {
  const insets = useSafeAreaInsets();

  // Build the color key for "headerBackgroundPrimary|Secondary|Tertiary"
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  let resolvedBg: string;
  if (typeof backgroundColor === "string") {
    resolvedBg = backgroundColor;
  } else {
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
          paddingTop: insets.top,
          height: STICKY_HEADER_HEIGHT + insets.top,
        },
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

const STICKY_HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    flexDirection: "row",
    alignItems: "flex-end", // so content is near bottom inside the header
    justifyContent: "space-between",
    paddingHorizontal: 16,

    // Basic shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
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
    marginBottom: 8, // optional
  },
  titleText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 60,
    justifyContent: "flex-end",
  },
});
