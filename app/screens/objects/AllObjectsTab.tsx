// app/screens/objects/AllObjectsTab.tsx

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";
import ThemedCard from "@/components/templates/cards/ThemedCard";
import ThemedCardCover from "@/components/templates/cards/ThemedCardCover";
import ThemedCardContent from "@/components/templates/cards/ThemedCardContent";
import ThemedCardTitle from "@/components/templates/cards/ThemedCardTitle";
import ThemedButton from "@/components/templates/buttons/ThemedButton";

export default function AllObjectsTab() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    // Simulate an async refresh
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <ThemedScrollContainer
      isScrollable
      isRefreshable
      onRefresh={handleRefresh}
      refreshing={refreshing}
      contentContainerStyle={styles.contentContainer}
    >
      <ThemedText style={styles.title}>All Objects</ThemedText>
      <ThemedText type="default" style={styles.description}>
        Keep transparent backgrounds for these components...
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

      {/* Extra space at the bottom */}
      <ThemedText style={{ marginVertical: 20, textAlign: "center" }}>
        End of All Objects
      </ThemedText>
    </ThemedScrollContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    // optional additional styling
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 20,
  },
});
