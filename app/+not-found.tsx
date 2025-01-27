// app/+not-found.tsx
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedView } from "@/components/templates/containers/ThemedView";

export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This screen doesn't exist.</ThemedText>
      <Link href="/(tabs)/home" style={styles.link}>
        <ThemedText type="link">Go to home screen!</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
