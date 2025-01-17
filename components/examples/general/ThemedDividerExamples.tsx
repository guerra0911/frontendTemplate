/**
 * ThemedDividerExamples.tsx
 *
 * Demonstrates usage of ThemedDivider with different theme types,
 * inset options, bold style, and color overrides.
 */
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedDividerExamples: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.sectionTitle}>
        ThemedDivider Examples
      </ThemedText>

      {/* 1) Primary, default hairline */}
      <ThemedText type="subtitle" style={styles.label}>
        1) Primary (hairline width)
      </ThemedText>
      <ThemedDivider themeType="primary" />

      {/* 2) Secondary, bold */}
      <ThemedText type="subtitle" style={styles.label}>
        2) Secondary, bold
      </ThemedText>
      <ThemedDivider themeType="secondary" bold />

      {/* 3) Tertiary, left inset */}
      <ThemedText type="subtitle" style={styles.label}>
        3) Tertiary, left inset
      </ThemedText>
      <ThemedDivider themeType="tertiary" leftInset />

      {/* 4) Overridden color */}
      <ThemedText type="subtitle" style={styles.label}>
        4) Overridden color (blue in light, red in dark)
      </ThemedText>
      <ThemedDivider
        color={{ light: "#0000FF", dark: "#FF0000" }}
        bold
      />

      {/* 5) Horizontal insets */}
      <ThemedText type="subtitle" style={styles.label}>
        5) Horizontal insets
      </ThemedText>
      <ThemedDivider horizontalInset />
    </View>
  );
};

export default ThemedDividerExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
  },
});
