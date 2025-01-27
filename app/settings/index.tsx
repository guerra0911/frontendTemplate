// app/settings/index.tsx
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import ThemedScrollContainer from "@/components/templates/containers/ThemedScrollContainer";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { settingsStyles } from "@/styles/settingsStyles";
import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";

export default function MainSettingsScreen() {
  const router = useRouter();
  const styles = settingsStyles();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const navigateToNotificationSettings = () => {
    router.push("/settings/notificationSettings");
  };
  const navigateToProfileSettings = () => {
    router.push("/settings/profileSettings");
  };
  const navigateToPrivacySettings = () => {
    router.push("/settings/privacySettings");
  };

  return (
    <>
      {/* A custom header with a back button */}
      <ThemedCustomHeader
        title="Settings"
        showBackButton
        onBackPress={() => router.back()}
      />

      <ThemedScrollContainer
        isScrollable
        isRefreshable={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
      >
        <ThemedText type="title">Settings</ThemedText>

        <TouchableOpacity style={styles.button} onPress={navigateToNotificationSettings}>
          <IconSymbol size={24} name="bell.badge.fill" color={styles.loneIcon.color} />
          <ThemedText style={styles.buttonText}>Notification Settings</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToProfileSettings}>
          <IconSymbol size={24} name="person.2.circle.fill" color={styles.loneIcon.color} />
          <ThemedText style={styles.buttonText}>Profile Settings</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToPrivacySettings}>
          <IconSymbol size={24} name="lock.fill" color={styles.loneIcon.color} />
          <ThemedText style={styles.buttonText}>Privacy Settings</ThemedText>
        </TouchableOpacity>
      </ThemedScrollContainer>
    </>
  );
}
