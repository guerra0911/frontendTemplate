// app/components/screens/NonStaticHeaderNonStaticTabbed.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ThemedNonStaticHeaderNonStaticTabbed } from "@/components/templates/pages/ThemedNonStaticHeaderNonStaticTabbed";

/**
 * Example usage: a non-static header that also has a segmented control
 * inside the header, with the entire block sliding in & out of view.
 */
export default function NonStaticHeaderNonStaticTabbedExample() {
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
    <ThemedNonStaticHeaderNonStaticTabbed
      themeType="primary"
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      blurOnSlide={false}
      scrollableTabs
      headerProps={{
        // By default noBottomBorder=true, so no border
        // If you want to re-enable it: noBottomBorder: false
        renderCenter: () => <Text style={styles.headerTitle}>My Tabbed Header</Text>,
        // margin/padding around the segmented control
        headerSegmentedControlMarginTop: 0,
        headerSegmentedControlMarginBottom: 0,
        headerSegmentedControlPaddingTop: 8,
        headerSegmentedControlPaddingBottom: 8,
      }}
      segmentedControlProps={{
        selectedIndicator: {
          useUnderline: true,
          underlineThickness: 4,
        },
        animatedSwitch: true,
        customHeight: 50,
        customWidth: 800,
      }}
      tabs={tabs}
      // background overrides
      backgroundColor={{ light: "#673AB7", dark: "#111" }}
      scrollViewBackgroundColor={{ light: "#D1C4E9", dark: "#333" }}
      topSafeAreaBackgroundColor={{ light: "#7E57C2", dark: "#000" }}
    />
  );
}

const styles = StyleSheet.create({
  tabContent: {
    padding: 8,
  },
  item: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
