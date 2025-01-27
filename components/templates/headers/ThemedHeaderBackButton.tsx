// components/ui/headers/ThemedHeaderBackButton.tsx

import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import ThemedButton from "@/components/templates/buttons/ThemedButton";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

// Define the IconName type based on the glyph maps of the icon libraries
type IconName =
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof FontAwesome.glyphMap;

// Define the SupportedIconLibraries type
type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

interface ThemedHeaderBackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  iconName?: IconName; // Updated to use the correct type
  iconLibrary?: SupportedIconLibraries;
}

/**
 * A themed header back button that uses ThemedButton with a transparent background + an icon.
 * By default, "chevron-back" from Ionicons.
 */
const ThemedHeaderBackButton: React.FC<ThemedHeaderBackButtonProps> = ({
  onPress,
  style,
  iconName = "chevron-back" as IconName, // Ensure the default iconName is a valid key
  iconLibrary = "Ionicons",
}) => {
  return (
    <ThemedButton
      onPress={onPress}
      icons={{
        iconName,
        iconLibrary,
        iconPosition: "left",
        iconSize: 24,
      }}
      background={{
        light: "transparent",
        dark: "transparent",
      }}
      themeType="primary"
      style={[styles.btn, style]}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default ThemedHeaderBackButton;
