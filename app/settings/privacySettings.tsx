// app/settings/privacySettings.tsx
import React from "react";
import { useRouter } from "expo-router";

import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";

export default function PrivacySettingsScreen() {
  const router = useRouter();

  return (
    <>
      <ThemedCustomHeader
        title="Privacy Settings"
        showBackButton
        onBackPress={() => router.back()}
      />
      <ThemedScrollContainer>
        <ThemedText type="title">Privacy Settings</ThemedText>
        {/* content here */}
      </ThemedScrollContainer>
    </>
  );
}
