// app/(tabs)/objects/objects.tsx

import React from "react";
import { StyleSheet, View } from "react-native";
import AllObjectsTab from "../screens/objects/AllObjectsTab";
import MyObjectsTab from "../screens/objects/MyObjectsTab";
import ThemedSegmentedControlTabs, {
  RefreshSetter,
} from "@/components/templates/buttons/ThemedSegmentedControlTabs";

export default function ObjectsScreen() {
  return (
    <View style={styles.container}>
      <ThemedSegmentedControlTabs
        tabs={[
          { label: "All Objects", component: <AllObjectsTab /> },
          { label: "My Objects", component: <MyObjectsTab /> },
        ]}
        // Now we use the new props:
        scrollable={true}
        refreshable={true} // each tab has a pull-to-refresh if scrollable is true

        // If you want custom refresh logic, define onTabRefresh:
        onTabRefresh={(tabIndex: number, setTabRefreshing: RefreshSetter) => {
          // e.g. do an async fetch, then end refreshing:
          console.log(`Refreshing tab: ${tabIndex}`);
          setTimeout(() => {
            setTabRefreshing(tabIndex, false);
            console.log(`Done refreshing tab: ${tabIndex}`);
          }, 1200);
        }}

        // Possibly also set animatedPageSlide, or pass the other design props:
        animatedPageSlide={true}
        animatedSwitch={true}
        themeType="primary"
        customWidth={350}
        customHeight={50}
        selectedIndicator={{
          useUnderline: true,
          underlineThickness: 4,
          underlineWidth: 50,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
