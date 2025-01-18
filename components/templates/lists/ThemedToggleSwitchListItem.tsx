import React, { useCallback } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import ThemedListItem, {
  ThemedListItemProps,
} from "@/components/templates/lists/ThemedListItem";
import ThemedToggleSwitch, {
  ThemedToggleSwitchProps,
} from "@/components/templates/buttons/ThemedToggleSwitch";

export interface ThemedToggleSwitchListItemProps
  extends Omit<
    ThemedListItemProps,
    "left" | "right" | "onPress" | "leftChildren" | "rightChildren"
  > {
  value: boolean;
  onValueChange: (newValue: boolean) => void;

  toggleOnPressItem?: boolean;
  switchPosition?: "left" | "right";

  switchProps?: Omit<ThemedToggleSwitchProps, "value" | "onValueChange" | "style">;
  switchStyle?: StyleProp<ViewStyle>;

  disableRippleEffect?: boolean;

  leftChildren?: React.ReactNode;
  middleChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}

export default function ThemedToggleSwitchListItem({
  value,
  onValueChange,
  toggleOnPressItem = false,
  switchPosition = "right",

  switchProps,
  switchStyle,

  leftChildren,
  middleChildren,
  rightChildren,

  disableRippleEffect = false,

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
      disableRippleEffect={disableRippleEffect}
      left={switchPosition === "left" ? () => switchElement : undefined}
      right={switchPosition === "right" ? () => switchElement : undefined}
      leftChildren={switchPosition === "left" ? undefined : leftChildren}
      rightChildren={switchPosition === "right" ? undefined : rightChildren}
      middleChildren={middleChildren}
      {...listItemProps}
    />
  );
}
