// app/(tabs)/profile/screens/ScrollingHeaderExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedScrollingHeader } from "@/components/templates/pages/ThemedScrollingHeader";

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
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ fontSize: 18 }}>
          This header is part of the scrollable content. Scroll up to see it disappear.
        </Text>
      </View>

      <View style={{ height: 1000, backgroundColor: "#ccc", marginTop: 10 }}>
        <Text style={{ margin: 16 }}>A tall content region for demonstration.</Text>
      </View>
    </ThemedScrollingHeader>
  );
}
