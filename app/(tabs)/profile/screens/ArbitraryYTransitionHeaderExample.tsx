// app/(tabs)/profile/screens/ArbitraryYTransitionHeaderExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedArbitraryYTransitionHeader } from "@/components/templates/pages/ThemedArbitraryYTransitionHeader";

export default function ArbitraryYTransitionHeaderExample() {
  return (
    <ThemedArbitraryYTransitionHeader
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>Arbitrary Y Header</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 28 }}>Large Arbitrary Y Header</Text>
          </View>
        ),
        enableScaling: true,
      }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text>Scroll content for arbitrary y transition.</Text>
    </ThemedArbitraryYTransitionHeader>
  );
}
