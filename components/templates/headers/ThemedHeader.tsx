// components/templates/headers/ThemedHeader.tsx

import React from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ThemedHeaderBackButton from "@/components/templates/headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/templates/typography/ThemedText";

interface ThemedHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  themeType?: "primary" | "secondary" | "tertiary";
}

const ThemedHeader: React.FC<ThemedHeaderProps> = ({
  title,
  showBackButton = false,
  rightElement,
  leftElement,
  themeType = "primary",
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Define ThemeColorType
  type ThemeColorType =
    | "headerBackgroundPrimary"
    | "headerBackgroundSecondary"
    | "headerBackgroundTertiary"
    | "headerTextPrimary"
    | "headerTextSecondary"
    | "headerTextTertiary";

  // Resolve background and text color
  const backgroundColor = useThemeColor(
    {},
    `headerBackground${capitalize(themeType)}` as ThemeColorType
  );

  const textColor = useThemeColor(
    {},
    `headerText${capitalize(themeType)}` as ThemeColorType
  );

  // Helper function to capitalize
  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: insets.top, // Apply top inset
          height: 56 + insets.top, // Fixed header height plus inset
          width: "100%", // Ensure full width
          zIndex: 10, // Ensure header is above other elements
        },
      ]}
    >
      {showBackButton ? (
        <ThemedHeaderBackButton onPress={() => router.back()} />
      ) : leftElement ? (
        <View style={styles.leftElement}>{leftElement}</View>
      ) : (
        <View style={styles.placeholder} />
      )}

      <View style={styles.titleContainer}>
        <ThemedText style={[styles.title, { color: textColor }]}>
          {title}
        </ThemedText>
      </View>

      {rightElement ? (
        <View style={styles.rightElement}>{rightElement}</View>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignSelf: "stretch", // Allow the header to stretch horizontally
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rightElement: {
    // Adjust as needed
  },
  leftElement: {
    // Adjust as needed
  },
  placeholder: {
    width: 40, // Same width as back button for alignment
  },
});

export default ThemedHeader;
