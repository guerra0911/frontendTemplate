/**
 * ThemedSurfaceExamples.tsx
 *
 * Demonstrates various ways to use ThemedSurface
 * with the new theming approach.
 */
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import ThemedSurface from "@/components/templates/containers/ThemedSurface";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedSurfaceExamples: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.sectionTitle}>
        ThemedSurface Examples
      </ThemedText>

      {/* Flat surface (no elevation) */}
      <ThemedSurface mode="flat" style={styles.surfaceExample}>
        <ThemedText style={styles.exampleLabel}>Flat Surface</ThemedText>
      </ThemedSurface>

      {/* Elevated surface (mild shadow) */}
      <ThemedSurface mode="elevated" elevation={2} style={styles.surfaceExample}>
        <ThemedText style={styles.exampleLabel}>
          Elevated (Elevation = 2)
        </ThemedText>
      </ThemedSurface>

      {/* Elevated surface (stronger shadow) */}
      <ThemedSurface mode="elevated" elevation={6} style={styles.surfaceExample}>
        <ThemedText style={styles.exampleLabel}>
          Elevated (Elevation = 6)
        </ThemedText>
      </ThemedSurface>

      {/* Custom background color override */}
      <ThemedSurface
        mode="flat"
        backgroundColor={{ light: "#ffe4e1", dark: "#ff69b4" }}
        style={styles.surfaceExample}
      >
        <ThemedText style={styles.exampleLabel}>
          Custom Background (Light = #ffe4e1 / Dark = #ff69b4)
        </ThemedText>
      </ThemedSurface>

      {/* Custom shadow color override */}
      <ThemedSurface
        mode="elevated"
        elevation={4}
        shadowColor={{ light: "#ff0000", dark: "#00ff00" }}
        style={styles.surfaceExample}
      >
        <ThemedText style={styles.exampleLabel}>
          Custom Shadow (Red in Light / Green in Dark)
        </ThemedText>
      </ThemedSurface>

      {/* ThemeType = "secondary", just to show usage */}
      <ThemedSurface
        mode="elevated"
        elevation={4}
        themeType="secondary"
        style={styles.surfaceExample}
      >
        <ThemedText style={styles.exampleLabel}>
          Elevated (Secondary Theme)
        </ThemedText>
      </ThemedSurface>
    </ScrollView>
  );
};

export default ThemedSurfaceExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  surfaceExample: {
    width: "80%",
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  exampleLabel: {
    fontSize: 16,
    textAlign: "center",
  },
});
