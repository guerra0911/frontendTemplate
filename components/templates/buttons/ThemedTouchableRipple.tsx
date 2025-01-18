/**
 * ThemedTouchableRipple.tsx
 *
 * A custom ripple-like component that integrates with your theming system.
 * Supports ripple, underlay, and hover colors for primary/secondary/tertiary
 * states, including disabled variations.
 */
import React, { useCallback } from "react";
import {
  Platform,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import Pressable, { PressableState, PressableProps } from "../general/Pressable";
import { useThemeColor } from "@/hooks/useThemeColor";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * All possible color keys for ThemedTouchableRipple:
 * - Normal (touchableRippleColorXxx, touchableUnderlayColorXxx, touchableHoverColorXxx)
 * - Disabled variations
 * across primary, secondary, tertiary.
 */
type ThemeColorType =
  // Ripple color (normal)
  | "touchableRippleColorPrimary"
  | "touchableRippleColorSecondary"
  | "touchableRippleColorTertiary"
  // Ripple color (disabled)
  | "touchableRippleColorDisabledPrimary"
  | "touchableRippleColorDisabledSecondary"
  | "touchableRippleColorDisabledTertiary"
  // Underlay color (normal)
  | "touchableUnderlayColorPrimary"
  | "touchableUnderlayColorSecondary"
  | "touchableUnderlayColorTertiary"
  // Underlay color (disabled)
  | "touchableUnderlayColorDisabledPrimary"
  | "touchableUnderlayColorDisabledSecondary"
  | "touchableUnderlayColorDisabledTertiary"
  // Hover color (normal)
  | "touchableHoverColorPrimary"
  | "touchableHoverColorSecondary"
  | "touchableHoverColorTertiary"
  // Hover color (disabled)
  | "touchableHoverColorDisabledPrimary"
  | "touchableHoverColorDisabledSecondary"
  | "touchableHoverColorDisabledTertiary";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

export interface ThemedTouchableRippleProps
  extends Omit<PressableProps, "style" | "children"> {
  /** Content of the ripple. Accepts function or static nodes. */
  children?: React.ReactNode | ((state: PressableState) => React.ReactNode);

  /** Optional style (similar to Pressable's style) */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableState) => StyleProp<ViewStyle>);

  /** If true, the ripple effect can extend outside its bounds on Android. */
  borderless?: boolean;

  /** Theming category (primary, secondary, tertiary) */
  themeType?: "primary" | "secondary" | "tertiary";

  /**
   * Override the ripple color from the theme.
   * Can be a single string (applied to both light & dark), or an object.
   * e.g. `"transparent"` or `{ light: "#00000020", dark: "#ffffff20" }`.
   */
  rippleColor?: { light?: string; dark?: string } | string;

  /** Override the underlay color for iOS/older Android, same pattern as above. */
  underlayColor?: { light?: string; dark?: string } | string;

  /** Custom hover color for web, same pattern as above. */
  hoverColor?: { light?: string; dark?: string } | string;

  /** Disabled state for the pressable */
  disabled?: boolean;

  /** onPress event */
  onPress?: (e: GestureResponderEvent) => void;

  /** onLongPress event */
  onLongPress?: (e: GestureResponderEvent) => void;

  /** onPressIn event */
  onPressIn?: (e: GestureResponderEvent) => void;

  /** onPressOut event */
  onPressOut?: (e: GestureResponderEvent) => void;

  /** Delay in ms before `onLongPress` is called. */
  delayLongPress?: number;

  /** If true, positions this ripple absolutely to cover the entire screen. */
  fullScreen?: boolean;

  /** If true, the pressed/hover/ripple color logic is skipped => effectively invisible ripple. */
  disableRippleEffect?: boolean;
}

// ################################################################################
// UTIL: parseColorProp
// ################################################################################

/**
 * If the user passes a string (e.g. "transparent" or "#000"),
 * we interpret it as { light: string, dark: string }.
 * If they pass an object, we use it directly.
 */
