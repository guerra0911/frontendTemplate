// app/components/screens/NonStaticHeaderTopExample.tsx

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedNonStaticHeaderTop from "@/components/templates/pages/ThemedNonStaticHeaderTop";

export default function NonStaticHeaderTopExample() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <ThemedNonStaticHeaderTop
      themeType="primary"
      headerHeight={60}
      // If we want to hide bottom border:
      noBottomBorder
      renderCenter={() => (
        <ThemedText style={{ color:'#f3f3f3'}}>
          Scroll & Release = Snap
        </ThemedText>
      )}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      // Example style override
      headerStyle={{ backgroundColor: "#6200ea" }}
      scrollViewBackgroundColor={{ light: "#E1BEE7", dark: "#333" }}
      topSafeAreaBackgroundColor={{ light: "#BA68C8", dark: "#222" }}
      blurOnSlide={false}
    >
      <View style={[styles.placeholder, { backgroundColor: "#E1BEE7" }]}>
        <ThemedText style={{ textAlign: "center" }}>
          Scroll away from top = partial hide
          {"\n"}Release = snaps fully open/closed
        </ThemedText>
      </View>

      {Array.from({ length: 30 }).map((_, i) => (
        <View key={i} style={styles.listItem}>
          <ThemedText>Item #{i + 1}</ThemedText>
        </View>
      ))}
    </ThemedNonStaticHeaderTop>
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
