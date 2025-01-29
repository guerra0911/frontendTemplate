// app/(tabs)/profile/screens/InvertedExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedInverted } from "@/components/templates/pages/ThemedInverted";

export default function InvertedExample() {
  const data = Array.from({ length: 20 }).map((_, i) => `Msg #${i}`);

  return (
    <ThemedInverted<string>
      data={data}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderWidth: 0.5, marginVertical: 4 }}>
          <Text style={{ color: "#fff" }}>{item}</Text>
        </View>
      )}
      headerProps={{
        renderCenter: () => <Text style={{ color: "#fff" }}>Inverted Chat</Text>,
      }}
      keyExtractor={(item) => item}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}
