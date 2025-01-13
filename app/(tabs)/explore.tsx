import React, { useState, useCallback } from 'react';
import { StyleSheet, Image, Platform, View, TextInput, Button, Text } from 'react-native';

import { ThemedCollapsible } from '@/components/templates/general/ThemedCollapsible';
import { ThemedExternalLink } from '@/components/templates/typography/ThemedExternalLink';
import ThemedParallaxScrollView from '@/components/templates/containers/ThemedParallaxScrollView';
import { ThemedText } from '@/components/templates/typography/ThemedText';
import { ThemedView } from '@/components/templates/containers/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [counter, setCounter] = useState(0);
  const [inputText, setInputText] = useState('');

  // onRefresh function to reset the counter and inputText to their initial states
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a short delay to show the refresh happening
    setTimeout(() => {
      setCounter(0);
      setInputText('');
      setRefreshing(false);
    }, 1000);
  }, []);

  // Function to increment the counter
  const incrementCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  return (
    <ThemedParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
      onRefresh={onRefresh}
      refreshing={refreshing}
      showRefreshIndicator={true}>
      
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>

      {/* Counter Section */}
      <ThemedView style={styles.counterContainer}>
        <Text style={styles.counterText}>Counter: {counter}</Text>
        <Button title="Increment Counter" onPress={incrementCounter} />
      </ThemedView>

      {/* Text Input Section */}
      <ThemedView style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Enter Some Text:</Text>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type here..."
          style={styles.inputField}
        />
      </ThemedView>

      <ThemedCollapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ThemedExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ThemedExternalLink>
      </ThemedCollapsible>
      <ThemedCollapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </ThemedCollapsible>
      <ThemedCollapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ThemedExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ThemedExternalLink>
      </ThemedCollapsible>
      <ThemedCollapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ThemedExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ThemedExternalLink>
      </ThemedCollapsible>
      <ThemedCollapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ThemedExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ThemedExternalLink>
      </ThemedCollapsible>
      <ThemedCollapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </ThemedCollapsible>
    </ThemedParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  counterContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

