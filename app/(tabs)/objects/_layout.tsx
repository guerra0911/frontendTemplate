// app/(tabs)/objects/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function ObjectsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
