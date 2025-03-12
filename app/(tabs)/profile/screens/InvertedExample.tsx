// app/(tabs)/profile/screens/InvertedExample.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemedInverted } from "@/components/templates/pages/ThemedInverted";
import { range } from "@/utils/range";

interface ChatMessage {
  id: string;
  message: string;
  type: 'sent' | 'received';
}

const generateRandomText = () =>
  `This is a sample message. Random ID: ${Math.random().toString(36).substr(2, 9)}`;

const data: ChatMessage[] = range({ end: 100 }).map((i) => {
  const id = `${i}-${Math.random()}`;
  const message = generateRandomText();
  const type = i % 2 === 0 ? 'sent' : 'received';

  return { id, message, type };
});

const ChatMessage: React.FC<ChatMessage> = ({ message, type }) => {
  return (
    <View
      style={
        type === 'sent'
          ? styles.sentMessageContainer
          : styles.receivedMessageContainer
      }
    >
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

export default function InvertedExample() {
  return (
    <ThemedInverted
      data={data}
      renderItem={({ item }) => <ChatMessage {...item} />}
      headerProps={{
        renderCenter: () => <Text style={{ color: "#fff" }}>Inverted Chat</Text>,
        // Optionally, if you want to pass this prop down:
        // headerCenterFadesIn: false,
      }}
      keyExtractor={(item) => item.id}
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  contentContainer: {
    backgroundColor: "black",
    paddingHorizontal: 12,
  },
  navBarTitle: { fontSize: 16, fontWeight: "bold", color: "white" },
  messageText: {
    color: "white",
  },
  sentMessageContainer: {
    backgroundColor: "#186BE7",
    alignSelf: "flex-start",
    borderRadius: 12,
    maxWidth: "75%",
    padding: 12,
    marginVertical: 12,
  },
  receivedMessageContainer: {
    backgroundColor: "#1F2329",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    borderRadius: 12,
    maxWidth: "75%",
    padding: 12,
    marginVertical: 12,
  },
  separator: {
    height: 24,
  },
});
