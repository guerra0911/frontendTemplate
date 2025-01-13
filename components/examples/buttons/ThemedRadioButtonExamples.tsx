import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ThemedRadioButton from "@/components/templates/buttons/ThemedRadioButton";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedRadioButtonExamples: React.FC = () => {
  // STATES
  const [defaultRadio, setDefaultRadio] = useState(false);
  const [iosLikeRadio, setIosLikeRadio] = useState(false);
  const [customDimensionsRadio, setCustomDimensionsRadio] = useState(false);
  const [factorRadiusRadio, setFactorRadiusRadio] = useState(false);
  const [customColorsRadio, setCustomColorsRadio] = useState(false);
  const [customIconRadio, setCustomIconRadio] = useState(false);
  const [borderRadio, setBorderRadio] = useState(false);
  const [shadowRadio, setShadowRadio] = useState(false);
  const [paddingRadio, setPaddingRadio] = useState(false);
  const [loadingRadio, setLoadingRadio] = useState(false);
  const [disabledRadio, setDisabledRadio] = useState(true);
  const [transparentRadio, setTransparentRadio] = useState(false);

  const handleLoadingPress = () => {
    if (!loadingRadio) {
      setLoadingRadio(true);
      // simulate async operation
      setTimeout(() => {
        setLoadingRadio(false);
      }, 2000);
    } else {
      setLoadingRadio(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* DEFAULT RADIO BUTTON */}
      <ThemedText style={styles.sectionTitle}>Default Radio Button</ThemedText>
      <ThemedRadioButton
        value={defaultRadio}
        onValueChange={setDefaultRadio}
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {defaultRadio ? "Selected" : "Unselected"}
      </ThemedText>

      {/* IOS-NATIVE LIKE RADIO BUTTON */}
      <ThemedText style={styles.sectionTitle}>iOS-like Radio Button</ThemedText>
      <ThemedRadioButton
        value={iosLikeRadio}
        onValueChange={setIosLikeRadio}
        themeType="primary"
        customSize={30}
        customRadius="factor" // make it circular
        roundedAllCorners={true}
        animatedPress={true}
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {iosLikeRadio ? "Selected (iOS-like)" : "Unselected (iOS-like)"}
      </ThemedText>

      {/* CUSTOM DIMENSIONS & RADIUS */}
      <ThemedText style={styles.sectionTitle}>Custom Dimensions & Radius</ThemedText>
      <ThemedRadioButton
        value={customDimensionsRadio}
        onValueChange={setCustomDimensionsRadio}
        customSize={40}
        customRadius={10} // slightly rounded corners
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {customDimensionsRadio ? "Selected" : "Unselected"} (40px, radius 10)
      </ThemedText>

      {/* FACTOR (PILL) RADIUS */}
      <ThemedText style={styles.sectionTitle}>Factor (Pill) Radius</ThemedText>
      <ThemedRadioButton
        value={factorRadiusRadio}
        onValueChange={setFactorRadiusRadio}
        customSize={50}
        customRadius="factor" // fully circular
        roundedAllCorners={true}
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {factorRadiusRadio ? "Selected (Circular)" : "Unselected (Circular)"}
      </ThemedText>

      {/* CUSTOM COLORS */}
      <ThemedText style={styles.sectionTitle}>Custom Colors</ThemedText>
      <ThemedRadioButton
        value={customColorsRadio}
        onValueChange={setCustomColorsRadio}
        backgroundUnselected={{ light: "#EEEEEE", dark: "#333333" }}
        borderColorUnselected={{ light: "#999999", dark: "#777777" }}
        backgroundSelected={{ light: "#FF6347", dark: "#1E90FF" }} // Tomato in light, Blue in dark
        innerDotColorSelected={{ light: "#ffffff", dark: "#ffffff" }}
        borderColorSelected={{ light: "#FF6347", dark: "#1E90FF" }}
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {customColorsRadio ? "Tomato/Blue Selected" : "Gray Unselected"}
      </ThemedText>

      {/* CUSTOM ICON */}
      <ThemedText style={styles.sectionTitle}>Custom Icon</ThemedText>
      <ThemedRadioButton
        value={customIconRadio}
        onValueChange={setCustomIconRadio}
        iconName="heart"
        iconLibrary="FontAwesome"
        iconSize={18}
        customSize={32}
        themeType="secondary"
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {customIconRadio ? "Heart Selected" : "No Icon Unselected"}
      </ThemedText>

      {/* BORDERS */}
      <ThemedText style={styles.sectionTitle}>Borders</ThemedText>
      <ThemedRadioButton
        value={borderRadio}
        onValueChange={setBorderRadio}
        borders={{
          width: 2,
          style: "dashed",
        }}
        themeType="tertiary"
        customSize={35}
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {borderRadio ? "Dashed Border Selected" : "Dashed Border Unselected"}
      </ThemedText>

      {/* SHADOWS */}
      <ThemedText style={styles.sectionTitle}>Shadows</ThemedText>
      <ThemedRadioButton
        value={shadowRadio}
        onValueChange={setShadowRadio}
        shadows={{
          offset: { width: 2, height: 2 },
          opacity: 0.4,
          radius: 4,
          elevation: 5,
        }}
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {shadowRadio ? "Shadowed & Selected" : "Shadowed & Unselected"}
      </ThemedText>

      {/* PADDING & TRANSPARENCY */}
      <ThemedText style={styles.sectionTitle}>Padding & Transparency</ThemedText>
      <ThemedRadioButton
        value={paddingRadio}
        onValueChange={setPaddingRadio}
        padding={{
          internal: 5,
          color: { light: "rgba(255,0,0,0.2)", dark: "rgba(0,255,255,0.2)" },
        }}
        themeType="primary"
        customSize={50}
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {paddingRadio ? "Inside Colored Padding Selected" : "Inside Colored Padding Unselected"}
      </ThemedText>

      {/* LOADING STATE */}
      <ThemedText style={styles.sectionTitle}>Loading State</ThemedText>
      <ThemedRadioButton
        value={loadingRadio}
        onValueChange={handleLoadingPress}
        loading={{
          isLoading: loadingRadio,
          color: "#ffffff",
        }}
        customSize={30}
        themeType="secondary"
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        Press to simulate loading...
      </ThemedText>

      {/* DISABLED STATE */}
      <ThemedText style={styles.sectionTitle}>Disabled State</ThemedText>
      <ThemedRadioButton
        value={disabledRadio}
        onValueChange={setDisabledRadio}
        disabled={true}
        customSize={30}
        themeType="primary"
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {disabledRadio ? "Disabled & Selected" : "Disabled & Unselected"}
      </ThemedText>

      {/* TRANSPARENT BACKGROUND */}
      <ThemedText style={styles.sectionTitle}>Transparent Background</ThemedText>
      <ThemedRadioButton
        value={transparentRadio}
        onValueChange={setTransparentRadio}
        backgroundUnselected={{ light: "transparent", dark: "transparent" }}
        backgroundSelected={{ light: "#34C759", dark: "#34C759" }}
        borderColorUnselected={{ light: "#34C759", dark: "#34C759" }}
        borderColorSelected={{ light: "#34C759", dark: "#34C759" }}
        innerDotColorSelected={{ light: "#ffffff", dark: "#ffffff" }}
        customSize={40}
        style={styles.radio}
      />
      <ThemedText style={styles.selectedText}>
        {transparentRadio ? "Green Dot Selected on Transparent" : "No Fill, Just Border Unselected"}
      </ThemedText>
    </ScrollView>
  );
};

export default ThemedRadioButtonExamples;

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
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  radio: {
    marginBottom: 15,
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: "#333333",
  },
});
