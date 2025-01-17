/**
 * ThemedListExamples.tsx
 *
 * Extended usage:
 * - Passing custom components (ThemedCard, ThemedButton, ThemedAvatar) in the "middle" section
 * - A 10-item grocery list
 */

import React, { useState } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";

import ThemedList from "@/components/templates/lists/ThemedList";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedIcon from "@/components/templates/icons/ThemedIcon";
import ThemedAvatar from "@/components/templates/avatars/ThemedAvatar";
import ThemedButton from "@/components/templates/buttons/ThemedButton";
import ThemedCard from "@/components/templates/cards/ThemedCard";

export default function ThemedListExamples() {
  const [expandedId, setExpandedId] = useState<string | number | undefined>(undefined);

  const handleAccordionPress = (id: string | number) => {
    setExpandedId((curr) => (curr === id ? undefined : id));
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.exampleTitle}>
        ThemedList Extended Examples
      </ThemedText>

      {/* 1) List of ThemedCards as items */}
      <ThemedList.Section title="List of ThemedCards">
        {[1, 2, 3].map((i) => (
          <ThemedList.Item
            key={`card-${i}`}
            itemSize="auto"
            style={{ marginVertical: 8 }}
            leftPadding={0}
            rightPadding={0}
            // We pass a ThemedCard in the 'middle'
            middle={
              <ThemedCard
                style={{ width: 300, borderWidth: 1, borderColor: "#ccc" }}
                mode="elevated"
                type="primary"
                onPress={() => Alert.alert(`Card #${i} pressed`)}
              >
                <ThemedCard.Title title={`ThemedCard #${i}`} />
                <ThemedCard.Content>
                  <ThemedText>Inside Card #{i} as list item content</ThemedText>
                </ThemedCard.Content>
              </ThemedCard>
            }
          />
        ))}
      </ThemedList.Section>

      <ThemedDivider />

      {/* 2) List of ThemedButtons as items */}
      <ThemedList.Section title="List of ThemedButtons" dividerBetweenItems>
        {[1, 2].map((i) => (
          <ThemedList.Item
            key={`btn-${i}`}
            disableRipple
            leftPadding={10}
            rightPadding={10}
            middle={
              <ThemedButton
                title={`Click Me #${i}`}
                onPress={() => Alert.alert(`Button #${i} pressed`)}
                themeType="primary"
                style={{ marginVertical: 5 }}
              />
            }
          />
        ))}
      </ThemedList.Section>

      <ThemedDivider />

      {/* 3) Using 'middle' with ThemedAvatar */}
      <ThemedList.Section title="Avatar in the center (middle)">
        <ThemedList.Item
          itemSize={80}
          leftPadding={0}
          rightPadding={0}
          middle={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ThemedAvatar.Icon iconName="person" type="secondary" size={50} />
              <ThemedText type="default" style={{ marginLeft: 10 }}>
                This is an avatar + text, in the center
              </ThemedText>
            </View>
          }
        />
      </ThemedList.Section>

      <ThemedDivider />

      {/* 4) A 10-item grocery list (just text) */}
      <ThemedList.Section title="Grocery List (10 items)" dividerBetweenItems>
        {[
          "Apples",
          "Bananas",
          "Carrots",
          "Dried Mango",
          "Eggs",
          "Flour",
          "Garlic",
          "Honey",
          "Ice Cream",
          "Jalapenos",
        ].map((itemName, idx) => (
          <ThemedList.Item
            key={idx}
            title={itemName}
            onPress={() => Alert.alert(`${itemName} pressed`)}
          />
        ))}
      </ThemedList.Section>

      {/* 5) Controlled Accordion with custom expansions */}
      <ThemedList.AccordionGroup
        expandedId={expandedId}
        onAccordionPress={handleAccordionPress}
        dividerBetweenAccordions
      >
        <ThemedList.Section title="AccordionGroup (Mixed Items)" style={{ marginTop: 20 }}>
          <ThemedList.Accordion id="accA" title="Accordion A" dividerBetweenChildren>
            <ThemedList.Item
              left={() => <ThemedIcon iconName="planet" color="#3498db" />}
              title="Item A1"
            />
            <ThemedList.Item middle={<ThemedText type="default">Custom Middle Node</ThemedText>} />
          </ThemedList.Accordion>

          <ThemedList.Accordion id="accB" title="Accordion B" disableRipple>
            <ThemedList.Item
              title="Item B1"
              description="No visible ripple on parent"
              onPress={() => Alert.alert("Item B1 pressed")}
            />
          </ThemedList.Accordion>
        </ThemedList.Section>
      </ThemedList.AccordionGroup>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exampleTitle: {
    marginVertical: 20,
    textAlign: "center",
  },
});
