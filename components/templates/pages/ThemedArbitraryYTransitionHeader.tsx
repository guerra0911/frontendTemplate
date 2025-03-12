// app/components/screens/ThemedArbitraryYTransitionHeader.tsx

import React, { ReactNode } from "react";
import { StyleSheet, RefreshControl, StyleProp, ViewStyle } from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  ScalingView,
  ScrollViewWithHeaders,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";
import { router } from "expo-router";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<typeof ScrollViewWithHeaders>;

type ThemeColorType =
  | "arbitraryYTransitionHeaderBackgroundPrimary"
  | "arbitraryYTransitionHeaderBackgroundSecondary"
  | "arbitraryYTransitionHeaderBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface LocalHeaderProps {
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  headerLeftStyle?: StyleProp<ViewStyle>;
  headerCenterStyle?: StyleProp<ViewStyle>;
  headerRightStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface LocalLargeHeaderProps {
  renderLargeHeader?: (scrollY: any, showNavBar: any) => ReactNode;
  enableScaling?: boolean;
  headerStyle?: StyleProp<ViewStyle>;
}

export interface ThemedArbitraryYTransitionHeaderProps
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

  // New prop to control when the header should fade in
  headerFadeInThreshold?: number;
}

export function ThemedArbitraryYTransitionHeader(
  props: ThemedArbitraryYTransitionHeaderProps
) {
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
    headerFadeInThreshold = 1, // Default value
    ...scrollProps
  } = props;

  const colorKey = `arbitraryYTransitionHeaderBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const {
    renderLeft,
    renderCenter,
    renderRight,
    headerStyle,
    headerLeftStyle,
    headerCenterStyle,
    headerRightStyle,
    noBottomBorder,
    ignoreTopSafeArea,
    initialBorderColor,
    borderColor,
    borderWidth,
  } = headerProps;

  const {
    renderLargeHeader,
    enableScaling,
    headerStyle: largeHeaderStyle,
  } = largeHeaderProps;

  /** Create a refresh control if needed */
  const maybeRefreshControl = isRefreshable && onRefresh ? (
    <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
  ) : undefined;

  /** Merge BOTTOM_FOOTER_HEIGHT into the content container style */
  const mergedContentContainerStyle = [
    { paddingBottom: BOTTOM_FOOTER_HEIGHT },
    contentContainerStyle,
  ];

  const HeaderComponent = ({ showNavBar }: { showNavBar: any }) => {
    return (
      <LibHeader
        showNavBar={showNavBar}
        noBottomBorder={noBottomBorder}
        ignoreTopSafeArea={ignoreTopSafeArea}
        initialBorderColor={initialBorderColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
        headerStyle={[{ backgroundColor: resolvedBg }, headerStyle]}
        headerLeftStyle={[{ marginLeft: 0, paddingLeft: 0 }, headerLeftStyle]}
        headerCenterStyle={headerCenterStyle}
        headerRightStyle={headerRightStyle}
        headerLeft={
          renderLeft ? renderLeft() : <ThemedHeaderBackButton onPress={() => router.back()} />
        }
        headerCenter={renderCenter?.()}
        headerRight={renderRight?.()}
      />
    );
  };

  const LargeHeaderComponent = ({ scrollY, showNavBar }: { scrollY: any; showNavBar: any }) => {
    if (!renderLargeHeader) return null;
    return (
      <LibLargeHeader headerStyle={largeHeaderStyle}>
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
      headerFadeInThreshold={headerFadeInThreshold}
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
