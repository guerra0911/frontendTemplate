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
        title: "First Tab",
        content: (
          <ScrollView>
            <View style={styles.tabContent}>
              {[...Array(20)].map((_, i) => (
                <Text key={i} style={styles.item}>
                  Item {i + 1} - First Tab
                </Text>
              ))}
            </View>
          </ScrollView>
        ),
      },
      {
        title: "Second Tab",
        content: (
          <ScrollView>
            <View style={styles.tabContent}>
              {[...Array(20)].map((_, i) => (
                <Text key={i} style={styles.item}>
                  Item {i + 1} - Second Tab
                </Text>
              ))}
            </View>
          </ScrollView>
        ),
      },
      {
        title: "Third Tab",
        content: (
          <ScrollView>
            <View style={styles.tabContent}>
              {[...Array(20)].map((_, i) => (
                <Text key={i} style={styles.item}>
                  Item {i + 1} - Third Tab
                </Text>
              ))}
            </View>
          </ScrollView>
        ),
      },
      {
        title: "Fourth Tab",
        content: (
          <ScrollView>
            <View style={styles.tabContent}>
              {[...Array(20)].map((_, i) => (
                <Text key={i} style={styles.item}>
                  Item {i + 1} - Fourth Tab
                </Text>
              ))}
            </View>
          </ScrollView>
        ),
      },
      {
        title: "Fifth Tab",
        content: (
          <ScrollView>
            <View style={styles.tabContent}>
              {[...Array(20)].map((_, i) => (
                <Text key={i} style={styles.item}>
                  Item {i + 1} - Fifth Tab
                </Text>
              ))}
            </View>
          </ScrollView>
        ),
      },
      {
        title: "Sixth Tab",
        content: (
          <ScrollView>
            <View style={styles.tabContent}>
              {[...Array(20)].map((_, i) => (
                <Text key={i} style={styles.item}>
                  Item {i + 1} - Sixth Tab
                </Text>
              ))}
            </View>
          </ScrollView>
        ),
      },
      {
        title: "Seventh Tab",
        content: (
          <ScrollView>
            <View style={styles.tabContent}>
              {[...Array(20)].map((_, i) => (
                <Text key={i} style={styles.item}>
                  Item {i + 1} - Seventh Tab
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
      scrollableTabs
      refreshing={refreshing}
      onRefresh={onRefresh}
      headerHeight={60}
      segmentedControlProps={{
        themeType: "primary",
        animatedSwitch: true,
        customWidth: 800,
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

