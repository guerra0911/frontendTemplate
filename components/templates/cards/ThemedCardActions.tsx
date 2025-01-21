/**
 * ThemedCardActions.tsx
 *
 * A row of actions (usually ThemedButtons) at the bottom of a card.
 * Similar to RNP's Card.Actions.
 */

import React, { ReactNode, Children } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle
} from "react-native";

export interface ThemedCardActionsProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ThemedCardActions: React.FC<ThemedCardActionsProps> = ({
  children,
  style,
}) => {
  // Map over each child to give a small margin so buttons won't overlap
  const childrenArray = Children.toArray(children);

  return (
    <View style={[styles.container, style]}>
      {childrenArray.map((child, index) => (
        <View
          key={index}
          style={[index > 0 ? { marginLeft: 8 } : null]}
        >
          {child as ReactNode}
        </View>
      ))}
    </View>
  );
};

export default React.memo(ThemedCardActions);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    // Typically M3 aligns actions to the right:
    justifyContent: "flex-end",
  },
});
