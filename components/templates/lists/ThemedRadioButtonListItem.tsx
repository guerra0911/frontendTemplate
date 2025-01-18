import React, { useCallback } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import ThemedListItem, {
  ThemedListItemProps,
} from "@/components/templates/lists/ThemedListItem";
import ThemedRadioButton, {
  ThemedRadioButtonProps,
} from "@/components/templates/buttons/ThemedRadioButton";

export interface ThemedRadioButtonListItemProps
  extends Omit<ThemedListItemProps, "left" | "right" | "onPress"> {
  /** Current selected (true) or not (false) for the radio. */
  value: boolean;
  /** Callback when the radio value changes */
  onValueChange: (newValue: boolean) => void;

  /** If true, tapping entire item toggles radio. */
  toggleOnPressItem?: boolean;

  /** "left" or "right" placement for the radio. @default "left" */
  radioPosition?: "left" | "right";

  /**
   * Pass through props to the ThemedRadioButton.
   */
  radioProps?: Omit<ThemedRadioButtonProps, "value" | "onValueChange" | "style">;

  /** Style specifically for the ThemedRadioButton itself. */
  radioStyle?: StyleProp<ViewStyle>;
}

export default function ThemedRadioButtonListItem({
  value,
  onValueChange,
  toggleOnPressItem = false,
  radioPosition = "left",

  radioProps,
  radioStyle,

  ...listItemProps
}: ThemedRadioButtonListItemProps) {
  const handleItemPress = useCallback(
    (e: GestureResponderEvent) => {
      if (toggleOnPressItem) {
        onValueChange(!value);
      }
    },
    [toggleOnPressItem, onValueChange, value]
  );

  const radioElement = (
    <ThemedRadioButton
      {...(radioProps || {})}
      style={radioStyle}
      value={value}
      onValueChange={onValueChange}
    />
  );

  return (
    <ThemedListItem
      onPress={toggleOnPressItem ? handleItemPress : undefined}
      left={radioPosition === "left" ? () => radioElement : undefined}
      right={radioPosition === "right" ? () => radioElement : undefined}
      {...listItemProps}
    />
  );
}
