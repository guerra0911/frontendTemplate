// app/(tabs)/explore/NonStickyRefresh.tsx
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";

export default function NonStickyRefreshScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  return (
    <>
      <ThemedCustomHeader
        title="Non Sticky + Refresh"
        showBackButton
        onBackPress={() => router.back()}
      />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <Text style={styles.title}>Non Sticky Header + Refresh Example</Text>
          <Text>Pull down to refresh.</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
});
