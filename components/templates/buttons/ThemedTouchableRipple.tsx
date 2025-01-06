/**
 * ThemedTouchableRipple.tsx
 *
 * A custom ripple-like component that:
 * - Uses our custom Pressable to handle hover/press states
 * - Shows a ripple effect on Android, a highlight (underlay) effect on iOS
 * - Allows user to override ripple color, underlay color, or hover color
 * - Integrates with your global Colors + useThemeColor hook
 */

import React, { useCallback } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import Pressable, { PressableState, PressableProps } from './Pressable';
import { useThemeColor } from '@/hooks/useThemeColor';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export interface ThemedTouchableRippleProps
  extends Omit<PressableProps, 'style' | 'children'> {
  /** Content of the ripple. Accepts function or static nodes. */
  children?: React.ReactNode | ((state: PressableState) => React.ReactNode);

  /** Optional style (similar to Pressable's style) */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableState) => StyleProp<ViewStyle>);

  /**
   * If true, the ripple effect can extend outside its bounds on Android.
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

  /** 
   * Delay in ms before `onLongPress` is called.
   */
  delayLongPress?: number;

  /**
   * If true, positions this ripple absolutely to cover the entire screen.
   */
  fullScreen?: boolean;
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
  delayLongPress,
  fullScreen = false,
  ...rest
}) => {
  // THEME COLORS
  const defaultRippleColor = useThemeColor(
    {
      light: rippleColor?.light,
      dark: rippleColor?.dark,
    },
    'touchableRippleColor'
  );

  const defaultUnderlayColor = useThemeColor(
    {
      light: underlayColor?.light,
      dark: underlayColor?.dark,
    },
    'touchableUnderlayColor'
  );

  const defaultHoverColor = useThemeColor(
    {
      light: hoverColor?.light,
      dark: hoverColor?.dark,
    },
    'touchableHoverColor'
  );

  const isAndroid = Platform.OS === 'android';

  // DYNAMIC STYLES
  const combinedStyle = useCallback(
    (pressableState: PressableState) => {
      const { hovered, pressed } = pressableState;

      let backgroundColor: string | undefined;
      if (hovered && !pressed) {
        backgroundColor = defaultHoverColor;
      } else if (pressed) {
        if (isAndroid) {
          backgroundColor = defaultRippleColor;
        } else {
          backgroundColor = defaultUnderlayColor;
        }
      }

      const userStyle =
        typeof style === 'function' ? style(pressableState) : style;

      return [
        styles.container,
        borderless && styles.borderless,
        fullScreen && styles.fullScreenContainer,
        userStyle,
        { backgroundColor },
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
    ]
  );

  // RENDER
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

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible',
  },
  borderless: {
    overflow: 'hidden',
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(ThemedTouchableRipple);
