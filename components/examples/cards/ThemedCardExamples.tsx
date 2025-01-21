/**
 * ThemedCardExamples.tsx
 *
 * Demonstrates usage of ThemedCard with modes "elevated", "outlined", "contained"
 * replicating the React Native Paper CardExample structure as closely as possible
 * using your Themed components (ThemedCard, ThemedCardCover, ThemedCardContent, etc.).
 */

import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import ThemedCard from "@/components/templates/cards/ThemedCard";
import ThemedCardCover from "@/components/templates/cards/ThemedCardCover";
import ThemedCardContent from "@/components/templates/cards/ThemedCardContent";
import ThemedCardTitle from "@/components/templates/cards/ThemedCardTitle";
import ThemedCardActions from "@/components/templates/cards/ThemedCardActions";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import ThemedButton from "@/components/templates/buttons/ThemedButton";
import ThemedIcon from "@/components/templates/icons/ThemedIcon";
import ThemedAvatar from "@/components/templates/avatars/ThemedAvatar"; // if you have a ThemedAvatar
import { Ionicons } from "@expo/vector-icons"; // or similar

type CardMode = "elevated" | "outlined" | "contained";

export default function ThemedCardExamples() {
  const [selectedMode, setSelectedMode] = useState<CardMode>("elevated");
  const [heartSelected, setHeartSelected] = useState(false);

  const modes: CardMode[] = ["elevated", "outlined", "contained"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Mode selection row */}
      <View style={styles.modeSelector}>
        {modes.map((mode) => (
          <ThemedButton
            key={mode}
            title={mode}
            onPress={() => setSelectedMode(mode)}
            style={[
              styles.modeButton,
              { backgroundColor: selectedMode === mode ? "#aaa" : "#ddd" },
            ]}
            customWidth={100}
            customHeight={36}
          />
        ))}
      </View>

      {/* 1) Basic Card with cover + title + content */}
      <ThemedCard style={styles.card} mode={selectedMode}>
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/wrecked-ship/600/300" }}
        />
        <ThemedCardTitle title="Abandoned Ship" style={{ marginHorizontal: 16, marginVertical: 8 }}/>
        <ThemedCardContent>
          <ThemedText>
            The Abandoned Ship is a wrecked ship found on Route 108 in Hoenn...
          </ThemedText>
        </ThemedCardContent>
      </ThemedCard>

      {/* 2) Card with custom bigger cover + actions */}
      <ThemedCard style={styles.card} mode={selectedMode}>
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/forest/600/300" }}
          height={220}
        />
        <ThemedCardActions>
          <ThemedButton title="Share" onPress={() => {}} customWidth={90} />
          <ThemedButton title="Explore" onPress={() => {}} customWidth={90} />
        </ThemedCardActions>
      </ThemedCard>

      {/* 3) Card with Title, Content, no cover, big text */}
      <ThemedCard style={styles.card} mode={selectedMode}>
        <ThemedCardTitle
          title="Berries that are trimmed"
          subtitle="Omega Ruby"
          style={{ margin: 8 }}
          left={() => <ThemedAvatar.Text label="B" size={40} />}
          right={() => (
            <ThemedIcon
              iconName="ellipsis-vertical"
              iconLibrary="Ionicons"
              size={24}
              color="#555"
            />
          )}
        />
        <ThemedCardContent>
          <ThemedText>
            Dotted around the Hoenn region, you will find loamy soil...
          </ThemedText>
        </ThemedCardContent>
      </ThemedCard>

      {/* 4) Card with custom radius */}
      <ThemedCard
        style={[styles.card, { borderRadius: 16 }]}
        mode={selectedMode}
      >
        <ThemedCardTitle
          title="Custom Border Radius"
          subtitle="Even cover can match"
          style={{ margin: 8 }}
        />
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/strawberries/600/300" }}
          style={{ borderRadius: 16 }}
        />
      </ThemedCard>

      {/* 5) Pressable card => onPress alert */}
      <ThemedCard
        style={styles.card}
        mode={selectedMode}
        onPress={() => Alert.alert("Card Pressed", "The Chameleon was tapped.")}
      >
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/chameleon/600/300" }}
        />
        <ThemedCardTitle title="Pressable Chameleon" style={{ margin: 8 }}/>
        <ThemedCardContent>
          <ThemedText>This card triggers an alert when pressed.</ThemedText>
        </ThemedCardContent>
      </ThemedCard>

      {/* 6) Another pressable card => toggle heart icon on the right */}
      <ThemedCard style={styles.card} mode={selectedMode}>
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/strawberries2/600/300" }}
        />
        <ThemedCardTitle
          title="Just Strawberries"
          subtitle="...and only strawberries"
          style={{ margin: 8 }}
          right={() => (
            <ThemedIcon
              iconName={heartSelected ? "heart" : "heart-outline"}
              iconLibrary="Ionicons"
              size={24}
              color={heartSelected ? "red" : "#666"}
            />
          )}
        />
      </ThemedCard>

      {/* 7) onLongPress card */}
      <ThemedCard
        style={styles.card}
        mode={selectedMode}
        onLongPress={() =>
          Alert.alert("Long Pressed", "City card was long pressed")
        }
      >
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/city/600/300" }}
        />
        <ThemedCardTitle
          title="Long Pressable City"
          left={() => <ThemedAvatar.Icon iconName="home-outline" size={40} />}
          style={{ margin: 8 }}
        />
        <ThemedCardContent>
          <ThemedText>
            This card triggers an alert on long press only.
          </ThemedText>
        </ThemedCardContent>
      </ThemedCard>

      {/* 8) Example with custom padding + individual margins */}
      <ThemedCard
        style={styles.card}
        mode={selectedMode}
        contentPadding={16} // adds uniform padding inside the card
      >
        <ThemedCardCover
          source={{ uri: "https://picsum.photos/seed/customPadding/600/300" }}
          // margin around the cover subcomponent
          style={{ marginBottom: 8 }}
        />
        <ThemedCardTitle
          title="Custom Paddings"
          subtitle="Card & Subcomponents"
          // margin around the title
          style={{ margin: 8 }}
        />
        <ThemedCardContent style={{ marginBottom: 8 }}>
          <ThemedText>
            This demonstrates how you can add padding to the entire card or
            apply margins/paddings to each subcomponent individually.
          </ThemedText>
        </ThemedCardContent>
        <ThemedCardActions style={{ marginTop: 8 }}>
        <ThemedButton title="Action 1" onPress={() => Alert.alert("Action 1 pressed")} customWidth={162} />
        <ThemedButton title="Action 2" onPress={() => Alert.alert("Action 2 pressed")} customWidth={162} />
        </ThemedCardActions>
      </ThemedCard>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 20,
  },
  modeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  modeButton: {
    marginHorizontal: 5,
  },
});
