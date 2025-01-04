// ThemedDropDownPickerExamples.tsx

import React, { useState } from "react";
import { StyleSheet, View, Alert, ScrollView, Text } from "react-native";
import ThemedDropDownPicker from "@/components/templates/buttons/ThemedDropDownPicker";
import { ThemedText } from "@/components/templates/general/ThemedText"; // Assuming you have a ThemedText component

const ThemedDropDownPickerExamples: React.FC = () => {
  // States for each dropdown example
  const [primaryValue, setPrimaryValue] = useState<any>(null);
  const [secondaryValue, setSecondaryValue] = useState<any>(null);
  const [tertiaryValue, setTertiaryValue] = useState<any>(null);
  const [customStyleValue, setCustomStyleValue] = useState<any>(null);
  const [multipleValue1, setMultipleValue1] = useState<any>(null);
  const [multipleValue2, setMultipleValue2] = useState<any>(null);

  // Example items for dropdowns
  const fruitItems = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Pear", value: "pear" },
  ];

  const colorItems = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ];

  const countryItems = [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "Mexico", value: "mx" },
  ];

  // Common selection handler
  const handleSelection = (value: any, description: string) => {
    Alert.alert("Selection Made", `${description}: ${value}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* PRIMARY THEME */}
      <View style={styles.exampleSection}>
        <ThemedText style={styles.sectionTitle}>Primary Theme</ThemedText>
        <ThemedDropDownPicker
          items={fruitItems}
          placeholder="Select a fruit"
          value={primaryValue}
          onValueChange={(value) => {
            setPrimaryValue(value);
            handleSelection(value, "Primary Dropdown");
          }}
          themeType="primary"
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdownList}
        />
        <ThemedText style={styles.selectedText}>
          Selected Fruit: {primaryValue ?? "None"}
        </ThemedText>
      </View>

      {/* SECONDARY THEME */}
      <View style={styles.exampleSection}>
        <ThemedText style={styles.sectionTitle}>Secondary Theme</ThemedText>
        <ThemedDropDownPicker
          items={colorItems}
          placeholder="Select a color"
          value={secondaryValue}
          onValueChange={(value) => {
            setSecondaryValue(value);
            handleSelection(value, "Secondary Dropdown");
          }}
          themeType="secondary"
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdownList}
        />
        <ThemedText style={styles.selectedText}>
          Selected Color: {secondaryValue ?? "None"}
        </ThemedText>
      </View>

      {/* TERTIARY THEME */}
      <View style={styles.exampleSection}>
        <ThemedText style={styles.sectionTitle}>Tertiary Theme</ThemedText>
        <ThemedDropDownPicker
          items={countryItems}
          placeholder="Select a country"
          value={tertiaryValue}
          onValueChange={(value) => {
            setTertiaryValue(value);
            handleSelection(value, "Tertiary Dropdown");
          }}
          themeType="tertiary"
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdownList}
        />
        <ThemedText style={styles.selectedText}>
          Selected Country: {tertiaryValue ?? "None"}
        </ThemedText>
      </View>

      {/* CUSTOM PLACEHOLDER */}
      <View style={styles.exampleSection}>
        <ThemedText style={styles.sectionTitle}>Custom Placeholder</ThemedText>
        <ThemedDropDownPicker
          items={fruitItems}
          placeholder="Choose your favorite fruit"
          value={customStyleValue}
          onValueChange={(value) => {
            setCustomStyleValue(value);
            handleSelection(value, "Custom Placeholder Dropdown");
          }}
          themeType="primary"
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdownList}
        />
        <ThemedText style={styles.selectedText}>
          Selected Fruit: {customStyleValue ?? "None"}
        </ThemedText>
      </View>

      {/* MULTIPLE DROPDOWNS */}
      <View style={styles.exampleSection}>
        <ThemedText style={styles.sectionTitle}>Multiple Dropdowns</ThemedText>
        <ThemedDropDownPicker
          items={colorItems}
          placeholder="Select a color"
          value={multipleValue1}
          onValueChange={(value) => {
            setMultipleValue1(value);
            handleSelection(value, "First Dropdown");
          }}
          themeType="secondary"
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdownList}
        />
        <ThemedText style={styles.selectedText}>
          Selected Color: {multipleValue1 ?? "None"}
        </ThemedText>
        </View>
        <View style={styles.exampleSection}>
        <ThemedDropDownPicker
          items={countryItems}
          placeholder="Select a country"
          value={multipleValue2}
          onValueChange={(value) => {
            setMultipleValue2(value);
            handleSelection(value, "Second Dropdown");
          }}
          themeType="tertiary"
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdownList}
        />
        <ThemedText style={styles.selectedText}>
          Selected Country: {multipleValue2 ?? "None"}
        </ThemedText>
      </View>

      {/* CUSTOM STYLES */}
      <View style={styles.exampleSectionLarge}>
        <ThemedText style={styles.sectionTitle}>Custom Styles</ThemedText>
        <ThemedDropDownPicker
          items={fruitItems}
          placeholder="Select a fruit with custom styles"
          value={customStyleValue}
          onValueChange={(value) => {
            setCustomStyleValue(value);
            handleSelection(value, "Custom Styled Dropdown");
          }}
          themeType="primary"
          containerStyle={[styles.dropdownContainer, styles.customContainer]}
          dropDownContainerStyle={[
            styles.dropdownList,
            styles.customDropDownList,
          ]}
        />
        <ThemedText style={styles.selectedText}>
          Selected Fruit: {customStyleValue ?? "None"}
        </ThemedText>
      </View>

      {/* ADDITIONAL CUSTOMIZATION EXAMPLE */}
      <View style={styles.exampleSectionMassive}>
        <ThemedText style={styles.sectionTitle}>Additional Customization</ThemedText>
        <ThemedDropDownPicker
          items={[
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 },
            { label: "Option 3", value: 3 },
            { label: "Option 4", value: 4 },
            { label: "Option 5", value: 5 },
          ]}
          placeholder="Select an option"
          value={customStyleValue}
          onValueChange={(value) => {
            setCustomStyleValue(value);
            handleSelection(value, "Additional Customization Dropdown");
          }}
          themeType="secondary"
          containerStyle={[styles.dropdownContainer, styles.additionalContainer]}
          dropDownContainerStyle={[
            styles.dropdownList,
            styles.additionalDropDownList,
          ]}
        />
        <ThemedText style={styles.selectedText}>
          Selected Option: {customStyleValue ?? "None"}
        </ThemedText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent", // Light background for better visibility
  },
  exampleSection: {
    width: "100%",
    marginVertical: 75,
    alignItems: "center",
  },
  exampleSectionLarge: {
    width: "100%",
    marginVertical: 100,
    alignItems: "center",
  },
  exampleSectionMassive: {
    width: "100%",
    marginVertical: 100,
    marginBottom: 175,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
  },
  dropdownContainer: {
    width: "90%",
    marginBottom: 10,
  },
  dropdownList: {
    // Default dropdown list styles
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    color: "#555555",
    marginTop: 5,
  },
  customContainer: {
    borderRadius: 10,
    borderWidth: 2,
  },
  customDropDownList: {
    borderRadius: 10,
    borderWidth: 2,
  },
  additionalContainer: {
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    borderColor: "#00acc1",
  },
  additionalDropDownList: {
    backgroundColor: "#b2ebf2",
    borderRadius: 8,
    borderColor: "#00acc1",
  },
});

export default ThemedDropDownPickerExamples;
