/**
 * ThemedListAccordionExamples.tsx
 *
 * Mirrors usage from RNP's ListAccordionExample but with ThemedList.
 */
import React, { useState } from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedListAccordion from "@/components/templates/lists/ThemedListAccordion";
import ThemedListItem from "@/components/templates/lists/ThemedListItem";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";
import ThemedListIcon from "@/components/templates/lists/ThemedListIcon";

export default function ThemedListAccordionExamples() {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={{ padding: 20 }}>
      <ThemedText type="title">Expandable list item</ThemedText>
      <ThemedListAccordion
        title="Expandable list item"
        left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
      >
        <ThemedListItem title="List item 1" />
        <ThemedListItem title="List item 2" />
      </ThemedListAccordion>
      <ThemedListAccordion
        title="Start expanded"
        left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
        expanded={expanded}
        onPress={handlePress}
      >
        <ThemedListItem title="List item 1" />
      </ThemedListAccordion>
      <ThemedDivider />

      <ThemedText style={{ marginTop: 20 }} type="subtitle">
        Expandable & multiline
      </ThemedText>
      <ThemedListAccordion
        title="Expandable list item"
        description="Describes the item"
      >
        <ThemedListItem title="List item 1" />
        <ThemedListItem title="List item 2" />
      </ThemedListAccordion>
      <ThemedDivider />

      <ThemedText style={{ marginTop: 20 }} type="subtitle">
        Expandable with icons
      </ThemedText>
      <ThemedListAccordion
        title="Accordion item 1"
        left={(props) => <ThemedListIcon icon="star" color={props.color} />}
      >
        <ThemedListItem
          title="List item 1"
          left={() => <ThemedListIcon icon="thumbs-up-outline" />}
        />
        <ThemedListItem
          title="List item 2"
          left={() => <ThemedListIcon icon="thumbs-down-outline" />}
        />
      </ThemedListAccordion>
    </View>
  );
}
