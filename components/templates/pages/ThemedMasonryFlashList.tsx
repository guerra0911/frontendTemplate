// app/components/screens/ThemedMasonryFlashList.tsx
import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle, StyleProp, View } from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  MasonryFlashListWithHeaders,
  ScalingView,
} from "@codeherence/react-native-header";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";

type MasonryFlashListWithHeadersExtendedProps<T> = React.ComponentProps<
  typeof MasonryFlashListWithHeaders<T>
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
  | "masonryFlashListBackgroundPrimary"
  | "masonryFlashListBackgroundSecondary"
  | "masonryFlashListBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedMasonryFlashListProps<T>
  extends Omit<
    MasonryFlashListWithHeadersExtendedProps<T>,
    "HeaderComponent" | "LargeHeaderComponent" | "style"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  
  // We'll remove 'style' from direct usage, do a containerStyle instead
  containerStyle?: StyleProp<ViewStyle>;

  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;

  // We also have "estimatedItemSize" if needed:
  estimatedItemSize?: number;
}

export function ThemedMasonryFlashList<T>(props: ThemedMasonryFlashListProps<T>) {
  const {
    themeType = "primary",
    backgroundColor={},
    headerProps = {},
    largeHeaderProps = {},
    containerStyle,
    contentContainerStyle,
    estimatedItemSize = 100, // example default
    ...rest
  } = props;

  const colorKey = `masonryFlashListBackground${capitalize(themeType)}` as ThemeColorType;
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
    <View style={[styles.container, containerStyle]}>
      <MasonryFlashListWithHeaders
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        contentContainerStyle={contentContainerStyle}
        estimatedItemSize={estimatedItemSize}
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
