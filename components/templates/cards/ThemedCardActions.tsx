/**
 * ThemedCardActions.tsx
 *
 * A row of actions (usually buttons or texts) at the bottom of a card.
 */

import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

export interface ThemedCardActionsProps {
  /** The actions inside the card (e.g. buttons, text). */
  children?: React.ReactNode;

  /** Optional style for the container. */
  style?: StyleProp<ViewStyle>;
}

const ThemedCardActions: React.FC<ThemedCardActionsProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>{children}</View>
  );
};

export default React.memo(ThemedCardActions);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 8,
  },
});
