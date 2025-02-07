// app/(tabs)/profile/screens/AbsoluteHeaderBlurSurfaceExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedAbsoluteHeaderBlurSurface } from "@/components/templates/pages/ThemedAbsoluteHeaderBlurSurface";
import ThemedCardExamples from "@/components/examples/cards/ThemedCardExamples";

export default function AbsoluteHeaderBlurSurfaceExample() {
  return (
    <ThemedAbsoluteHeaderBlurSurface
      // You can pass props like themeType="secondary", etc.
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16, fontWeight: "bold" }}>Blur Surface</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>Large Blur Header</Text>
          </View>
        ),
        enableScaling: true,
      }}
      style={{ flex: 1 }}
    >
      <ThemedCardExamples />
    </ThemedAbsoluteHeaderBlurSurface>
  );
}
