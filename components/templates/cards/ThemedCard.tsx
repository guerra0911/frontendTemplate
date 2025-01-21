/**
 * ThemedCard.tsx
 *
 * Implements a themable Card with modes "elevated", "outlined", "contained".
 * Follows your existing Themed approach with useThemeColor, ThemedTouchableRipple, etc.
 */

import React, { useRef } from "react";
import {
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  Animated,
  StyleSheet,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import ThemedCardContent from "./ThemedCardContent";
import ThemedCardActions from "./ThemedCardActions";
import ThemedCardCover from "./ThemedCardCover";
import ThemedCardTitle from "./ThemedCardTitle";

////////////////////////////////////////////////////////////////////////////////
// TYPE DEFINITIONS
////////////////////////////////////////////////////////////////////////////////

type CardMode = "elevated" | "outlined" | "contained";
type CardThemeType = "primary" | "secondary" | "tertiary";

type ThemeColorType =
  // ELEVATED
  | "cardBackgroundElevatedPrimary"
  | "cardBackgroundElevatedSecondary"
  | "cardBackgroundElevatedTertiary"
  // CONTAINED
  | "cardBackgroundContainedPrimary"
  | "cardBackgroundContainedSecondary"
  | "cardBackgroundContainedTertiary"
  // OUTLINED
  | "cardBackgroundOutlinedPrimary"
  | "cardBackgroundOutlinedSecondary"
  | "cardBackgroundOutlinedTertiary"
  // BORDERS
  | "cardBorderOutlinedPrimary"
  | "cardBorderOutlinedSecondary"
  | "cardBorderOutlinedTertiary"
  // SHADOWS
  | "cardShadowColorPrimary"
  | "cardShadowColorSecondary"
  | "cardShadowColorTertiary";

export interface ThemedCardProps {
  /** The card children, e.g. <ThemedCardContent>, <ThemedCardCover>, etc. */
  children?: React.ReactNode;

  /** The mode: "elevated", "outlined", "contained". @default "elevated" */
  mode?: CardMode;

  /** The theme type: primary, secondary, or tertiary. @default "primary" */
  themeType?: CardThemeType;

  /**
   * Elevation (shadow depth) if "mode=elevated".
   * If mode="outlined" or "contained", ignored.
   * @default 4
   */
  elevation?: number;

  /** onPress => card is pressable. */
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  delayLongPress?: number;

  /** If true, disable interaction. @default false */
  disabled?: boolean;

  /** Container styling. */
  style?: StyleProp<ViewStyle>;

  /** Inner content container styling. */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   * Uniform padding to apply around all children inside the card.
   * Defaults to `0` so that it matches the "edge-touching" design.
   */
  contentPadding?: number;
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedCardBase: React.FC<ThemedCardProps> = ({
  children,
  mode = "elevated",
  themeType = "primary",
  elevation = 4, // default 4 for a noticeable shadow
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  delayLongPress,
  disabled = false,
  style,
  contentStyle,
  contentPadding = 0, // <--- new prop with default 0
}) => {
  // ----------------------------------------------------------------------------
  // 1) Resolve color keys via theme
  // ----------------------------------------------------------------------------
  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getBgColorKey(cardMode: CardMode, type: CardThemeType): ThemeColorType {
    // e.g. "cardBackgroundElevatedPrimary", "cardBackgroundContainedPrimary", etc.
    return `cardBackground${capitalize(cardMode)}${capitalize(type)}` as ThemeColorType;
  }

  function getBorderColorKey(type: CardThemeType): ThemeColorType {
    return `cardBorderOutlined${capitalize(type)}` as ThemeColorType;
  }

  function getShadowColorKey(type: CardThemeType): ThemeColorType {
    return `cardShadowColor${capitalize(type)}` as ThemeColorType;
  }

  // 1A) The background color (no fallback)
  const backgroundColorKey = getBgColorKey(mode, themeType);
  const resolvedBackgroundColor = useThemeColor({}, backgroundColorKey);

  // 1B) For outlined mode => border color
  const borderColorKey = getBorderColorKey(themeType);
  const resolvedBorderColor = useThemeColor({}, borderColorKey);

  // 1C) For shadows => shadow color
  const shadowColorKey = getShadowColorKey(themeType);
  const resolvedShadowColor = useThemeColor({}, shadowColorKey);

  // ----------------------------------------------------------------------------
  // 2) Elevation & shadow styling
  // ----------------------------------------------------------------------------
  const cardElevation = useRef(new Animated.Value(mode === "elevated" ? elevation : 0)).current;

  const shadowStyle =
    mode === "elevated"
      ? {
          shadowColor: resolvedShadowColor,
          shadowOffset: {
            width: 0,
            height: cardElevation, // iOS offset
          },
          shadowRadius: cardElevation, // iOS blur
          shadowOpacity: 0.3,
          elevation: cardElevation, // Android elevation
        }
      : {};

  const outlineStyle =
    mode === "outlined"
      ? {
          borderWidth: 1,
          borderColor: resolvedBorderColor,
        }
      : {};

  // ----------------------------------------------------------------------------
  // 3) Press-handling => animate from base => bigger
  // ----------------------------------------------------------------------------
  const handlePressIn = (e: GestureResponderEvent) => {
    onPressIn?.(e);
    if (mode === "elevated" && !disabled) {
      Animated.spring(cardElevation, {
        toValue: elevation * 3,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    onPressOut?.(e);
    if (mode === "elevated" && !disabled) {
      Animated.spring(cardElevation, {
        toValue: elevation,
        useNativeDriver: false,
      }).start();
    }
  };

  const isPressable = onPress || onLongPress || onPressIn || onPressOut ? true : false;

  // ----------------------------------------------------------------------------
  // 4) Render
  // ----------------------------------------------------------------------------
  const content = (
    <View
      style={[
        styles.innerContainer,
        contentStyle,
        { padding: contentPadding },
      ]}
    >
      {children}
    </View>
  );

  const innerWrapper = (
    <View style={styles.innerWrapper}>
      {isPressable ? (
        <ThemedTouchableRipple
          disabled={disabled}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          delayLongPress={delayLongPress}
          style={{ flex: 1 }}
        >
          {content}
        </ThemedTouchableRipple>
      ) : (
        content
      )}
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { backgroundColor: resolvedBackgroundColor },
        shadowStyle,
        outlineStyle,
      ]}
    >
      {innerWrapper}
    </Animated.View>
  );
};

////////////////////////////////////////////////////////////////////////////////
// ATTACH SUBCOMPONENTS
////////////////////////////////////////////////////////////////////////////////

const ThemedCard = React.memo(ThemedCardBase) as unknown as React.FC<ThemedCardProps> & {
  Content: typeof ThemedCardContent;
  Actions: typeof ThemedCardActions;
  Cover: typeof ThemedCardCover;
  Title: typeof ThemedCardTitle;
};

ThemedCard.Content = ThemedCardContent;
ThemedCard.Actions = ThemedCardActions;
ThemedCard.Cover = ThemedCardCover;
ThemedCard.Title = ThemedCardTitle;

export default ThemedCard;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  innerWrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  innerContainer: {
    flexShrink: 1,
  },
});
