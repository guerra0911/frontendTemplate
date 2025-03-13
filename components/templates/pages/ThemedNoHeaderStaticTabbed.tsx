import React, { ReactNode, useState } from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  RefreshControl,
  Platform,
  View,
} from "react-native";
import { ScrollViewWithHeaders } from "@codeherence/react-native-header";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";
import ThemedSegmentedControl, {
  ThemedSegmentedControlProps,
} from "../buttons/ThemedSegmentedControl";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * ---------------------------------------------------------------------------
 * TYPES & INTERFACES
 * ---------------------------------------------------------------------------
 */

/** A single tab definition */
export interface Tab {
  title: string;
  content: ReactNode;
}

/** Color keys for static backgrounds and scroll view backgrounds */
type ThemeColorType =
  | "staticHeaderBackgroundPrimary"
  | "staticHeaderBackgroundSecondary"
  | "staticHeaderBackgroundTertiary"
  | "scrollViewBackgroundPrimary"
  | "scrollViewBackgroundSecondary"
  | "scrollViewBackgroundTertiary"
  | "topSafeAreaBackgroundPrimary"
  | "topSafeAreaBackgroundSecondary"
  | "topSafeAreaBackgroundTertiary";

/** Props for ThemedNoHeaderStaticTabbed */
export interface ThemedNoHeaderStaticTabbedProps
  extends Omit<
    React.ComponentProps<typeof ScrollViewWithHeaders>,
    "HeaderComponent" | "LargeHeaderComponent" | "children" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  scrollViewBackgroundColor?: { light?: string; dark?: string };
  topSafeAreaBackgroundColor?: { light?: string; dark?: string };

  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  tabs: Tab[];
  segmentedControlProps?: Partial<ThemedSegmentedControlProps>;
  /** The height of the segmented control container in px */
  headerHeight?: number;
}

/**
 * ---------------------------------------------------------------------------
 * COMPONENT: ThemedNoHeaderStaticTabbed
 * ---------------------------------------------------------------------------
 *
 * This component renders a static segmented control (without a header) at the
 * top, positioned below the safe area. It uses theming for background colors
 * (for the scroll container and top safe area) and supports pull-to-refresh.
 */
export function ThemedNoHeaderStaticTabbed(props: ThemedNoHeaderStaticTabbedProps) {
  const {
    themeType = "primary",
    backgroundColor = {},
    scrollViewBackgroundColor,
    topSafeAreaBackgroundColor,
    isRefreshable,
    refreshing,
    onRefresh,
    tabs,
    segmentedControlProps = {},
    headerHeight = 50,
    style,
    contentContainerStyle,
    ...scrollProps
  } = props;

  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const showNavBar = useSharedValue(1);

  // Build our color keys using a helper.
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const capTheme = capitalize(themeType);

  // Use default keys from your theme color file.
  const headerColorKey = `staticHeaderBackground${capTheme}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, headerColorKey);

  const defaultScrollViewColorKey = `scrollViewBackground${capTheme}` as ThemeColorType;
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    defaultScrollViewColorKey
  );

  const topSafeAreaColorKey = `topSafeAreaBackground${capTheme}` as ThemeColorType;
  const resolvedTopSafeAreaBg = useThemeColor(
    topSafeAreaBackgroundColor || {},
    topSafeAreaColorKey
  );

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl
        refreshing={!!refreshing}
        onRefresh={onRefresh}
        tintColor={resolvedScrollViewBg}
        colors={[resolvedScrollViewBg]}
        progressBackgroundColor={Platform.OS === "android" ? resolvedScrollViewBg : undefined}
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

  // HeaderComponent renders only the segmented control container.
  // It will be positioned below the safe area because we render a separate top safe area view.
  const HeaderComponent = () => {
    return (
      <View style={[styles.headerContainer, { backgroundColor: resolvedBg, height: headerHeight }]}>
        <ThemedSegmentedControl
          values={tabs.map((tab) => tab.title)}
          selectedIndex={activeIndex}
          onChange={setActiveIndex}
          style={[styles.segmentedControl, segmentedControlProps.style, { backgroundColor: "transparent" }]}
          {...segmentedControlProps}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: resolvedScrollViewBg }]} edges={["left", "right", "bottom"]}>
      <View style={[styles.topSafeArea, { backgroundColor: resolvedTopSafeAreaBg, height: insets.top }]} />
      <ScrollViewWithHeaders
        HeaderComponent={HeaderComponent}
        refreshControl={maybeRefreshControl}
        style={mergedScrollViewStyle}
        contentContainerStyle={mergedContentContainerStyle}
        {...scrollProps}
      >
        {tabs[activeIndex].content}
      </ScrollViewWithHeaders>
    </SafeAreaView>
  );
}

export default ThemedNoHeaderStaticTabbed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSafeArea: {
    // This view renders the safe area background.
  },
  headerContainer: {
    // Container for the segmented control only.
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  segmentedControl: {
    alignSelf: "center",
  },
});
