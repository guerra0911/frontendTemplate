// app/(tabs)/objects/objects.tsx

import React from "react";
import { StyleSheet, View } from "react-native";
import AllObjectsTab from "../screens/objects/AllObjectsTab";
import MyObjectsTab from "../screens/objects/MyObjectsTab";

// Import the new ThemedSegmentedControlTabs
import ThemedSegmentedControlTabs from "@/components/templates/buttons/ThemedSegmentedControlTabs";

export default function ObjectsScreen() {
  return (
    <View style={styles.container}>
      <ThemedSegmentedControlTabs
        tabs={[
          { label: "All Objects", component: <AllObjectsTab /> },
          { label: "My Objects", component: <MyObjectsTab /> },
        ]}
        // DESIGN PROPS: these props will make the segmented control look like your example
        animatedSwitch={true}
        themeType="primary"
        customWidth={300}
        customHeight={50}
        selectedIndicator={{
          useUnderline: true,
          underlineThickness: 4,
          // underlineWidth: 50,
        }}
        // Optionally you can control alignment and container styling:
        // By default, our ThemedSegmentedControlTabs centers the segmented control;
        // you can change it via segmentControlAlignment ("left", "center", "right").
        segmentControlAlignment="center"
        segmentControlContainerStyle={{
          padding: 8,
          marginBottom: 8,
        }}
        // You can override the container background by setting tabsThemeType, for example:
        tabsThemeType="primary"
        tabsContainerStyle={{
          flex: 1,
          backgroundColor: "transparent",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // fill the screen
    backgroundColor: "transparent", // or a ThemedView, etc.
  },
});
