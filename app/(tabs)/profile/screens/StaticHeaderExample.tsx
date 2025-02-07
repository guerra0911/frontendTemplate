// app/(tabs)/profile/screens/StaticHeaderExample.tsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import { ThemedStaticHeader } from "@/components/templates/pages/ThemedStaticHeader";
import ThemedCardExamples from "@/components/examples/cards/ThemedCardExamples";

export default function StaticHeaderExample() {
  const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 1500);
    };
    
  return (
    <ThemedStaticHeader
      headerProps={{
        renderCenter: () => (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Static Header</Text>
        ),
        noBottomBorder: false,
      }}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      scrollViewBackgroundColor={{ light: "#BA68C8", dark: "#222" }}
      backgroundColor={{ light: "#E1BEE7", dark: "#333" }}
    >
      <ThemedCardExamples />
    </ThemedStaticHeader>
  );
}
