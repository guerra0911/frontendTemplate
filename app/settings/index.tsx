import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/templates/containers/ThemedView';
import { ThemedText } from '@/components/templates/typography/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { Routes } from '@/routes';
import { settingsStyles } from '@/styles/settingsStyles'; // Import the settingsStyles
import ThemedScrollContainer from '@/components/templates/containers/ThemedScrollContainer';

export default function MainSettingsScreen() {
  const router = useRouter();
  const styles = settingsStyles(); // Initialize dynamic styles

  const navigateToNotificationSettings = () => {router.push(Routes.notificationSettings);};
  const navigateToProfileSettings = () => {router.push(Routes.profileSettings);};
  const navigateToPrivacySettings = () => {router.push(Routes.privacySettings);};

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a refresh action, e.g., fetching new messages
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulate 1-second refresh
  }, []);
  
  return (
    <ThemedScrollContainer
      isScrollable={true}
      isRefreshable={false}
      onRefresh={onRefresh}
      refreshing={refreshing}
    >
      <ThemedText type="title">Settings</ThemedText>

      <TouchableOpacity
        style={styles.button}
        onPress={navigateToNotificationSettings}
      >
        <IconSymbol size={24} name="bell.badge.fill" color={styles.loneIcon.color} />
        <ThemedText style={styles.buttonText}>Notification Settings</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={navigateToProfileSettings}
      >
        <IconSymbol size={24} name="person.2.circle.fill" color={styles.loneIcon.color} />
        <ThemedText style={styles.buttonText}>Profile Settings</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={navigateToPrivacySettings}
      >
        <IconSymbol size={24} name="lock.fill" color={styles.loneIcon.color} />
        <ThemedText style={styles.buttonText}>Privacy Settings</ThemedText>
      </TouchableOpacity>
    </ThemedScrollContainer>
  );
}
