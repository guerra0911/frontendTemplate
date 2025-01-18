/**
 * ThemedListItemExamples.tsx
 *
 * Mirrors the example usage from RNP's ListItemExample, but using ThemedList
 * components and correctly implementing ThemedToggleSwitch.
 */
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedListItem from "@/components/templates/lists/ThemedListItem";
import { ThemedDivider } from "@/components/templates/general/ThemedDivder";
import ThemedAvatar from "@/components/templates/avatars/ThemedAvatar";
import ThemedToggleSwitch from "@/components/templates/buttons/ThemedToggleSwitch";
import ThemedCheckBox from "@/components/templates/buttons/ThemedCheckBox"; // if available
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedListIcon from "@/components/templates/lists/ThemedListIcon";
import ThemedListImage from "@/components/templates/lists/ThemedListImage";

// We'll mock a "CenteredCheckbox" component using ThemedCheckBox for demonstration
function CenteredCheckbox() {
  return (
    <View style={styles.centered}>
      <ThemedCheckBox value={true} onValueChange={() => {}} style={styles.centered} />
    </View>
  );
}

export default function ThemedListItemExamples() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">ThemedListItem Examples</ThemedText>

      <ThemedText type="subtitle">Text-only items</ThemedText>
      <ThemedListItem title="Headline" />
      <ThemedListItem title="Headline" description="Supporting text" />
      <ThemedListItem
        title="Headline"
        description="A very long supporting text that might wrap into multiple lines..."
      />
      <ThemedDivider />

      <ThemedListItem title="Headline" right={() => <CenteredCheckbox />} />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        right={() => <CenteredCheckbox />}
      />
      <ThemedListItem
        title="Headline"
        description="Multi-line supporting text"
        right={() => <CenteredCheckbox />}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">With icon</ThemedText>
      <ThemedListItem
        title="Headline"
        left={(props) => (
          <ThemedListIcon icon="person-circle-outline" color={props.color} />
        )}
      />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        left={(props) => (
          <ThemedListIcon icon="person-circle-outline" color={props.color} />
        )}
        right={() => <CenteredCheckbox />}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">With avatar</ThemedText>
      <ThemedListItem
        title="Headline"
        left={() => <ThemedAvatar.Text label="A" size={40} />}
      />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        left={() => <ThemedAvatar.Text label="A" size={40} />}
      />
      <ThemedListItem
        title="Headline"
        description="Multi-line text..."
        left={() => <ThemedAvatar.Text label="A" size={40} />}
        right={() => <CenteredCheckbox />}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">With image</ThemedText>
      <ThemedListItem
        title="Headline"
        left={() => (
          <ThemedListImage source={{ uri: "https://picsum.photos/100" }}/>
        )}
      />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        left={() => (
          <ThemedListImage source={{ uri: "https://picsum.photos/200" }} />
        )}
      />
      <ThemedDivider />

      <ThemedText type="subtitle">With switch (ToggleSwitch)</ThemedText>
      <ThemedListItem
        title="Headline"
        right={() => <ThemedToggleSwitch value={true} onValueChange={() => {}} />}
      />
      <ThemedListItem
        title="Headline"
        description="Supporting text"
        right={() => <ThemedToggleSwitch value={false} onValueChange={() => {}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    alignSelf: "center",
  },
});

