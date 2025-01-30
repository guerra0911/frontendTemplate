// app/(tabs)/profile/screens/ThemedHideOnScrollHeaderExample.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedHideOnScrollHeader } from "@/components/templates/pages/ThemedHideOnScrollHeader";

export default function ThemedHideOnScrollHeaderExample() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <ThemedHideOnScrollHeader
      themeType="primary"
      headerHeight={45}
      // e.g. noBottomBorder
      // noBottomBorder={true}
      // You can pass custom left/center if you want:
      // renderLeft={() => <MyCustomLeft/>}
      renderCenter={() => <ThemedText style={{ color:'#f3f3f3'}}>Title</ThemedText>}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      // Could pass headerStyle if you want bigger background color:
      // For demonstration, override the header background color
      headerStyle={{ backgroundColor: "#6200ea" }}
      // Optionally override other backgrounds:
      scrollViewBackgroundColor={{ light: "#E1BEE7", dark: "#333" }}
      topSafeAreaBackgroundColor={{ light: "#BA68C8", dark: "#222" }}
    >
      {/**
       * This children block is the scrollable area below the hideable header
       */}
      <View style={[styles.placeholder, { backgroundColor: "#E1BEE7" }]}>
        <ThemedText style={{ textAlign: "center" }}>
          The header hides or shows proportionally on scroll
        </ThemedText>
      </View>

      {Array.from({ length: 30 }).map((_, i) => (
        <View key={i} style={styles.listItem}>
          <ThemedText>Item #{i + 1}</ThemedText>
        </View>
      ))}
    </ThemedHideOnScrollHeader>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  listItem: {
    height: 60,
    backgroundColor: "#D1C4E9",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
