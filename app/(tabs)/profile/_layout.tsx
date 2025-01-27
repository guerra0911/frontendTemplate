// app/(tabs)/profile/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // all custom
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
