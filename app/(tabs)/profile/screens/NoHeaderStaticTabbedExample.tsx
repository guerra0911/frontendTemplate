import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ThemedNoHeaderStaticTabbed } from "@/components/templates/pages/ThemedNoHeaderStaticTabbed";

export default function NoHeaderStaticTabbedExample() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const tabs = [
    {
      title: "Tab One",
      content: (
        <ScrollView>
          <View style={styles.tabContent}>
            {[...Array(20)].map((_, i) => (
              <Text key={i} style={styles.item}>
                Item {i + 1} - Tab One
              </Text>
            ))}
          </View>
        </ScrollView>
      ),
    },
    {
      title: "Tab Two",
      content: (
        <ScrollView>
          <View style={styles.tabContent}>
            {[...Array(20)].map((_, i) => (
              <Text key={i} style={styles.item}>
                Item {i + 1} - Tab Two
              </Text>
            ))}
          </View>
        </ScrollView>
      ),
    },
  ];

  return (
    <ThemedNoHeaderStaticTabbed
      tabs={tabs}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      headerHeight={60}
      segmentedControlProps={{
        themeType: "primary",
        animatedSwitch: true,
      }}
      scrollViewBackgroundColor={{ light: "#f5f5f5", dark: "#222" }}
      backgroundColor={{ light: "#ffffff", dark: "#333" }}
      topSafeAreaBackgroundColor={{ light: "#ffffff", dark: "#444" }}
    />
  );
}

const styles = StyleSheet.create({
  tabContent: {
    padding: 16,
  },
  item: {
    padding: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

