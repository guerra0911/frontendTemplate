// app/(tabs)/explore/StickyNoRefresh.tsx
import React from "react";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

import ThemedStickyHeader from "@/components/templates/headers/ThemedStickyHeader";

export default function StickyNoRefreshScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* A sticky header pinned to top */}
      <ThemedStickyHeader
        title="Sticky Header (No Refresh)"
        onBackPress={() => router.back()}
        showBackButton
      />

      {/* Body content is scrolled behind/under the header. We add top margin so the content starts below. */}
      <View style={[styles.body, { marginTop: 80 }]}>
        <Text style={styles.title}>Sticky Header, No Refresh Demo</Text>
        <Text>
          The header remains pinned at top while content scrolls behind it.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});
