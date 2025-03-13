import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemedNoHeader } from "@/components/templates/pages/ThemedNoHeader";

export default function NoHeaderExample() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <ThemedNoHeader
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      scrollViewBackgroundColor={{ light: "#E1BEE7", dark: "#333" }}
      backgroundColor={{ light: "#ffffff", dark: "#222" }}
      topSafeAreaBackgroundColor={{ light: "#BA68C8", dark: "#111" }}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 0 }}
    >
      <View style={styles.placeholder}>
        <Text style={styles.title}>No Header, Blank Page Example</Text>
      </View>
      {Array.from({ length: 30 }).map((_, i) => (
        <View key={i} style={styles.item}>
          <Text>Item #{i + 1}</Text>
        </View>
      ))}
    </ThemedNoHeader>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  item: {
    height: 60,
    backgroundColor: "#D1C4E9",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
