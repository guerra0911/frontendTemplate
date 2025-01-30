// app/components/screens/ThemedScrollingHeader.tsx 

import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle, StyleProp, RefreshControl, Platform } from "react-native";
import {
  Header as LibHeader,
  ScrollViewWithHeaders,
} from "@codeherence/react-native-header";
import { useSharedValue } from "react-native-reanimated";

import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<typeof ScrollViewWithHeaders>;

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;

  /** Renders the left, center, right children in the header. */
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

/** Color keys from ThemedScrollingHeaderColors.ts */
type ThemeColorType =
  | "scrollingHeaderBackgroundPrimary"
  | "scrollingHeaderBackgroundSecondary"
  | "scrollingHeaderBackgroundTertiary"
  | "scrollViewBackgroundPrimary"
  | "scrollViewBackgroundSecondary"
  | "scrollViewBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedScrollingHeaderProps
  extends Omit<
    ScrollViewWithHeadersExtendedProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  headerProps?: Partial<LocalHeaderProps>;

  /**
   * Refresh Control Props
   */
  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  /**
   * ScrollView Background Color Override
   */
  scrollViewBackgroundColor?: { light?: string; dark?: string };

  children?: ReactNode;
}

/**
 * ThemedScrollingHeader
 * 
 * This places a normal <Header> *within* the scrollable content. 
 * The result: the header scrolls offscreen when you scroll up.
 */
export function ThemedScrollingHeader(props: ThemedScrollingHeaderProps) {
  const {
    themeType = "primary",
    backgroundColor = {},
    headerProps = {},
    scrollViewBackgroundColor, // Destructure override prop
    style,
    contentContainerStyle,
    isRefreshable,
    refreshing,
    onRefresh,
    ...scrollProps
  } = props;

  // Placeholder for HeaderComponent since we don't want a pinned header
  const PlaceholderHeaderComponent = () => null;

  // SharedValue to control header visibility (not used here but required by LibHeader)
  const showNavBar = useSharedValue(1);

  // Resolve the header background color based on themeType
  const headerColorKey = `scrollingHeaderBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedHeaderBg = useThemeColor(backgroundColor, headerColorKey);

  // Resolve the scroll view background color based on themeType
  const scrollViewColorKey = `scrollViewBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedScrollViewBg = useThemeColor(scrollViewBackgroundColor || {}, scrollViewColorKey);

  // Destructure possible header props
  const {
    headerStyle,
    noBottomBorder,
    ignoreTopSafeArea,
    initialBorderColor,
    borderColor,
    borderWidth,
    renderLeft,
    renderCenter,
    renderRight,
  } = headerProps;

  // Configure the RefreshControl if refreshable
  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl
        refreshing={!!refreshing}
        onRefresh={onRefresh}
        tintColor={resolvedScrollViewBg} // iOS: Spinner color
        colors={[resolvedScrollViewBg]} // Android: Spinner colors
        progressBackgroundColor={Platform.OS === "android" ? resolvedScrollViewBg : undefined} // Android: Background color
      />
    ) : undefined;

  // Merge styles for ScrollViewWithHeaders
  const mergedScrollViewStyle = [
    styles.container,
    { backgroundColor: resolvedScrollViewBg }, // Set background color on ScrollView
    style,
  ];

  // Merge styles for content container
  const mergedContentContainerStyle = [
    { paddingBottom: BOTTOM_FOOTER_HEIGHT },
    contentContainerStyle,
  ];

  // Define the Header component to be included within the scrollable content
  const HeaderComponent = () => (
    <LibHeader
      showNavBar={showNavBar}
      headerStyle={[{ backgroundColor: resolvedHeaderBg }, headerStyle]}
      noBottomBorder={noBottomBorder}
      ignoreTopSafeArea={ignoreTopSafeArea}
      initialBorderColor={initialBorderColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      headerLeft={
        renderLeft ? (
          renderLeft()
        ) : (
          <ThemedHeaderBackButton onPress={() => router.back()} />
        )
      }
      headerCenter={renderCenter?.()}
      headerRight={renderRight?.()}
    />
  );

  return (
    <ScrollViewWithHeaders
      HeaderComponent={PlaceholderHeaderComponent} // No pinned header
      refreshControl={maybeRefreshControl}
      style={mergedScrollViewStyle}
      contentContainerStyle={mergedContentContainerStyle}
      {...scrollProps}
    >
      {/* Place the Header within the scrollable content */}
      <HeaderComponent />

      {/* The rest of the scrollable content */}
      {props.children}
    </ScrollViewWithHeaders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Background color is set dynamically
  },
});
