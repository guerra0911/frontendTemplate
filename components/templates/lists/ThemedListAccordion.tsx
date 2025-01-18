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

  /** Custom header dimension */
  width?: number;
  height?: number;

  /**
   * Spacing between left container and content.
   * @default 8
   */
  leftToContentSpacing?: number;

  /**
   * Spacing between content and right container.
   * @default 8
   */
  contentToRightSpacing?: number;

  /**
   * Align the title/description text: 'left'|'center'|'right'.
   */
  contentAlignment?: "left" | "center" | "right";

  disableRippleEffect?: boolean;
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
  width,
  height,
  leftToContentSpacing = 8,
  contentToRightSpacing = 8,
  contentAlignment = "left",
  disableRippleEffect = false,
}: ThemedListAccordionProps) {
  const groupContext = useContext(ThemedListAccordionGroupContext);
  const [localExpanded, setLocalExpanded] = useState(false);

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

  // Left
  const leftElement = left ? left({ color: isExpanded ? "#0A84FF" : "#666" }) : null;

  // We'll place the "header" in a separate container with user-specified width/height
  // The children expand below.
  return (
    <View style={style}>
      {/* Header row container with optional width & height */}
      <View style={[{ width, height }, styles.headerContainer]}>
        <ThemedTouchableRipple onPress={handlePress} disableRippleEffect={disableRippleEffect} style={styles.rippleContainer}>
          <View style={styles.row}>
            {/* Left container */}
            {leftElement && <View style={styles.leftContainer}>{leftElement}</View>}

            {/* Middle content container */}
            <View
              style={[
                styles.content,
                {
                  marginLeft: leftElement ? leftToContentSpacing : 0,
                  marginRight: right ? contentToRightSpacing : 0,
                },
              ]}
            >
              <ThemedText style={[styles.title, { color: resolvedTitleColor, textAlign: contentAlignment }]}>
                {title}
              </ThemedText>
              {description ? (
                <ThemedText style={[styles.description, { color: resolvedDescColor, textAlign: contentAlignment }]}>
                  {description}
                </ThemedText>
              ) : null}
            </View>

            {/* Right container */}
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
  headerContainer: {},
  rippleContainer: {
    flex: 1,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  leftContainer: {
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
    // the expanded content
  },
});
