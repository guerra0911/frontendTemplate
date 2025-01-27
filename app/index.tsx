// app/index.tsx
import React from "react";
import { Redirect } from "expo-router";

import { ThemedView } from "@/components/templates/containers/ThemedView";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedActivityIndicator from "@/components/templates/loaders/ThemedActivityIndicator";

import { useGlobalContext } from "@/contexts/GlobalProvider";

export default function WelcomeScreen() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) {
    return <Redirect href="/(tabs)/home" />;
  }
  if (!loading && !isLogged) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText type="title" style={{ marginBottom: 16 }}>
        My App Logo
      </ThemedText>
      <ThemedActivityIndicator
        size={48}
        color={{
          light: "#0000FF",
          dark: "#FFFFFF",
        }}
      />
    </ThemedView>
  );
}
