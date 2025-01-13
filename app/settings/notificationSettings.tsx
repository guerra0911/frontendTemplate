import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/templates/containers/ThemedView';
import { ThemedText } from '@/components/templates/typography/ThemedText';
import ThemedScrollContainer from '@/components/templates/containers/ThemedScrollContainer';

export default function NotificationSettingsScreen() {
  return (
    <ThemedScrollContainer
      isScrollable={true}
      isRefreshable={false}
    >
      <ThemedText type="title">Notification Settings</ThemedText>
      {/* Add Notification Settings content here */}
    </ThemedScrollContainer>
  );
}
