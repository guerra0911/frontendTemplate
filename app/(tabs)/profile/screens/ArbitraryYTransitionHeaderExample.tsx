// app/(tabs)/profile/screens/ArbitraryYTransitionHeaderExample.tsx
import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { ThemedArbitraryYTransitionHeader } from "@/components/templates/pages/ThemedArbitraryYTransitionHeader";
import ThemedCardExamples from "@/components/examples/cards/ThemedCardExamples";

export default function ArbitraryYTransitionHeaderExample() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const data = Array.from({ length: 50 }).map((_, i) => i);

  return (
    <ThemedArbitraryYTransitionHeader
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>Arbitrary Y Header</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 28 }}>Large Arbitrary Y Header</Text>
          </View>
        ),
        enableScaling: true,
      }}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      <ThemedCardExamples />
    </ThemedArbitraryYTransitionHeader>
  );
}
