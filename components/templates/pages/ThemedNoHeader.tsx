import React, { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Platform,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

/**
 * ---------------------------------------------------------------------------
 * TYPES & INTERFACES
 * ---------------------------------------------------------------------------
 */

/** Allowed color keys for no-header scroll container. */
type NoHeaderThemeColorType =
  | "scrollContainerBackgroundPrimary"
  | "scrollContainerBackgroundSecondary"
  | "scrollContainerBackgroundTertiary"
  | "topSafeAreaBackgroundPrimary"
  | "topSafeAreaBackgroundSecondary"
  | "topSafeAreaBackgroundTertiary";

export interface ThemedNoHeaderProps {
  /** Overall theme type */
  themeType?: "primary" | "secondary" | "tertiary";
  /** Overrides for the container background */
  backgroundColor?: { light?: string; dark?: string };
  /** Overrides for the scroll view background */
  scrollViewBackgroundColor?: { light?: string; dark?: string };
  /** Overrides for the top safe area background */
  topSafeAreaBackgroundColor?: { light?: string; dark?: string };
  /** Enable pull-to-refresh */
  isRefreshable?: boolean;
  /** Refreshing state */
  refreshing?: boolean;
  /** Callback for refresh */
  onRefresh?: () => void;
  /** Content to render inside the scroll view */
  children?: ReactNode;
  /** Custom style for the scroll view container */
  style?: ViewStyle;
  /** Custom style for the scroll view's content container */
  contentContainerStyle?: ViewStyle;
}

/**
 * ---------------------------------------------------------------------------
 * COMPONENT: ThemedNoHeader
 * ---------------------------------------------------------------------------
 *
 * A blank scrollable container with no header. This component respects safe area
 * insets, supports pull-to-refresh, and uses themed background colors.
 */
export function ThemedNoHeader(props: ThemedNoHeaderProps) {
  const {
    themeType = "primary",
    backgroundColor = {},
    scrollViewBackgroundColor,
    topSafeAreaBackgroundColor,
    isRefreshable,
    refreshing,
    onRefresh,
    children,
    style,
    contentContainerStyle,
  } = props;

  const insets = useSafeAreaInsets();

  // Helper to capitalize the theme type.
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const capTheme = capitalize(themeType);

  // Resolve colors using our theming hook.
  const bgColorKey = `scrollContainerBackground${capTheme}` as NoHeaderThemeColorType;
  const scrollViewColorKey = `scrollContainerBackground${capTheme}` as NoHeaderThemeColorType;
  const topSafeAreaColorKey = `topSafeAreaBackground${capTheme}` as NoHeaderThemeColorType;

  const resolvedBg = useThemeColor(backgroundColor, bgColorKey);
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    scrollViewColorKey
  );
  const resolvedTopSafeAreaBg = useThemeColor(
    topSafeAreaBackgroundColor || {},
    topSafeAreaColorKey
  );

  const refreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl
        refreshing={!!refreshing}
        onRefresh={onRefresh}
        tintColor={resolvedScrollViewBg}
        colors={[resolvedScrollViewBg]}
        progressBackgroundColor={
          Platform.OS === "android" ? resolvedScrollViewBg : undefined
        }
      />
    ) : undefined;

  const mergedContentContainerStyle = [
    { paddingBottom: BOTTOM_FOOTER_HEIGHT, backgroundColor: resolvedScrollViewBg },
    contentContainerStyle,
  ];

  const mergedScrollViewStyle = [
    styles.container,
    { backgroundColor: resolvedScrollViewBg },
    style,
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: resolvedScrollViewBg }]}
      edges={["left", "right", "bottom"]}
    >
      <View
        style={[
          styles.topSafeArea,
          { backgroundColor: resolvedTopSafeAreaBg, height: insets.top },
        ]}
      />
      <ScrollView
        style={mergedScrollViewStyle}
        contentContainerStyle={mergedContentContainerStyle}
        refreshControl={refreshControl}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingBottom: BOTTOM_FOOTER_HEIGHT,
  },
  topSafeArea: {
    // This view covers the top safe area
  },
});

export default ThemedNoHeader;
