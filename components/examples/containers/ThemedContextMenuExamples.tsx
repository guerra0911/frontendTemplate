// ThemedContextMenuExamples.tsx

import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import ThemedContextMenu, {
  ThemedContextMenuAction,
} from "@/components/templates/containers/ThemedContextMenu";
import { ThemedText } from "@/components/templates/general/ThemedText";
import ThemedButton from "@/components/templates/buttons/ThemedButton";

const ThemedContextMenuExamples: React.FC = () => {
  const [color, setColor] = useState("blue");
  const [circle, setCircle] = useState(false);
  const [disableMenu, setDisableMenu] = useState(false);

  const baseActions: ThemedContextMenuAction[] = [
    { title: "Toggle Color" },
    { title: "Toggle Shape" },
    { title: "Disabled Option", disabled: true },
  ];

  const handleBasePress = (e: any) => {
    const { index, name } = e.nativeEvent;
    if (index === 0) {
      setColor((prev) => (prev === "blue" ? "red" : "blue"));
    } else if (index === 1) {
      setCircle((prev) => !prev);
    }
    Alert.alert("ContextMenu Pressed", `Index: ${index}, Name: ${name}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.title}>ThemedContextMenu Examples</ThemedText>

      {/* 1) LONG-PRESS (DEFAULT) - ANCHORED BELOW CHILD */}
      <View style={styles.exampleBlock}>
        <ThemedText style={styles.sectionTitle}>1) Anchored Below (Long Press)</ThemedText>
        <ThemedContextMenu
          title="Anchored Menu"
          actions={baseActions}
          onPress={handleBasePress}
          anchorToChild // enable child anchoring
          anchorAlignment="below" // default is "below"
          anchorOffsetX={0}
          anchorOffsetY={8} // place menu slightly below child
        >
          <View
            style={[
              styles.square,
              {
                backgroundColor: color,
                borderRadius: circle ? 50 : 0,
              },
            ]}
          />
        </ThemedContextMenu>
      </View>

      {/* 2) SINGLE-TAP + ABOVE CHILD */}
      <View style={styles.exampleBlock}>
        <ThemedText style={styles.sectionTitle}>
          2) Single-Tap + Anchored Above
        </ThemedText>
        <ThemedContextMenu
          title="Dropdown (Above)"
          dropdownMenuMode={true}
          anchorToChild
          anchorAlignment="above"
          anchorOffsetY={190}
          anchorOffsetX={0}
          actions={[
            { title: "Option 1" },
            { title: "Option 2", destructive: true },
            { title: "Option 3", selected: true },
          ]}
          onPress={(event) => {
            Alert.alert(
              "Selected",
              `Index: ${event.nativeEvent.index}, Name: ${event.nativeEvent.name}`
            );
          }}
        >
          <View style={[styles.rectangle, { backgroundColor: "purple" }]}>
            <ThemedText style={styles.label}>Tap (Above)</ThemedText>
          </View>
        </ThemedContextMenu>
      </View>

      {/* 3) DISABLE ENTIRE MENU */}
      <View style={styles.exampleBlock}>
        <ThemedText style={styles.sectionTitle}>3) Disable Entire Menu</ThemedText>
        <ThemedContextMenu
          title="Disabled"
          disabled={disableMenu}
          actions={[{ title: "No Trigger" }]}
          onPress={() => Alert.alert("Should not happen")}
          anchorToChild
          anchorAlignment="below"
          anchorOffsetY={10}
        >
          <View style={[styles.square, { backgroundColor: "#ccc" }]}>
            <ThemedText style={styles.label}>Disabled</ThemedText>
          </View>
        </ThemedContextMenu>
        <Text style={styles.linkText} onPress={() => setDisableMenu(!disableMenu)}>
          {disableMenu ? "Enable Menu" : "Disable Menu"}
        </Text>
      </View>

      {/* 4) WRAPPING A THEMED BUTTON (ANCHOR ON THE RIGHT) */}
      <View style={styles.exampleBlock}>
        <ThemedText style={styles.sectionTitle}>
          4) Wrapping a ThemedButton (Right)
        </ThemedText>
        <ThemedContextMenu
          title="Button Menu"
          actions={[
            { title: "Hello" },
            { title: "Goodbye", destructive: true },
          ]}
          onPress={(event) => {
            const { index, name } = event.nativeEvent;
            Alert.alert("Button Action", `${name} (index: ${index})`);
          }}
          anchorToChild
          anchorAlignment="right"
          anchorOffsetX={6}
        >
          <ThemedButton
            title="Tap or Long-Press"
            onPress={() => Alert.alert("Normal button press")}
            style={styles.button}
          />
        </ThemedContextMenu>
      </View>

      {/* 5) CUSTOM STYLING (BORDER, SHADOW, RADIUS), ANCHORED LEFT */}
      <View style={styles.exampleBlock}>
        <ThemedText style={styles.sectionTitle}>
          5) Custom Styling (Left)
        </ThemedText>
        <ThemedContextMenu
          title="Styled Menu"
          actions={[{ title: "Action A" }, { title: "Action B" }]}
          containerStyle={{ marginVertical: 0 }}
          showContainerBorder={true}
          showContainerShadow={true}
          containerBorderWidth={2}
          containerBorderRadius={12}
          anchorToChild
          anchorAlignment="left"
          anchorOffsetX={-6}
          anchorOffsetY={10}
          onPress={(event) => {
            Alert.alert("Styled Menu Pressed", `Name: ${event.nativeEvent.name}`);
          }}
        >
          <View style={[styles.rectangle, { backgroundColor: "#8BC34A" }]}>
            <ThemedText style={styles.label}>Press for Menu</ThemedText>
          </View>
        </ThemedContextMenu>
      </View>
    </ScrollView>
  );
};

export default ThemedContextMenuExamples;

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  exampleBlock: {
    marginVertical: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  square: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  linkText: {
    marginTop: 6,
    fontSize: 14,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  button: {
    marginVertical: 8,
    width: 200,
  },
});
