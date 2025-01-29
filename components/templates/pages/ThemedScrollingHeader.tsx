// app/components/screens/ThemedScrollingHeader.tsx

import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import {
  Header as LibHeader,
  ScrollViewWithHeaders,
} from "@codeherence/react-native-header";
import { useSharedValue } from "react-native-reanimated";

import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";

type ScrollViewWithHeadersExtendedProps = React.ComponentProps<typeof ScrollViewWithHeaders>;

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;

  /** Renders the left, center, right children in the header. */
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

/** Color keys from ThemedScrollingHeaderColors.ts */
type ThemeColorType =
  | "scrollingHeaderBackgroundPrimary"
  | "scrollingHeaderBackgroundSecondary"
  | "scrollingHeaderBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedScrollingHeaderProps
  extends Omit<
    ScrollViewWithHeadersExtendedProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  headerProps?: Partial<LocalHeaderProps>;

  /**
   * The scrollable children. We manually insert a <Header> at the top
   * so it scrolls away (no pinned header).
   */
  children?: ReactNode;
}

/**
 * ThemedScrollingHeader
 * 
 * This places a normal <Header> *within* the scrollable content. 
 * The result: the header scrolls offscreen when you scroll up.
 */
export function ThemedScrollingHeader(props: ThemedScrollingHeaderProps) {
  const {
    themeType = "primary",
    backgroundColor={},
    headerProps = {},
    style,
    contentContainerStyle,
    ...scrollProps
  } = props;

  // 1) We must give ScrollViewWithHeaders a "HeaderComponent" prop, 
  //    even if we don't want a pinned header. We'll just return null.
  const PlaceholderHeaderComponent = () => null;

  // 2) showNavBar must be a SharedValue<number>. We'll define a constant shared value = 1.
  const showNavBar = useSharedValue(1);

  // 3) Resolve theme color for the background
  const colorKey = `scrollingHeaderBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  // 4) Destructure possible header props
  const {
    headerStyle,
    noBottomBorder,
    ignoreTopSafeArea,
    initialBorderColor,
    borderColor,
    borderWidth,
    renderLeft,
    renderCenter,
    renderRight,
  } = headerProps;

  return (
    <ScrollViewWithHeaders
      HeaderComponent={PlaceholderHeaderComponent}
      // We do NOT provide LargeHeaderComponent => none
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      {...scrollProps}
    >
      {/* 
        Place a normal <Header> as the first child within the scrollable content. 
        Because showNavBar is 1, everything stays visible, 
        and the header is not pinned => it scrolls away. 
      */}
      <LibHeader
        showNavBar={showNavBar}
        headerStyle={[{ backgroundColor: resolvedBg }, headerStyle]}
        noBottomBorder={noBottomBorder}
        ignoreTopSafeArea={ignoreTopSafeArea}
        initialBorderColor={initialBorderColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
        headerLeft={
          renderLeft ? renderLeft() : <ThemedHeaderBackButton onPress={() => {}} />
        }
        headerCenter={renderCenter?.()}
        headerRight={renderRight?.()}
      />

      {/* The rest of the scrollable content */}
      {props.children}
    </ScrollViewWithHeaders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
