// components/settingsButtonStyles.ts

import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export const settingsButtonStyles = () => {
  const backgroundColor = useThemeColor({}, 'buttonBackground');
  
  return StyleSheet.create({
    settingsButton: {
      backgroundColor,
      padding: 8,
      borderRadius: 24,
      elevation: 5, // For Android shadow
      shadowColor: '#000', // For iOS shadow
      shadowOffset: { width: 0, height: 2 }, // For iOS shadow
      shadowOpacity: 0.3, // For iOS shadow
      shadowRadius: 3, // For iOS shadow
    },
  });
};
