import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedNoHeaderNonStaticTabbed } from "@/components/templates/pages/ThemedNoHeaderNonStaticTabbed";

export default function NoHeaderNonStaticTabbedExample() {
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
              The segmented control hides or shows on scroll (Tab One)
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
              The segmented control hides or shows on scroll (Tab Two)
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
    {
      title: "Tab Three",
      content: (
        <View>
          <View style={[styles.placeholder, { backgroundColor: "#C5CAE9" }]}>
            <ThemedText style={{ textAlign: "center" }}>
              The segmented control hides or shows on scroll (Tab Three)
            </ThemedText>
          </View>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.listItem}>
              <ThemedText>Item #{i + 1} - Tab Three</ThemedText>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: "Tab Four",
      content: (
        <View>
          <View style={[styles.placeholder, { backgroundColor: "#C5CAE9" }]}>
            <ThemedText style={{ textAlign: "center" }}>
              The segmented control hides or shows on scroll (Tab Four)
            </ThemedText>
          </View>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.listItem}>
              <ThemedText>Item #{i + 1} - Tab Four</ThemedText>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: "Tab Five",
      content: (
        <View>
          <View style={[styles.placeholder, { backgroundColor: "#C5CAE9" }]}>
            <ThemedText style={{ textAlign: "center" }}>
              The segmented control hides or shows on scroll (Tab Five)
            </ThemedText>
          </View>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.listItem}>
              <ThemedText>Item #{i + 1} - Tab Five</ThemedText>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: "Tab Six",
      content: (
        <View>
          <View style={[styles.placeholder, { backgroundColor: "#C5CAE9" }]}>
            <ThemedText style={{ textAlign: "center" }}>
              The segmented control hides or shows on scroll (Tab Six)
            </ThemedText>
          </View>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.listItem}>
              <ThemedText>Item #{i + 1} - Tab Six</ThemedText>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: "Tab Seven",
      content: (
        <View>
          <View style={[styles.placeholder, { backgroundColor: "#C5CAE9" }]}>
            <ThemedText style={{ textAlign: "center" }}>
              The segmented control hides or shows on scroll (Tab Seven)
            </ThemedText>
          </View>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.listItem}>
              <ThemedText>Item #{i + 1} - Tab Seven</ThemedText>
            </View>
          ))}
        </View>
      ),
    },
  ];

  return (
    <ThemedNoHeaderNonStaticTabbed
      themeType="primary"
      headerHeight={60}
      isRefreshable
      scrollableTabs
      refreshing={refreshing}
      onRefresh={onRefresh}
      headerStyle={{ backgroundColor: "#6200ea" }}
      scrollViewBackgroundColor={{ light: "#E1BEE7", dark: "#333" }}
      topSafeAreaBackgroundColor={{ light: "#BA68C8", dark: "#222" }}
      segmentedControlProps={{ animatedSwitch: true, customWidth: 800 }}
      tabs={tabs}
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

