/**
 * ThemedActivityIndicatorExamples.tsx
 *
 * Demonstrates usage of the ThemedActivityIndicator.
 */

import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import ThemedActivityIndicator from "@/components/templates/loaders/ThemedActivityIndicator";
import { ThemedText } from "@/components/templates/general/ThemedText";

const ThemedActivityIndicatorExamples: React.FC = () => {
  const [animating, setAnimating] = useState(true);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.sectionTitle}>
        ThemedActivityIndicator Examples
      </ThemedText>

      {/* Default usage */}
      <ThemedActivityIndicator animating={animating} style={styles.indicator} />

      {/* Custom size and color override */}
      <ThemedActivityIndicator
        animating={animating}
        size={40}
        color={{ light: "#e74c3c", dark: "#c0392b" }}
        style={styles.indicator}
      />

      {/* Remain visible when stopped (hidesWhenStopped=false) */}
      <ThemedActivityIndicator
        animating={animating}
        hidesWhenStopped={false}
        size={50}
        color={{ light: "#f1c40f", dark: "#f39c12" }}
        style={styles.indicator}
      />

      {/* Toggle Button */}
      <Button
        title={animating ? "Stop" : "Start"}
        onPress={() => setAnimating(!animating)}
      />
    </View>
  );
};

export default ThemedActivityIndicatorExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  indicator: {
    marginVertical: 16,
  },
});
