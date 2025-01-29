// app/(tabs)/profile/screens/AbsoluteHeaderBlurSurfaceExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedAbsoluteHeaderBlurSurface } from "@/components/templates/pages/ThemedAbsoluteHeaderBlurSurface";

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
      <View style={{ padding: 16 }}>
        <Text>Scroll content here for Blur Surface.</Text>
      </View>
    </ThemedAbsoluteHeaderBlurSurface>
  );
}
