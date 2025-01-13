/**
 * ThemedAnimatedTextExamples.tsx
 *
 * Demonstrates usage of ThemedAnimatedText with different theme types
 * and color overrides, plus a basic animation scenario.
 */
import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import ThemedAnimatedText from "@/components/templates/typography/ThemedAnimatedText";

const ThemedAnimatedTextExamples: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Simple fade in effect
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ThemedView style={styles.container}>
      {/* 1) Basic usage with primary theme */}
      <ThemedAnimatedText style={styles.bigText} themeType="primary">
        Hello from ThemedAnimatedText (primary theme)
      </ThemedAnimatedText>

      {/* 2) Secondary theme with color override */}
      <ThemedAnimatedText
        style={styles.mediumText}
        themeType="secondary"
        color={{ light: "#e74c3c", dark: "#c0392b" }}
      >
        Overridden red text (secondary theme)
      </ThemedAnimatedText>

      {/* 3) Tertiary theme with fadeIn animation */}
      <ThemedAnimatedText
        style={[styles.mediumText, { opacity: fadeAnim }]}
        themeType="tertiary"
      >
        I'm fading in with tertiary theme...
      </ThemedAnimatedText>
    </ThemedView>
  );
};

export default ThemedAnimatedTextExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  bigText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  mediumText: {
    fontSize: 18,
  },
});
