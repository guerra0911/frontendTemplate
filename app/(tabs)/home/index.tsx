// app/(tabs)/home/index.tsx
import React, { useState, useCallback } from "react";
import { Image, Button, Text, View, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";

import { useGlobalContext } from "@/contexts/GlobalProvider";
import { pingServer } from "@/services/authServices";
import { homeStyles } from "@/styles/homeStyles";

import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";
import ThemedParallaxScrollContainer from "@/components/templates/containers/ThemedParallaxScrollView";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { HelloWave } from "@/components/templates/icons/HelloWave";
import { LogoutButton } from "@/components/buttons/LogoutButton";

import FormWithImages from "@/components/media/FormWithImages";
import ItemSelector from "@/components/item/ItemSelector";
import ItemDetails from "@/components/item/ItemDetails";

export default function HomeScreen() {
  const [response, setResponse] = useState<string | null>(null);
  const { checkCurrentUser } = useGlobalContext();
  const [selectedItemId, setSelectedItemId] = useState<number | undefined>();
  const [refreshing, setRefreshing] = useState(false);

  const styles = homeStyles();
  const router = useRouter();

  const handleItemSelected = useCallback((itemId: number | undefined) => {
    setSelectedItemId(itemId);
  }, []);

  const handlePingServer = async () => {
    try {
      const message = await pingServer();
      setResponse(message);
    } catch (error) {
      console.error("Error pinging server:", error);
      setResponse("Failed to connect to server.");
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await checkCurrentUser();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [checkCurrentUser]);

  return (
    <>
      {/** 1) Render our custom header with no back button because this is a tab root */}
      <ThemedCustomHeader
        title="Mobile App Template"
        showBackButton={false}
        rightIcon="finger-print"
        onRightPress={() => router.push("/(tabs)/home/HomeDetail")}
      />

      {/** 2) Use your existing parallax scroll container */}
      <ThemedParallaxScrollContainer
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
        showRefreshIndicator
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit 
            <ThemedText type="defaultSemiBold">
              app/(tabs)/home/index.tsx
            </ThemedText>
            to see changes. Press 
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: "cmd + d",
                android: "cmd + m",
                web: "F12",
              })}
            </ThemedText>
            to open dev tools.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this starter app.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run 
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>
            to get a fresh 
            <ThemedText type="defaultSemiBold">app</ThemedText> directory.
          </ThemedText>
        </ThemedView>

        <View style={styles.container}>
          <Text style={styles.title}>Welcome to the App!</Text>
          <Button title="Ping Server" onPress={handlePingServer} />
          {response && <Text style={styles.response}>{response}</Text>}
          <LogoutButton />
        </View>

        <View>
          <FormWithImages />
        </View>

        <View>
          <ItemSelector onItemSelected={handleItemSelected} />
          {selectedItemId ? (
            <ItemDetails itemId={selectedItemId} />
          ) : (
            <Text>Select an item to view details.</Text>
          )}
        </View>

        <View style={{ margin: 20 }}>
          <Button
            title="Go to Home Detail"
            onPress={() => router.push("/(tabs)/home/HomeDetail")}
          />
          <Button title="Go to Settings" onPress={() => router.push("/settings")} />
        </View>
      </ThemedParallaxScrollContainer>
    </>
  );
}
