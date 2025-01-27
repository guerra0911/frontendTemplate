// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import GlobalProvider from "@/contexts/GlobalProvider";
import PortalHost from "@/components/templates/portal/PortalHost";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <PortalHost>
        <NavigationThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              // Hide default header globally
              headerShown: false,
              animation: "slide_from_right",
              gestureEnabled: true,
            }}
          >
            {/** 
             * "index" chooses whether user sees auth or main tabs, depending on login state.
             */}
            <Stack.Screen name="index" />

            {/** Auth flow route */}
            <Stack.Screen name="(auth)" />

            {/** Main tabs route */}
            <Stack.Screen name="(tabs)" />

            {/** Global settings route */}
            <Stack.Screen name="settings" />
          </Stack>
          <StatusBar style="auto" />
        </NavigationThemeProvider>
      </PortalHost>
    </GlobalProvider>
  );
}
