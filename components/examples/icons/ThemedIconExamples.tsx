// frontendTemplate/components/icons/ThemedIconExamples.tsx

/**
 * THEMEDICON EXAMPLES
 * Demonstrates various customizations and usages of the ThemedIcon component.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedIcon from '@/components/templates/icons/ThemedIcon';
import { ThemedText } from '@/components/templates/general/ThemedText';

const ThemedIconExamples: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* PRIMARY ICON */}
      <ThemedText style={styles.sectionTitle}>Primary Icons</ThemedText>
      <ThemedIcon
        iconName="home"
        iconLibrary="Ionicons"
        size={30}
        type="primary"
        accessibilityLabel="Home Icon"
        style={styles.icon}
      />

      {/* SECONDARY ICON */}
      <ThemedText style={styles.sectionTitle}>Secondary Icons</ThemedText>
      <ThemedIcon
        iconName="settings"
        iconLibrary="MaterialIcons"
        size={30}
        type="secondary"
        accessibilityLabel="Settings Icon"
        style={styles.icon}
      />

      {/* TERTIARY ICON */}
      <ThemedText style={styles.sectionTitle}>Tertiary Icons</ThemedText>
      <ThemedIcon
        iconName="user"
        iconLibrary="FontAwesome"
        size={30}
        type="tertiary"
        accessibilityLabel="User Icon"
        style={styles.icon}
      />

      {/* CUSTOM COLOR ICON */}
      <ThemedText style={styles.sectionTitle}>Custom Color Icon</ThemedText>
      <ThemedIcon
        iconName="star"
        iconLibrary="FontAwesome"
        size={40}
        color="#FFD700" // Gold color
        accessibilityLabel="Star Icon"
        style={styles.icon}
      />

      {/* CUSTOM STYLE ICON */}
      <ThemedText style={styles.sectionTitle}>Custom Style Icon</ThemedText>
      <ThemedIcon
        iconName="rocket"
        iconLibrary="Ionicons"
        size={35}
        type="primary"
        accessibilityLabel="Rocket Icon"
        style={{ transform: [{ rotate: '45deg' }] }} // Rotated icon
      />

      {/* ICON ONLY WITHOUT TEXT */}
      <ThemedText style={styles.sectionTitle}>Icon Only</ThemedText>
      <View style={styles.iconOnlyContainer}>
        <ThemedIcon
          iconName="heart"
          iconLibrary="FontAwesome"
          size={50}
          type="primary"
          accessibilityLabel="Heart Icon"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  iconOnlyContainer: {
    marginTop: 10,
  },
});

export default ThemedIconExamples;
