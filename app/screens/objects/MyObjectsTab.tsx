// app/screens/objects/MyObjectsTab.tsx

import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import ThemedCard from "@/components/templates/cards/ThemedCard";
import ThemedCardCover from "@/components/templates/cards/ThemedCardCover";
import ThemedCardContent from "@/components/templates/cards/ThemedCardContent";
import ThemedCardTitle from "@/components/templates/cards/ThemedCardTitle";
import ThemedCardActions from "@/components/templates/cards/ThemedCardActions";
import ThemedButton from "@/components/templates/buttons/ThemedButton";

export default function MyObjectsTab() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Objects</ThemedText>

      {/* Some ThemedCard examples */}
      <ThemedCard style={styles.card} mode="outlined">
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/chameleon/600/300" }}
        />
        <ThemedCardContent>
          <ThemedText>Outlined with Chameleon</ThemedText>
        </ThemedCardContent>
      </ThemedCard>

      <ThemedCard style={styles.card} mode="contained">
        <ThemedCardTitle
          title="Strawberries"
          subtitle="...and only strawberries"
          style={{ margin: 8 }}
        />
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/strawberries2/600/300" }}
        />
      </ThemedCard>

      <ThemedCard style={styles.card} mode="elevated">
        <ThemedCardTitle title="Long Pressable City" style={{ margin: 8 }} />
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/city/600/300" }}
        />
        <ThemedCardContent>
          <ThemedText>
            This card triggers an alert on long press only.
          </ThemedText>
        </ThemedCardContent>
      </ThemedCard>

      <ThemedCard style={styles.card} mode="outlined" contentPadding={16}>
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/customPadding/600/300" }}
          style={{ marginBottom: 8 }}
        />
        <ThemedCardTitle
          title="Custom Paddings"
          subtitle="Card & Subcomponents"
          style={{ margin: 8 }}
        />
        <ThemedCardContent style={{ marginBottom: 8 }}>
          <ThemedText>
            This demonstrates how you can add padding to the entire card...
          </ThemedText>
        </ThemedCardContent>
        <ThemedCardActions style={{ marginTop: 8 }}>
          <ThemedButton title="Action 1" onPress={() => {}} customWidth={162} />
          <ThemedButton title="Action 2" onPress={() => {}} customWidth={162} />
        </ThemedCardActions>
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
