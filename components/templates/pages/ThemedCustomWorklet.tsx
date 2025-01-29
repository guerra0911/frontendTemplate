// app/components/screens/ThemedCustomWorklet.tsx

import React, { ReactNode } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  ScrollViewWithHeaders,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<
  typeof ScrollViewWithHeaders
>;

type ThemeColorType =
  | "customWorkletBackgroundPrimary"
  | "customWorkletBackgroundSecondary"
  | "customWorkletBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface LocalHeaderProps {
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
  headerStyle?: any;
}

interface LocalLargeHeaderProps {
  renderLargeHeader?: (scrollY: any, showNavBar: any) => ReactNode;
  headerStyle?: any;
}

export interface ThemedCustomWorkletProps
  extends Omit<
    ScrollViewWithHeadersExtendedProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;

  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  children?: ReactNode;
}

export function ThemedCustomWorklet(props: ThemedCustomWorkletProps) {
  const {
    themeType = "primary",
    backgroundColor = {},
    headerProps = {},
    largeHeaderProps = {},
    style,
    contentContainerStyle,
    isRefreshable,
    refreshing,
    onRefresh,
    ...scrollProps
  } = props;

  const colorKey = `customWorkletBackground${capitalize(
    themeType
  )}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const { renderLeft, renderCenter, renderRight, headerStyle } = headerProps;

  const { renderLargeHeader, headerStyle: largeHeaderStyle } = largeHeaderProps;

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
    ) : undefined;

  const mergedContentContainerStyle = [
    { paddingBottom: BOTTOM_FOOTER_HEIGHT },
    contentContainerStyle,
  ];

  const HeaderComponent = ({ showNavBar }: { showNavBar: any }) => (
    <LibHeader
      showNavBar={showNavBar}
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

  const LargeHeaderComponent = ({
    scrollY,
    showNavBar,
  }: {
    scrollY: any;
    showNavBar: any;
  }) => {
    if (!renderLargeHeader) return null;
    return (
      <LibLargeHeader headerStyle={largeHeaderStyle}>
        {renderLargeHeader(scrollY, showNavBar)}
      </LibLargeHeader>
    );
  };

  return (
    <ScrollViewWithHeaders
      HeaderComponent={HeaderComponent}
      LargeHeaderComponent={LargeHeaderComponent}
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
