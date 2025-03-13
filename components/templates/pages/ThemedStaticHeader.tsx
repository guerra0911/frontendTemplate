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
import { BlurView } from "expo-blur";

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
  // Optional: if provided, wraps the header in a BlurView with the given intensity.
  blurAmount?: number;
}

type ThemeColorType =
  | "staticHeaderBackgroundPrimary"
  | "staticHeaderBackgroundSecondary"
  | "staticHeaderBackgroundTertiary"
  | "scrollViewBackgroundPrimary"
  | "scrollViewBackgroundSecondary"
  | "scrollViewBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedStaticHeaderProps
  extends Omit<
    ScrollViewWithHeadersProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  headerProps?: Partial<LocalHeaderProps>;

  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  scrollViewBackgroundColor?: { light?: string; dark?: string };

  children?: ReactNode;
}

export function ThemedStaticHeader(props: ThemedStaticHeaderProps) {
  const {
    themeType = "primary",
    backgroundColor = {},
    headerProps = {},
    scrollViewBackgroundColor,
    style,
    contentContainerStyle,
    isRefreshable,
    refreshing,
    onRefresh,
    ...scrollProps
  } = props;

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
    blurAmount,
  } = headerProps;

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

  const HeaderComponent = ({ showNavBar: _unused }: { showNavBar: any }) => {
    const headerContent = (
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
    return blurAmount ? (
      <BlurView intensity={blurAmount} style={styles.blurContainer}>
        {headerContent}
      </BlurView>
    ) : (
      headerContent
    );
  };

  return (
    <ScrollViewWithHeaders
      HeaderComponent={HeaderComponent}
      refreshControl={maybeRefreshControl}
      style={mergedScrollViewStyle}
      contentContainerStyle={mergedContentContainerStyle}
      {...scrollProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    // Ensure the BlurView does not clip header content.
    overflow: "visible",
  },
});

export default ThemedStaticHeader;
