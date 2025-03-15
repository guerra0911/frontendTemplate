// app/(tabs)/objects/index.tsx
import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import AllObjectsTab from "./AllObjectsTab";
import MyObjectsTab from "./MyObjectsTab";
import { ThemedNonStaticHeaderNonStaticTabbed } from "@/components/templates/pages/ThemedNonStaticHeaderNonStaticTabbed";

export default function ObjectsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  const tabs = [
    {
      title: "All Objects",
      content: <AllObjectsTab />,
    },
    {
      title: "My Objects",
      content: <MyObjectsTab />,
    },
  ];

  return (
    <ThemedNonStaticHeaderNonStaticTabbed
      themeType="primary"
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      tabs={tabs}
      headerProps={{
        // Hide the back button by rendering nothing on the left:
        renderLeft: () => null,
        // Center the header title:
        renderCenter: () => (
          <Text style={styles.headerTitle}>Objects</Text>
        ),
        headerSegmentedControlMarginTop: 0,
        headerSegmentedControlMarginBottom: 0,
        headerSegmentedControlPaddingTop: 8,
        headerSegmentedControlPaddingBottom: 12,
      }}
      segmentedControlProps={{
        animatedSwitch: true,
        selectedIndicator: {
          useUnderline: true,
          underlineThickness: 4,
          underlineWidth: 80,
        },
        customWidth: 350,
        customHeight: 50,
        text: {
          selectedStyle: {
            fontWeight: "bold",
          },
          unselectedStyle: {
            fontWeight: "normal",
          },
          colors: {
            light: {
              selected: "#000000",    // Black for selected text in light mode
              unselected: "#555555",  // Medium gray for unselected text in light mode
            },
            dark: {
              selected: "#FFFFFF",    // White for selected text in dark mode
              unselected: "#BBBBBB",  // Light gray for unselected text in dark mode
            },
          },
        },
      }}
      // Choose modern, minimalistic colors:
      backgroundColor={{ light: "#F5F5F5", dark: "#121212" }}
      scrollViewBackgroundColor={{ light: "#FFFFFF", dark: "#000000" }}
      topSafeAreaBackgroundColor={{ light: "#F5F5F5", dark: "#121212" }}
      scrollableTabs={false}
    />
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    padding: 10,
  },
});
