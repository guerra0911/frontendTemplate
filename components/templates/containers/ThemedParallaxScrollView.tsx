// components/ThemedParallaxScrollContainer.tsx

import React, { useState, useEffect } from "react";
import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, RefreshControl, View, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import ThemedActivityIndicator from "../loaders/ThemedActivityIndicator";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

const HEADER_HEIGHT = 250;

////////////////////////////////////////////////////////////////////////////////
// INTERFACES
////////////////////////////////////////////////////////////////////////////////

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  onRefresh?: () => void;
  refreshing?: boolean;
  showRefreshIndicator?: boolean; // Indicates whether to show the refresh indicator
}>;

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedParallaxScrollContainer: React.FC<Props> = ({
  children,
  headerImage,
  headerBackgroundColor,
  onRefresh,
  refreshing = false,
  showRefreshIndicator = true, // Defaults to true if not provided
}) => {
  // ############################################################################
  // STATE
  // ############################################################################

  const [isRefreshing, setIsRefreshing] = useState(false);

  // ############################################################################
  // THEME COLORS
  // ############################################################################

  const colorScheme = useColorScheme() ?? "light";
  const backgroundColor = headerBackgroundColor[colorScheme];

  // ############################################################################
  // REFERENCES AND ANIMATIONS
  // ############################################################################

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  // ############################################################################
  // HANDLERS
  // ############################################################################

  /**
   * Triggers the refresh action.
   * Sets the refreshing state and calls the onRefresh callback if provided.
   */
  const triggerRefresh = () => {
    if (onRefresh) {
      setIsRefreshing(true);
      onRefresh();
    }
  };

  /**
   * Handles the end of the scroll drag.
   * If the scroll offset is beyond the threshold and not already refreshing, triggers refresh.
   */
  const handleScrollEndDrag = () => {
    if (scrollOffset.value < -100 && !isRefreshing) {
      runOnJS(triggerRefresh)();
    }
  };

  // ############################################################################
  // EFFECTS
  // ############################################################################

  /**
   * Effect to handle the refreshing state.
   * Resets the isRefreshing state when the refreshing prop changes to false.
   */
  useEffect(() => {
    if (!refreshing && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [refreshing, isRefreshing]);

  // ############################################################################
  // ANIMATED STYLES
  // ############################################################################

  /**
   * Animated style for the custom refresh indicator.
   * Adjusts opacity and position based on the scroll offset.
   */
  const refreshAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollOffset.value, [-100, 0], [1, 0]);
    const translateY = interpolate(scrollOffset.value, [-100, 0], [0, -50]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  /**
   * Animated style for the header image.
   * Applies parallax effect by translating and scaling the header based on scroll offset.
   */
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <ThemedView style={styles.container}>
      {/* ##########################################################################
          Parallax Scrollable Content
      ########################################################################## */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        onScrollEndDrag={handleScrollEndDrag}
        refreshControl={
          onRefresh && showRefreshIndicator ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={triggerRefresh}
            />
          ) : undefined
        }
      >
        {/* ##########################################################################
            Custom Refresh Indicator
        ########################################################################## */}
        {showRefreshIndicator && (
          <Animated.View
            style={[styles.refreshIndicator, refreshAnimatedStyle]}
          >
            <ThemedActivityIndicator
              animating={true} // Ensure this aligns with your loading state
              color={{ light: "#ff0000", dark: "#ff0000" }}
              size={16} // Adjust the size as needed (ThemedActivityIndicator expects a number)
              hidesWhenStopped={true} // Optional, defaults to true
            />
            <Text style={styles.refreshText}>Refreshing...</Text>
          </Animated.View>
        )}

        {/* ##########################################################################
            Header with Parallax Effect
        ########################################################################## */}
        <Animated.View
          style={[styles.header, { backgroundColor }, headerAnimatedStyle]}
        >
          {headerImage}
        </Animated.View>

        {/* ##########################################################################
            Main Content
        ########################################################################## */}
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
};

export default ThemedParallaxScrollContainer;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////