function parseColorProp(
  colorProp: { light?: string; dark?: string } | string
): { light?: string; dark?: string } {
  if (typeof colorProp === "string") {
    return { light: colorProp, dark: colorProp };
  }
  return colorProp;
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedTouchableRipple: React.FC<ThemedTouchableRippleProps> = ({
  children,
  style,
  borderless = false,
  themeType = "primary",
  rippleColor = {},
  underlayColor = {},
  hoverColor = {},
  disabled = false,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  delayLongPress,
  fullScreen = false,
  disableRippleEffect = false,
  ...rest
}) => {
  // ----------------------------------------------------------------------------
  // 1) Helper function to build color keys
  // ----------------------------------------------------------------------------
  const getColorKey = (
    base: "touchableRippleColor" | "touchableUnderlayColor" | "touchableHoverColor",
    variant: "primary" | "secondary" | "tertiary",
    isDisabled: boolean
  ): ThemeColorType => {
    // e.g. "touchableRippleColor" + (isDisabled ? "Disabled" : "") + "Primary"
    // => "touchableRippleColorDisabledPrimary"
    const disabledSegment = isDisabled ? "Disabled" : "";
    return `${base}${disabledSegment}${
      variant.charAt(0).toUpperCase() + variant.slice(1)
    }` as ThemeColorType;
  };

  const isDisabledState = disabled;

  // ----------------------------------------------------------------------------
  // 2) Parse color props to unify single strings => { light, dark }
  // ----------------------------------------------------------------------------
  const rippleColorObj = parseColorProp(rippleColor);
  const underlayColorObj = parseColorProp(underlayColor);
  const hoverColorObj = parseColorProp(hoverColor);

  // ----------------------------------------------------------------------------
  // 3) Resolve theme-based colors using the new color keys
  // ----------------------------------------------------------------------------
  const defaultRippleColor = useThemeColor(
    rippleColorObj,
    getColorKey("touchableRippleColor", themeType, isDisabledState)
  );

  const defaultUnderlayColor = useThemeColor(
    underlayColorObj,
    getColorKey("touchableUnderlayColor", themeType, isDisabledState)
  );

  const defaultHoverColor = useThemeColor(
    hoverColorObj,
    getColorKey("touchableHoverColor", themeType, isDisabledState)
  );

  // ----------------------------------------------------------------------------
  // 4) Combine dynamic styles with user style
  // ----------------------------------------------------------------------------
  const isAndroid = Platform.OS === "android";

  const combinedStyle = useCallback(
    (pressableState: PressableState) => {
      const { hovered, pressed } = pressableState;

      let backgroundColor: string | undefined;
      if (!disableRippleEffect) {
        if (hovered && !pressed) {
          backgroundColor = defaultHoverColor;
        } else if (pressed) {
          if (isAndroid) {
            backgroundColor = defaultRippleColor;
          } else {
            backgroundColor = defaultUnderlayColor;
          }
        }
      } else {
        // If ripple effect is disabled => no background color changes
        backgroundColor = undefined;
      }

      // Merge user-supplied style
      const userStyle =
        typeof style === "function" ? style(pressableState) : style;

      return [
        styles.container,
        borderless && styles.borderless,
        fullScreen && styles.fullScreenContainer,
        userStyle,
        { backgroundColor },
        disabled && { opacity: 0.6 },
      ];
    },
    [
      style,
      borderless,
      fullScreen,
      defaultHoverColor,
      defaultRippleColor,
      defaultUnderlayColor,
      isAndroid,
      disableRippleEffect,
      disabled,
    ]
  );

  // ----------------------------------------------------------------------------
  // 5) RENDER
  // ----------------------------------------------------------------------------
  return (
    <Pressable
      {...rest}
      style={combinedStyle}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      delayLongPress={delayLongPress}
    >
      {children}
    </Pressable>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "visible",
  },
  borderless: {
    overflow: "hidden",
  },
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(ThemedTouchableRipple);
