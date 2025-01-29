// app/components/screens/ThemedSimple.tsx

import React, { ReactNode } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  ScrollViewWithHeaders,
  ScalingView,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<typeof ScrollViewWithHeaders>;

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  borderColor?: string;
  initialBorderColor?: string;
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
  | "simpleBackgroundPrimary"
  | "simpleBackgroundSecondary"
  | "simpleBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedSimpleProps
  extends Omit<
    ScrollViewWithHeadersExtendedProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;

  children?: ReactNode;
}

export function ThemedSimple(props: ThemedSimpleProps) {
  const {
    themeType = "primary",
    backgroundColor={},
    headerProps = {},
    largeHeaderProps = {},
    style,
    contentContainerStyle,
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

  const HeaderComponent = ({ showNavBar }: { showNavBar: any }) => (
    <LibHeader
      showNavBar={showNavBar}
      headerStyle={[{ backgroundColor: resolvedBg }, headerStyle]}
      borderColor={borderColor}
      initialBorderColor={initialBorderColor}
      headerLeft={renderLeft ? renderLeft() : <ThemedHeaderBackButton onPress={() => {}} />}
      headerCenter={renderCenter?.()}
      headerRight={renderRight?.()}
    />
  );

  const LargeHeaderComponent = ({ scrollY, showNavBar }: { scrollY: any; showNavBar: any }) => {
    if (!renderLargeHeader) return null;
    return (
      <LibLargeHeader headerStyle={lhStyle}>
        {enableScaling ? (
          <ScalingView scrollY={scrollY}>{renderLargeHeader(scrollY, showNavBar)}</ScalingView>
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
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      {...scrollProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
