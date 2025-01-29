// app/(tabs)/profile/screens/MasonryFlashListExample.tsx
import React from "react";
import { Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { ThemedMasonryFlashList } from "@/components/templates/pages/ThemedMasonryFlashList";

export default function MasonryFlashListExample() {
  const data = Array.from({ length: 30 }, (_, i) => i);

  return (
    <ThemedMasonryFlashList<number>
      data={data}
      numColumns={2}
      renderItem={({ item, index }) => {
        const randomHeights = [100, 150, 200, 250];
        const randomH = randomHeights[index % randomHeights.length];
        return (
          <>
            <Image
              source={`https://picsum.photos/200/${randomH}`}
              style={[styles.image, { height: randomH }]}
            />
            <Text style={styles.itemText}>Item #{item}</Text>
          </>
        );
      }}
      headerProps={{
        renderCenter: () => <Text style={{ fontSize: 16 }}>MasonryFlashList Header</Text>,
      }}
      largeHeaderProps={{
        renderLargeHeader: (scrollY, showNavBar) => (
          <Text style={{ fontSize: 24, margin: 12 }}>Large Masonry Header</Text>
        ),
        enableScaling: true,
      }}
      contentContainerStyle={{ paddingVertical: 12 }}
      keyExtractor={(num) => String(num)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    borderRadius: 8,
    margin: 8,
  },
  itemText: {
    color: "#333",
    marginLeft: 8,
  },
});
