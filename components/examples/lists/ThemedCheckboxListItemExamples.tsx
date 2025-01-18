/**
 * ThemedCheckboxListItemExamples.tsx
 *
 * Demonstrates usage of ThemedCheckboxListItem with various states, positions, custom sizing, spacing, etc.
 */
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedCheckboxListItem from "@/components/templates/lists/ThemedCheckboxListItem";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";

export default function ThemedCheckboxListItemExamples() {
  const [checkboxVal1, setCheckboxVal1] = useState(false);
  const [checkboxVal2, setCheckboxVal2] = useState(true);
  const [checkboxVal3, setCheckboxVal3] = useState(false);
  const [checkboxVal4, setCheckboxVal4] = useState(false);
  const [checkboxVal5, setCheckboxVal5] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="title">
        ThemedCheckboxListItem Examples
      </ThemedText>

      {/* Basic usage, left position */}
      <ThemedCheckboxListItem
        title="Default left checkbox"
        value={checkboxVal1}
        onValueChange={setCheckboxVal1}
      />
      <ThemedCheckboxListItem
        title="Default left + description"
        description="Checkbox is on the left."
        value={checkboxVal2}
        onValueChange={setCheckboxVal2}
      />
      <ThemedDivider />

      {/* Right position */}
      <ThemedText type="subtitle">Checkbox on Right</ThemedText>
      <ThemedCheckboxListItem
        checkboxPosition="right"
        title="Right side"
        value={checkboxVal3}
        onValueChange={setCheckboxVal3}
      />
      <ThemedDivider />

      {/* toggleOnPressItem */}
      <ThemedText type="subtitle">Toggling by tapping entire item</ThemedText>
      <ThemedCheckboxListItem
        toggleOnPressItem
        title="Tap anywhere to toggle"
        description="Check on press item"
        value={checkboxVal4}
        onValueChange={setCheckboxVal4}
      />
      <ThemedDivider />

      {/* Custom sizing + spacing */}
      <ThemedText type="subtitle">Custom dimension + spacing</ThemedText>
      <ThemedCheckboxListItem
        title="Custom Size & Large Spacing"
        description="checkbox is custom sized"
        value={checkboxVal5}
        onValueChange={setCheckboxVal5}
        width={300}
        height={60}
        leftToContentSpacing={30}
        checkBoxProps={{
          customSize: 30,
          customRadius: "factor",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
});
