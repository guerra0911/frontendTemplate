// app/components/ThemedAnimatedScrollView.tsx

import React from "react";
import {
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 * We define possible color keys for ThemedAnimatedScrollView across
 * primary, secondary, tertiary.
 */
type ThemeColorType =
  | "animatedScrollViewBackgroundPrimary"
  | "animatedScrollViewBackgroundSecondary"
  | "animatedScrollViewBackgroundTertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 * We add a themeType for controlling the background color and an optional
 * backgroundColor override.
 */
interface ThemedAnimatedScrollViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;

  // Scrolling
  horizontal?: boolean;
  pagingEnabled?: boolean;
  scrollEnabled?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  // Theming
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 * A themed and animated ScrollView that can adapt to the current theme
 * and accept custom overrides.
 */
const ThemedAnimatedScrollView: React.FC<ThemedAnimatedScrollViewProps> = ({
  children,
  style,
  contentContainerStyle,
  horizontal = false,
  pagingEnabled = false,
  scrollEnabled = true,
  showsHorizontalScrollIndicator = true,
  scrollEventThrottle = 16,
  onScroll,
  themeType = "primary",
  backgroundColor = {}, // default to empty object
}) => {
  // Helper to build our color key, e.g. "animatedScrollViewBackgroundPrimary"
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  const backgroundColorKey = getColorKey("animatedScrollViewBackground", themeType);

  // Resolve background color from theme or override
  const resolvedBackgroundColor = useThemeColor(backgroundColor, backgroundColorKey);

  return (
    <Animated.ScrollView
      style={[styles.scrollView, { backgroundColor: resolvedBackgroundColor }, style]}
      contentContainerStyle={contentContainerStyle}
      horizontal={horizontal}
      pagingEnabled={pagingEnabled}
      scrollEnabled={scrollEnabled}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={onScroll}
    >
      {children}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default ThemedAnimatedScrollView;
