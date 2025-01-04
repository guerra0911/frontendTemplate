/**
 * ThemedTouchableRipple.tsx
 *
 * A custom ripple-like component that:
 * - Uses our custom Pressable to handle hover/press states
 * - Shows a ripple effect on Android, a highlight (underlay) effect on iOS
 * - Allows user to override ripple color, underlay color, or hover color
 * - Integrates with your global Colors + useThemeColor hook
 */

import React, { useMemo } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Animated,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import Pressable, { PressableState, PressableProps } from "./Pressable";
import { useThemeColor } from "@/hooks/useThemeColor";

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export interface ThemedTouchableRippleProps extends Omit<PressableProps, "style" | "children"> {
  /** Content of the ripple. Accepts function or static nodes. */
  children?: React.ReactNode | ((state: PressableState) => React.ReactNode);

  /** Optional style (similar to Pressable's style) */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableState) => StyleProp<ViewStyle>);

  /**
   * If true, the ripple effect can extend outside its bounds on Android.
   * On iOS/web, we simply apply overflow: 'hidden' or not, if you wish.
   */
  borderless?: boolean;

  /**
   * Override the ripple color from Colors or your default
   * e.g. { light: "#00000020", dark: "#ffffff20" }
   */
  rippleColor?: { light?: string; dark?: string };

  /**
   * Override the underlay color for iOS or older Android
   * e.g. { light: "#00000010", dark: "#ffffff10" }
   */
  underlayColor?: { light?: string; dark?: string };

  /**
   * If you want a custom hover color for web
   * e.g. { light: "#00000005", dark: "#ffffff05" }
   */
  hoverColor?: { light?: string; dark?: string };

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

  /** Elevation or styling can be controlled via style if desired */
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedTouchableRipple: React.FC<ThemedTouchableRippleProps> = ({
  children,
  style,
  borderless = false,
  rippleColor,
  underlayColor,
  hoverColor,

  disabled = false,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  ...rest
}) => {
  //////////////////////////////////////////////////////////////////////////
  // THEME COLORS
  //////////////////////////////////////////////////////////////////////////

  // Use your theme color hook to get default ripple, underlay, and hover colors
  const defaultRippleColor = useThemeColor(
    {
      light: rippleColor?.light,
      dark: rippleColor?.dark,
    },
    "touchableRippleColor" // e.g., from ThemedTouchableRippleColors merged into Colors
  );

  const defaultUnderlayColor = useThemeColor(
    {
      light: underlayColor?.light,
      dark: underlayColor?.dark,
    },
    "touchableUnderlayColor"
  );

  const defaultHoverColor = useThemeColor(
    {
      light: hoverColor?.light,
      dark: hoverColor?.dark,
    },
    "touchableHoverColor"
  );

  //////////////////////////////////////////////////////////////////////////
  // PLATFORM-SPECIFIC LOGIC
  //////////////////////////////////////////////////////////////////////////

  // If Android, we might use an actual ripple approach. Otherwise, we do an underlay.
  // For simplicity, we’ll do a single approach: change background color on press or hover
  // (though you can absolutely add real `android_ripple` props if you prefer).
  const isAndroid = Platform.OS === "android";

  //////////////////////////////////////////////////////////////////////////
  // DYNAMIC STYLES
  //////////////////////////////////////////////////////////////////////////

  // We can define how the Pressable style changes based on hovered/pressed states
  const combinedStyle = (pressableState: PressableState) => {
    const { hovered, pressed } = pressableState;

    // We’ll simulate an underlay for iOS or Android pre-Lollipop
    // and a hover color for web
    let backgroundColor: string | undefined;

    if (hovered && !pressed) {
      // Hover but not pressed
      backgroundColor = defaultHoverColor;
    } else if (pressed) {
      // Pressed (ripple or highlight)
      if (isAndroid) {
        // Could do a real ripple if you want, but let's just do a tinted BG
        backgroundColor = defaultRippleColor;
      } else {
        backgroundColor = defaultUnderlayColor;
      }
    }

    // Evaluate any user-supplied style
    const userStyle =
      typeof style === "function" ? style(pressableState) : style;

    return [
      styles.container,
      borderless && styles.borderless,
      userStyle,
      { backgroundColor },
    ];
  };

  //////////////////////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////////////////////

  return (
    <Pressable
      {...rest}
      style={combinedStyle}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {children}
    </Pressable>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "visible", // If you want ripple to extend beyond the container
  },
  borderless: {
    overflow: "hidden", // If you want to clip the ripple
  },
});

export default React.memo(ThemedTouchableRipple);
