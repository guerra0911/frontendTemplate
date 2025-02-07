// app/(tabs)/profile/index.tsx

import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedPage from "@/components/templates/pages/ThemedPage";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ThemedButton from "@/components/templates/buttons/ThemedButton";

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
    <ThemedPage
      title="@username"
      showBackButton={false}
      leftElement={
        <ThemedButton
          onPress={() => router.push("/settings")}
          icons={{
            iconName: "heart",
            iconLibrary: "FontAwesome",
            iconPosition: "right", // Icon on the right
            iconSize: 20,
          }}
          background={{
            light: "transparent",
            dark: "transparent",
          }}
          themeType="primary" // ThemeType can still be used for text/icon colors if needed
        />
      }
      rightElement={
        <Pressable onPress={() => {}} style={{ padding: 8 }}>
          {/* Could be an avatar... for now let's do a symbol */}
          <IconSymbol name="person.fill" size={28} color="#000" />
        </Pressable>
      }
      scrollable
      themeType="primary"
      refreshable
      onRefresh={onRefresh}
      refreshing={refreshing}
      isSticky={true}
      refreshIndicatorPosition="above" // NEW PROP
    >
      <ThemedText>Profile</ThemedText>
      <ThemedText type="default">
        Keep transparent backgrounds for these components so the theme
        background remains.
      </ThemedText>

      <View style={{ marginBottom: 16, paddingBottom: 100}}>
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
          title="Spotify Example"
          onPress={() =>
            router.push("/(tabs)/profile/screens/SpotifyExample")
          }
          style={{ marginVertical: 8 }}
        />
        {/* <ThemedButton
          title="Dynamic Tabs"
          onPress={() =>
            router.push("/(tabs)/profile/screens/DynamicTabExample")
          }
          style={{ marginVertical: 8 }}
        /> */}
        <ThemedButton
          title="Absolute Header Blur Surface"
          onPress={() =>
            router.push(
              "/(tabs)/profile/screens/AbsoluteHeaderBlurSurfaceExample"
            )
          }
          style={{ marginVertical: 8 }}
        />
        <ThemedButton
          title="Arbitrary Y Transition Header"
          onPress={() =>
            router.push(
              "/(tabs)/profile/screens/ArbitraryYTransitionHeaderExample"
            )
          }
          style={{ marginVertical: 8 }}
        />
        {/* <ThemedButton
          title="Custom Worklet"
          onPress={() =>
            router.push("/(tabs)/profile/screens/CustomWorkletExample")
          }
          style={{ marginVertical: 8 }}
        /> */}
        {/* <ThemedButton
          title="FlashList"
          onPress={() =>
            router.push("/(tabs)/profile/screens/FlashListExample")
          }
          style={{ marginVertical: 8 }}
        /> */}
        {/* <ThemedButton
          title="FlatList"
          onPress={() => router.push("/(tabs)/profile/screens/FlatListExample")}
          style={{ marginVertical: 8 }}
        /> */}
        <ThemedButton
          title="Inverted"
          onPress={() => router.push("/(tabs)/profile/screens/InvertedExample")}
          style={{ marginVertical: 8 }}
        />
        {/* <ThemedButton
          title="Masonry FlashList"
          onPress={() =>
            router.push("/(tabs)/profile/screens/MasonryFlashListExample")
          }
          style={{ marginVertical: 8 }}
        /> */}
        <ThemedButton
          title="SectionList"
          onPress={() =>
            router.push("/(tabs)/profile/screens/SectionListExample")
          }
          style={{ marginVertical: 8 }}
        />
        {/* <ThemedButton
          title="Simple"
          onPress={() => router.push("/(tabs)/profile/screens/SimpleExample")}
          style={{ marginVertical: 8 }}
        /> */}
        {/* <ThemedButton
          title="Surface Component"
          onPress={() =>
            router.push("/(tabs)/profile/screens/SurfaceComponentExample")
          }
          style={{ marginVertical: 8 }}
        /> */}
        
      </View>
    </ThemedPage>
  );
}
