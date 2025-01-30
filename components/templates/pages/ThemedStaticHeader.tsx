// app/components/screens/ThemedStaticHeader.tsx

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

type ScrollViewWithHeadersProps = React.ComponentProps<typeof ScrollViewWithHeaders>;

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

/** Color keys from ThemedStaticHeaderColors */
type ThemeColorType =
  | "staticHeaderBackgroundPrimary"
  | "staticHeaderBackgroundSecondary"
  | "staticHeaderBackgroundTertiary"
  | "scrollViewBackgroundPrimary"
  | "scrollViewBackgroundSecondary"
  | "scrollViewBackgroundTertiary"; // Added tertiary

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedStaticHeaderProps
  extends Omit<
    ScrollViewWithHeadersProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary"; // Included tertiary
  backgroundColor?: { light?: string; dark?: string };

  headerProps?: Partial<LocalHeaderProps>;

  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  scrollViewBackgroundColor?: { light?: string; dark?: string }; // Override prop

  children?: ReactNode;
}

export function ThemedStaticHeader(props: ThemedStaticHeaderProps) {
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

  // A pinned header is always visible => showNavBar = 1
  const showNavBar = useSharedValue(1);

  const colorKey = `staticHeaderBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const {
    noBottomBorder,
    ignoreTopSafeArea,
    initialBorderColor,
    borderColor,
    borderWidth,
    headerStyle,
    renderLeft,
    renderCenter,
    renderRight,
  } = headerProps;

  // Retrieve the scroll view background color
  const defaultScrollViewColorKey = `scrollViewBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    defaultScrollViewColorKey
  );

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

  const mergedContentContainerStyle = [
    { paddingBottom: BOTTOM_FOOTER_HEIGHT, backgroundColor: resolvedScrollViewBg },
    contentContainerStyle,
  ];

  const mergedScrollViewStyle = [
    styles.container,
    { backgroundColor: resolvedScrollViewBg }, // Set background color on ScrollView
    style,
  ];

  const HeaderComponent = ({ showNavBar: _unused }: { showNavBar: any }) => {
    return (
      <LibHeader
        showNavBar={showNavBar}
        noBottomBorder={noBottomBorder}
        ignoreTopSafeArea={ignoreTopSafeArea}
        initialBorderColor={initialBorderColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
        headerStyle={[{ backgroundColor: resolvedBg }, headerStyle]}
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
  };

  return (
    <ScrollViewWithHeaders
      HeaderComponent={HeaderComponent}
      refreshControl={maybeRefreshControl}
      style={mergedScrollViewStyle} // Apply mergedScrollViewStyle
      contentContainerStyle={mergedContentContainerStyle}
      {...scrollProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // No backgroundColor here, it's set dynamically
  },
});
