// app/screens/objects/AllObjectsTab.tsx

import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import ThemedCard from "@/components/templates/cards/ThemedCard";
import ThemedCardCover from "@/components/templates/cards/ThemedCardCover";
import ThemedCardContent from "@/components/templates/cards/ThemedCardContent";
import ThemedCardTitle from "@/components/templates/cards/ThemedCardTitle";
import ThemedButton from "@/components/templates/buttons/ThemedButton";

export default function AllObjectsTab() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">All Objects</ThemedText>
      <ThemedText>
        Keep transparent backgrounds for these components rendered so that the background color stays true to the theme
      </ThemedText>

      {/* Some ThemedCard examples */}
      <ThemedCard style={styles.card} mode="elevated">
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/wrecked-ship/600/300" }}
        />
        <ThemedCardTitle
          title="Abandoned Ship"
          style={{ marginHorizontal: 16, marginVertical: 8 }}
        />
        <ThemedCardContent>
          <ThemedText>
            The Abandoned Ship is a wrecked ship found on Route 108 in Hoenn...
          </ThemedText>
        </ThemedCardContent>
      </ThemedCard>

      <ThemedCard style={styles.card} mode="outlined">
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/forest/600/300" }}
          height={220}
        />
        <ThemedCardContent>
          <ThemedText>Outlined Mode Example</ThemedText>
        </ThemedCardContent>
      </ThemedCard>

      <ThemedCard style={styles.card} mode="contained">
        <ThemedCardTitle
          title="Berries that are trimmed"
          subtitle="Omega Ruby"
          style={{ margin: 8 }}
        />
        <ThemedCardContent>
          <ThemedText>
            Dotted around the Hoenn region, you will find loamy soil...
          </ThemedText>
        </ThemedCardContent>
      </ThemedCard>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'transparent'
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
});
