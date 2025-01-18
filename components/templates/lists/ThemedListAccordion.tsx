import React, { useState, useContext, useCallback } from "react";
import { View, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import { ThemedText } from "../typography/ThemedText";
import { ThemedListAccordionGroupContext } from "./ThemedListAccordionContext";
import { useThemeColor } from "@/hooks/useThemeColor";

type ListAccordionTextColorType =
  | "listItemTextColorPrimary"
  | "listItemTextColorSecondary"
  | "listItemTextColorTertiary";

type ListAccordionDescriptionColorType =
  | "listItemDescriptionColorPrimary"
  | "listItemDescriptionColorSecondary"
  | "listItemDescriptionColorTertiary";

export type ThemedListAccordionType = "primary" | "secondary" | "tertiary";

export interface ThemedListAccordionProps {
  title?: string;
  description?: string;
  id?: string | number;
  expanded?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  left?: (props: { color: string }) => React.ReactNode;
  right?: (props: { isExpanded: boolean }) => React.ReactNode;

  // NEW arbitrary children in the header
  leftChildren?: React.ReactNode;
  middleChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;

  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  themeType?: ThemedListAccordionType;

  width?: number;
  height?: number;
  leftToContentSpacing?: number;    // default 8
  contentToRightSpacing?: number;   // default 8
  contentAlignment?: "left" | "center" | "right";

  disableRippleEffect?: boolean;
}

export default function ThemedListAccordion({
  title,
  description,
  id,
  expanded: expandedProp,
  onPress,
  left,
  right,
  leftChildren,
  middleChildren,
  rightChildren,
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
        setLocalExpanded((prev) => !prev);
      }
    },
    [onPress, groupContext, id, expandedProp]
  );

  // Header left
  const leftElement = left
    ? left({ color: isExpanded ? "#0A84FF" : "#666" })
    : leftChildren;

  // Middle content => title/description + middleChildren
  const middleContent = (
    <>
      {title && (
        <ThemedText
          style={[styles.title, { color: resolvedTitleColor, textAlign: contentAlignment }]}
        >
          {title}
        </ThemedText>
      )}
      {description && (
        <ThemedText
          style={[styles.description, { color: resolvedDescColor, textAlign: contentAlignment }]}
        >
          {description}
        </ThemedText>
      )}
      {middleChildren}
    </>
  );

  // Right
  const rightElement = right
    ? right({ isExpanded })
    : rightChildren;

  return (
    <View style={style}>
      <View style={[{ width, height }, styles.headerContainer]}>
        <ThemedTouchableRipple
          onPress={handlePress}
          disableRippleEffect={disableRippleEffect}
          style={styles.rippleContainer}
        >
          <View style={styles.row}>
            {leftElement && <View style={styles.leftContainer}>{leftElement}</View>}

            <View
              style={[
                styles.content,
                {
                  marginLeft: leftElement ? leftToContentSpacing : 0,
                  marginRight: rightElement ? contentToRightSpacing : 0,
                },
              ]}
            >
              {middleContent}
            </View>

            {rightElement && (
              <View style={styles.rightContainer}>{rightElement}</View>
            )}
          </View>
        </ThemedTouchableRipple>
      </View>

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
  childrenContainer: {},
});
