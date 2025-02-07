// app/(tabs)/profile/screens/CustomWorkletExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedCustomWorklet } from "@/components/templates/pages/ThemedCustomWorklet";
import ThemedCardExamples from "@/components/examples/cards/ThemedCardExamples";

/**
 * If you want a custom Reanimated worklet, 
 * pass onScrollWorklet to ThemedCustomWorklet using the rest of the props, e.g.:
 *  onScrollWorklet={(evt) => {...}}
 */

export default function CustomWorkletExample() {
  return (
    <ThemedCustomWorklet
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>Custom Worklet</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: "600" }}>Large Worklet Header</Text>
          </View>
        ),
      }}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
      onScrollWorklet={(evt) => {
        "worklet";
        // Custom reanimated logic here
      }}
    >
      <ThemedCardExamples />
    </ThemedCustomWorklet>
  );
}
