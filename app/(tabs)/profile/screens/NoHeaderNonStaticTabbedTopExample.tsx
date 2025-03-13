import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedNoHeaderNonStaticTabbedTop } from "@/components/templates/pages/ThemedNoHeaderNonStaticTabbedTop";

export default function NoHeaderNonStaticTabbedTopExample() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const tabs = [
    {
      title: "Tab One",
      content: (
        <View>
          <View style={[styles.placeholder, { backgroundColor: "#E1BEE7" }]}>
            <ThemedText style={{ textAlign: "center" }}>
              Scroll away from top = partial hide (Tab One)
            </ThemedText>
          </View>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.listItem}>
              <ThemedText>Item #{i + 1} - Tab One</ThemedText>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: "Tab Two",
      content: (
        <View>
          <View style={[styles.placeholder, { backgroundColor: "#C5CAE9" }]}>
            <ThemedText style={{ textAlign: "center" }}>
              Scroll away from top = partial hide (Tab Two)
            </ThemedText>
          </View>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.listItem}>
              <ThemedText>Item #{i + 1} - Tab Two</ThemedText>
            </View>
          ))}
        </View>
      ),
    },
  ];

  return (
    <ThemedNoHeaderNonStaticTabbedTop
      themeType="primary"
      headerHeight={60}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      headerStyle={{ backgroundColor: "#6200ea" }}
      scrollViewBackgroundColor={{ light: "#E1BEE7", dark: "#333" }}
      topSafeAreaBackgroundColor={{ light: "#BA68C8", dark: "#222" }}
      segmentedControlProps={{ animatedSwitch: true }}
      tabs={tabs}
      blurOnSlide={false}
    />
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
