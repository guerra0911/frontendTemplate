// app/(tabs)/home/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Use custom headers in each screen
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="HomeDetail" />
    </Stack>
  );
}
