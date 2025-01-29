// app/components/ui/headers/ThemedHeaderBackButton.tsx

import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useRouter } from "expo-router";
import ThemedButton from "@/components/templates/buttons/ThemedButton";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

type IconName =
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof FontAwesome.glyphMap;

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

interface ThemedHeaderBackButtonProps {
  /** If omitted, we default to router.back() */
  onPress?: () => void;
  style?: ViewStyle;
  iconName?: IconName;
  iconLibrary?: SupportedIconLibraries;
}

/**
 * A themed header back button that uses ThemedButton 
 * with a transparent background + an icon.
 * - By default, "chevron-back" from Ionicons.
 * - If no onPress is provided, we call router.back().
 */
const ThemedHeaderBackButton: React.FC<ThemedHeaderBackButtonProps> = ({
  onPress,
  style,
  iconName = "chevron-back",
  iconLibrary = "Ionicons",
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default behavior: go back
      router.back();
    }
  };

  return (
    <ThemedButton
      onPress={handlePress}
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
      // We can make the button minimal: e.g. customHeight=40, customWidth=40
      customHeight={40}
      customWidth={40}
      // Possibly remove extra padding
      padding={{ internal: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  // Minimal padding so it sits truly on the left
  btn: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default ThemedHeaderBackButton;
