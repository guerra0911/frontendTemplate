// components/ui/containers/ThemedScrollContainer.tsx

import React, { useCallback } from "react";
import {
  StyleSheet,
  RefreshControl,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

// ----------------------------------------------------------------------------
// THEME COLOR TYPE
// ----------------------------------------------------------------------------
type ThemeColorType =
  | "scrollContainerBackgroundPrimary"
  | "scrollContainerBackgroundSecondary"
  | "scrollContainerBackgroundTertiary";

// ----------------------------------------------------------------------------
// PROPS
// ----------------------------------------------------------------------------
interface ThemedScrollContainerProps {
  children: React.ReactNode;
  isScrollable?: boolean;
  isRefreshable?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;

  // Theming
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  // Sticky headers indices
  stickyHeaderIndices?: number[];
}

// ----------------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------------
const ThemedScrollContainer: React.FC<ThemedScrollContainerProps> = ({
  children,
  isScrollable = true,
  isRefreshable = false,
  onRefresh,
  refreshing = false,
  style,
  contentContainerStyle,
  themeType = "primary",
  backgroundColor = {},
  stickyHeaderIndices = [],
}) => {
  // Helper to build color key
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  const backgroundColorKey = getColorKey("scrollContainerBackground", themeType);
  const resolvedBackgroundColor = useThemeColor(backgroundColor, backgroundColorKey);

  // Handler for pull-to-refresh
  const handleRefresh = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  return (
    <ThemedView style={[styles.container, style]}>
      {isScrollable ? (
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            { backgroundColor: resolvedBackgroundColor },
            contentContainerStyle,
          ]}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          refreshControl={
            isRefreshable && onRefresh ? (
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            ) : undefined
          }
          stickyHeaderIndices={stickyHeaderIndices}
        >
          {children}
        </Animated.ScrollView>
      ) : (
        <View
          style={[
            styles.contentContainer,
            { backgroundColor: resolvedBackgroundColor },
            contentContainerStyle,
          ]}
        >
          {children}
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: BOTTOM_FOOTER_HEIGHT,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
});

export default ThemedScrollContainer;
