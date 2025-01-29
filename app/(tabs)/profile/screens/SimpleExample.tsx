// app/(tabs)/profile/screens/SimpleExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedSimple } from "@/components/templates/pages/ThemedSimple";

export default function SimpleExample() {
  return (
    <ThemedSimple
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>Simple Header</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 24 }}>Large Simple Header</Text>
          </View>
        ),
        enableScaling: true,
      }}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text>Hello from ThemedSimple screen!</Text>
    </ThemedSimple>
  );
}
