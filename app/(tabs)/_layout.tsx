// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/templates/general/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/colors/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

// Import custom header components
import { HomeHeader } from '@/components/headers/tabs/HomeHeader';
import { ExploreHeader } from '@/components/headers/tabs/ExploreHeader';
import { MessagesHeader } from '@/components/headers/tabs/MessagesHeader';
import { ObjectsHeader } from '@/components/headers/tabs/ObjectsHeader';
import { ProfileHeader } from '@/components/headers/tabs/ProfileHeader';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Get header background color based on theme
  const headerBackgroundColor = useThemeColor(
    { light: Colors.light.headerBackground, dark: Colors.dark.headerBackground },
    'headerBackground'
  );

  // Get header text color based on theme
  const headerTextColor = Colors[colorScheme ?? 'light'].text;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerStyle: {
          backgroundColor: headerBackgroundColor,
        },
        headerTintColor: headerTextColor,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {/* Home Tab with Custom Header */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          header: ({ navigation, route, options }) => (
            <HomeHeader
              title={options.title ?? 'Home'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {/* Objects Tab with Custom Header */}
      <Tabs.Screen
        name="objects"
        options={{
          title: 'Objects',
          header: ({ navigation, route, options }) => (
            <ObjectsHeader
              title={options.title ?? 'Objects'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cube.fill" color={color} />,
        }}
      />

      {/* Explore Tab with Custom Header */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          header: ({ navigation, route, options }) => (
            <ExploreHeader
              title={options.title ?? 'Explore'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      {/* Messages Tab with Custom Header */}
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          header: ({ navigation, route, options }) => (
            <MessagesHeader
              title={options.title ?? 'Messages'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="t.bubble.fill" color={color} />,
        }}
      />

      {/* Profile Tab with Custom Header */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          header: ({ navigation, route, options }) => (
            <ProfileHeader
              title={options.title ?? 'Profile'}
              navigation={navigation}
              route={route}
              backgroundColor={headerBackgroundColor}
              textColor={headerTextColor}
            />
          ),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}