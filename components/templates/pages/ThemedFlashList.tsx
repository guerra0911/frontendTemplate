// app/components/screens/ThemedFlashList.tsx
import React, { ReactNode } from "react";
import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";
import {
  Header as LibHeader,
  LargeHeader as LibLargeHeader,
  FlashListWithHeaders,
  ScalingView,
} from "@codeherence/react-native-header";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";

/** 
 * We define local props, removing the usage of `style` on the FlashList itself
 * to avoid the FlashList styling warning.
 */
type FlashListWithHeadersExtendedProps<T> = React.ComponentProps<typeof FlashListWithHeaders<T>>;

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
    "HeaderComponent" | "LargeHeaderComponent" | "style"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  // We'll remove 'style' from the direct FlashList usage, 
  // and handle it with a parent container instead.
  containerStyle?: StyleProp<ViewStyle>;

  headerProps?: Partial<LocalHeaderProps>;
  largeHeaderProps?: Partial<LocalLargeHeaderProps>;
}

export function ThemedFlashList<T>(props: ThemedFlashListProps<T>) {
  const {
    themeType = "primary",
    backgroundColor={},
    headerProps = {},
    largeHeaderProps = {},
    containerStyle, // instead of style
    contentContainerStyle,
    estimatedItemSize = 50, // Provide a default to remove the warning
    ...flashListProps
  } = props;

  const colorKey = `flashListBackground${capitalize(themeType)}` as ThemeColorType;
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
      <FlashListWithHeaders
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        contentContainerStyle={contentContainerStyle}
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
