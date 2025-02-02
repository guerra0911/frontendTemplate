// app/components/screens/ThemedSectionList.tsx

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
  SectionListWithHeaders,
  ScalingView,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type SectionListWithHeadersExtendedProps<T> = React.ComponentProps<
  typeof SectionListWithHeaders<T>
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
  | "sectionListBackgroundPrimary"
  | "sectionListBackgroundSecondary"
  | "sectionListBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedSectionListProps<T>
  extends Omit<
    SectionListWithHeadersExtendedProps<T>,
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
}

export function ThemedSectionList<T>(props: ThemedSectionListProps<T>) {
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
    ...rest
  } = props;

  const colorKey = `sectionListBackground${capitalize(
    themeType
  )}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const { renderLeft, renderCenter, renderRight, headerStyle } = headerProps;
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
      <SectionListWithHeaders
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        contentContainerStyle={mergedContentContainerStyle}
        refreshControl={maybeRefreshControl}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
