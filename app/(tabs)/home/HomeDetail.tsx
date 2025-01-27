// app/(tabs)/home/HomeDetail.tsx
import React from "react";
import { Button } from "react-native";
import { useRouter } from "expo-router";

import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";

export default function HomeDetailScreen() {
  const router = useRouter();

  return (
    <>
      {/* Custom header with a back button */}
      <ThemedCustomHeader
        title="Home Detail"
        showBackButton
        onBackPress={() => router.back()}
      />

      <ThemedScrollContainer>
        <ThemedText type="title">Home Detail Screen</ThemedText>
        <ThemedText>Slide in from right with a custom back button.</ThemedText>
        <Button title="Go Back" onPress={() => router.back()} />
      </ThemedScrollContainer>
    </>
  );
}
