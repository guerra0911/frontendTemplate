/**
 * ThemedCardExamples.tsx
 */

import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import ThemedCard from "@/components/templates/cards/ThemedCard";
import { ThemedText } from "@/components/templates/general/ThemedText";

const ThemedCardExamples: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>ThemedCard Examples</ThemedText>

      {/* 1. Elevated Primary */}
      <ThemedCard
        style={styles.card}
        mode="elevated"
        type="primary"
        onPress={() => Alert.alert("Elevated Primary Card pressed")}
      >
        <ThemedCard.Title
          title="Elevated Primary"
          subtitle="Tap me!"
        />
        <ThemedCard.Content>
          <ThemedText>
            This is an elevated primary card with default elevation.
          </ThemedText>
        </ThemedCard.Content>
      </ThemedCard>

      {/* 2. Outlined Secondary */}
      <ThemedCard
        style={styles.card}
        mode="outlined"
        type="secondary"
        onPress={() => Alert.alert("Outlined Secondary Card pressed")}
      >
        <ThemedCard.Title title="Outlined Secondary" />
        <ThemedCard.Content>
          <ThemedText>Outlined, with a secondary color scheme.</ThemedText>
        </ThemedCard.Content>
        <ThemedCard.Actions>
          <ThemedText onPress={() => Alert.alert("Action pressed")}>
            Action
          </ThemedText>
        </ThemedCard.Actions>
      </ThemedCard>

      {/* 3. Contained Tertiary (not pressable) */}
      <ThemedCard
        style={styles.card}
        mode="contained"
        type="tertiary"
      >
        <ThemedCard.Title
          title="Contained Tertiary"
          subtitle="Not pressable"
        />
        <ThemedCard.Content>
          <ThemedText>
            This card has a tertiary background, no outline, no elevation.
          </ThemedText>
        </ThemedCard.Content>
      </ThemedCard>

      {/* 4. Card with Cover Image */}
      <ThemedCard
        style={styles.card}
        mode="elevated"
        type="primary"
      >
        <ThemedCard.Cover source={{ uri: "https://picsum.photos/700" }} />
        <ThemedCard.Title title="Card with Cover" subtitle="Image on top" />
        <ThemedCard.Content>
          <ThemedText>A sample image is shown above.</ThemedText>
        </ThemedCard.Content>
      </ThemedCard>
    </View>
  );
};

export default ThemedCardExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    marginBottom: 20,
  },
  card: {
    width: "90%",
    marginBottom: 20,
  },
});
