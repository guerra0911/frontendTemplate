/**
 * ThemedTextExamples.tsx
 *
 * Demonstrates usage of ThemedText with different text types,
 * themeType variations, and color overrides.
 */
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedTextExamples: React.FC = () => {
  return (
    <ThemedView style={styles.container}>
      {/* 1) Default text with primary theme */}
      <ThemedText type="default" themeType="primary">
        This is default text in the primary theme.
      </ThemedText>

      {/* 2) Title text in the secondary theme */}
      <ThemedText type="title" themeType="secondary">
        This is a title in the secondary theme.
      </ThemedText>

      {/* 3) DefaultSemiBold in tertiary theme with color override */}
      <ThemedText
        type="defaultSemiBold"
        themeType="tertiary"
        color={{ light: "#e74c3c", dark: "#c0392b" }}
      >
        This is defaultSemiBold text with a custom red override.
      </ThemedText>

      {/* 4) Subtitle in primary theme */}
      <ThemedText type="subtitle" themeType="primary">
        This is a subtitle in the primary theme.
      </ThemedText>

      {/* 5) Link in secondary theme with no override */}
      <ThemedText type="link" themeType="secondary">
        This is a link in the secondary theme.
      </ThemedText>
    </ThemedView>
  );
};

export default ThemedTextExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
});
