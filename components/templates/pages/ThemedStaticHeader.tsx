// app/components/screens/ThemedStaticHeader.tsx

import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle, StyleProp, RefreshControl } from "react-native";
import {
  Header as LibHeader,
  ScrollViewWithHeaders,
} from "@codeherence/react-native-header";
import { useSharedValue } from "react-native-reanimated";

import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type ScrollViewWithHeadersProps = React.ComponentProps<
  typeof ScrollViewWithHeaders
>;

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
  | "staticHeaderBackgroundTertiary";

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

  children?: ReactNode;
}

export function ThemedStaticHeader(props: ThemedStaticHeaderProps) {
  const {
    themeType = "primary",
    backgroundColor = {},
    headerProps = {},
    style,
    contentContainerStyle,
    isRefreshable,
    refreshing,
    onRefresh,
    ...scrollProps
  } = props;

  // A pinned header is always visible => showNavBar = 1
  const showNavBar = useSharedValue(1);

  const colorKey = `staticHeaderBackground${capitalize(
    themeType
  )}` as ThemeColorType;
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

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
    ) : undefined;

  const mergedContentContainerStyle = [
    { paddingBottom: BOTTOM_FOOTER_HEIGHT },
    contentContainerStyle,
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
      style={[styles.container, style]}
      contentContainerStyle={mergedContentContainerStyle}
      {...scrollProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
