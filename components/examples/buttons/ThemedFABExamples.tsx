/**
 * ThemedFABExamples.tsx
 *
 * Demonstrates usage of ThemedFABGroup with two examples:
 * 1) A basic speed-dial (default appearance).
 * 2) A customized speed-dial showing main FAB color changes, different labels, custom spacing, etc.
 */

import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import ThemedFABGroup from "@/components/templates/buttons/ThemedFABGroup";
import { ThemedText } from "@/components/templates/general/ThemedText";

import type { IconName } from "@/components/templates/icons/ThemedIcon";
import type { ThemedFABGroupAction } from "@/components/templates/buttons/ThemedFABGroup";

export default function ThemedFABExamples() {
  // For our first speed-dial
  const [open, setOpen] = useState(false);
  // Show or hide the entire group
  const [visible, setVisible] = useState(true);

  // Speed dial actions
  const actions1: ThemedFABGroupAction[] = [
    {
      iconName: "home" as IconName,
      label: "Home",
      onPress: () => Alert.alert("Home pressed"),
    },
    {
      iconName: "star" as IconName,
      label: "Star",
      onPress: () => Alert.alert("Star pressed"),
    },
    {
      iconName: "mail" as IconName,
      label: "Email",
      onPress: () => Alert.alert("Email pressed"),
    },
    {
      iconName: "notifications" as IconName,
      label: "Remind",
      onPress: () => Alert.alert("Remind pressed"),
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>ThemedFABGroup Examples</ThemedText>

      {/* ---------- 1) Basic Speed Dial ---------- */}
      <ThemedText style={{ marginVertical: 10 }}>
        Speed-dial is{" "}
        <ThemedText style={{ fontWeight: "bold" }}>
          {open ? "OPEN" : "CLOSED"}
        </ThemedText>
      </ThemedText>

      <ThemedFABGroup
        actions={actions1}
        open={open}
        onStateChange={({ open }) => setOpen(open)}
        iconName={open ? ("close" as IconName) : ("add" as IconName)}
        onPress={() => {
          if (open) {
            Alert.alert("Main FAB pressed while open!");
          }
        }}
        visible={visible}
        label={open ? "Close" : "Open"}
      />

      <View style={{ marginTop: 40 }}>
        <ThemedFABGroup
          actions={[]}
          open={false}
          onStateChange={() => {}}
          iconName={visible ? ("eye-off" as IconName) : ("eye" as IconName)}
          onPress={() => setVisible(!visible)}
          visible
          label={visible ? "Hide Speed-Dial" : "Show Speed-Dial"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    justifyContent: "center",
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
