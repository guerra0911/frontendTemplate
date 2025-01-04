import React, { useState } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import ThemedImageButton from "@/components/templates/buttons/ThemedImageButton";
import { ThemedText } from "@/components/templates/general/ThemedText";

/* 
  Sample local image import can be done as needed.
  For usage, we do: imageSource={require("@/assets/images/CampNouGame.jpg")}
*/

const ThemedImageButtonExamples: React.FC = () => {
  // Independent states for each example button
  const [basicPressed, setBasicPressed] = useState(false);
  const [iconPressed, setIconPressed] = useState(false);
  const [disabledPressed, setDisabledPressed] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [roundedImagePressed, setRoundedImagePressed] = useState(false);

  const handlePress = (buttonName: string) => {
    Alert.alert("Button Pressed", buttonName);
  };

  const handleLoadingPress = () => {
    if (loadingState) return;
    setLoadingState(true);
    handlePress("Loading Image Button Pressed");
    // Simulate 2-second async operation
    setTimeout(() => {
      setLoadingState(false);
      Alert.alert("Loading Complete", "The loading has finished.");
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* BASIC IMAGE BUTTON */}
      <ThemedText style={styles.sectionTitle}>Basic Image Button</ThemedText>
      <ThemedImageButton
        title="Camp Nou"
        onPress={() => {
          handlePress("Camp Nou Button Pressed");
          setBasicPressed(!basicPressed);
        }}
        imageSource={require("@/assets/images/CampNouGame.jpg")}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {basicPressed ? "Camp Nou Pressed" : "Press the button above"}
      </ThemedText>

      {/* IMAGE BUTTON WITH ICON */}
      <ThemedText style={styles.sectionTitle}>Image + Icon</ThemedText>
      <ThemedImageButton
        onPress={() => {
          handlePress("Icon Image Button Pressed");
          setIconPressed(!iconPressed);
        }}
        imageSource={require("@/assets/images/CampNouGame.jpg")}
        icons={{
          iconName: "football-outline",
          iconLibrary: "Ionicons",
          iconSize: 24,
          iconPosition: "left",
          iconPadding: { right: 8 },
        }}
        text={{
          style: { fontSize: 18, color: "#FFFFFF", fontWeight: "bold" },
        }}
        title="Fútbol Time"
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {iconPressed ? "Fútbol Time Pressed" : "Press the button above"}
      </ThemedText>

      {/* DISABLED IMAGE BUTTON */}
      <ThemedText style={styles.sectionTitle}>Disabled Image Button</ThemedText>
      <ThemedImageButton
        title="Disabled"
        onPress={() => {
          handlePress("This should not appear");
          setDisabledPressed(!disabledPressed);
        }}
        disabled={true}
        imageSource={require("@/assets/images/CampNouGame.jpg")}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        Disabled Button (Cannot Press)
      </ThemedText>

      {/* LOADING IMAGE BUTTON */}
      <ThemedText style={styles.sectionTitle}>Loading Image Button</ThemedText>
      <ThemedImageButton
        title="Load Data"
        onPress={handleLoadingPress}
        loading={{
          isLoading: loadingState,
          text: "Loading...",
          color: "#ffffff",
        }}
        imageSource={require("@/assets/images/CampNouGame.jpg")}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {loadingState ? "Loading..." : "Press the Load Data button above"}
      </ThemedText>

      {/* ROUNDED ALL CORNERS IMAGE BUTTON */}
      <ThemedText style={styles.sectionTitle}>
        Rounded All Corners (Factor)
      </ThemedText>
      <ThemedImageButton
        title="Rounded Image Button"
        onPress={() => {
          handlePress("Rounded Image Button Pressed");
          setRoundedImagePressed(!roundedImagePressed);
        }}
        imageSource={require("@/assets/images/CampNouGame.jpg")}
        roundedAllCorners={true}
        customHeight={60}
        customWidth={200}
        animatedPress={true}
        style={styles.button}
      />
      <ThemedText style={styles.selectedText}>
        {roundedImagePressed ? "Rounded Button Pressed" : "Press the button above"}
      </ThemedText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginBottom: 20,
    width: "80%",
  },
  selectedText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: "#333333",
  },
});

export default ThemedImageButtonExamples;
