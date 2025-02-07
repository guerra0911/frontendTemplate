// app/(tabs)/profile/screens/ScrollingHeaderExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedScrollingHeader } from "@/components/templates/pages/ThemedScrollingHeader";
import ThemedCardExamples from "@/components/examples/cards/ThemedCardExamples";

export default function ScrollingHeaderExample() {
  return (
    <ThemedScrollingHeader
      headerProps={{
        renderCenter: () => (
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Scrolling Header</Text>
        ),
        noBottomBorder: false,
      }}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <ThemedCardExamples />
    </ThemedScrollingHeader>
  );
}
