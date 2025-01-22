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
        // (Optional) You can specify separate props for the underlying segmented control:
        // themeType="primary"
        // animatedSwitch={true}
        // customWidth={350}
        // customHeight={50}
        // selectedIndicator={{ useUnderline: false }}

        // (Optional) You can specify how you want the container behind the buttons:
        tabsThemeType="secondary" // e.g. use the "segmentedTabsBackgroundSecondary" color
        segmentControlContainerStyle={{
          padding: 12, // INTERNAL SPACING BETWEEN BUTTONS AND THEIR OWN CONTAINER
          marginBottom: 0, // MARGIN BETWEEN BUTTON CONTAINER & PAGES/CONTENT
        }}
        // Center alignment is default, but you could do:
        // segmentControlAlignment="left"

        // This style is for the entire set of tabs content:
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
