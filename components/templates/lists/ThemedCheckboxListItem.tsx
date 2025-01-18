import React, { useState, useCallback } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import ThemedListItem, {
  ThemedListItemProps,
} from "@/components/templates/lists/ThemedListItem";
import ThemedCheckBox, {
  ThemedCheckBoxProps,
} from "@/components/templates/buttons/ThemedCheckBox";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 * We'll combine ThemedListItemProps + ThemedCheckBoxProps,
 * except we rename or omit conflicting fields. We also add toggling logic.
 */
export interface ThemedCheckboxListItemProps
  extends Omit<ThemedListItemProps, "left" | "right" | "onPress"> {
  /** Current checked state of the checkbox */
  value: boolean;
  /** Callback when the checkbox value changes */
  onValueChange: (newValue: boolean) => void;

  /** If true, tapping the entire item toggles the checkbox. */
  toggleOnPressItem?: boolean;

  /** Place the checkbox on left or right? @default "left" */
  checkboxPosition?: "left" | "right";

  /**
   * If you want to customize ThemedCheckBox further (size, colors, etc.),
   * we merge ThemedCheckBoxProps but override value/onValueChange above.
   */
  checkBoxProps?: Omit<ThemedCheckBoxProps, "value" | "onValueChange" | "style">;

  /** Style specifically for the ThemedCheckBox itself. */
  checkBoxStyle?: StyleProp<ViewStyle>;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
export default function ThemedCheckboxListItem({
  value,
  onValueChange,
  toggleOnPressItem = false,
  checkboxPosition = "left",

  checkBoxProps,
  checkBoxStyle,

  // The rest are ThemedListItemProps
  ...listItemProps
}: ThemedCheckboxListItemProps) {
  // If user taps the entire item
  const handleItemPress = useCallback(
    (e: GestureResponderEvent) => {
      if (toggleOnPressItem) {
        onValueChange(!value);
      }
      // else do nothing, or pass some additional callback if you prefer
    },
    [toggleOnPressItem, onValueChange, value]
  );

  // The actual ThemedCheckBox or left or right element
  const checkBoxElement = (
    <ThemedCheckBox
      {...(checkBoxProps || {})}
      style={checkBoxStyle}
      value={value}
      onValueChange={onValueChange}
    />
  );

  return (
    <ThemedListItem
      // If toggleOnPressItem is true, item is pressable => toggles on press
      onPress={toggleOnPressItem ? handleItemPress : undefined}
      // Put the checkbox in left or right
      left={checkboxPosition === "left" ? () => checkBoxElement : undefined}
      right={checkboxPosition === "right" ? () => checkBoxElement : undefined}
      {...listItemProps}
    />
  );
}
