import React, { useState, useMemo } from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import {
  ThemedListAccordionGroupContext,
  ThemedListAccordionGroupContextType,
} from "./ThemedListAccordionContext";

export interface ThemedListAccordionGroupProps {
  expandedId?: string | number;
  onAccordionPress?: (expandedId: string | number) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ThemedListAccordionGroup({
  expandedId: expandedIdProp,
  onAccordionPress,
  children,
  style,
}: ThemedListAccordionGroupProps) {
  const [localExpandedId, setLocalExpandedId] = useState<
    string | number | undefined
  >(undefined);

  function handlePress(id: string | number) {
    setLocalExpandedId((cur) => (cur === id ? undefined : id));
  }

  const contextValue: ThemedListAccordionGroupContextType = useMemo(() => {
    return {
      expandedId: expandedIdProp !== undefined ? expandedIdProp : localExpandedId,
      onAccordionPress: onAccordionPress || handlePress,
    };
  }, [expandedIdProp, localExpandedId, onAccordionPress]);

  return (
    <ThemedListAccordionGroupContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>{children}</View>
    </ThemedListAccordionGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
