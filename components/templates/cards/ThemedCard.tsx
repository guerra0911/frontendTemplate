/**
 * ThemedCard.tsx
 *
 * A themed Card component supporting:
 *  - mode: "elevated", "outlined", "contained"
 *  - type: "primary", "secondary", "tertiary" (for background/border color variants)
 *  - optional onPress / onLongPress for pressable cards
 *  - custom styles
 *
 * Uses `ThemedSurface` for background/elevation and
 * `ThemedTouchableRipple` for press handling (if onPress is present).
 */

import React, { useEffect, useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedSurface from "@/components/templates/containers/ThemedSurface";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import ThemedCardContent from "./ThemedCardContent";
import ThemedCardActions from "./ThemedCardActions";
import ThemedCardCover from "./ThemedCardCover";
import ThemedCardTitle from "./ThemedCardTitle";

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export type ThemedCardMode = "elevated" | "outlined" | "contained";
export type ThemedCardType = "primary" | "secondary" | "tertiary";

/** Color keys for background from ThemedCardColors. */
type CardBackgroundColorType =
  | "cardBackgroundPrimary"
  | "cardBackgroundSecondary"
  | "cardBackgroundTertiary";

/** Color keys for border from ThemedCardColors. */
type CardBorderColorType =
  | "cardBorderPrimary"
  | "cardBorderSecondary"
  | "cardBorderTertiary";

/**
 * Props for ThemedCard.
 * - Accepts optional color overrides for background/border
 *   but defaults to your theming system if not provided.
 */
export interface ThemedCardProps {
  /** The card's children (e.g. <ThemedCardTitle/>, <ThemedCardContent/>, etc.) */
  children?: React.ReactNode;

  /** The mode: "elevated", "outlined", or "contained". @default "elevated" */
  mode?: ThemedCardMode;

  /** The color "type": primary, secondary, or tertiary. @default "primary" */
  type?: ThemedCardType;

  /** Elevation level if "mode=elevated". e.g. 2, 3, 6. @default 2 */
  elevation?: number;

  /** Optional press handlers => makes card pressable with ripple. */
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;

  /** Additional style for the card container. */
  style?: StyleProp<ViewStyle>;

  /** Additional style for the inner content container. */
  contentStyle?: StyleProp<ViewStyle>;

  /** An optional testID for testing. @default "themed-card" */
  testID?: string;

  /**
   * Optional color overrides for the background or border.
   * If not provided, defaults come from ThemedCardColors.ts
   */
  backgroundColor?: { light?: string; dark?: string };
  borderColor?: { light?: string; dark?: string };
}

////////////////////////////////////////////////////////////////////////////////
// HELPER: getColorKey
////////////////////////////////////////////////////////////////////////////////

function getBackgroundColorKey(
  base: "cardBackground",
  type: ThemedCardType
): CardBackgroundColorType {
  return `${base}${type.charAt(0).toUpperCase() + type.slice(1)}` as CardBackgroundColorType;
}

function getBorderColorKey(
  base: "cardBorder",
  type: ThemedCardType
): CardBorderColorType {
  return `${base}${type.charAt(0).toUpperCase() + type.slice(1)}` as CardBorderColorType;
}

////////////////////////////////////////////////////////////////////////////////
// BASE CARD COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedCardBase: React.FC<ThemedCardProps> = ({
  children,
  mode = "elevated",
  type = "primary",
  elevation = 2,
  onPress,
  onLongPress,
  disabled = false,
  style,
  contentStyle,
  testID = "themed-card",

  // NEW color override props
  backgroundColor = {},
  borderColor = {},
}) => {
  // Animated value for "pressed" elevation if mode=elevated
  const elevationAnim = useRef(new Animated.Value(elevation)).current;

  // Press-in or Press-out animation
  const handlePressIn = () => {
    if (mode === "elevated" && !disabled) {
      Animated.timing(elevationAnim, {
        toValue: Math.max(elevation + 2, 8),
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (mode === "elevated" && !disabled) {
      Animated.timing(elevationAnim, {
        toValue: elevation,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  // THEME COLORS
  // Use the color override if provided, else default from color file
  const bgColorKey = getBackgroundColorKey("cardBackground", type);
  const resolvedBackgroundColor = useThemeColor(backgroundColor, bgColorKey);

  const borderKey = getBorderColorKey("cardBorder", type);
  const resolvedBorderColor = useThemeColor(borderColor, borderKey);

  // Outline style if mode=outlined
  const outlineStyle =
    mode === "outlined"
      ? { borderWidth: 1, borderColor: resolvedBorderColor }
      : {};

  // Elevation if mode=elevated
  const containerElevation = mode === "elevated" ? elevationAnim : 0;

  // The card content
  const renderContent = () => (
    <View style={[{ flex: 1 }, contentStyle]} testID={`${testID}-content`}>
      {children}
    </View>
  );

  return (
    <ThemedSurface
      testID={testID}
      style={[
        {
          backgroundColor: resolvedBackgroundColor,
          elevation: containerElevation as unknown as number, // Animated.Value => cast
        },
        outlineStyle,
        style,
      ]}
    >
      {onPress || onLongPress ? (
        <ThemedTouchableRipple
          disabled={disabled}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{ flex: 1 }}
        >
          {renderContent()}
        </ThemedTouchableRipple>
      ) : (
        renderContent()
      )}
    </ThemedSurface>
  );
};

////////////////////////////////////////////////////////////////////////////////
// CREATE MEMO + ATTACH SUBCOMPONENTS
////////////////////////////////////////////////////////////////////////////////

/** 
 * 1. Define an interface that extends the base memoized component 
 * and includes subcomponents.
 */
interface ThemedCardInterface
  extends React.MemoExoticComponent<React.FC<ThemedCardProps>> {
  Content: typeof ThemedCardContent;
  Actions: typeof ThemedCardActions;
  Cover: typeof ThemedCardCover;
  Title: typeof ThemedCardTitle;
}

// 2. Memoize the base card
const MemoizedThemedCard = React.memo(ThemedCardBase) as ThemedCardInterface;

// 3. Attach sub-components
MemoizedThemedCard.Content = ThemedCardContent;
MemoizedThemedCard.Actions = ThemedCardActions;
MemoizedThemedCard.Cover = ThemedCardCover;
MemoizedThemedCard.Title = ThemedCardTitle;

export default MemoizedThemedCard;
