/**
 * ThemedChasingDotLoadingIndicatorExamples.tsx
 *
 * Demonstrates usage of ThemedChasingDotLoadingIndicator.
 */
import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import ThemedChasingDotLoadingIndicator from "@/components/templates/loaders/ThemedChasingDotLoadingIndicator";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedChasingDotLoadingIndicatorExamples: React.FC = () => {
  const [animating, setAnimating] = useState(true);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.sectionTitle}>
        ChasingDotLoadingIndicator Examples
      </ThemedText>

      {/* Default usage */}
      <ThemedChasingDotLoadingIndicator animating={animating} style={styles.indicator} />

      {/* Custom size and color override */}
      <ThemedChasingDotLoadingIndicator
        animating={animating}
        size={80}
        color={{ light: "#e74c3c", dark: "#c0392b" }}
        style={styles.indicator}
      />

      {/* Remain visible when stopped */}
      <ThemedChasingDotLoadingIndicator
        animating={animating}
        hidesWhenStopped={false}
        size={100}
        color={{ light: "#f1c40f", dark: "#f39c12" }}
        style={styles.indicator}
      />

      {/* Demo themeType (e.g. "secondary") */}
      <ThemedChasingDotLoadingIndicator
        animating={animating}
        themeType="secondary"
        size={60}
        style={styles.indicator}
      />

      <Button
        title={animating ? "Stop" : "Start"}
        onPress={() => setAnimating(!animating)}
      />
    </View>
  );
};

export default ThemedChasingDotLoadingIndicatorExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
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
