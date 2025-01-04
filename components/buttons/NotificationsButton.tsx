// app/components/buttons/NotificationsButton.tsx

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { Routes } from '@/routes';
import { notificationsButtonStyles } from '@/styles/notificationsButtonStyles';
import { useThemeColor } from '@/hooks/useThemeColor';

interface NotificationsButtonProps {
  // Extend with additional props if needed
}

export function NotificationsButton({}: NotificationsButtonProps) {
  const router = useRouter();
  const styles = notificationsButtonStyles();
  const iconColor = useThemeColor({}, 'buttonIcon'); // Dynamic icon color

  const navigateToNotifications = () => {
    router.push(Routes.notifications);
  };

  return (
    <TouchableOpacity
      style={styles.notificationsButton}
      onPress={navigateToNotifications}
      accessibilityLabel="Open Notifications"
    >
      <IconSymbol size={24} name="bell.fill" color={iconColor} />
    </TouchableOpacity>
  );
}

export default NotificationsButton;
