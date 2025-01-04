// ThemedToggleSwitchExamples.tsx

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedToggleSwitch from "@/components/templates/buttons/ThemedToggleSwitch";
import { ThemedText } from "@/components/templates/general/ThemedText";

const ThemedToggleSwitchExamples: React.FC = () => {
  // Each toggle has its own state to operate independently
  const [defaultToggle, setDefaultToggle] = useState(false);
  const [disabledToggle, setDisabledToggle] = useState(true);
  const [customSizeToggle, setCustomSizeToggle] = useState(false);
  const [customColorToggle, setCustomColorToggle] = useState(false);

  return (
    <View style={styles.container}>
      {/* DEFAULT TOGGLE */}
      <ThemedText style={styles.sectionTitle}>Default Toggle</ThemedText>
      <ThemedToggleSwitch
        value={defaultToggle}
        onValueChange={setDefaultToggle}
      />
      <ThemedText style={styles.selectedText}>
        Toggle is {defaultToggle ? "ON" : "OFF"}
      </ThemedText>

      {/* DISABLED TOGGLE */}
      <ThemedText style={styles.sectionTitle}>Disabled Toggle</ThemedText>
      <ThemedToggleSwitch
        value={disabledToggle}
        onValueChange={setDisabledToggle}
        disabled
      />
      <ThemedText style={styles.selectedText}>
        Toggle is {disabledToggle ? "ON" : "OFF"} (Disabled)
      </ThemedText>

      {/* CUSTOM DIMENSIONS */}
      <ThemedText style={styles.sectionTitle}>Custom Dimensions</ThemedText>
      <ThemedToggleSwitch
        value={customSizeToggle}
        onValueChange={setCustomSizeToggle}
        width={70}
        height={40}
      />
      <ThemedText style={styles.selectedText}>
        Toggle is {customSizeToggle ? "ON" : "OFF"} (70x40)
      </ThemedText>

      {/* CUSTOM COLORS */}
      <ThemedText style={styles.sectionTitle}>Custom Colors</ThemedText>
      <ThemedToggleSwitch
        value={customColorToggle}
        onValueChange={setCustomColorToggle}
        containerColorOff="#cccccc"
        containerColorOn="#34C759"
        circleColorOff="#ffffff"
        circleColorOn="#ffff00"
      />
      <ThemedText style={styles.selectedText}>
        Toggle is {customColorToggle ? "ON" : "OFF"} (Custom Colors)
      </ThemedText>
    </View>
  );
};

export default ThemedToggleSwitchExamples;

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});
