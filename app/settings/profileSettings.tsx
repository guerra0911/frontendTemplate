// app/settings/profileSettings.tsx
import React from "react";
import { useRouter } from "expo-router";

import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";

export default function ProfileSettingsScreen() {
  const router = useRouter();

  return (
    <>
      <ThemedCustomHeader
        title="Profile Settings"
        showBackButton
        onBackPress={() => router.back()}
      />
      <ThemedScrollContainer>
        <ThemedText type="title">Profile Settings</ThemedText>
        {/* content here */}
      </ThemedScrollContainer>
    </>
  );
}
