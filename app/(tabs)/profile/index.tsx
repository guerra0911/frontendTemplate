// app/(tabs)/profile/index.tsx

import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";

import ThemedStaticHeader from "@/components/templates/pages/ThemedStaticHeader";
import ThemedButton from "@/components/templates/buttons/ThemedButton";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ThemedStaticHeader
      themeType="primary"
      // Modern minimalistic background colors for header and scroll view:
      backgroundColor={{
        light: "#F8F9FA", // very light gray
        dark: "#1C1C1E",  // near-black for dark mode
      }}
      scrollViewBackgroundColor={{
        light: "#FFFFFF", // white for a clean look
        dark: "#000000",  // black for dark mode
      }}
      // Overall container style:
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      headerProps={{
        // Hide the back button by rendering nothing on the left:
        renderLeft: () => null,
        // Center title with a modern, bold text style:
        renderCenter: () => (
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#333" }}>
            Pages & Screens
          </Text>
        ),
        // Optional: simple right element (for example, an icon button)
        renderRight: () => (
          <Pressable onPress={() => router.push("/settings")} style={{ padding: 8 }}>
            <IconSymbol name="gearshape" size={24} color="#333" />
          </Pressable>
        ),
        // Minimalistic header style:
        headerStyle: {
          height: 110,
          width: "100%",
          paddingVertical: 10,
          backgroundColor: "transparent", // let the backgroundColor prop control it
          justifyContent: "center",
          alignItems: "center",
        },
        // Remove bottom border for a flat look:
        noBottomBorder: true,
        // Apply a slight blur for a modern touch:
        blurAmount: 20,
      }}
    >
      <Text style={{ marginBottom: 10, fontSize: 16, marginTop: 15 }}>Profile</Text>
      <Text style={{ marginBottom: 20, fontSize: 14 }}>
        Keep transparent backgrounds for these components so the theme background remains.
      </Text>

      <View style={{ marginBottom: 16 }}>
        <ThemedButton
          title="Static Header"
          onPress={() =>
            router.push("/(tabs)/profile/screens/StaticHeaderExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Static Header Static Tabbed"
          onPress={() =>
            router.push("/(tabs)/profile/screens/StaticHeaderStaticTabbedExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Static Header NonStatic Tabbed"
          onPress={() =>
            router.push("/(tabs)/profile/screens/StaticHeaderNonStaticTabbedExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Non Static Header"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NonStaticHeaderExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Non Static Header Non Static Tabbed"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NonStaticHeaderNonStaticTabbedExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Non Static Header Static Tabbed"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NonStaticHeaderStaticTabbedExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Non Static Header Top"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NonStaticHeaderTopExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Non Static Header Non Static Tabbed Top"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NonStaticHeaderNonStaticTabbedTopExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="No Header"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NoHeaderExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="No Header Static Tabbed"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NoHeaderStaticTabbedExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="No Header Non Static Tabbed"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NoHeaderNonStaticTabbedExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="No Header Non Static Tabbed Top"
          onPress={() =>
            router.push("/(tabs)/profile/screens/NoHeaderNonStaticTabbedTopExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Spotify Example"
          onPress={() =>
            router.push("/(tabs)/profile/screens/SpotifyExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Absolute Header Blur Surface"
          onPress={() =>
            router.push("/(tabs)/profile/screens/AbsoluteHeaderBlurSurfaceExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Arbitrary Y Transition Header"
          onPress={() =>
            router.push("/(tabs)/profile/screens/ArbitraryYTransitionHeaderExample")
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Inverted"
          onPress={() => router.push("/(tabs)/profile/screens/InvertedExample")}
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="SectionList"
          onPress={() =>
            router.push("/(tabs)/profile/screens/SectionListExample")
          }
          style={{ marginVertical: 8 }}
        />
      </View>
    </ThemedStaticHeader>
  );
}
