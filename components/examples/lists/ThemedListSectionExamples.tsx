/**
 * ThemedListSectionExamples.tsx
 *
 * Mirror usage from RNP's ListSectionExample, but with ThemedList
 */
import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedListSection from "@/components/templates/lists/ThemedListSection";
import ThemedListSubheader from "@/components/templates/lists/ThemedListSubheader";
import ThemedListItem from "@/components/templates/lists/ThemedListItem";
import ThemedListIcon from "@/components/templates/lists/ThemedListIcon";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";

export default function ThemedListSectionExamples() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">List.Section Examples</ThemedText>

      <ThemedListSection>
        <ThemedListSubheader>Single line</ThemedListSubheader>
        <ThemedListItem
          title="List item 1"
          left={() => <ThemedListIcon icon="calendar" />}
        />
        <ThemedListItem
          title="List item 2"
          left={() => <ThemedListIcon icon="wallet-outline" />}
        />
        <ThemedListItem
          title="List item 3"
          left={() => <ThemedListIcon icon="folder" />}
          right={() => <ThemedListIcon icon="calculator-outline" />}
        />
      </ThemedListSection>
      <ThemedDivider />

      <ThemedListSection>
        <ThemedListSubheader>Two line</ThemedListSubheader>
        <ThemedListItem
          title="List item 1"
          description="Describes item 1"
          left={() => (
            <Image
            source={{ uri: "https://picsum.photos/100" }}
              style={styles.image}
            />
          )}
        />
        <ThemedListItem
          title="List item 2"
          description="Describes item 2"
          left={() => (
            <Image
            source={{ uri: "https://picsum.photos/200" }}
              style={styles.image}
            />
          )}
          right={() => <ThemedListIcon icon="information" />}
        />
      </ThemedListSection>
      <ThemedDivider />

      <ThemedListSection>
        <ThemedListSubheader>Three line</ThemedListSubheader>
        <ThemedListItem
          title="List item 1"
          description="Describes item 1. Example of a very very long description."
          left={() => (
            <Image
            source={{ uri: "https://picsum.photos/300" }}
              style={styles.image}
            />
          )}
        />
        <ThemedListItem
          title="List item 2"
          description="Describes item 2. Example of a very very long description."
          left={() => (
            <Image
            source={{ uri: "https://picsum.photos/400" }}
              style={styles.image}
            />
          )}
          right={() => <ThemedListIcon icon="star-outline" />}
        />
      </ThemedListSection>
      <ThemedDivider />

      <ThemedListSection>
        <ThemedListSubheader>Custom title and description</ThemedListSubheader>
        <ThemedListItem
          title={({ ellipsizeMode, color, fontSize }) => (
            <View style={[styles.row, styles.customTitle]}>
              <ThemedText style={{ color, fontSize }}>List Item</ThemedText>
              <ThemedText>Yesterday</ThemedText>
            </View>
          )}
          description={({ ellipsizeMode, color, fontSize }) => (
            <View style={[styles.column]}>
              <ThemedText style={{ color, fontSize }} numberOfLines={2}>
                React Native Paper is a standard-compliant Material Design library...
              </ThemedText>
              <View style={[styles.row, { paddingTop: 8 }]}>
                <ThemedText>[Chip: DOCS.pdf]</ThemedText>
              </View>
            </View>
          )}
          left={() => (
            <Image
            source={{ uri: "https://picsum.photos/500" }}
              style={styles.image}
            />
          )}
          right={() => <ThemedListIcon icon="star-outline" />}
        />
      </ThemedListSection>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    height: 40,
    width: 40,
    margin: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  customTitle: {
    // Additional styling
    marginBottom: 4,
  },
});
