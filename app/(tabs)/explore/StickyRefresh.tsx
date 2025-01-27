// app/(tabs)/explore/StickyRefresh.tsx
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";

import ThemedStickyHeader from "@/components/templates/headers/ThemedStickyHeader";

export default function StickyRefreshScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <View style={styles.container}>
      <ThemedStickyHeader
        title="Sticky Header + Refresh"
        showBackButton
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={[styles.body, { marginTop: 80 }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Sticky Header + Refresh Example</Text>
        <Text>Pull down to refresh; header remains at the top.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { flex: 1 },
  title: {
    fontSize: 18,
    margin: 16,
  },
});
