import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/templates/general/ThemedText';
import ThemedScrollContainer from '@/components/templates/containers/ThemedScrollContainer';

export default function ProfileSettingsScreen() {
  return (
    <ThemedScrollContainer
      isScrollable={true}
      isRefreshable={false}
    >
      <ThemedText type="title">Profile Settings</ThemedText>
      {/* Add Profile Settings content here */}
    </ThemedScrollContainer>
  );
}
