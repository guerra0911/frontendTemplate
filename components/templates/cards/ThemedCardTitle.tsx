/**
 * ThemedCardTitle.tsx
 *
 * A header area with a title and an optional subtitle. 
 * Optionally, you can add a left or right element (like an avatar or icon).
 */

import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";

export interface ThemedCardTitleProps {
  /** Title text (string). */
  title?: string;

  /** Subtitle text (string). */
  subtitle?: string;

  /** Style for the container wrapping the title/subtitle. */
  style?: StyleProp<ViewStyle>;

  /** Style for the title text. */
  titleStyle?: StyleProp<TextStyle>;

  /** Style for the subtitle text. */
  subtitleStyle?: StyleProp<TextStyle>;
}

const ThemedCardTitle: React.FC<ThemedCardTitleProps> = ({
  title,
  subtitle,
  style,
  titleStyle,
  subtitleStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {title ? (
        <ThemedText style={[styles.title, titleStyle]} type="defaultSemiBold">
          {title}
        </ThemedText>
      ) : null}

      {subtitle ? (
        <ThemedText style={[styles.subtitle, subtitleStyle]} type="default">
          {subtitle}
        </ThemedText>
      ) : null}
    </View>
  );
};

export default React.memo(ThemedCardTitle);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
  },
});
