// app/(auth)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // hide react-navigation's header
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
