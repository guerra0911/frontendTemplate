/**
 * ThemedListAccordionGroupExamples.tsx
 *
 * Mirrors usage from RNP's ListAccordionGroupExample but with ThemedList.
 */
import React, { useState } from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedListAccordionGroup from "@/components/templates/lists/ThemedListAccordionGroup";
import ThemedListAccordion from "@/components/templates/lists/ThemedListAccordion";
import ThemedListIcon from "@/components/templates/lists/ThemedListIcon";
import ThemedListItem from "@/components/templates/lists/ThemedListItem";

export default function ThemedListAccordionGroupExamples() {
  const [expandedId, setExpandedId] = useState<string | number | undefined>(
    undefined
  );

  const handleAccordionPress = (id: string | number) => {
    setExpandedId((current) => (current === id ? undefined : id));
  };

  return (
    <View style={{ padding: 20 }}>
      <ThemedText type="title">Uncontrolled Accordion Group</ThemedText>
      <ThemedListAccordionGroup>
        <ThemedListAccordion
          title="Expandable list item"
          id="1"
          left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
        >
          <ThemedListItem title="List item 1" />
          <ThemedListItem title="List item 2" />
        </ThemedListAccordion>

        <ThemedListAccordion
          title="Expandable list item 2"
          id="2"
          left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
        >
          <ThemedListItem title="List item 1" />
        </ThemedListAccordion>

        <ThemedListAccordion
          title="Expandable list item 3"
          id="3"
          left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
        >
          <ThemedListItem title="Another item" />
        </ThemedListAccordion>
      </ThemedListAccordionGroup>

      <ThemedText style={{ marginTop: 20 }} type="title">
        Controlled Accordion Group
      </ThemedText>
      <ThemedListAccordionGroup
        expandedId={expandedId}
        onAccordionPress={handleAccordionPress}
      >
        <ThemedListAccordion
          title="Expandable list item"
          id="1"
          left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
        >
          <ThemedListItem title="List item 1" />
          <ThemedListItem title="List item 2" />
        </ThemedListAccordion>

        <ThemedListAccordion
          title="Expandable list item 2"
          id="2"
          left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
        >
          <ThemedListItem title="List item 1" />
        </ThemedListAccordion>

        <ThemedListAccordion
          title="Expandable list item 3"
          id="3"
          left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
        >
          <ThemedListItem title="Another item" />
        </ThemedListAccordion>
      </ThemedListAccordionGroup>
    </View>
  );
}
