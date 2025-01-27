// app/settings/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We'll do custom headers inside each screen
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="notificationSettings" />
      <Stack.Screen name="privacySettings" />
      <Stack.Screen name="profileSettings" />
    </Stack>
  );
}
