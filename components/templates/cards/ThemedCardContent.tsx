/**
 * ThemedCardContent.tsx
 *
 * A simple container for card content.
 */

import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export interface ThemedCardContentProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

const ThemedCardContent: React.FC<ThemedCardContentProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 16, // default padding
  },
});

export default ThemedCardContent;
