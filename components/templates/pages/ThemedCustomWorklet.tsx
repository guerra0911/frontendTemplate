// app/components/screens/ThemedCustomWorklet.tsx

import React, { ReactNode } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  ScrollViewWithHeaders,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<typeof ScrollViewWithHeaders>;

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  headerLeftStyle?: StyleProp<ViewStyle>;
  headerCenterStyle?: StyleProp<ViewStyle>;
  headerRightStyle?: StyleProp<ViewStyle>;
  headerLeftFadesIn?: boolean;
  headerCenterFadesIn?: boolean;
  headerRightFadesIn?: boolean;
  ignoreTopSafeArea?: boolean;
  noBottomBorder?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

interface LocalLargeHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  renderLargeHeader?: (scrollY: any, showNavBar: any) => ReactNode;
}

type ThemeColorType =
  | "customWorkletBackgroundPrimary"
  | "customWorkletBackgroundSecondary"
  | "customWorkletBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedCustomWorkletProps
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

export function ThemedCustomWorklet(props: ThemedCustomWorkletProps) {
  const {
    themeType = "primary",
    backgroundColor={},
    headerProps = {},
    largeHeaderProps = {},
    style,
    contentContainerStyle,
    ...scrollProps
  } = props;

  const colorKey = `customWorkletBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const {
    renderLeft,
    renderCenter,
    renderRight,
    headerStyle,
  } = headerProps;

  const {
    renderLargeHeader,
    headerStyle: largeHeaderStyle,
  } = largeHeaderProps;

  const HeaderComponent = ({ showNavBar }: { showNavBar: any }) => (
    <LibHeader
      showNavBar={showNavBar}
      headerStyle={[{ backgroundColor: resolvedBg }, headerStyle]}
      headerLeft={renderLeft ? renderLeft() : <ThemedHeaderBackButton onPress={() => {}} />}
      headerCenter={renderCenter?.()}
      headerRight={renderRight?.()}
    />
  );

  const LargeHeaderComponent = ({ scrollY, showNavBar }: { scrollY: any; showNavBar: any }) => {
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
