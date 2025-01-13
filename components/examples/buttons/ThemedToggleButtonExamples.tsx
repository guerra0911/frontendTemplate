import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ThemedToggleButton from "@/components/templates/buttons/ThemedToggleButton";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedToggleButtonExamples: React.FC = () => {
  const [defaultToggle, setDefaultToggle] = useState(false);
  const [iosLikeToggle, setIosLikeToggle] = useState(false);
  const [customDimensionsToggle, setCustomDimensionsToggle] = useState(false);
  const [factorRadiusToggle, setFactorRadiusToggle] = useState(false);
  const [customInversionToggle, setCustomInversionToggle] = useState(false);
  const [iconTextToggle, setIconTextToggle] = useState(false);
  const [borderToggle, setBorderToggle] = useState(false);
  const [shadowToggle, setShadowToggle] = useState(false);
  const [paddingToggle, setPaddingToggle] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [disabledToggle, setDisabledToggle] = useState(true);
  const [transparentToggle, setTransparentToggle] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* DEFAULT TOGGLE BUTTON */}
      <ThemedText style={styles.sectionTitle}>Default Toggle Button</ThemedText>
      <ThemedToggleButton
        value={defaultToggle}
        onValueChange={setDefaultToggle}
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {defaultToggle ? "Toggled ON" : "Toggled OFF"}
      </ThemedText>

      {/* IOS-NATIVE LIKE TOGGLE BUTTON */}
      <ThemedText style={styles.sectionTitle}>iOS Native-like</ThemedText>
      <ThemedToggleButton
        value={iosLikeToggle}
        onValueChange={setIosLikeToggle}
        themeType="primary"
        customHeight={40}
        customWidth={120}
        customRadius="factor" // gives a pill shape
        roundedAllCorners={true}
        animatedPress={true}
        style={[styles.button, { backgroundColor: "transparent" }]}
        // Trying to mimic iOS appearance:
        backgroundUntoggled={{
          light: "#007AFF",
          dark: "#0A84FF",
        }}
        textIconUntoggledColor={{
          light: "#ffffff",
          dark: "#ffffff",
        }}
        backgroundToggled={{
          light: "#ffffff",
          dark: "#ffffff",
        }}
        textIconToggledColor={{
          light: "#007AFF",
          dark: "#0A84FF",
        }}
        text={{
          style: { fontWeight: "bold", fontSize: 16 },
        }}
        title="Toggle Me"
      />
      <ThemedText style={styles.selectedText}>
        {iosLikeToggle ? "Toggled ON" : "Toggled OFF"}
      </ThemedText>

      {/* CUSTOM DIMENSIONS */}
      <ThemedText style={styles.sectionTitle}>Custom Dimensions</ThemedText>
      <ThemedToggleButton
        value={customDimensionsToggle}
        onValueChange={setCustomDimensionsToggle}
        customHeight={60}
        customWidth={250}
        themeType="secondary"
        title="Wider & Taller"
        text={{
          style: { fontSize: 18 },
        }}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customDimensionsToggle ? "Toggled ON" : "Toggled OFF"} (60x250)
      </ThemedText>

      {/* FACTOR (PILL) RADIUS */}
      <ThemedText style={styles.sectionTitle}>Factor (Pill) Radius</ThemedText>
      <ThemedToggleButton
        value={factorRadiusToggle}
        onValueChange={setFactorRadiusToggle}
        themeType="primary"
        customWidth={300}
        customHeight={50}
        customRadius="factor"
        title="Pill Shaped"
        text={{
          style: { fontSize: 16 },
        }}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {factorRadiusToggle ? "Toggled ON" : "Toggled OFF"}
      </ThemedText>

      {/* CUSTOM INVERSION COLORS */}
      <ThemedText style={styles.sectionTitle}>
        Custom Inversion Colors
      </ThemedText>
      <ThemedToggleButton
        value={customInversionToggle}
        onValueChange={setCustomInversionToggle}
        themeType="tertiary"
        backgroundUntoggled={{
          light: "#FF6347", // Tomato
          dark: "#FF6347",
        }}
        textIconUntoggledColor={{
          light: "#FFFFFF",
          dark: "#FFFFFF",
        }}
        backgroundToggled={{
          light: "#FFFFFF",
          dark: "#FFFFFF",
        }}
        textIconToggledColor={{
          light: "#FF6347",
          dark: "#FF6347",
        }}
        title="Custom Colors"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {customInversionToggle ? "Toggled ON" : "Toggled OFF"}
      </ThemedText>

      {/* ICON + TEXT */}
      <ThemedText style={styles.sectionTitle}>Icon + Text</ThemedText>
      <ThemedToggleButton
        value={iconTextToggle}
        onValueChange={setIconTextToggle}
        icons={{
          iconName: "star",
          iconLibrary: "FontAwesome",
          iconPosition: "left",
          iconSize: 24,
          iconPadding: {
            right: 12,
          },
        }}
        text={{
          style: { fontSize: 16 },
        }}
        title="Favorite"
        themeType="primary"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {iconTextToggle ? "Favorited (ON)" : "Not Favorited (OFF)"}
      </ThemedText>

      {/* BORDERS */}
      <ThemedText style={styles.sectionTitle}>
        Borders (Dotted, Dashed)
      </ThemedText>
      <ThemedToggleButton
        value={borderToggle}
        onValueChange={setBorderToggle}
        borders={{
          color: { light: "#0000FF", dark: "#00FFFF" },
          width: 2,
          style: borderToggle ? "dotted" : "dashed",
        }}
        themeType="primary"
        title="Toggle Border"
        text={{
          style: { fontSize: 14 },
        }}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {borderToggle ? "Toggled (Dotted Border)" : "Untoggled (Dashed Border)"}
      </ThemedText>

      {/* SHADOWS */}
      <ThemedText style={styles.sectionTitle}>Shadows</ThemedText>
      <ThemedToggleButton
        value={shadowToggle}
        onValueChange={setShadowToggle}
        shadows={{
          color: "#555555",
          offset: { width: 4, height: 4 },
          opacity: 0.5,
          radius: 10,
          elevation: 12,
        }}
        themeType="secondary"
        title="Shadow Toggle"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {shadowToggle ? "Toggled with Shadows" : "Off with Shadows"}
      </ThemedText>

      {/* PADDING & TRANSPARENCY */}
      <ThemedText style={styles.sectionTitle}>
        Padding & Transparency
      </ThemedText>
      <ThemedToggleButton
        value={paddingToggle}
        onValueChange={setPaddingToggle}
        themeType="primary"
        customHeight={50}
        customWidth={200}
        padding={{
          internal: 10,
          color: { light: "rgba(255,255,255,0.2)", dark: "rgba(0,0,0,0.2)" },
        }}
        title="Transparent Padding"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {paddingToggle ? "Toggled ON" : "Toggled OFF"}
      </ThemedText>

      {/* LOADING STATE */}
      <ThemedText style={styles.sectionTitle}>Loading State</ThemedText>
      <ThemedToggleButton
        value={loadingToggle}
        onValueChange={(val) => {
          // Simulate a loading scenario
          setLoadingToggle(val);
          if (val) {
            setTimeout(() => {
              setLoadingToggle(false);
            }, 3000);
          }
        }}
        themeType="primary"
        loading={{
          isLoading: loadingToggle,
          text: "Loading...",
          color: "#ffffff",
        }}
        title="Load Data"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {loadingToggle ? "Loading..." : "Press to Load"}
      </ThemedText>

      {/* DISABLED STATE */}
      <ThemedText style={styles.sectionTitle}>Disabled State</ThemedText>
      <ThemedToggleButton
        value={disabledToggle}
        onValueChange={setDisabledToggle}
        themeType="primary"
        title="Disabled Toggle"
        disabled
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {disabledToggle ? "Toggled ON (Disabled)" : "Toggled OFF (Disabled)"}
      </ThemedText>

      {/* TRANSPARENT BACKGROUND + ICON ONLY */}
      <ThemedText style={styles.sectionTitle}>
        Transparent with Icon Only
      </ThemedText>
      <ThemedToggleButton
        value={transparentToggle}
        onValueChange={setTransparentToggle}
        themeType="tertiary"
        customWidth={80}
        customHeight={50}
        icons={{
          iconName: "heart",
          iconLibrary: "FontAwesome",
          iconPosition: "top",
          iconSize: 24,
          iconPadding: { bottom: 0 },
        }}
        backgroundUntoggled={{
          light: "transparent",
          dark: "transparent",
        }}
        textIconUntoggledColor={{
          light: "#FF0000",
          dark: "#FF0000",
        }}
        backgroundToggled={{
          light: "#FF0000",
          dark: "#FF0000",
        }}
        textIconToggledColor={{
          light: "#fff",
          dark: "#151718",
        }}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {transparentToggle ? "Toggled ON" : "Toggled OFF"}
      </ThemedText>
    </ScrollView>
  );
};

export default ThemedToggleButtonExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
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
});
