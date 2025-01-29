// app/(tabs)/profile/screens/FlashListExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedFlashList } from "@/components/templates/pages/ThemedFlashList";

export default function FlashListExample() {
  const data = Array.from({ length: 50 }).map((_, i) => `Item #${i}`);

  return (
    <ThemedFlashList<string>
      data={data}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 0.5 }}>
          <Text>{item}</Text>
        </View>
      )}
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>FlashList Header</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20 }}>Large FlashList Header</Text>
          </View>
        ),
        enableScaling: true,
      }}
      keyExtractor={(item) => item}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
}
