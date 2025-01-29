// app/components/screens/ThemedFlatList.tsx

import React, { ReactNode } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  FlatListWithHeaders,
  ScalingView,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";

type FlatListWithHeadersExtendedProps<T> = React.ComponentProps<typeof FlatListWithHeaders<T>>;

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
  | "flatListBackgroundPrimary"
  | "flatListBackgroundSecondary"
  | "flatListBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedFlatListProps<T>
  extends Omit<
    FlatListWithHeadersExtendedProps<T>,
    "HeaderComponent" | "LargeHeaderComponent"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;
}

export function ThemedFlatList<T>(props: ThemedFlatListProps<T>) {
  const {
    themeType = "primary",
    backgroundColor={},
    headerProps = {},
    largeHeaderProps = {},
    style,
    contentContainerStyle,
    ...rest
  } = props;

  const colorKey = `flatListBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const { renderLeft, renderCenter, renderRight, headerStyle } = headerProps;
  const { renderLargeHeader, enableScaling, headerStyle: lhStyle } = largeHeaderProps;

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
    <FlatListWithHeaders
      HeaderComponent={HeaderComponent}
      LargeHeaderComponent={LargeHeaderComponent}
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
