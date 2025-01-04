import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/templates/containers/ThemedView';
import { ThemedText } from '@/components/templates/general/ThemedText';
import ThemedScrollContainer from '@/components/templates/containers/ThemedScrollContainer';

export default function PrivacySettingsScreen() {  
  return (
    <ThemedScrollContainer
      isScrollable={true}
      isRefreshable={false}
    >
      <ThemedText type="title">Privacy Settings</ThemedText>
      {/* Add Privacy Settings content here */}
    </ThemedScrollContainer>
  );
}