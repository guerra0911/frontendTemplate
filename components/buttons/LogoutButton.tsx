// app/components/buttons/LogoutButton.tsx

import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/contexts/GlobalProvider';
import { logoutUser } from '@/services/authServices';
import ThemedButton from '@/components/templates/buttons/ThemedButton';

interface LogoutButtonProps {}

/**
 * LogoutButton Component (Named Export)
 *
 * A button that logs out the user and redirects to the sign-in screen.
 */
export const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const router = useRouter();
  const { setIsLogged, setUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // This calls your logoutUser() logic
      await logoutUser();

      // Clear local auth state
      setIsLogged(false);
      setUser(null);

      // Then navigate to Sign-In in (auth)/sign-in.tsx
      router.replace('/(auth)/sign-in');

      Alert.alert('Logged Out', 'You have been successfully logged out.');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Logout Failed', 'An error occurred while trying to log out.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedButton
      title='Logout'
      onPress={handleLogout}
      themeType="primary"
      loading={{
        isLoading: isLoading,
        text: 'Logging Out...',
        color: '#ffffff',
      }}
      style={styles.button}
      disabled={isLoading}
      animatedPress={true}
      roundedAllCorners={true}
      customHeight={28}
      customWidth={85}
      icons={{
        iconName: 'log-out',
        iconLibrary: 'Ionicons',
        iconPosition: 'left',
        iconSize: 18,
        iconPadding: {
          right: 3
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});
