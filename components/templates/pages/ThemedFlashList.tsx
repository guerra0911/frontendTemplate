// app/components/screens/ThemedFlashList.tsx

import React, { ReactNode } from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  View,
  RefreshControl,
} from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  FlashListWithHeaders,
  ScalingView,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type FlashListWithHeadersExtendedProps<T> = React.ComponentProps<
  typeof FlashListWithHeaders<T>
>;

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

interface LocalLargeHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  renderLargeHeader?: (scrollY: any, showNavBar: any) => ReactNode;
  enableScaling?: boolean;
}

type ThemeColorType =
  | "flashListBackgroundPrimary"
  | "flashListBackgroundSecondary"
  | "flashListBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedFlashListProps<T>
  extends Omit<
    FlashListWithHeadersExtendedProps<T>,
    "HeaderComponent" | "LargeHeaderComponent" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  containerStyle?: StyleProp<ViewStyle>;

  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;

  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  /** Provide a default for estimatedItemSize if not passed */
  estimatedItemSize?: number;
}

export function ThemedFlashList<T>(props: ThemedFlashListProps<T>) {
  const {
    themeType = "primary",
    backgroundColor = {},
    headerProps = {},
    largeHeaderProps = {},
    containerStyle,
    contentContainerStyle,
    isRefreshable,
    refreshing,
    onRefresh,
    estimatedItemSize = 50,
    ...flashListProps
  } = props;

  const colorKey = `flashListBackground${capitalize(
    themeType
  )}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const { renderLeft, renderCenter, renderRight, headerStyle } = headerProps;
  const {
    renderLargeHeader,
    enableScaling,
    headerStyle: lhStyle,
  } = largeHeaderProps;

  /** We build a refreshControl for the underlying FlashList */
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
    <View style={[styles.container, containerStyle]}>
      <FlashListWithHeaders
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        contentContainerStyle={mergedContentContainerStyle}
        refreshControl={maybeRefreshControl}
        estimatedItemSize={estimatedItemSize}
        {...flashListProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
