/**
 * ThemedExternalLinkExamples.tsx
 *
 * Demonstrates usage of ThemedExternalLink with different theme types
 * and color overrides.
 */
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedExternalLink } from "@/components/templates/typography/ThemedExternalLink";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { LinkProps } from "expo-router";

const ThemedExternalLinkExamples: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="title">
        ThemedExternalLink Examples
      </ThemedText>

      {/* 1) Default usage => primary theme */}
      <ThemedExternalLink href="https://expo.dev" themeType="primary" style={styles.link}>
        <ThemedText type="link">Expo Homepage (Primary)</ThemedText>
      </ThemedExternalLink>

      {/* 2) Secondary theme usage */}
      <ThemedExternalLink
        href="https://github.com/expo/expo"
        themeType="secondary"
        style={styles.link}
      >
        <ThemedText type="link">Expo GitHub (Secondary)</ThemedText>
      </ThemedExternalLink>

      {/* 3) Tertiary theme usage + color override */}
      <ThemedExternalLink
        href="https://reactnative.dev"
        themeType="tertiary"
        color={{ light: "#ff6347", dark: "#ff9d85" }} // override to orange-ish
        style={styles.link}
      >
        <ThemedText type="link">React Native Docs (Custom Color)</ThemedText>
      </ThemedExternalLink>

      {/* 4) Using a relative path or object (works in expo-router) */}
      <ThemedExternalLink
        // Casting the href object to the expected type bypasses strict literal checking.
        href={
          {
            pathname: "/user/[id]",
            params: { id: "john" }
          } as unknown as LinkProps["href"]
        }
        style={styles.link}
      >
        <ThemedText type="link">Open /user/john (Relative Path)</ThemedText>
      </ThemedExternalLink>
    </View>
  );
};

export default ThemedExternalLinkExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    marginBottom: 10,
  },
  link: {
    marginVertical: 5,
  },
});
