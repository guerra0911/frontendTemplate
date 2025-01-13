// components/ThemedParallaxScrollContainer.tsx

import React, { useState, useEffect, useCallback } from "react";
import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, RefreshControl, View, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

import ThemedActivityIndicator from "../loaders/ThemedActivityIndicator";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Enumerates possible color keys for ThemedParallaxScrollContainer across
 * primary, secondary, and tertiary for both the header and container background.
 */
type ThemeColorType =
  // Container background
  | "parallaxScrollContainerBackgroundPrimary"
  | "parallaxScrollContainerBackgroundSecondary"
  | "parallaxScrollContainerBackgroundTertiary"

  // Header background
  | "parallaxScrollHeaderBackgroundPrimary"
  | "parallaxScrollHeaderBackgroundSecondary"
  | "parallaxScrollHeaderBackgroundTertiary";

// ################################################################################
// CONSTANTS
// ################################################################################

const HEADER_HEIGHT = 250;
const REFRESH_TRIGGER_OFFSET = -100;

// ################################################################################
// PROPS
// ################################################################################

/**
 * This interface extends your original Props, adding:
 * - themeType for the container’s background
 * - headerThemeType for the parallax header’s background
 * - optional backgroundColor/headerBackgroundColor overrides
 */
export interface ThemedParallaxScrollContainerProps extends PropsWithChildren {
  headerImage: ReactElement;

  // Theming for container body
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { dark?: string; light?: string };

  // Theming for the parallax header
  headerThemeType?: "primary" | "secondary" | "tertiary";
  headerBackgroundColor?: { dark?: string; light?: string };

  // Refresh logic
  onRefresh?: () => void;
  refreshing?: boolean;
  showRefreshIndicator?: boolean;

  // (Inherited from your existing code)
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedParallaxScrollContainer: React.FC<ThemedParallaxScrollContainerProps> = ({
  children,
  headerImage,

  // Theming for container
  themeType = "primary",
  backgroundColor = {},

  // Theming for header
  headerThemeType = "primary",
  headerBackgroundColor = {},

  // Refresh logic
  onRefresh,
  refreshing = false,
  showRefreshIndicator = true,
}) => {
  // ############################################################################
  // STATE
  // ############################################################################

  const [isRefreshing, setIsRefreshing] = useState(false);

  // ############################################################################
  // THEME COLORS
  // ############################################################################

  /**
   * Helper to generate color keys for container & header background.
   */
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  // Container background
  const containerBgKey = getColorKey("parallaxScrollContainerBackground", themeType);
  const resolvedContainerBgColor = useThemeColor(backgroundColor, containerBgKey);

  // Header background
  const headerBgKey = getColorKey("parallaxScrollHeaderBackground", headerThemeType);
  const resolvedHeaderBgColor = useThemeColor(headerBackgroundColor, headerBgKey);

  // ############################################################################
  // REFERENCES AND ANIMATIONS
  // ############################################################################

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  // ############################################################################
  // HANDLERS
  // ############################################################################

  const triggerRefresh = useCallback(() => {
    if (onRefresh) {
      setIsRefreshing(true);
      onRefresh();
    }
  }, [onRefresh]);

  const handleScrollEndDrag = useCallback(() => {
    // If scrolled beyond threshold and not already refreshing, trigger refresh
    if (scrollOffset.value < REFRESH_TRIGGER_OFFSET && !isRefreshing) {
      runOnJS(triggerRefresh)();
    }
  }, [scrollOffset, isRefreshing, triggerRefresh]);

  // ############################################################################
  // EFFECTS
  // ############################################################################

  useEffect(() => {
    if (!refreshing && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [refreshing, isRefreshing]);

  // ############################################################################
  // ANIMATED STYLES
  // ############################################################################

  // Custom refresh indicator (optional) – fade in near threshold
  const refreshAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollOffset.value, [REFRESH_TRIGGER_OFFSET, 0], [1, 0]);
    const translateY = interpolate(scrollOffset.value, [REFRESH_TRIGGER_OFFSET, 0], [0, -50]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  // Header parallax effect
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
    );
    const scale = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [2, 1, 1]
    );
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <ThemedView
      // Use container background for the entire screen
      style={[styles.container, { backgroundColor: resolvedContainerBgColor }]}
    >
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        onScrollEndDrag={handleScrollEndDrag}
        // Native RefreshControl if user wants the default OS spinner:
        refreshControl={
          onRefresh && showRefreshIndicator ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={triggerRefresh}
            />
          ) : undefined
        }
      >
        {/* Custom Refresh Indicator */}
        {showRefreshIndicator && (
          <Animated.View style={[styles.refreshIndicator, refreshAnimatedStyle]}>
            <ThemedActivityIndicator
              animating
              color={{ light: "#ff0000", dark: "#ff0000" }} // You can unify this or use theme
              size={16}
              hidesWhenStopped
            />
            <Text style={styles.refreshText}>Refreshing...</Text>
          </Animated.View>
        )}

        {/* Parallax Header */}
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: resolvedHeaderBgColor },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>

        {/* Main Content */}
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
};

export default ThemedParallaxScrollContainer;

// ############################################################################
// STYLES
// ############################################################################

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
  refreshIndicator: {
    position: "absolute",
    top: -80,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  refreshText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },
});
