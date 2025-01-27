// app/(tabs)/profile/index.tsx
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";
import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";
import { Pressable } from "react-native";
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
    <>
      {/* For the profile tab root, we do not show a back button, but we do show a gear icon on left */}
      <ThemedCustomHeader
        title="@username"
        showBackButton={false}
        leftIcon="cog"
        onLeftPress={() => router.push("/settings")}
        rightElement={
          <Pressable onPress={() => {}} style={{ padding: 8 }}>
            {/* Could be an avatar... for now let's do a symbol */}
            <IconSymbol name="person.fill" size={28} color="#000" />
          </Pressable>
        }
      />

      <ThemedScrollContainer
        isScrollable
        isRefreshable
        onRefresh={onRefresh}
        refreshing={refreshing}
      >
        <ThemedText>Profile</ThemedText>
        <ThemedText type="default">
          Keep transparent backgrounds for these components so the theme background remains.
        </ThemedText>
      </ThemedScrollContainer>
    </>
  );
}
