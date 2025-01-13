// ThemedTextButtonExamples.tsx

import React, { useState } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import ThemedTextButton from "@/components/templates/buttons/ThemedTextButton";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedTextButtonExamples: React.FC = () => {
  // States for each button or scenario
  const [primaryPressed, setPrimaryPressed] = useState(false);
  const [secondaryPressed, setSecondaryPressed] = useState(false);
  const [tertiaryPressed, setTertiaryPressed] = useState(false);
  const [disabledPressed, setDisabledPressed] = useState(false); // Just to illustrate no effect
  const [loading, setLoading] = useState(false);
  const [customStylePressed, setCustomStylePressed] = useState(false);

  // Common press handler
  const handlePress = (message: string) => {
    Alert.alert("Text Button Pressed", message);
  };

  // Simulate async load for loading example
  const handleLoadingPress = () => {
    if (loading) return;
    setLoading(true);
    handlePress("Loading Text Button Pressed");
    // Mock an async operation for 3 seconds
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Loading Complete", "The loading has finished.");
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* PRIMARY THEME */}
      <ThemedText style={styles.sectionTitle}>Primary Theme</ThemedText>
      <ThemedTextButton
        title="Primary Text Button"
        onPress={() => {
          handlePress("Primary Text Button Pressed");
          setPrimaryPressed(!primaryPressed);
        }}
        themeType="primary"
        animatedPress={true}
      />
      <ThemedText style={styles.selectedText}>
        {primaryPressed
          ? "Primary Button was pressed."
          : "Press the Primary Text Button above."}
      </ThemedText>

      {/* SECONDARY THEME */}
      <ThemedText style={styles.sectionTitle}>Secondary Theme</ThemedText>
      <ThemedTextButton
        title="Secondary Text Button"
        onPress={() => {
          handlePress("Secondary Text Button Pressed");
          setSecondaryPressed(!secondaryPressed);
        }}
        themeType="secondary"
        animatedPress={true}
      />
      <ThemedText style={styles.selectedText}>
        {secondaryPressed
          ? "Secondary Button was pressed."
          : "Press the Secondary Text Button above."}
      </ThemedText>

      {/* TERTIARY THEME */}
      <ThemedText style={styles.sectionTitle}>Tertiary Theme</ThemedText>
      <ThemedTextButton
        title="Tertiary Text Button"
        onPress={() => {
          handlePress("Tertiary Text Button Pressed");
          setTertiaryPressed(!tertiaryPressed);
        }}
        themeType="tertiary"
        animatedPress={true}
      />
      <ThemedText style={styles.selectedText}>
        {tertiaryPressed
          ? "Tertiary Button was pressed."
          : "Press the Tertiary Text Button above."}
      </ThemedText>

      {/* DISABLED */}
      <ThemedText style={styles.sectionTitle}>Disabled</ThemedText>
      <ThemedTextButton
        title="Disabled Text Button"
        onPress={() => {
          handlePress("Should not appear"); 
          setDisabledPressed(!disabledPressed);
        }}
        disabled={true}
      />
      <ThemedText style={styles.selectedText}>
        Disabled Button (Cannot Press).
      </ThemedText>

      {/* LOADING */}
      <ThemedText style={styles.sectionTitle}>Loading State</ThemedText>
      <ThemedTextButton
        title="Load Data"
        onPress={handleLoadingPress}
        loading={{
          isLoading: loading,
          text: "Submitting...",
          color: "#ff69b4", // Optional: override spinner color
        }}
        themeType="primary"
        animatedPress={true}
      />
      <ThemedText style={styles.selectedText}>
        {loading ? "Loading..." : "Press 'Load Data' above."}
      </ThemedText>

      {/* CUSTOM STYLES */}
      <ThemedText style={styles.sectionTitle}>Custom Text Styles</ThemedText>
      <ThemedTextButton
        onPress={() => {
          handlePress("Custom Styled Text Button Pressed");
          setCustomStylePressed(!customStylePressed);
        }}
        themeType="secondary"
        text={{
          style: {
            fontSize: 20,
            fontWeight: "bold",
            textDecorationLine: "underline",
            color: "#FF4500", // Overriding theme color
          },
        }}
      >
        Custom Styled Text
      </ThemedTextButton>
      <ThemedText style={styles.selectedText}>
        {customStylePressed
          ? "Custom Styled Button was pressed."
          : "Press the custom styled text above."}
      </ThemedText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
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
    marginBottom: 10,
    color: "#333333",
  },
});

export default ThemedTextButtonExamples;
