// app/(tabs)/explore/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function ExploreLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      {/**
       * We'll create 4 routes to illustrate the combos:
       *  1) index => Non Sticky Header, No Refresh
       *  2) StickyNoRefresh => Sticky Header, No Refresh
       *  3) NonStickyRefresh => Non Sticky Header, Refresh
       *  4) StickyRefresh => Sticky Header, Refresh
       */}
      <Stack.Screen name="index" />
      <Stack.Screen name="StickyNoRefresh" />
      <Stack.Screen name="NonStickyRefresh" />
      <Stack.Screen name="StickyRefresh" />
    </Stack>
  );
}
