// app/(tabs)/profile/screens/SectionListExample.tsx
import React from "react";
import { View, Text } from "react-native";
import { ThemedSectionList } from "@/components/templates/pages/ThemedSectionList";

const SECTION_DATA = [
  {
    title: "Main Dishes",
    data: ["Pizza", "Burger", "Pasta"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
];

export default function SectionListExample() {
  return (
    <ThemedSectionList<string>
      sections={SECTION_DATA}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 0.5 }}>
          <Text>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={{ backgroundColor: "#eee", padding: 8 }}>
          <Text style={{ fontWeight: "bold" }}>{section.title}</Text>
        </View>
      )}
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>SectionList Header</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <View style={{ padding: 24 }}>
            <Text style={{ fontSize: 24 }}>Large SectionList Header</Text>
          </View>
        ),
        enableScaling: true,
      }}
      keyExtractor={(item, index) => `${item}-${index}`}
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
}
