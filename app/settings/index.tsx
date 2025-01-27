// app/settings/index.tsx

import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import ThemedPage from "@/components/templates/pages/ThemedPage";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { settingsStyles } from "@/styles/settingsStyles";

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
    <ThemedPage
      title="Settings"
      showBackButton={true}
      scrollable
      themeType="primary"
      refreshable
      onRefresh={onRefresh}
      refreshing={refreshing}
      isSticky={true}
      refreshIndicatorPosition="between" // NEW PROP
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
    </ThemedPage>
  );
}
