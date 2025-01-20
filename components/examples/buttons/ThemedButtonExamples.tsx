// ThemedButtonExamples.tsx

import React, { useState } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import ThemedButton from "@/components/templates/buttons/ThemedButton";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedButtonExamples: React.FC = () => {
  const [customColorsPressed, setCustomColorsPressed] = useState(false);
  const [customDimensionsPressed, setCustomDimensionsPressed] = useState(false);
  const [customRadiusPressed, setCustomRadiusPressed] = useState(false);
  const [factorRadiusPressed, setFactorRadiusPressed] = useState(false);
  const [customBordersPressed, setCustomBordersPressed] = useState(false);
  const [customPaddingPressed, setCustomPaddingPressed] = useState(false);
  const [customAnimationPressed, setCustomAnimationPressed] = useState(false);
  const [customCurvesPressed, setCustomCurvesPressed] = useState(false);
  const [customTextsPressed, setCustomTextsPressed] = useState(false);
  const [customIconsPressed, setCustomIconsPressed] = useState(false);
  const [disabledPressed, setDisabledPressed] = useState(false);
  const [circularButtonPressed, setCircularButtonPressed] = useState(false);
  const [transparentIconButtonPressed, setTransparentIconButtonPressed] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const handlePress = (message: string) => {
    Alert.alert("Button Pressed", message);
  };

  const handleLoadingPress = () => {
    if (loadingButton) return; // Prevent multiple presses
    setLoadingButton(true);
    handlePress("Loading Button Pressed");
    // Simulate a 3-second async operation
    setTimeout(() => {
      setLoadingButton(false);
      Alert.alert("Loading Complete", "The loading has finished.");
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Primary Theme */}
      <ThemedText style={styles.sectionTitle}>Primary Theme</ThemedText>
      <ThemedButton
        title="Primary Button"
        onPress={() => handlePress("Primary Button Pressed")}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customColorsPressed ? "Custom Colors Pressed" : "Press the button above"}
      </ThemedText>

      {/* Secondary Theme */}
      <ThemedText style={styles.sectionTitle}>Secondary Theme</ThemedText>
      <ThemedButton
        title="Secondary Button"
        onPress={() => handlePress("Secondary Button Pressed")}
        themeType="secondary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customColorsPressed ? "Custom Colors Pressed" : "Press the button above"}
      </ThemedText>

      {/* Tertiary Theme */}
      <ThemedText style={styles.sectionTitle}>Tertiary Theme</ThemedText>
      <ThemedButton
        title="Tertiary Button"
        onPress={() => handlePress("Tertiary Button Pressed")}
        themeType="tertiary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customColorsPressed ? "Custom Colors Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Inline Colors */}
      <ThemedText style={styles.sectionTitle}>Custom Inline Colors</ThemedText>
      <ThemedButton
        title="Custom Colors"
        onPress={() => {
          handlePress("Custom Colors Button Pressed");
          setCustomColorsPressed(!customColorsPressed);
        }}
        background={{
          light: "#FF6347", // Tomato color for light theme
          dark: "#1E90FF", // Dodger blue for dark theme
        }}
        text={{
          style: { fontSize: 18, fontWeight: "bold" },
          color: {
            light: "#FFFFFF",
            dark: "#FFFFFF",
          },
        }}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customColorsPressed ? "Custom Colors Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Dimensions */}
      <ThemedText style={styles.sectionTitle}>Custom Dimensions</ThemedText>
      <ThemedButton
        title="Large Button"
        onPress={() => {
          handlePress("Large Button Pressed");
          setCustomDimensionsPressed(!customDimensionsPressed);
        }}
        customHeight={60}
        customWidth={250}
        themeType="secondary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customDimensionsPressed ? "Large Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Radius */}
      <ThemedText style={styles.sectionTitle}>Custom Radius</ThemedText>
      <ThemedButton
        title="Rounded Button"
        onPress={() => {
          handlePress("Rounded Button Pressed");
          setCustomRadiusPressed(!customRadiusPressed);
        }}
        customRadius={20}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customRadiusPressed ? "Rounded Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Factor (Pill) Radius */}
      <ThemedText style={styles.sectionTitle}>Factor (Pill) Radius</ThemedText>
      <ThemedButton
        title="Pill Button"
        onPress={() => {
          handlePress("Pill Button Pressed");
          setFactorRadiusPressed(!factorRadiusPressed);
        }}
        customHeight={50}
        customWidth={200}
        customRadius="factor"
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {factorRadiusPressed ? "Pill Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Borders */}
      <ThemedText style={styles.sectionTitle}>Custom Borders</ThemedText>
      <ThemedButton
        title="Bordered Button"
        onPress={() => {
          handlePress("Bordered Button Pressed");
          setCustomBordersPressed(!customBordersPressed);
        }}
        borders={{
          color: { light: "#0000FF", dark: "#00FFFF" },
          width: 2,
          style: "dashed", // Demonstrate dashed border
        }}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customBordersPressed ? "Bordered Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Internal Padding */}
      <ThemedText style={styles.sectionTitle}>Custom Internal Padding</ThemedText>
      <ThemedButton
        title="Padded Button"
        onPress={() => {
          handlePress("Padded Button Pressed");
          setCustomPaddingPressed(!customPaddingPressed);
        }}
        padding={{
          internal: 5, // Changed from 20 to 5
          color: { light: "#F0F0F0", dark: "#1C1C1E" },
        }}
        themeType="secondary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customPaddingPressed ? "Padded Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Animation */}
      <ThemedText style={styles.sectionTitle}>Custom Animation</ThemedText>
      <ThemedButton
        title="Animated Button"
        onPress={() => {
          handlePress("Animated Button Pressed");
          setCustomAnimationPressed(!customAnimationPressed);
        }}
        animatedPress={true}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customAnimationPressed ? "Animated Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Curves */}
      <ThemedText style={styles.sectionTitle}>Custom Curves</ThemedText>
      <ThemedButton
        title="Curved Button"
        onPress={() => {
          handlePress("Curved Button Pressed");
          setCustomCurvesPressed(!customCurvesPressed);
        }}
        roundedAllCorners={true}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customCurvesPressed ? "Curved Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Texts */}
      <ThemedText style={styles.sectionTitle}>Custom Texts</ThemedText>
      <ThemedButton
        title="Custom Text Button"
        onPress={() => {
          handlePress("Custom Text Button Pressed");
          setCustomTextsPressed(!customTextsPressed);
        }}
        text={{
          style: {
            fontWeight: "bold",
            textDecorationLine: "underline",
            fontStyle: "italic",
            fontSize: 20,
          },
          color: {
            light: "#000000", // Black for light theme
            dark: "#FFFFFF", // White for dark theme
          },
        }}
        background={{
          light: "#FFD700", // Gold for light theme
          dark: "#FF8C00", // Dark orange for dark theme
        }}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customTextsPressed ? "Custom Text Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Custom Icons with Custom Colors */}
      <ThemedText style={styles.sectionTitle}>Custom Icons with Custom Colors</ThemedText>
      <ThemedButton
        onPress={() => {
          handlePress("Icon Button Pressed");
          setCustomIconsPressed(!customIconsPressed);
        }}
        icons={{
          iconName: "home",
          iconLibrary: "Ionicons",
          iconPosition: "left", // Default position
          iconSize: 20,
          iconPadding: {
            right: 12, // Custom padding between icon and text
          },
        }}
        text={{
          style: styles.iconButtonText,
          color: {
            light: "#ffffff",
            dark: "#ffffff",
          },
        }}
        themeType="primary"
        style={styles.button}
      >
        <ThemedText style={styles.iconButtonText}>Home</ThemedText>
      </ThemedButton>
      <ThemedText style={styles.selectedText}>
        {customIconsPressed ? "Icon Button Pressed" : "Press the button above"}
      </ThemedText>

      {/* Disabled Buttons */}
      <ThemedText style={styles.sectionTitle}>Disabled Buttons</ThemedText>
      <ThemedButton
        title="Disabled Button"
        onPress={() => handlePress("This should not appear")}
        disabled={true}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        Disabled Button (Cannot Press)
      </ThemedText>

      {/* 1. Circular Button with Icon */}
      <ThemedText style={styles.sectionTitle}>Circular Button with Icon</ThemedText>
      <ThemedButton
        onPress={() => {
          handlePress("Circular Button Pressed");
          setCircularButtonPressed(!circularButtonPressed);
        }}
        icons={{
          iconName: "add",
          iconLibrary: "Ionicons",
          iconSize: 24,
        }}
        themeType="primary"
        customHeight={60}
        customWidth={60}
        customRadius="factor" // Ensures full rounding for a circle
        animatedPress={true}
        style={styles.circularButton}
      />
      <ThemedText style={styles.selectedText}>
        {circularButtonPressed ? "Circular Button Pressed" : "Press the circular button above"}
      </ThemedText>

      {/* 2. Button with Transparent Background and Just Icon */}
      <ThemedText style={styles.sectionTitle}>Button with Transparent Background and Just Icon</ThemedText>
      <ThemedButton
        onPress={() => {
          handlePress("Transparent Icon Button Pressed");
          setTransparentIconButtonPressed(!transparentIconButtonPressed);
        }}
        icons={{
          iconName: "heart",
          iconLibrary: "FontAwesome",
          iconPosition: "right", // Icon on the right
          iconSize: 20,
        }}
        background={{
          light: "transparent",
          dark: "transparent",
        }}
        themeType="primary" // ThemeType can still be used for text/icon colors if needed
        style={styles.transparentIconButton}
      />
      <ThemedText style={styles.selectedText}>
        {transparentIconButtonPressed ? "Transparent Icon Button Pressed" : "Press the icon button above"}
      </ThemedText>

      {/* 3. Loading Button Example */}
      <ThemedText style={styles.sectionTitle}>Loading Button Example</ThemedText>
      <ThemedButton
        title="Load Data"
        onPress={handleLoadingPress}
        loading={{
          isLoading: loadingButton,
          text: "Submitting...",
          color: "#ffffff", // Optional: Override loading spinner color
        }}
        themeType="secondary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {loadingButton ? "Loading..." : "Press the Load Data button above"}
      </ThemedText>

      {/* 4. Icon Position Examples */}
      <ThemedText style={styles.sectionTitle}>Icon Position Examples</ThemedText>
      
      {/* Icon on Top */}
      <ThemedButton
        title="Top Icon"
        onPress={() => handlePress("Top Icon Button Pressed")}
        icons={{
          iconName: "arrow-up",
          iconLibrary: "Ionicons",
          iconPosition: "top",
          iconSize: 24,
          iconPadding: {
            bottom: 2, // Custom padding between icon and text
          },
        }}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        Press the "Top Icon" button above
      </ThemedText>
      
      {/* Icon on Bottom */}
      <ThemedButton
        title="Bottom Icon"
        onPress={() => handlePress("Bottom Icon Button Pressed")}
        icons={{
          iconName: "arrow-down",
          iconLibrary: "Ionicons",
          iconPosition: "bottom",
          iconSize: 24,
          iconPadding: {
            top: 1, // Custom padding between text and icon
          },
        }}
        themeType="secondary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        Press the "Bottom Icon" button above
      </ThemedText>
      
      {/* 5. Icon Size Examples */}
      <ThemedText style={styles.sectionTitle}>Icon Size Examples</ThemedText>
      
      {/* Small Icon */}
      <ThemedButton
        title="Small Icon"
        onPress={() => handlePress("Small Icon Button Pressed")}
        icons={{
          iconName: "star",
          iconLibrary: "FontAwesome",
          iconPosition: "left",
          iconSize: 16, // Smaller icon size
          iconPadding: {
            right: 4, // Reduced padding
          },
        }}
        themeType="tertiary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        Press the "Small Icon" button above
      </ThemedText>
      
      {/* Large Icon */}
      <ThemedButton
        title="Large Icon"
        onPress={() => handlePress("Large Icon Button Pressed")}
        icons={{
          iconName: "star",
          iconLibrary: "FontAwesome",
          iconPosition: "right",
          iconSize: 30, // Larger icon size
          iconPadding: {
            left: 12, // Increased padding
          },
        }}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        Press the "Large Icon" button above
      </ThemedText>
      
      {/* 6. Border Style Examples */}
      <ThemedText style={styles.sectionTitle}>Border Style Examples</ThemedText>
      
      {/* Dashed Border */}
      <ThemedButton
        title="Dashed Border"
        onPress={() => handlePress("Dashed Border Button Pressed")}
        borders={{
          color: { light: "#FF4500", dark: "#FF6347" },
          width: 2,
          style: "dashed", // Demonstrate dashed border
        }}
        themeType="secondary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        Press the "Dashed Border" button above
      </ThemedText>
      
      {/* Dotted Border */}
      <ThemedButton
        title="Dotted Border"
        onPress={() => handlePress("Dotted Border Button Pressed")}
        borders={{
          color: { light: "#32CD32", dark: "#228B22" },
          width: 2,
          style: "dotted", // Demonstrate dotted border
        }}
        themeType="tertiary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        Press the "Dotted Border" button above
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Elevation Examples</ThemedText>

      {/* Button with an elevation of 1 */}
      <ThemedButton
        title="Elevation 1"
        onPress={() => handlePress("Button with elevation 1 pressed")}
        elevation={1}
        style={styles.button}
      />

      {/* Button with an elevation of 4 */}
      <ThemedButton
        title="Elevation 4"
        onPress={() => handlePress("Button with elevation 4 pressed")}
        elevation={4}
        style={styles.button}
      />

      {/* Button with a higher, "max" elevation (here using 10) */}
      <ThemedButton
        title="Max Elevation"
        onPress={() => handlePress("Button with max elevation pressed")}
        elevation={10}  // Adjust this value to represent "max" if desired.
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allows ScrollView to scroll content
    justifyContent: "flex-start", // Align items to the top
    alignItems: "center", // Center items horizontally
    padding: 5, // Changed from 20 to 5
    backgroundColor: "transparent", // Changed from "#f5f5f5" to "transparent"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginBottom: 15,
    width: "80%",
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: "#333333",
  },
  iconButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#ffffff",
  },
  circularButton: {
    marginBottom: 15,
    // width and height are set via props
  },
  transparentIconButton: {
    marginBottom: 15,
    // width and height can be adjusted as needed
  },
});

export default ThemedButtonExamples;
