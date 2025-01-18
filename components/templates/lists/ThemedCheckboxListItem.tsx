import React, { useCallback } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import ThemedListItem, {
  ThemedListItemProps,
} from "@/components/templates/lists/ThemedListItem";
import ThemedCheckBox, {
  ThemedCheckBoxProps,
} from "@/components/templates/buttons/ThemedCheckBox";

export interface ThemedCheckboxListItemProps
  extends Omit<
    ThemedListItemProps,
    "left" | "right" | "onPress" | "leftChildren" | "rightChildren"
  > {
  value: boolean;
  onValueChange: (newValue: boolean) => void;

  /** Tapping entire item toggles checkbox if true. */
  toggleOnPressItem?: boolean;

  /** "left" or "right" placement for the checkbox. @default "left" */
  checkboxPosition?: "left" | "right";

  /** Additional props for ThemedCheckBox. */
  checkBoxProps?: Omit<
    ThemedCheckBoxProps,
    "value" | "onValueChange" | "style"
  >;
  checkBoxStyle?: StyleProp<ViewStyle>;

  disableRippleEffect?: boolean;

  // Additional dynamic children
  leftChildren?: React.ReactNode;
  middleChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}

export default function ThemedCheckboxListItem({
  value,
  onValueChange,
  toggleOnPressItem = false,
  checkboxPosition = "left",

  checkBoxProps,
  checkBoxStyle,

  leftChildren,
  middleChildren,
  rightChildren,

  disableRippleEffect = false,

  ...listItemProps
}: ThemedCheckboxListItemProps) {
  const handleItemPress = useCallback(
    (e: GestureResponderEvent) => {
      if (toggleOnPressItem) {
        onValueChange(!value);
      }
    },
    [toggleOnPressItem, onValueChange, value]
  );

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
      onPress={toggleOnPressItem ? handleItemPress : undefined}
      disableRippleEffect={disableRippleEffect}
      // We combine the existing leftChildren or rightChildren with the checkbox
      left={
        checkboxPosition === "left"
          ? () => checkBoxElement
          : undefined
      }
      right={
        checkboxPosition === "right"
          ? () => checkBoxElement
          : undefined
      }
      leftChildren={checkboxPosition === "left" ? undefined : leftChildren}
      rightChildren={checkboxPosition === "right" ? undefined : rightChildren}
      middleChildren={middleChildren}
      {...listItemProps}
    />
  );
}
