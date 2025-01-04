import React from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/contexts/GlobalProvider';
import { welcomeStyles } from '@/styles/welcomeStyles';
import { ThemedText } from '@/components/templates/general/ThemedText';
import { ThemedView } from '@/components/templates/containers/ThemedView';

const WelcomeScreen: React.FC = () => {
  const { loading, isLogged } = useGlobalContext();
  const theme = useColorScheme(); // Dynamically fetch the current theme
  const styles = welcomeStyles(); // Adapt to theme automatically

  if (!loading && isLogged) {
    return <Redirect href="/(tabs)/home" />;
  }

  if (!loading && !isLogged) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.logo}>
        My App Logo
      </ThemedText>
      <ActivityIndicator size="large" color={theme === 'dark' ? '#FFFFFF' : '#0000FF'} />
    </ThemedView>
  );
};

export default WelcomeScreen;
