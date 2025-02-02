// app/settings/notificationSettings.tsx
import React from "react";
import { useRouter } from "expo-router";

import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";

export default function NotificationSettingsScreen() {
  const router = useRouter();

  return (
    <>
      <ThemedCustomHeader
        title="Notification Settings"
        showBackButton
        onBackPress={() => router.back()}
      />
      <ThemedScrollContainer>
        <ThemedText type="title">Notification Settings</ThemedText>
        {/* More content here */}
      </ThemedScrollContainer>
    </>
  );
}
