// app/components/screens/NonStaticHeaderNonStaticTabbedTopExample.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ThemedNonStaticHeaderNonStaticTabbedTop from "@/components/templates/pages/ThemedNonStaticHeaderNonStaticTabbedTop";

/**
 * Usage:
 * The entire block (LibHeader + tabs) hides from offset=0 => offset=headerHeight 
 * with partial hide. If the user releases in between, it snaps. If offset≥headerHeight => fully hidden.
 */
export default function NonStaticHeaderNonStaticTabbedTopExample() {
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
            {Array.from({ length: 20 }).map((_, i) => (
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
            {Array.from({ length: 20 }).map((_, i) => (
              <Text key={i} style={styles.item}>
                Item {i + 1} - Second Tab
              </Text>
            ))}
          </View>
        </ScrollView>
      ),
    },
  ];

  return (
    <ThemedNonStaticHeaderNonStaticTabbedTop
      // If you want a static height, set useFixedHeaderHeight & headerHeight>0
      // Otherwise, it will measure the entire block (LibHeader + tabs)
      useFixedHeaderHeight={false}
      // Suppose we do not pass a fixed height => measure dynamically
      themeType="primary"
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      blurOnSlide={false}
      headerProps={{
        noBottomBorder: true,
        renderCenter: () => <Text style={styles.headerTitle}>Tabbed + Snap</Text>,
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
      }}
      tabs={tabs}
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
