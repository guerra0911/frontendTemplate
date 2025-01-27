// app/(tabs)/objects/index.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import AllObjectsTab from "./AllObjectsTab";
import MyObjectsTab from "./MyObjectsTab";
import ThemedSegmentedControlTabs, {
  RefreshSetter,
} from "@/components/templates/buttons/ThemedSegmentedControlTabs";
import ThemedCustomHeader from "@/components/templates/headers/ThemedCustomHeader";

export default function ObjectsScreen() {
  return (
    <>
      <ThemedCustomHeader
        title="Objects"
        showBackButton={false}
        leftIcon="cube"
        rightIcon="cube"
        // No special onPress if you just want icons
      />

      <View style={styles.container}>
        <ThemedSegmentedControlTabs
          tabs={[
            { label: "All Objects", component: <AllObjectsTab /> },
            { label: "My Objects", component: <MyObjectsTab /> },
          ]}
          scrollable
          refreshable
          onTabRefresh={(tabIndex: number, setTabRefreshing: RefreshSetter) => {
            console.log(`Refreshing tab: ${tabIndex}`);
            setTimeout(() => {
              setTabRefreshing(tabIndex, false);
              console.log(`Done refreshing tab: ${tabIndex}`);
            }, 1200);
          }}
          animatedPageSlide
          animatedSwitch
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
