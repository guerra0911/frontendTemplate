import React, { useState, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
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
  /** Title text displayed on the header row. */
  title: string;

  /** Optional description text under the title in the header row. */
  description?: string;

  /** Unique ID if used inside ThemedListAccordionGroup. */
  id?: string | number;

  /** If controlled externally, whether the accordion is expanded. */
  expanded?: boolean;

  /** Press handler for the header. */
  onPress?: (e: GestureResponderEvent) => void;

  /** Optional left element callback. */
  left?: (props: { color: string }) => React.ReactNode;

  /** Optional right element callback. Receives isExpanded boolean. */
  right?: (props: { isExpanded: boolean }) => React.ReactNode;

  /** The children displayed when expanded. */
  children?: React.ReactNode;

  /** Additional style for the entire accordion container (both header + children). */
  style?: StyleProp<ViewStyle>;

  /** The theme type controlling header text color, etc. @default 'primary' */
  themeType?: ThemedListAccordionType;

  /**
   * Custom dimensions for the **header portion** of the accordion.
   * The children container automatically grows if the item is expanded.
   */
  width?: number;
  height?: number;
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

  // Custom dimensions: apply to the "header" portion only
  width,
  height,
}: ThemedListAccordionProps) {
  const groupContext = useContext(ThemedListAccordionGroupContext);
  const [localExpanded, setLocalExpanded] = useState(false);

  // If in a group, use groupContext; else use expandedProp; else local state
  const isExpanded = groupContext
    ? groupContext.expandedId === id
    : expandedProp !== undefined
    ? expandedProp
    : localExpanded;

  // Build color keys for text & description
  const titleColorKey = `listItemTextColor${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListAccordionTextColorType;
  const descColorKey = `listItemDescriptionColor${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListAccordionDescriptionColorType;

  const resolvedTitleColor = useThemeColor({}, titleColorKey);
  const resolvedDescColor = useThemeColor({}, descColorKey);

  // Press logic
  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      onPress?.(e);
      if (groupContext && id !== undefined) {
        groupContext.onAccordionPress(id);
      } else if (expandedProp === undefined) {
        setLocalExpanded((prev) => !prev);
      }
    },
    [onPress, groupContext, id, expandedProp]
  );

  // If a left element is provided, we pass color to it
  const leftElement = left
    ? left({ color: isExpanded ? "#0A84FF" : "#666" })
    : null;

  // The entire container is a vertical stack:
  // 1) The header row (with custom width/height)
  // 2) The children if expanded
  return (
    <View style={style}>
      {/* Header row container */}
      <View style={[{ width, height }, styles.headerContainer]}>
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
      </View>

      {/* Expandable children container (auto-size) */}
      {isExpanded && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // The user can override or specify width/height here
    // but the container does not scroll or overflow children
  },
  rippleContainer: {
    padding: 8,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  leftContainer: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  childrenContainer: {
    // The expanded content goes here
  },
});
