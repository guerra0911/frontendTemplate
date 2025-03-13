// app/components/screens/StaticHeaderStaticTabbedExample.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ThemedStaticHeaderStaticTabbed } from "@/components/templates/pages/ThemedStaticHeaderStaticTabbed";

const StaticHeaderStaticTabbedExample = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
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
    <ThemedStaticHeaderStaticTabbed
      tabs={tabs}
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      scrollableTabs
      headerProps={{
        renderCenter: () => (
          <Text style={styles.headerTitle}>Example Header</Text>
        ),
        noBottomBorder: true,
        headerContainerBorderBottomWidth: 2,
        headerContainerBorderBottomColor: "#316ef8",
        headerContainerPaddingTop: 0,
        headerContainerPaddingBottom: 0,
        headerContainerPaddingLeft: 0,
        headerContainerPaddingRight: 0,
        headerContainerMarginTop: 0,
        headerContainerMarginBottom: 0,
        headerContainerMarginLeft: 0,
        headerContainerMarginRight: 0,
        headerSegmentedControlMarginBottom: 10,
      }}
      segmentedControlProps={{
        themeType: "secondary",
        customHeight: 50,
        customWidth: 800,
        selectedIndicator: {
          useUnderline: true,
          underlineThickness: 4,
        },
        style: {
          paddingVertical: 0,
          marginBottom: 0,
          paddingHorizontal: 10,
        },
        animatedSwitch: true,
      }}
    />
  );
};

const styles = StyleSheet.create({
  tabContent: {
    padding: 2,
  },
  item: {
    padding: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default StaticHeaderStaticTabbedExample;
