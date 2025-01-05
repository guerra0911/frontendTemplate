/**
 * ThemedCrossFadeIconExamples.tsx
 *
 * Demonstrates usage of ThemedCrossFadeIcon with primary, secondary,
 * or tertiary color variants, plus optional color override.
 */

import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { ThemedText } from "@/components/templates/general/ThemedText";
import ThemedCrossFadeIcon, {
  CrossFadeIconType,
} from "@/components/templates/icons/ThemedCrossFadeIcon";
import { IconName, SupportedIconLibraries } from "@/components/templates/icons/ThemedIcon";

// Define the ICONS array with explicit types
const ICONS: { name: IconName; library: SupportedIconLibraries }[] = [
  { name: "home", library: "Ionicons" },
  { name: "rocket", library: "FontAwesome" },
  { name: "person", library: "Ionicons" },
  { name: "android", library: "MaterialIcons" },
];

const ThemedCrossFadeIconExamples: React.FC = () => {
  const [iconIndex, setIconIndex] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);

  const handleIconPress = () => {
    setIconIndex((prev) => (prev + 1) % ICONS.length);
  };

  const handleTypePress = () => {
    setTypeIndex((prev) => (prev + 1) % TYPES.length);
  };

  const currentIcon = ICONS[iconIndex];
  const currentType: CrossFadeIconType = TYPES[typeIndex];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>
        ThemedCrossFadeIcon (Typed Color Keys)
      </ThemedText>

      {/* Example using typed color keys: primary, secondary, tertiary */}
      <ThemedCrossFadeIcon
        iconName={currentIcon.name}
        iconLibrary={currentIcon.library}
        type={currentType}
        size={50}
        style={styles.icon}
      />

      <Button title="Change Icon" onPress={handleIconPress} />
      <Button title="Change Type" onPress={handleTypePress} />

      <View style={{ marginTop: 40 }} />

      {/* Another example: explicit color override */}
      <ThemedText style={styles.title}>With Custom Overrides</ThemedText>
      <ThemedCrossFadeIcon
        iconName={currentIcon.name}
        iconLibrary={currentIcon.library}
        size={50}
        color={{ light: "#e74c3c", dark: "#c0392b" }}
        style={styles.icon}
      />
    </View>
  );
};

export default ThemedCrossFadeIconExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  icon: {
    marginBottom: 20,
  },
});

// Define the TYPES array with explicit types
const TYPES: CrossFadeIconType[] = ["primary", "secondary", "tertiary"];
