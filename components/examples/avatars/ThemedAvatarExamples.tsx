/**
 * ThemedAvatarExamples.tsx
 *
 * Demonstrates usage of ThemedAvatar with .Icon, .Text, .Image sub-components,
 * each supporting theme types (primary, secondary, tertiary) plus color overrides.
 */
import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import ThemedAvatar from "@/components/templates/avatars/ThemedAvatar";
import { ThemedText } from "@/components/templates/typography/ThemedText";

const ThemedAvatarExamples: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="title">
        ThemedAvatar Examples
      </ThemedText>

      <ThemedText type="subtitle">1) Avatar.Icon</ThemedText>
      <View style={styles.row}>
        <ThemedAvatar.Icon iconName="folder" type="primary" style={styles.avatar} />
        <ThemedAvatar.Icon
          iconName="star"
          type="secondary"
          size={70}
          style={styles.avatar}
        />
        <ThemedAvatar.Icon
          iconName="heart"
          iconLibrary="FontAwesome"
          type="tertiary"
          size={80}
          style={styles.avatar}
          iconColor={{ light: "#ff00ff", dark: "#00ffff" }} // override icon color
        />
      </View>

      <ThemedText type="subtitle">2) Avatar.Text</ThemedText>
      <View style={styles.row}>
        <ThemedAvatar.Text label="XD" type="primary" style={styles.avatar} />
        <ThemedAvatar.Text label="RN" type="secondary" size={70} style={styles.avatar} />
        <ThemedAvatar.Text
          label="JS"
          type="tertiary"
          size={80}
          style={styles.avatar}
          textColor={{ light: "#ff6347", dark: "#ffa07a" }} // override text color
        />
      </View>

      <ThemedText type="subtitle">3) Avatar.Image</ThemedText>
      <View style={styles.row}>
        <ThemedAvatar.Image
          source={{ uri: "https://picsum.photos/300" }}
          style={styles.avatar}
          type="primary"
        />
        <ThemedAvatar.Image
          source={{ uri: "https://picsum.photos/400" }}
          size={70}
          style={styles.avatar}
          type="secondary"
        />
        <ThemedAvatar.Image
          source={{ uri: "https://picsum.photos/500" }}
          size={80}
          style={styles.avatar}
          type="tertiary"
          backgroundColor={{ light: "#EFEFEF", dark: "#222222" }} // override background
        />
      </View>
    </View>
  );
};

export default ThemedAvatarExamples;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  avatar: {
    margin: 8,
  },
});
