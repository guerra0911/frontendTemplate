import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ThemedChoiceChips, {
  ChoiceChipItem,
} from "@/components/templates/buttons/ThemedChoiceChips";
import { ThemedText } from "@/components/templates/general/ThemedText";

// Import icon libraries for icon usage in chips
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

const ThemedChoiceChipsExample: React.FC = () => {
  // Example 1: Default Choice Chips
  const [selectedIndices1, setSelectedIndices1] = useState<number[]>([]);
  const items1: ChoiceChipItem[] = [
    { title: "Apple" },
    { title: "Banana" },
    { title: "Cherry" },
    { title: "Date" },
    { title: "Elderberry" },
  ];

  // Example 2: Multiple Rows with Custom Spacing
  const [selectedIndices2, setSelectedIndices2] = useState<number[]>([]);
  const items2: ChoiceChipItem[] = [
    { title: "Red" },
    { title: "Green" },
    { title: "Blue" },
    { title: "Yellow" },
    { title: "Purple" },
    { title: "Orange" },
    { title: "Pink" },
    { title: "Brown" },
    { title: "Gold" },
    { title: "Silver" },
    { title: "Bronze" },
    { title: "Platinum" },
    { title: "Black" },
    { title: "White" },
    { title: "Magenta" },
    { title: "Mahagony" },
  ];

  // Example 3: Custom Dimensions and Radius
  const [selectedIndices3, setSelectedIndices3] = useState<number[]>([]);
  const items3: ChoiceChipItem[] = [
    { title: "Small" },
    { title: "Medium" },
    { title: "Large" },
    { title: "Extra Large" },
  ];

  // Example 4: Choice Chips with Icons
  const [selectedIndices4, setSelectedIndices4] = useState<number[]>([]);
  const items4: ChoiceChipItem[] = [
    { title: "", iconName: "home", iconLibrary: "FontAwesome" },
    { title: "", iconName: "search", iconLibrary: "Ionicons" },
    { title: "", iconName: "notifications", iconLibrary: "MaterialIcons" },
    { title: "", iconName: "user", iconLibrary: "FontAwesome" },
  ];

  // Example 5: Borders and Shadows
  const [selectedIndices5, setSelectedIndices5] = useState<number[]>([]);
  const items5: ChoiceChipItem[] = [
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
    { title: "Option 4" },
    { title: "Option 5" },
  ];

  // Example 6: Transparent Background and Custom Padding
  const [selectedIndices6, setSelectedIndices6] = useState<number[]>([]);
  const items6: ChoiceChipItem[] = [
    { title: "Alpha" },
    { title: "Beta" },
    { title: "Gamma" },
    { title: "Delta" },
    { title: "Epsilon" },
    { title: "Zeta" },
  ];

  // Example 7: iOS Native-like Choice Chips
  const [selectedIndices7, setSelectedIndices7] = useState<number[]>([]);
  const items7: ChoiceChipItem[] = [
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ----------------------------------------------------------- */}
      {/* Example 1: Default Choice Chips */}
      <ThemedText style={styles.sectionTitle}>Default Choice Chips</ThemedText>
      <ThemedChoiceChips
        containerStyle={styles.choiceChips}
        items={items1}
        selectedIndices={selectedIndices1}
        onSelectedChange={setSelectedIndices1}
        accessibilityLabel="Default Choice Chips"
        customWidth={70}
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {selectedIndices1.map((index) => items1[index].title).join(", ") ||
          "None"}
      </ThemedText>

      {/* ----------------------------------------------------------- */}
      {/* Example 2: Multiple Rows with Custom Spacing */}
      <ThemedText style={styles.sectionTitle}>
        Multiple Rows with Custom Spacing
      </ThemedText>
      <ThemedChoiceChips
        containerStyle={styles.choiceChips}
        items={items2}
        selectedIndices={selectedIndices2}
        onSelectedChange={setSelectedIndices2}
        numberOfRows={5}
        verticalRowSpacing={15}
        horizontalChipSpacing={12}
        containerInternalPadding={15}
        accessibilityLabel="Multiple Rows Choice Chips"
        themeType="secondary"
        stagger={15}
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {selectedIndices2.map((index) => items2[index].title).join(", ") ||
          "None"}
      </ThemedText>

      {/* ----------------------------------------------------------- */}
      {/* Example 3: Custom Dimensions and Radius */}
      <ThemedText style={styles.sectionTitle}>
        Custom Dimensions and Radius
      </ThemedText>
      <ThemedChoiceChips
        containerStyle={styles.choiceChips}
        items={items3}
        selectedIndices={selectedIndices3}
        onSelectedChange={setSelectedIndices3}
        customHeight={50}
        customWidth={150}
        customRadius={20}
        roundedAllCorners={true}
        accessibilityLabel="Custom Dimensions Choice Chips"
        themeType="tertiary"
        backgroundUntoggled={{
          light: "#f0f0f0",
          dark: "#303030",
        }}
        backgroundToggled={{
          light: "#d1e7dd",
          dark: "#1b1b1b",
        }}
        textIconUntoggledColor={{
          light: "#000000",
          dark: "#ffffff",
        }}
        textIconToggledColor={{
          light: "#0f5132",
          dark: "#ffffff",
        }}
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {selectedIndices3.map((index) => items3[index].title).join(", ") ||
          "None"}
      </ThemedText>

      {/* ----------------------------------------------------------- */}
      {/* Example 4: Choice Chips with Icons */}
      <ThemedText style={styles.sectionTitle}>
        Choice Chips with Icons
      </ThemedText>
      <ThemedChoiceChips
        containerStyle={styles.choiceChips}
        items={items4}
        selectedIndices={selectedIndices4}
        onSelectedChange={setSelectedIndices4}
        customWidth={40}
        icons={{
          iconPosition: "left",
          iconSize: 20,
          iconPadding: { right: 8 },
        }}
        accessibilityLabel="Choice Chips with Icons"
        themeType="primary"
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {selectedIndices4.map((index) => items4[index].title).join(", ") ||
          "None"}
      </ThemedText>

      {/* ----------------------------------------------------------- */}
      {/* Example 5: Borders and Shadows */}
      <ThemedText style={styles.sectionTitle}>Borders and Shadows</ThemedText>
      <ThemedChoiceChips
        containerStyle={styles.choiceChips}
        items={items5}
        selectedIndices={selectedIndices5}
        onSelectedChange={setSelectedIndices5}
        borders={{
          color: { light: "#ff5733", dark: "#c70039" },
          width: 2,
          style: "dashed",
        }}
        shadows={{
          color: "#000000",
          offset: { width: 2, height: 2 },
          opacity: 0.3,
          radius: 4,
          elevation: 5,
        }}
        accessibilityLabel="Borders and Shadows Choice Chips"
        themeType="secondary"
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {selectedIndices5.map((index) => items5[index].title).join(", ") ||
          "None"}
      </ThemedText>

      {/* ----------------------------------------------------------- */}
      {/* Example 6: Transparent Background and Custom Padding */}
      <ThemedText style={styles.sectionTitle}>
        Transparent Background and Custom Padding
      </ThemedText>
      <ThemedChoiceChips
        containerStyle={styles.choiceChips}
        items={items6}
        selectedIndices={selectedIndices6}
        onSelectedChange={setSelectedIndices6}
        backgroundUntoggled={{
          light: "transparent",
          dark: "transparent",
        }}
        backgroundToggled={{
          light: "rgba(0, 150, 136, 0.2)",
          dark: "rgba(0, 150, 136, 0.2)",
        }}
        textIconUntoggledColor={{
          light: "#009688",
          dark: "#80cbc4",
        }}
        textIconToggledColor={{
          light: "#ffffff",
          dark: "#ffffff",
        }}
        padding={{
          internal: 12,
          color: { light: "rgba(0,0,0,0.05)", dark: "rgba(255,255,255,0.05)" },
        }}
        accessibilityLabel="Transparent Background Choice Chips"
        themeType="primary"
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {selectedIndices6.map((index) => items6[index].title).join(", ") ||
          "None"}
      </ThemedText>

      {/* ----------------------------------------------------------- */}
      {/* Example 7: iOS Native-like Choice Chips (MAX.3) */}
      <ThemedText style={styles.sectionTitle}>
        iOS Native-like Choice Chips (MAX.3)
      </ThemedText>
      <ThemedChoiceChips
        containerStyle={styles.choiceChips}
        items={items7}
        maxSelected={3}
        selectedIndices={selectedIndices7}
        onSelectedChange={setSelectedIndices7}
        numberOfRows={1}
        verticalRowSpacing={10}
        horizontalChipSpacing={10}
        containerInternalPadding={10}
        customHeight={40}
        customWidth={60}
        customRadius="factor" // Pill-shaped
        roundedAllCorners={true}
        animatedPress={true}
        accessibilityLabel="iOS Native-like Choice Chips"
        themeType="primary"
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
        textStyle={{
          style: { fontWeight: "bold", fontSize: 16 },
        }}
      />
      <ThemedText style={styles.selectedText}>
        Selected:{" "}
        {selectedIndices7.map((index) => items7[index].title).join(", ") ||
          "None"}
      </ThemedText>
    </ScrollView>
  );
};

export default ThemedChoiceChipsExample;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
  },
  choiceChips: {
    width: "100%", // ensures each ThemedChoiceChips row is truly centered
    marginBottom: 10,
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#555555",
  },
});
