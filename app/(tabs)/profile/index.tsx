// app/(tabs)/profile/index.tsx

import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

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
        Keep transparent backgrounds for these components so the theme background remains.
      </ThemedText>
    </ThemedPage>
  );
}
