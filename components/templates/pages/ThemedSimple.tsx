// app/components/screens/ThemedSimple.tsx

import React, { ReactNode } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  ScrollViewWithHeaders,
  ScalingView,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<
  typeof ScrollViewWithHeaders
>;

type ThemeColorType =
  | "simpleBackgroundPrimary"
  | "simpleBackgroundSecondary"
  | "simpleBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface LocalHeaderProps {
  headerStyle?: any;
  borderColor?: string;
  initialBorderColor?: string;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

interface LocalLargeHeaderProps {
  headerStyle?: any;
  renderLargeHeader?: (scrollY: any, showNavBar: any) => ReactNode;
  enableScaling?: boolean;
}

export interface ThemedSimpleProps
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

export function ThemedSimple(props: ThemedSimpleProps) {
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

  const colorKey = `simpleBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const {
    renderLeft,
    renderCenter,
    renderRight,
    headerStyle,
    borderColor,
    initialBorderColor,
  } = headerProps;

  const {
    renderLargeHeader,
    enableScaling,
    headerStyle: lhStyle,
  } = largeHeaderProps;

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
      borderColor={borderColor}
      initialBorderColor={initialBorderColor}
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
      <LibLargeHeader headerStyle={lhStyle}>
        {enableScaling ? (
          <ScalingView scrollY={scrollY}>
            {renderLargeHeader(scrollY, showNavBar)}
          </ScalingView>
        ) : (
          renderLargeHeader(scrollY, showNavBar)
        )}
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
