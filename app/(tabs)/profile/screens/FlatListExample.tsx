// app/(tabs)/profile/screens/FlatListExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedFlatList } from "@/components/templates/pages/ThemedFlatList";

export default function FlatListExample() {
  const data = Array.from({ length: 20 }).map((_, i) => `FlatList item #${i}`);

  return (
    <ThemedFlatList<string>
      data={data}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 0.5 }}>
          <Text>{item}</Text>
        </View>
      )}
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>FlatList Header</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Large FlatList Header</Text>
          </View>
        ),
        enableScaling: true,
      }}
      keyExtractor={(item) => item}
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
}
