import React, { useContext, useState, CSSProperties, isValidElement } from "react";
import { View, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { ThemedListAccordionGroupContext } from "./ThemedListAccordionGroup";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import { ThemedText } from "../typography/ThemedText";
import ThemedIcon from "@/components/templates/icons/ThemedIcon";
import { ThemedDivider } from "../general/ThemedDivder";

export interface ThemedListAccordionProps {
  id?: string | number;
  title: string;
  description?: string;
  left?: (props: { expanded: boolean }) => React.ReactNode;
  right?: (props: { expanded: boolean }) => React.ReactNode;
  expanded?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;

  /**
   * Custom style for the container wrapping the entire Accordion (for sizing, etc.)
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * If true, automatically inserts a divider between each child item.
   */
  dividerBetweenChildren?: boolean;

  /**
   * If true, the ripple effect is disabled, replaced with a normal View.
   * @default false
   */
  disableRipple?: boolean;

  children?: React.ReactNode;
}

function ThemedListAccordion({
  id,
  title,
  description,
  left,
  right,
  expanded,
  onPress,
  style,
  containerStyle,
  dividerBetweenChildren = false,
  disableRipple = false,
  children,
}: ThemedListAccordionProps) {
  const groupContext = useContext(ThemedListAccordionGroupContext);
  const isGroup = groupContext !== null;

  const [localExpanded, setLocalExpanded] = useState<boolean>(expanded ?? false);

  const actualExpanded = isGroup
    ? groupContext?.expandedId === id
    : expanded !== undefined
    ? expanded
    : localExpanded;

  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(e);
    if (isGroup && id !== undefined) {
      groupContext?.onAccordionPress(id);
    } else {
      if (expanded === undefined) {
        setLocalExpanded(!localExpanded);
      }
    }
  };

  const headerContent = (
    <View style={[styles.header, style]}>
      {left ? left({ expanded: !!actualExpanded }) : null}

      <View style={styles.textContainer}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
        {description ? (
          <ThemedText type="default" style={styles.description}>
            {description}
          </ThemedText>
        ) : null}
      </View>

      {right ? (
        right({ expanded: !!actualExpanded })
      ) : (
        <ThemedIcon
          iconName={actualExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          style={styles.rightIcon}
        />
      )}
    </View>
  );

  return (
    <View style={containerStyle}>
      {disableRipple ? (
        <View style={{ flexDirection: "row" }} onTouchEnd={handlePress}>
          {headerContent}
        </View>
      ) : (
        <ThemedTouchableRipple onPress={handlePress} style={{}}>
          {headerContent}
        </ThemedTouchableRipple>
      )}

      {actualExpanded && children ? (
        <View style={styles.children}>
          {dividerBetweenChildren
            ? React.Children.toArray(children).map((child, index, arr) => {
                if (!isValidElement(child)) return child;
                return (
                  <React.Fragment key={index}>
                    {child}
                    {index < arr.length - 1 && <ThemedDivider />}
                  </React.Fragment>
                );
              })
            : children}
        </View>
      ) : null}
    </View>
  );
}

export default React.memo(ThemedListAccordion);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
  rightIcon: {
    marginLeft: 8,
  },
  children: {
    paddingLeft: 40,
    paddingVertical: 6,
  },
});
