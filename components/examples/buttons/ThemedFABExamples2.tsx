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

export default function ThemedFABExamples2() {
//   // Show or hide the entire group
//   const [visible, setVisible] = useState(true);


//   // For our second speed-dial
//   const [customOpen, setCustomOpen] = useState(false);
//   const actions2: ThemedFABGroupAction[] = [
//     {
//       iconName: "heart" as IconName,
//       label: "Like",
//       // color: { light: "#FF4081", dark: "#FF77A9" }, 
//       onPress: () => Alert.alert("Like pressed"),
//       // labelStyle: { fontSize: 16 },
//       // labelTextColor: { light: "#FFEEFF", dark: "#FFEEFF" },
//     },
//     {
//       iconName: "chatbubbles" as IconName,
//       label: "Message",
//       onPress: () => Alert.alert("Message pressed"),
//       // color: { light: "#FFA000", dark: "#FFC107" },
//       // labelStyle: { fontSize: 14 },
//       // labelTextColor: { light: "#FFFFFF", dark: "#222222" },
//     },
//     {
//       iconName: "share" as IconName,
//       label: "Share",
//       // rippleColor: { light: "#FFC0CB", dark: "#FFF" },
//       onPress: () => Alert.alert("Share pressed"),
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <ThemedText style={styles.title}>ThemedFABGroup Examples</ThemedText>

//       {/* ---------- 1) Basic Speed Dial ---------- */}
//       <ThemedText style={{ marginVertical: 10 }}>
//         Speed-dial is{" "}
//         <ThemedText style={{ fontWeight: "bold" }}>
//           {customOpen ? "OPEN" : "CLOSED"}
//         </ThemedText>
//       </ThemedText>

//         {/* ---------- 2) Customized Speed Dial ---------- */}
//       <View style={{ marginVertical: 40 }}>
//         <ThemedText style={[styles.title, { fontSize: 16 }]}>
//           Customized Speed Dial
//         </ThemedText>
//         <ThemedFABGroup
//           actions={actions2}
//           open={customOpen}
//           onStateChange={({ open }) => setCustomOpen(open)}
//           iconName={customOpen ? ("close" as IconName) : ("add" as IconName)}
//           // We'll pass some custom color for the main FAB:
//           // mainFabColor={{ light: "#512DA8", dark: "#B39DDB" }}
//           // mainFabRippleColor={{ light: "#FFFFFF", dark: "#FFFFFF" }}
//           // Also pass a custom style to the main FAB:
//           // mainFabStyle={{ width: 60, height: 60 }} 
//           onPress={() => {
//             if (customOpen) {
//               Alert.alert("Main FAB pressed while open!");
//             }
//           }}
//           visible={visible}
//           label={customOpen ? "Close me" : "Open me"}
//           // The important part: separate spacing props 
//           // speedDialToMainSpacing={60}
//           // speedDialBetweenSpacing={40}
//         />
//       </View>

//       <View style={{ marginTop: 40 }}>
//         <ThemedFABGroup
//           actions={[]}
//           open={false}
//           onStateChange={() => {}}
//           iconName={visible ? ("eye-off" as IconName) : ("eye" as IconName)}
//           onPress={() => setVisible(!visible)}
//           visible
//           label={visible ? "Hide Speed-Dial" : "Show Speed-Dial"}
//         />
//       </View>

      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 16,
//     justifyContent: "center",
//   },
//   title: {
//     marginBottom: 10,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// For our first speed-dial
  const [open, setOpen] = useState(false);
  // Show or hide the entire group
  const [visible, setVisible] = useState(true);

  // Speed dial actions
  const actions1: ThemedFABGroupAction[] = [
        {
          iconName: "heart" as IconName,
          label: "Like",
          // color: { light: "#FF4081", dark: "#FF77A9" }, 
          onPress: () => Alert.alert("Like pressed"),
          // labelStyle: { fontSize: 16 },
          // labelTextColor: { light: "#FFEEFF", dark: "#FFEEFF" },
        },
        {
          iconName: "chatbubbles" as IconName,
          label: "Message",
          onPress: () => Alert.alert("Message pressed"),
          // color: { light: "#FFA000", dark: "#FFC107" },
          // labelStyle: { fontSize: 14 },
          // labelTextColor: { light: "#FFFFFF", dark: "#222222" },
        },
        {
          iconName: "share" as IconName,
          label: "Share",
          // rippleColor: { light: "#FFC0CB", dark: "#FFF" },
          onPress: () => Alert.alert("Share pressed"),
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
        closedMainFabProps={{
            size: "large",
            backgroundColor: { light: "#800080", dark: "#800080" }, // purple
            borderColor: { light: "yellow", dark: "yellow" },
            borderWidth: 3,
            borderStyle: "solid",
            iconName: "add",
            elevation: 8,
          }}
          // For the open main FAB:
          openMainFabProps={{
            size: "large",
            backgroundColor: { light: "orange", dark: "orange" },
            borderColor: { light: "blue", dark: "blue" },
            borderWidth: 3,
            borderStyle: "solid",
            iconName: "close",
            elevation: 10,
          }}
          miniFabProps={{
            size: "small",
            backgroundColor: { light: "#FFA500", dark: "#FFA500" },
            borderColor: { light: "blue", dark: "blue" },
            borderWidth: 2,
            borderStyle: "solid",
            elevation: 5,
          }}
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
