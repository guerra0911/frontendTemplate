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

      <ThemedDivider />

      {/* NEW SUBSECTION: Custom dimension accordion (header only) */}
      <ThemedText style={{ marginTop: 20 }} type="subtitle">
        Custom dimension accordion (no overlap)
      </ThemedText>
      <ThemedListAccordion
        title="Custom sized accordion"
        description="width=300, height=80"
        width={300}
        height={80}
        left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
      >
        <ThemedListItem title="Inside item 1" />
        <ThemedListItem title="Inside item 2" />
      </ThemedListAccordion>
      <ThemedListAccordion
        title="Another custom sized"
        description="width=200, height=100"
        width={200}
        height={100}
      >
        <ThemedListItem title="Inside item 1" />
        <ThemedListItem title="Inside item 2" />
      </ThemedListAccordion>

      {/* NEW EXAMPLES: Custom spacing & alignment in accordions */}
      <ThemedText style={{ marginTop: 20 }} type="subtitle">
        Custom spacing & alignment in header
      </ThemedText>
      <ThemedListAccordion
        title="Accordion with big left spacing"
        description="left->content=40, content->right=5, text center"
        leftToContentSpacing={40}
        contentToRightSpacing={5}
        contentAlignment="center"
        left={(props) => <ThemedListIcon icon="folder" color={props.color} />}
      >
        <ThemedListItem title="Inside item 1" />
        <ThemedListItem title="Inside item 2" />
      </ThemedListAccordion>

      <ThemedListAccordion
        title="Right aligned text, no left"
        description="title & desc align right"
        contentAlignment="right"
      >
        <ThemedListItem title="Inside item 1" />
      </ThemedListAccordion>
    </View>
  );
}
