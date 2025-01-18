import React, { useCallback } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import ThemedListItem, {
  ThemedListItemProps,
} from "@/components/templates/lists/ThemedListItem";
import ThemedToggleSwitch, {
  ThemedToggleSwitchProps,
} from "@/components/templates/buttons/ThemedToggleSwitch";

export interface ThemedToggleSwitchListItemProps
  extends Omit<ThemedListItemProps, "left" | "right" | "onPress"> {
  /** Current on/off state of the toggle. */
  value: boolean;
  /** Callback when toggling. */
  onValueChange: (newValue: boolean) => void;

  /** If true, tapping entire item toggles the switch. */
  toggleOnPressItem?: boolean;

  /** "left" or "right" for the switch position. @default "right" */
  switchPosition?: "left" | "right";

  /** Additional props to pass to ThemedToggleSwitch. */
  switchProps?: Omit<ThemedToggleSwitchProps, "value" | "onValueChange" | "style">;

  /** Style for the ThemedToggleSwitch itself. */
  switchStyle?: StyleProp<ViewStyle>;
}

export default function ThemedToggleSwitchListItem({
  value,
  onValueChange,
  toggleOnPressItem = false,
  switchPosition = "right",

  switchProps,
  switchStyle,

  ...listItemProps
}: ThemedToggleSwitchListItemProps) {
  const handleItemPress = useCallback(
    (e: GestureResponderEvent) => {
      if (toggleOnPressItem) {
        onValueChange(!value);
      }
    },
    [toggleOnPressItem, onValueChange, value]
  );

  const switchElement = (
    <ThemedToggleSwitch
      {...(switchProps || {})}
      style={switchStyle}
      value={value}
      onValueChange={onValueChange}
    />
  );

  return (
    <ThemedListItem
      onPress={toggleOnPressItem ? handleItemPress : undefined}
      left={switchPosition === "left" ? () => switchElement : undefined}
      right={switchPosition === "right" ? () => switchElement : undefined}
      {...listItemProps}
    />
  );
}
