// app/screens/objects/MyObjectsTab.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/templates/typography/ThemedText';

export default function MyObjectsTab() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>My Objects</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
