// components/buttons/SettingsButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedButton from '@/components/templates/buttons/ThemedButton';
import { Ionicons } from '@expo/vector-icons'; // Ensure Ionicons is installed
import { Routes } from '@/routes';

interface SettingsButtonProps {}

/**
 * SettingsButton Component
 *
 * A button that displays a settings icon and navigates to the settings screen when pressed.
 * Utilizes the ThemedButton component for consistent theming and styling.
 *
 * @param {SettingsButtonProps} props - Props for configuring the SettingsButton.
 * @returns {React.ReactElement} The SettingsButton component.
 */
const SettingsButton: React.FC<SettingsButtonProps> = () => {
  const router = useRouter();

  /**
   * Navigates to the Settings screen.
   */
  const navigateToSettings = () => {
    router.push(Routes.settings);
  };

  return (
    <ThemedButton
      onPress={navigateToSettings}
      icons={{
        iconName: 'settings', // Ionicons settings icon
        iconLibrary: 'Ionicons',
        iconPosition: 'left',
        iconSize: 20, // Adjust icon size as needed
      }}
      background={{
        light: 'transparent',
        dark: 'transparent',
      }}
      // borders={{
      //   color: { light: "#0000FF", dark: "#00FFFF" },
      //   width: 2,
      //   style: "dashed", // Demonstrate dashed border
      // }}
      customWidth={24}
      customHeight={24}
      themeType="primary" // Choose appropriate theme: 'primary', 'secondary', or 'tertiary'
    />
  );
};


export default React.memo(SettingsButton);
