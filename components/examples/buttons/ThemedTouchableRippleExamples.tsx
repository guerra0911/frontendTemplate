/**
 * ThemedTouchableRippleExamples.tsx
 *
 * Demonstrates how to use ThemedTouchableRipple in various scenarios.
 */

import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import { ThemedText } from "@/components/templates/general/ThemedText"; // Adjust path if needed

const ThemedTouchableRippleExamples: React.FC = () => {
  const [pressCount, setPressCount] = useState(0);

  const handlePress = () => {
    setPressCount((prev) => prev + 1);
  };

  const handleLongPress = () => {
    Alert.alert("Long Press Detected", "You pressed and held the ripple!");
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.sectionTitle}>
        ThemedTouchableRipple Examples
      </ThemedText>

      {/* Basic Usage */}
      <ThemedTouchableRipple
        onPress={handlePress}
        style={styles.rippleExample}
      >
        <ThemedText style={styles.textLabel}>
          Tap Me (Presses: {pressCount})
        </ThemedText>
      </ThemedTouchableRipple>

      {/* Borderless = false => default overflow */}
      <ThemedTouchableRipple
        style={styles.rippleExample}
        underlayColor={{ light: "#ffcccb", dark: "#ff4444" }}
      >
        <ThemedText style={styles.textLabel}>Underlay Override</ThemedText>
      </ThemedTouchableRipple>

      {/* Borderless = true => overflow: 'hidden' */}
      <ThemedTouchableRipple
        borderless
        style={[styles.rippleExample, { borderRadius: 50 }]}
        rippleColor={{ light: "#00000030", dark: "#ffffff30" }}
      >
        <ThemedText style={styles.textLabel}>Borderless Circle</ThemedText>
      </ThemedTouchableRipple>

      {/* Long press demo */}
      <ThemedTouchableRipple
        style={styles.rippleExample}
        onLongPress={handleLongPress}
      >
        <ThemedText style={styles.textLabel}>Long Press Me</ThemedText>
      </ThemedTouchableRipple>

      {/* Custom hover color */}
      <ThemedTouchableRipple
        style={styles.rippleExample}
        hoverColor={{ light: "#b0e0e6", dark: "#008b8b" }}
      >
        <ThemedText style={styles.textLabel}>
          Custom Hover (Web Only)
        </ThemedText>
      </ThemedTouchableRipple>
    </View>
  );
};

export default ThemedTouchableRippleExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  rippleExample: {
    padding: 16,
    marginVertical: 10,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
  },
  textLabel: {
    fontSize: 16,
  },
  fullScreenLabel: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
