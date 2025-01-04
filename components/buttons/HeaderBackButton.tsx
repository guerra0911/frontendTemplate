// app/components/HeaderBackButton.tsx

import React from 'react';
import { useRouter } from 'expo-router';
import ThemedButton from '@/components/templates/buttons/ThemedButton';
import { Ionicons } from '@expo/vector-icons'; // Ensure Ionicons is installed
import { HEADER_BACK_BUTTON_SIZE } from '@/constants/Layouts';

interface HeaderBackButtonProps {
  iconName?: string;
  size?: number;
  color?: string;
}

/**
 * HeaderBackButton Component
 *
 * A reusable button styled with ThemedButton to navigate back.
 * @param {HeaderBackButtonProps} props - Props to customize the button.
 * @returns {React.ReactElement} The HeaderBackButton component.
 */
const HeaderBackButton: React.FC<HeaderBackButtonProps> = ({
  size = HEADER_BACK_BUTTON_SIZE,
}) => {
  const router = useRouter();

  /**
   * Handles the back navigation when the button is pressed.
   */
  const handlePress = () => {
    router.back();
  };

  return (
    <ThemedButton
      onPress={handlePress}
      icons={{
        iconName:'arrow-back-outline',
        iconLibrary: 'Ionicons',
        iconPosition: 'left',
        iconSize: size,
      }}
      background={{
        light: 'transparent',
        dark: 'transparent',
      }}
      customWidth={24} // Adjust as needed
      customHeight={24} // Adjust as needed
      themeType="primary" // Choose the appropriate theme
    />
  );
};

export default React.memo(HeaderBackButton);
