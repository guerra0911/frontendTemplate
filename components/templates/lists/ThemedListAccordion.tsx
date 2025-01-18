import React, { useState, useContext, useCallback } from "react";
import { View, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import { ThemedText } from "../typography/ThemedText";
import ThemedIcon from "@/components/templates/icons/ThemedIcon";
import { ThemedListAccordionGroupContext } from "./ThemedListAccordionContext";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 */
type ListAccordionTextColorType =
  | "listItemTextColorPrimary"
  | "listItemTextColorSecondary"
  | "listItemTextColorTertiary";

type ListAccordionDescriptionColorType =
  | "listItemDescriptionColorPrimary"
  | "listItemDescriptionColorSecondary"
  | "listItemDescriptionColorTertiary";

export type ThemedListAccordionType = "primary" | "secondary" | "tertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 */
export interface ThemedListAccordionProps {
  title: string;
  description?: string;
  id?: string | number;
  expanded?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  left?: (props: { color: string }) => React.ReactNode;
  right?: (props: { isExpanded: boolean }) => React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  themeType?: ThemedListAccordionType;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
export default function ThemedListAccordion({
  title,
  description,
  id,
  expanded: expandedProp,
  onPress,
  left,
  right,
  children,
  style,
  themeType = "primary",
}: ThemedListAccordionProps) {
  // If inside group, we read from context
  const groupContext = useContext(ThemedListAccordionGroupContext);
  const [localExpanded, setLocalExpanded] = useState(false);

  const isExpanded = groupContext
    ? groupContext.expandedId === id
    : expandedProp !== undefined
    ? expandedProp
    : localExpanded;

  // Build color keys
  const titleColorKey = `listItemTextColor${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListAccordionTextColorType;

  const descColorKey = `listItemDescriptionColor${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListAccordionDescriptionColorType;

  const resolvedTitleColor = useThemeColor({}, titleColorKey);
  const resolvedDescColor = useThemeColor({}, descColorKey);

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      onPress?.(e);
      if (groupContext && id !== undefined) {
        groupContext.onAccordionPress(id);
      } else if (expandedProp === undefined) {
        // uncontrolled
        setLocalExpanded((prev) => !prev);
      }
    },
    [onPress, groupContext, id, expandedProp]
  );

  const leftElement = left
    ? left({ color: isExpanded ? "#0A84FF" : "#666" })
    : null;

  return (
    <View style={style}>
      <ThemedTouchableRipple onPress={handlePress} style={styles.rippleContainer}>
        <View style={styles.row}>
          {leftElement && <View style={styles.leftContainer}>{leftElement}</View>}
          <View style={styles.content}>
            <ThemedText style={[styles.title, { color: resolvedTitleColor }]}>
              {title}
            </ThemedText>
            {description ? (
              <ThemedText style={[styles.description, { color: resolvedDescColor }]}>
                {description}
              </ThemedText>
            ) : null}
          </View>
          <View style={styles.rightContainer}>
            {right ? (
              right({ isExpanded })
            ) : (
              <ThemedIcon
                iconName={isExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#888"
              />
            )}
          </View>
        </View>
      </ThemedTouchableRipple>
      {isExpanded && children}
    </View>
  );
}

const styles = StyleSheet.create({
  rippleContainer: {
    padding: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContainer: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  rightContainer: {
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
});
