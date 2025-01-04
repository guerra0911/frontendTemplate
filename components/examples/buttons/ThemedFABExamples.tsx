import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import ThemedFAB from "@/components/templates/buttons/ThemedFAB";
import { ThemedText } from "@/components/templates/general/ThemedText"; // optional text component
// You can also use regular <Text> if you prefer

const ThemedFABExamples: React.FC = () => {
  // ############################################################################
  // STATES FOR FAB EXAMPLES
  // ############################################################################

  const [isOpenDefaultFAB, setIsOpenDefaultFAB] = useState(false);
  const [isOpenCustomFAB, setIsOpenCustomFAB] = useState(false);
  const [isOpenIOSLikeFAB, setIsOpenIOSLikeFAB] = useState(false);
  const [isOpenDisabledFAB, setIsOpenDisabledFAB] = useState(false);
  const [isOpenLoadingFAB, setIsOpenLoadingFAB] = useState(false);
  const [isOpenMultiFAB, setIsOpenMultiFAB] = useState(false);

  // Speed dial states
  const [speedDialPressed1, setSpeedDialPressed1] = useState(false);
  const [speedDialPressed2, setSpeedDialPressed2] = useState(false);
  const [speedDialPressed3, setSpeedDialPressed3] = useState(false);

  // ############################################################################
  // EXAMPLE SECTIONS
  // ############################################################################

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ###################################################################### */}
      {/* DEFAULT FAB */}
      {/* ###################################################################### */}
      <ThemedText style={styles.sectionTitle}>Default FAB</ThemedText>
      <View style={styles.fabContainer}>
        <ThemedFAB
          speedDial={[
            {
              title: "SpeedDial 1",
              onPress: () => setSpeedDialPressed1(!speedDialPressed1),
            },
            {
              title: "SpeedDial 2",
              onPress: () => setSpeedDialPressed2(!speedDialPressed2),
            },
          ]}
          isOpen={isOpenDefaultFAB}
          onOpenChange={(open) => setIsOpenDefaultFAB(open)}
        />
      </View>
      <Text style={styles.infoText}>
        SpeedDial1 Pressed? {speedDialPressed1 ? "Yes" : "No"},{" "}
        SpeedDial2 Pressed? {speedDialPressed2 ? "Yes" : "No"}
      </Text>

      {/* ###################################################################### */}
      {/* CUSTOM STYLES */}
      {/* ###################################################################### */}
      <ThemedText style={styles.sectionTitle}>Custom Styles</ThemedText>
      <View style={styles.fabContainer}>
        <ThemedFAB
          themeType="secondary"
          customHeight={70}
          customWidth={70}
          style={{ bottom: 20, right: 20 }} // example positioning
          speedDial={[
            {
              title: "Dial A",
              themeType: "secondary",
              iconName: "heart",
              iconLibrary: "FontAwesome",
              onPress: () => setSpeedDialPressed1(!speedDialPressed1),
            },
            {
              title: "Dial B",
              themeType: "secondary",
              iconName: "gear",
              iconLibrary: "FontAwesome",
              onPress: () => setSpeedDialPressed2(!speedDialPressed2),
            },
          ]}
          isOpen={isOpenCustomFAB}
          onOpenChange={(open) => setIsOpenCustomFAB(open)}
        />
      </View>
      <Text style={styles.infoText}>
        Press the FAB to view speed dial with custom styling.
      </Text>

      {/* ###################################################################### */}
      {/* IOS NATIVE-LIKE DESIGN */}
      {/* ###################################################################### */}
      <ThemedText style={styles.sectionTitle}>iOS Native-like FAB</ThemedText>
      <View style={styles.fabContainer}>
        <ThemedFAB
          themeType="primary"
          background={{
            light: "#007AFF",
            dark: "#0A84FF",
          }}
          iconName="beer-outline"
          iconLibrary="Ionicons"
          customHeight={60}
          customWidth={60}
          roundedAllCorners={true}
          animatedPress={true}
          style={{ bottom: 80, right: 40 }}
          speedDial={[
            {
              title: "One",
              iconName: "airplane-outline",
              iconLibrary: "Ionicons",
              onPress: () => setSpeedDialPressed1(!speedDialPressed1),
            },
            {
              title: "Two",
              iconName: "battery-full-outline",
              iconLibrary: "Ionicons",
              onPress: () => setSpeedDialPressed2(!speedDialPressed2),
            },
            {
              title: "Three",
              iconName: "barbell-outline",
              iconLibrary: "Ionicons",
              onPress: () => setSpeedDialPressed3(!speedDialPressed3),
            },
          ]}
          isOpen={isOpenIOSLikeFAB}
          onOpenChange={(open) => setIsOpenIOSLikeFAB(open)}
        />
      </View>
      <Text style={styles.infoText}>
        Mimics an iOS look and feel. Pressed 1? {speedDialPressed1 ? "Yes" : "No"}
      </Text>

      {/* ###################################################################### */}
      {/* LOADING STATES */}
      {/* ###################################################################### */}
      <ThemedText style={styles.sectionTitle}>Loading FAB</ThemedText>
      <View style={styles.fabContainer}>
        <ThemedFAB
          loading={{
            isLoading: true,
            text: "Loading...",
            color: "#fff",
          }}
          speedDial={[
            {
              title: "Invisible",
              onPress: () => setSpeedDialPressed1(!speedDialPressed1),
            },
          ]}
          isOpen={isOpenLoadingFAB}
          onOpenChange={(open) => setIsOpenLoadingFAB(open)}
        />
      </View>
      <Text style={styles.infoText}>
        FAB is in a loading state; speed dial won't open.
      </Text>

      {/* ###################################################################### */}
      {/* DISABLED STATES */}
      {/* ###################################################################### */}
      <ThemedText style={styles.sectionTitle}>Disabled FAB</ThemedText>
      <View style={styles.fabContainer}>
        <ThemedFAB
          disabled={true}
          speedDial={[
            {
              title: "DisabledDial",
              onPress: () => {},
            },
          ]}
          isOpen={isOpenDisabledFAB}
          onOpenChange={(open) => setIsOpenDisabledFAB(open)}
        />
      </View>
      <Text style={styles.infoText}>
        The main FAB is disabled; cannot be pressed or opened.
      </Text>

      {/* ###################################################################### */}
      {/* MULTIPLE FAB EXAMPLE */}
      {/* ###################################################################### */}
      <ThemedText style={styles.sectionTitle}>Multiple FAB Example</ThemedText>
      <View style={styles.fabContainer}>
        <ThemedFAB
          themeType="tertiary"
          iconName="add-circle-outline"
          iconLibrary="Ionicons"
          speedDial={[
            {
              title: "Dial 1",
              iconName: "comment",
              iconLibrary: "FontAwesome",
              onPress: () => setSpeedDialPressed1(!speedDialPressed1),
            },
            {
              title: "Dial 2",
              iconName: "camera",
              iconLibrary: "FontAwesome",
              onPress: () => setSpeedDialPressed2(!speedDialPressed2),
            },
            {
              title: "Dial 3",
              iconName: "music",
              iconLibrary: "FontAwesome",
              onPress: () => setSpeedDialPressed3(!speedDialPressed3),
            },
            {
              title: "Dial 4",
              iconName: "map",
              iconLibrary: "FontAwesome",
              onPress: () => {},
            },
          ]}
          isOpen={isOpenMultiFAB}
          onOpenChange={(open) => setIsOpenMultiFAB(open)}
          style={{ bottom: 100, right: 20 }}
        />
        <ThemedFAB
          themeType="primary"
          iconName="add-outline"
          iconLibrary="Ionicons"
          speedDial={[
            {
              title: "Action A",
              onPress: () => {},
            },
            {
              title: "Action B",
              onPress: () => {},
            },
          ]}
          style={{ bottom: 100, left: 20 }}
        />
      </View>
      <Text style={styles.infoText}>
        Two FABs on the same screen, each handling its own state.
      </Text>
    </ScrollView>
  );
};

// ############################################################################
// STYLES
// ############################################################################

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  fabContainer: {
    width: "100%",
    height: 150,
    // This container is relatively small to show the FAB floating around
    // Typically, you'd place the FAB in your main screen with absolute positioning
    backgroundColor: "#f0f0f0",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    color: "#333",
    marginBottom: 10,
  },
});

export default ThemedFABExamples;
