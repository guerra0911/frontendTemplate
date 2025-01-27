// app/(tabs)/explore/index.tsx
import React from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { ThemedText } from "@/components/templates/typography/ThemedText";

export default function ExploreNonStickyNoRefresh() {
  const router = useRouter();

  return (
    <>
      {/* Non Sticky => just a normal static header on top */}
      <ThemedCustomHeader
        title="Explore (Non Sticky, No Refresh)"
        showBackButton={false} // It's a base tab, no back button
        rightIcon="arrow-forward"
        onRightPress={() => router.push("/(tabs)/explore/NonStickyRefresh")}
      />

      {/* Then your page content */}
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>
          This is "Non Sticky Header + No Refresh" example
        </ThemedText>
        <ThemedText>Press the top-right arrow to see a Sticky Header (No Refresh).</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
});
