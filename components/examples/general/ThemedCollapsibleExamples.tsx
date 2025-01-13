/**
 * ThemedCollapsibleExamples.tsx
 *
 * Demonstrates usage of ThemedCollapsible with different themeTypes,
 * color overrides, and nested content.
 */
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedCollapsible } from "@/components/templates/general/ThemedCollapsible";

const ThemedCollapsibleExamples: React.FC = () => {
  return (
    <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>Themed Collapsible Examples</ThemedText>

      {/* Collapsible with default (primary) theme */}
      <ThemedCollapsible title="Primary Collapsible">
        <ThemedText>Here is some collapsible content.</ThemedText>
      </ThemedCollapsible>

      {/* Collapsible with 'secondary' theme */}
      <ThemedCollapsible title="Secondary Collapsible" themeType="secondary">
        <ThemedText>This uses the secondary theme colors.</ThemedText>
      </ThemedCollapsible>

      {/* Collapsible with a custom text/icon color override */}
      <ThemedCollapsible
        title="Custom Colors"
        textColor={{ light: "#e74c3c", dark: "#c0392b" }}
        iconColor={{ light: "#3498db", dark: "#2980b9" }}
      >
        <ThemedText>
          This collapsible's heading text is red, icon is blue, and background is the default
          "primary" theme color.
        </ThemedText>
      </ThemedCollapsible>

      {/* Collapsible with 'tertiary' theme and a custom background override */}
      <ThemedCollapsible
        title="Tertiary + Overridden Background"
        themeType="tertiary"
        backgroundColor={{ light: "#FFEECC", dark: "#553322" }}
      >
        <ThemedText>
          The background here is a custom light/dark override, text/icon defaults to "tertiary" theme.
        </ThemedText>
      </ThemedCollapsible>
    </ThemedView>
  );
};

export default ThemedCollapsibleExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
  },
});
