// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/colors/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { HapticTab } from "@/components/templates/general/HapticTab";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const activeTint = Colors[colorScheme ?? "light"].tint;

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // No default headers on the tab screens
        tabBarActiveTintColor: activeTint,
        tabBarBackground: TabBarBackground,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="objects"
        options={{
          title: "Objects",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cube.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="t.bubble.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
