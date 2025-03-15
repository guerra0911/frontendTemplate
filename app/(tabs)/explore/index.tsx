// app/(tabs)/explore/index.tsx
import React from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { ThemedAbsoluteHeaderBlurSurface } from "@/components/templates/pages/ThemedAbsoluteHeaderBlurSurface";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { ThemedText } from "@/components/templates/typography/ThemedText";

export default function ExploreNonStickyNoRefresh() {
  const router = useRouter();

  // Create a long list of items for scrolling
  const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  return (
    <ThemedAbsoluteHeaderBlurSurface
      headerFadeInThreshold={0.7}
      headerProps={{
        // No back button
        renderLeft: () => null,
        // Title set to "Explore Page"
        renderCenter: () => (
          <Text style={styles.headerTitle}>Explore Page</Text>
        ),
        borderWidth: 0,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>Let's Explore!</Text>
          </View>
        ),
        enableScaling: true,
      }}
      style={{ flex: 1 }}
    >
      <ThemedView style={styles.container}>
        {items.map((item, index) => (
          <ThemedText key={index} style={styles.itemText}>
            {item}
          </ThemedText>
        ))}
      </ThemedView>
    </ThemedAbsoluteHeaderBlurSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemText: {
    fontSize: 16,
    marginVertical: 8,
  },
});
