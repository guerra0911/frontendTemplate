// app/screens/objects/AllObjectsTab.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/templates/typography/ThemedText';

export default function AllObjectsTab() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>All Objects</ThemedText>
      <ThemedText type='default'>Keep transparent backgrounds for these components rendered so that the background color stays true to the theme</ThemedText>
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
