/**
 * ThemedToggleSwitchListItemExamples.tsx
 */
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedToggleSwitchListItem from "@/components/templates/lists/ThemedToggleSwitchListItem";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";
import ThemedCard from "@/components/templates/cards/ThemedCard";

export default function ThemedToggleSwitchListItemExamples() {
  const [switchVal1, setSwitchVal1] = useState(false);
  const [switchVal2, setSwitchVal2] = useState(true);
  const [switchVal3, setSwitchVal3] = useState(false);
  const [switchVal4, setSwitchVal4] = useState(false);
  const [switchVal5, setSwitchVal5] = useState(false);
  const [switchVal6, setSwitchVal6] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        ThemedToggleSwitchListItem Examples
      </ThemedText>

      <ThemedToggleSwitchListItem
        title="Toggle switch on right"
        value={switchVal1}
        onValueChange={setSwitchVal1}
        description="default right"
      />
      <ThemedToggleSwitchListItem
        title="Toggle left"
        switchPosition="left"
        value={switchVal2}
        onValueChange={setSwitchVal2}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">Tap entire item to toggle</ThemedText>
      <ThemedToggleSwitchListItem
        toggleOnPressItem
        title="Tap item toggles switch"
        description="toggleOnPressItem"
        value={switchVal3}
        onValueChange={setSwitchVal3}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">Custom sizing + spacing</ThemedText>
      <ThemedToggleSwitchListItem
        title="Big switch, bigger item"
        value={switchVal4}
        onValueChange={setSwitchVal4}
        width={300}
        height={60}
        leftToContentSpacing={20}
        contentAlignment="center"
        switchProps={{
          width: 80,
          height: 44,
          themeType: "secondary",
        }}
        description="centered text"
      />

      <ThemedText type="subtitle">Disable ripple effect</ThemedText>
      <ThemedToggleSwitchListItem
        title="No ripple toggle item"
        value={switchVal5}
        onValueChange={setSwitchVal5}
        disableRippleEffect
      />

      <ThemedText type="subtitle">
        Embed ThemedCard on the right, plus switch on left
      </ThemedText>
      <ThemedToggleSwitchListItem
        value={switchVal6}
        onValueChange={setSwitchVal6}
        switchPosition="left"
        rightChildren={
          <ThemedCard style={{ padding: 8, width: 120 }}>
            <ThemedCard.Title title="Right Card" />
          </ThemedCard>
        }
        title="Switch on left, card on right"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
});
