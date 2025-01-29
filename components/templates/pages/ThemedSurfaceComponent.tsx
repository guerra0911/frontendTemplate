// app/components/screens/ThemedSurfaceComponent.tsx

import React, { ReactNode } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import {
  FadingView,
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  ScrollViewWithHeaders,
  SurfaceComponentProps,
  ScalingView,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<
  typeof ScrollViewWithHeaders
>;
type FadingViewExtendedProps = React.ComponentProps<typeof FadingView>;

interface LocalHeaderProps {
  headerStyle?: any;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

interface LocalLargeHeaderProps {
  headerStyle?: any;
  renderLargeHeader?: (scrollY: any, showNavBar: any) => ReactNode;
  enableScaling?: boolean;
}

interface LocalSurfaceProps extends Partial<SurfaceComponentProps> {
  fadingViewProps?: Partial<FadingViewExtendedProps>;
}

type ThemeColorType =
  | "surfaceComponentBackgroundPrimary"
  | "surfaceComponentBackgroundSecondary"
  | "surfaceComponentBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedSurfaceComponentProps
  extends Omit<
    ScrollViewWithHeadersExtendedProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  surfaceProps?: LocalSurfaceProps;
  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;

  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  children?: ReactNode;
}

const HeaderSurface: React.FC<
  SurfaceComponentProps & {
    themeType: "primary" | "secondary" | "tertiary";
    backgroundColor?: { light?: string; dark?: string };
    fadingViewProps?: Partial<FadingViewExtendedProps>;
  }
> = ({ showNavBar, themeType, backgroundColor = {}, fadingViewProps }) => {
  const colorKey = `surfaceComponentBackground${capitalize(
    themeType
  )}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  return (
    <FadingView
      opacity={showNavBar}
      style={[StyleSheet.absoluteFill, { backgroundColor: resolvedBg }]}
      {...(fadingViewProps || {})}
    />
  );
};

export function ThemedSurfaceComponent(props: ThemedSurfaceComponentProps) {
  const {
    themeType = "primary",
    backgroundColor,
    surfaceProps,
    headerProps = {},
    largeHeaderProps = {},
    style,
    contentContainerStyle,
    isRefreshable,
    refreshing,
    onRefresh,
    ...scrollProps
  } = props;

  const { fadingViewProps, ...restSurfaceProps } = surfaceProps || {};
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
      headerStyle={headerStyle}
      headerLeft={
        renderLeft ? (
          renderLeft()
        ) : (
          <ThemedHeaderBackButton onPress={() => router.back()} />
        )
      }
      headerCenter={renderCenter?.()}
      headerRight={renderRight?.()}
      SurfaceComponent={(sProps) => (
        <HeaderSurface
          {...sProps}
          {...restSurfaceProps}
          themeType={themeType}
          backgroundColor={backgroundColor}
          fadingViewProps={fadingViewProps}
        />
      )}
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
    >
      {props.children}
    </ScrollViewWithHeaders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
