import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import ThemedIcon from "@/components/templates/icons/ThemedIcon";

export interface ThemedListIconProps {
  iconName: string;
  iconLibrary?: "Ionicons" | "MaterialIcons" | "FontAwesome";
  color?: string;
  style?: StyleProp<ViewStyle>;
  size?: number; // e.g. 24
}

function ThemedListIcon({
  iconName,
  iconLibrary = "Ionicons",
  color = "#333333",
  style,
  size = 24,
}: ThemedListIconProps) {
  return (
    <View style={[styles.container, style]}>
      <ThemedIcon iconName={iconName} iconLibrary={iconLibrary} size={size} color={color} />
    </View>
  );
}

export default React.memo(ThemedListIcon);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
