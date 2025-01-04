// app/settings/_layout.tsx

import { Stack } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";

// Import custom header components
import { SettingsIndexHeader } from "@/components/headers/settings/SettingsIndexHeader";
import { NotificationSettingsHeader } from "@/components/headers/settings/NotificationSettingsHeader";
import { PrivacySettingsHeader } from "@/components/headers/settings/PrivacySettingsHeader";
import { ProfileSettingsHeader } from "@/components/headers/settings/ProfileSettingsHeader";

export default function SettingsLayout() {
  const colorScheme = useColorScheme();

  // Get header background color based on theme
  const headerBackgroundColor = useThemeColor(
    { light: Colors.light.headerBackground, dark: Colors.dark.headerBackground },
    'headerBackground'
  );

  // Get header text color based on theme
  const headerTextColor = Colors[colorScheme ?? 'light'].text;

  return (
    <Stack
      screenOptions={{
        headerShown: true, // Show headers for all settings screens
        headerStyle: {
          backgroundColor: headerBackgroundColor,
        },
        headerTintColor: headerTextColor,
        animation: Platform.OS === "ios" ? "slide_from_right" : "fade",
      }}
    >
      {/* Main Settings Screen */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          header: ({ navigation, route, options }) => (
            <SettingsIndexHeader
              title={options.title ?? 'Settings'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
        }}
      />

      {/* Notification Settings Screen */}
      <Stack.Screen
        name="notificationSettings"
        options={{
          title: 'Notification Settings',
          header: ({ navigation, route, options }) => (
            <NotificationSettingsHeader
              title={options.title ?? 'Notification Settings'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
        }}
      />

      {/* Privacy Settings Screen */}
      <Stack.Screen
        name="privacySettings"
        options={{
          title: 'Privacy Settings',
          header: ({ navigation, route, options }) => (
            <PrivacySettingsHeader
              title={options.title ?? 'Privacy Settings'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
        }}
      />

      {/* Profile Settings Screen */}
      <Stack.Screen
        name="profileSettings"
        options={{
          title: 'Profile Settings',
          header: ({ navigation, route, options }) => (
            <ProfileSettingsHeader
              title={options.title ?? 'Profile Settings'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
        }}
      />
    </Stack>
  );
}
