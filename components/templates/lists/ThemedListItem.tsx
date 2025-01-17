import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import { ThemedText } from "../typography/ThemedText";

export interface ThemedListItemProps {
  /**
   * If you want to show a simple title + optional description, you can still do so:
   */
  title?: string;
  description?: string;

  /**
   * If you want to provide a fully custom component in the center,
   * you can place it here. If `middle` is provided, we skip the title/description logic.
   */
  middle?: ReactNode;

  /**
   * Pass a function or node to render on the left side
   */
  left?: (props: { color?: string; style?: any }) => ReactNode;

  /**
   * Pass a function or node to render on the right side
   */
  right?: (props: { color?: string; style?: any }) => ReactNode;

  /**
   * Called on press
   */
  onPress?: (e: GestureResponderEvent) => void;

  /**
   * Additional container styling
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Controls the overall item height (number or string, e.g. 60, "auto", "80%").
   */
  itemSize?: number | string;

  /**
   * Padding between the left section (icon, image, or custom) and the middle.
   * @default 8
   */
  leftPadding?: number;

  /**
   * Padding between the right section and the middle.
   * @default 8
   */
  rightPadding?: number;

  /**
   * Global internal padding around the entire item content.
   * @default 8
   */
  innerPadding?: number;

  /**
   * If true, we show a fully transparent ripple => no visible effect.
   * @default false
   */
  disableRipple?: boolean;
}

function ThemedListItem({
  // Text-based usage
  title,
  description,
  // Custom usage
  middle,

  left,
  right,
  onPress,
  style,
  itemSize,
  leftPadding = 8,
  rightPadding = 8,
  innerPadding = 8,
  disableRipple = false,
}: ThemedListItemProps) {
  // Container can handle numeric or string-based heights
  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    padding: innerPadding,
    // itemSize => set minHeight or height
    ...(itemSize ? { height: itemSize as ViewStyle["height"] } : {}),
  };

  // Middle content: if user provided `middle`, we render that.
  // Otherwise, we fallback to title/description text approach.
  let middleContent: ReactNode = middle;
  if (!middle) {
    // fallback to the normal title/description
    middleContent = (
      <View style={styles.textContainer}>
        {title ? (
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
        ) : null}
        {description ? (
          <ThemedText type="default" style={styles.description}>
            {description}
          </ThemedText>
        ) : null}
      </View>
    );
  }

  const content = (
    <View style={[containerStyle, style]}>
      {/* LEFT SECTION */}
      {left && (
        <View style={{ marginRight: leftPadding }}>
          {left({})}
        </View>
      )}

      {/* MIDDLE SECTION */}
      {middleContent}

      {/* RIGHT SECTION */}
      {right && (
        <View style={{ marginLeft: rightPadding }}>
          {right({})}
        </View>
      )}
    </View>
  );

  // If user wants no visible ripple effect => rippleColor="transparent"
  const rippleColor = disableRipple ? "transparent" : undefined;

  return (
    <ThemedTouchableRipple onPress={onPress} rippleColor={rippleColor}>
      {content}
    </ThemedTouchableRipple>
  );
}

export default React.memo(ThemedListItem);

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
});
