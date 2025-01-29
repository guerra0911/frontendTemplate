// app/(tabs)/profile/screens/StaticHeaderExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedStaticHeader } from "@/components/templates/pages/ThemedStaticHeader";

export default function StaticHeaderExample() {
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
    >
      <View>
        <Text style={{ fontSize: 20, marginVertical: 12 }}>
          This page has a static header, no large header, no scroll animation. 
          The header remains constant.
        </Text>
      </View>
    </ThemedStaticHeader>
  );
}
