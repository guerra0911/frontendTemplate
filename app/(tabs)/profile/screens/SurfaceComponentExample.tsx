// app/(tabs)/profile/screens/SurfaceComponentExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedSurfaceComponent } from "@/components/templates/pages/ThemedSurfaceComponent";

export default function SurfaceComponentExample() {
  return (
    <ThemedSurfaceComponent
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>Surface Header</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Large Surface Header</Text>
          </View>
        ),
        enableScaling: true,
      }}
      surfaceProps={{
        // optional custom fade or anything else
      }}
      style={{ flex: 1 }}
    >
      <View style={{ padding: 16 }}>
        <Text>Scroll content for a surface-based header effect.</Text>
      </View>
    </ThemedSurfaceComponent>
  );
}
