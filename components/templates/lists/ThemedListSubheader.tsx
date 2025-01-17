import React from "react";
import { StyleSheet, StyleProp, TextStyle } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";

export interface ThemedListSubheaderProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

function ThemedListSubheader({ style, children }: ThemedListSubheaderProps) {
  return (
    <ThemedText type="defaultSemiBold" style={[styles.subheader, style]}>
      {children}
    </ThemedText>
  );
}

export default React.memo(ThemedListSubheader);

const styles = StyleSheet.create({
  subheader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    opacity: 0.7,
  },
});
