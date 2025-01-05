/**
 * ThemedCardContent.tsx
 *
 * A container for the main textual content of a card.
 */

import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

export interface ThemedCardContentProps {
  /** The content elements inside the card content. */
  children?: React.ReactNode;

  /** Optional style for the container. */
  style?: StyleProp<ViewStyle>;
}

const ThemedCardContent: React.FC<ThemedCardContentProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default React.memo(ThemedCardContent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
