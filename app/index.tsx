import React from 'react';
import { Redirect } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/contexts/GlobalProvider';
import { welcomeStyles } from '@/styles/welcomeStyles';
import { ThemedText } from '@/components/templates/typography/ThemedText';
import { ThemedView } from '@/components/templates/containers/ThemedView';
import ThemedActivityIndicator from '@/components/templates/loaders/ThemedActivityIndicator';

const WelcomeScreen: React.FC = () => {
  const { loading, isLogged } = useGlobalContext();
  const theme = useColorScheme();
  const styles = welcomeStyles();

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
      <ThemedActivityIndicator 
        size={48} // equivalent to 'large' size
        color={{
          light: '#0000FF',
          dark: '#FFFFFF'
        }}
      />
    </ThemedView>
  );
};

export default WelcomeScreen;