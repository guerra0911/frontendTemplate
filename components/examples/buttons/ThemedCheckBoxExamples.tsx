import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ThemedCheckBox from "@/components/templates/buttons/ThemedCheckBox";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedCheckBoxExamples: React.FC = () => {
  // STATES FOR EXAMPLES
  const [defaultCheck, setDefaultCheck] = useState(false);
  const [iosLikeCheck, setIosLikeCheck] = useState(true);
  const [customDimensionsCheck, setCustomDimensionsCheck] = useState(false);
  const [customColorsCheck, setCustomColorsCheck] = useState(false);
  const [customIconCheck, setCustomIconCheck] = useState(false);
  const [borderedCheck, setBorderedCheck] = useState(false);
  const [shadowCheck, setShadowCheck] = useState(false);
  const [paddingCheck, setPaddingCheck] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [disabledCheck, setDisabledCheck] = useState(true);
  const [transparentCheck, setTransparentCheck] = useState(false);
  const [iconOnlyCheck, setIconOnlyCheck] = useState(false);

  // For loading demonstration:
  const handleLoadingPress = () => {
    if (!loadingCheck) {
      setLoadingCheck(true);
      // Simulate async operation
      setTimeout(() => {
        setLoadingCheck(false);
      }, 2000);
    } else {
      setLoadingCheck(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* DEFAULT CHECKBOX */}
      <ThemedText style={styles.sectionTitle}>Default CheckBox</ThemedText>
      <ThemedCheckBox
        value={defaultCheck}
        onValueChange={setDefaultCheck}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {defaultCheck ? "Checked" : "Unchecked"}
      </ThemedText>

      {/* IOS-NATIVE LIKE CHECKBOX */}
      <ThemedText style={styles.sectionTitle}>iOS Native-like</ThemedText>
      <ThemedCheckBox
        value={iosLikeCheck}
        onValueChange={setIosLikeCheck}
        themeType="primary"
        customSize={30}
        customRadius="factor" // circular shape
        roundedAllCorners={true}
        animatedPress={true}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {iosLikeCheck ? "Checked" : "Unchecked"}
      </ThemedText>

      {/* CUSTOM DIMENSIONS & RADIUS */}
      <ThemedText style={styles.sectionTitle}>Custom Dimensions & Radius</ThemedText>
      <ThemedCheckBox
        value={customDimensionsCheck}
        onValueChange={setCustomDimensionsCheck}
        customSize={40} // bigger checkbox
        customRadius={10}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {customDimensionsCheck ? "Checked" : "Unchecked"}
      </ThemedText>

      {/* CUSTOM COLORS */}
      <ThemedText style={styles.sectionTitle}>Custom Colors</ThemedText>
      <ThemedCheckBox
        value={customColorsCheck}
        onValueChange={setCustomColorsCheck}
        backgroundUnchecked={{ light: "#EEEEEE", dark: "#333333" }}
        borderColorUnchecked={{ light: "#999999", dark: "#777777" }}
        backgroundChecked={{ light: "#FF6347", dark: "#1E90FF" }} // Tomato in light, Blue in dark
        iconColorChecked={{ light: "#ffffff", dark: "#ffffff" }}
        borderColorChecked={{ light: "#FF6347", dark: "#1E90FF" }}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {customColorsCheck ? "Tomato/Blue Checked" : "Gray Unchecked"}
      </ThemedText>

      {/* CUSTOM ICON */}
      <ThemedText style={styles.sectionTitle}>Custom Icon</ThemedText>
      <ThemedCheckBox
        value={customIconCheck}
        onValueChange={setCustomIconCheck}
        iconName="star"
        iconLibrary="FontAwesome"
        iconSize={18}
        customSize={32}
        themeType="secondary"
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {customIconCheck ? "Star Selected" : "Star Unselected (no icon visible)"}
      </ThemedText>

      {/* BORDERS */}
      <ThemedText style={styles.sectionTitle}>Borders</ThemedText>
      <ThemedCheckBox
        value={borderedCheck}
        onValueChange={setBorderedCheck}
        borders={{
          width: 2,
          style: "dashed",
        }}
        themeType="tertiary"
        customSize={35}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {borderedCheck ? "Dashed Border Checked" : "Dashed Border Unchecked"}
      </ThemedText>

      {/* SHADOWS */}
      <ThemedText style={styles.sectionTitle}>Shadows</ThemedText>
      <ThemedCheckBox
        value={shadowCheck}
        onValueChange={setShadowCheck}
        shadows={{
          offset: { width: 2, height: 2 },
          opacity: 0.4,
          radius: 4,
          elevation: 5,
        }}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {shadowCheck ? "Shadowed & Checked" : "Shadowed & Unchecked"}
      </ThemedText>

      {/* PADDING & TRANSPARENCY */}
      <ThemedText style={styles.sectionTitle}>Padding & Transparency</ThemedText>
      <ThemedCheckBox
        value={paddingCheck}
        onValueChange={setPaddingCheck}
        padding={{
          internal: 5, // more internal padding
          color: { light: "rgba(255,0,0,0.2)", dark: "rgba(0,255,255,0.2)" },
        }}
        themeType="primary"
        customSize={50}
        iconName="checkmark"
        iconSize={20}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {paddingCheck ? "Inside Colored Padding Checked" : "Inside Colored Padding Unchecked"}
      </ThemedText>

      {/* LOADING STATE */}
      <ThemedText style={styles.sectionTitle}>Loading State</ThemedText>
      <ThemedCheckBox
        value={loadingCheck}
        onValueChange={handleLoadingPress} // toggle loading on press
        loading={{
          isLoading: loadingCheck,
          color: "#ffffff",
        }}
        customSize={30}
        themeType="secondary"
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        Press the checkbox to simulate loading...
      </ThemedText>

      {/* DISABLED STATE */}
      <ThemedText style={styles.sectionTitle}>Disabled State</ThemedText>
      <ThemedCheckBox
        value={disabledCheck}
        onValueChange={setDisabledCheck}
        disabled={true}
        customSize={30}
        themeType="primary"
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {disabledCheck ? "Disabled & Checked" : "Disabled & Unchecked"}
      </ThemedText>

      {/* TRANSPARENT BACKGROUND */}
      <ThemedText style={styles.sectionTitle}>Transparent Background</ThemedText>
      <ThemedCheckBox
        value={transparentCheck}
        onValueChange={setTransparentCheck}
        backgroundUnchecked={{ light: "#34C759", dark: "#34C759" }}
        backgroundChecked={{ light: "#34C759", dark: "#34C759" }}
        borderColorUnchecked={{ light: "#34C759", dark: "#34C759" }}
        borderColorChecked={{ light: "#34C759", dark: "#34C759" }}
        iconColorChecked={{ light: "#ffffff", dark: "#ffffff" }}
        customSize={40}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {transparentCheck ? "Green Check on Transparent" : "No Fill, Just Border"}
      </ThemedText>

      {/* ICON-ONLY CHECKBOX */}
      <ThemedText style={styles.sectionTitle}>Icon Only CheckBox</ThemedText>
      <ThemedCheckBox
        value={iconOnlyCheck}
        onValueChange={setIconOnlyCheck}
        // Set both unchecked and checked backgrounds and borders to transparent.
        backgroundUnchecked={{ light: "transparent", dark: "transparent" }}
        backgroundChecked={{ light: "transparent", dark: "transparent" }}
        borderColorUnchecked={{ light: "transparent", dark: "transparent" }}
        borderColorChecked={{ light: "transparent", dark: "transparent" }}
        // Optionally set a distinct icon color so the checkmark stands out.
        iconColorChecked={{ light: "#007AFF", dark: "#0A84FF" }}
        customSize={40}
        iconName="checkmark"
        iconSize={24}
        style={styles.checkBox}
      />
      <ThemedText style={styles.selectedText}>
        {iconOnlyCheck ? "Icon Only (Checked)" : "Icon Only (Unchecked)"}
      </ThemedText>
    </ScrollView>
  );
};

export default ThemedCheckBoxExamples;

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
  checkBox: {
    marginBottom: 15,
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: "#333333",
  },
});
