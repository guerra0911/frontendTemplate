/**
 * ChasingDotLoadingIndicatorExamples.tsx
 *
 * Demonstrates usage of the ChasingDotLoadingIndicator.
 */

import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import ChasingDotLoadingIndicator from '@/components/templates/loaders/ChasingDotLoadingIndicator';
import { ThemedText } from '@/components/templates/general/ThemedText';

const ChasingDotLoadingIndicatorExamples: React.FC = () => {
  const [animating, setAnimating] = useState(true);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.sectionTitle}>
        ChasingDotLoadingIndicator Examples
      </ThemedText>

      {/* Default usage */}
      <ChasingDotLoadingIndicator animating={animating} style={styles.indicator} />

      {/* Custom size and color override */}
      <ChasingDotLoadingIndicator
        animating={animating}
        size={80}
        color={{ light: '#e74c3c', dark: '#c0392b' }}
        style={styles.indicator}
      />

      {/* Remain visible when stopped (hidesWhenStopped=false) */}
      <ChasingDotLoadingIndicator
        animating={animating}
        hidesWhenStopped={false}
        size={100}
        color={{ light: '#f1c40f', dark: '#f39c12' }}
        style={styles.indicator}
      />

      {/* Toggle Button */}
      <Button
        title={animating ? 'Stop' : 'Start'}
        onPress={() => setAnimating(!animating)}
      />
    </View>
  );
};

export default ChasingDotLoadingIndicatorExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // You can keep flexGrow or switch to flex: 1 based on your layout needs
    flexDirection: 'column', // Ensure vertical stacking
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    // Optionally add a background color for debugging
    // backgroundColor: 'rgba(0, 0, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  indicator: {
    marginVertical: 16,
    // Optionally reinforce centering
    // alignSelf: 'center',
  },
});
