/**
 * ThemedCardTitle.tsx
 *
 * Accepts style + title, subtitle, left/right icons, etc.
 */

import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";

interface ThemedCardTitleProps {
  title: string;
  subtitle?: string;
  left?: () => React.ReactNode;
  right?: () => React.ReactNode;
  style?: StyleProp<ViewStyle>; // <--- NEW
}

const ThemedCardTitle: React.FC<ThemedCardTitleProps> = ({
  title,
  subtitle,
  left,
  right,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {left && <View style={styles.left}>{left()}</View>}
      <View style={styles.textContainer}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        {subtitle ? (
          <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
        ) : null}
      </View>
      {right && <View style={styles.right}>{right()}</View>}
    </View>
  );
};

export default React.memo(ThemedCardTitle);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // By default, no extra padding
  },
  left: {
    marginRight: 8,
  },
  right: {
    marginLeft: "auto", // pushes right content to far end
  },
  textContainer: {
    flexShrink: 1,
    // typically no padding by default
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#666",
  },
});
