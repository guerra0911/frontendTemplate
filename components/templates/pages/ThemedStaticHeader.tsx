// app/components/screens/ThemedStaticHeader.tsx

import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import {
  Header as LibHeader,
  ScrollViewWithHeaders,
} from "@codeherence/react-native-header";
import { useSharedValue } from "react-native-reanimated";

import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";

type ScrollViewWithHeadersProps = React.ComponentProps<typeof ScrollViewWithHeaders>;

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
}

/** Keys from ThemedStaticHeaderColors.ts */
type ThemeColorType =
  | "staticHeaderBackgroundPrimary"
  | "staticHeaderBackgroundSecondary"
  | "staticHeaderBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ThemedStaticHeaderProps
  extends Omit<ScrollViewWithHeadersProps, "HeaderComponent" | "LargeHeaderComponent" | "children"> {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };

  headerProps?: Partial<LocalHeaderProps>;
  /** The content below the static (pinned) header. */
  children?: ReactNode;
}

/**
 * A pinned header that never fades in/out, always fully visible. 
 * No large header, no scrolling animation.
 */
export function ThemedStaticHeader(props: ThemedStaticHeaderProps) {
  const {
    themeType = "primary",
    backgroundColor={},
    headerProps = {},
    style,
    contentContainerStyle,
    ...scrollProps
  } = props;

  // This is essential to keep the header children visible at all times:
  const showNavBar = useSharedValue(1); // pinned at 1 => full visibility

  // Resolve theme color
  const colorKey = `staticHeaderBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  // De-structure from headerProps
  const {
    noBottomBorder,
    ignoreTopSafeArea,
    initialBorderColor,
    borderColor,
    borderWidth,
    headerStyle,
    renderLeft,
    renderCenter,
    renderRight,
  } = headerProps;

  // Minimal pinned header
  const HeaderComponent = ({ showNavBar: _unused }: { showNavBar: any }) => {
    return (
      <LibHeader
        showNavBar={showNavBar} // Our shared value pinned at 1
        headerStyle={[{ backgroundColor: resolvedBg }, headerStyle]}
        noBottomBorder={noBottomBorder}
        ignoreTopSafeArea={ignoreTopSafeArea}
        initialBorderColor={initialBorderColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
        headerLeft={renderLeft ? renderLeft() : <ThemedHeaderBackButton onPress={() => {}} />}
        headerCenter={renderCenter?.()}
        headerRight={renderRight?.()}
      />
    );
  };

  return (
    <ScrollViewWithHeaders
      // We supply a pinned header => no large header
      HeaderComponent={HeaderComponent}
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
