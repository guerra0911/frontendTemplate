/**
 * Pressable.tsx
 *
 * A custom Pressable component adhering to your standards.
 * It handles hovered, pressed, and focused states (especially for web).
 * If you prefer, you can extend from React Native's default Pressable
 * and wrap the logic. For demonstration, we're doing everything manually,
 * including manual delayLongPress logic.
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  Platform,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export interface PressableState {
  hovered: boolean;
  pressed: boolean;
  focused: boolean;
}

export interface PressableProps {
  children?:
    | React.ReactNode
    | ((state: PressableState) => React.ReactNode);
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableState) => StyleProp<ViewStyle>);
  disabled?: boolean;

  // Touch handlers
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;

  // Additional support for a delayed long press
  delayLongPress?: number;

  // Web-specific (hover)
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const Pressable: React.FC<PressableProps> = ({
  children,
  style,
  disabled = false,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  delayLongPress,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  // Use a ref to always have the current pressed state
  const pressedRef = useRef(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // Web: handle hover
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent) => {
      setHovered(true);
      onMouseEnter?.(event);
    },
    [onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent) => {
      setHovered(false);
      onMouseLeave?.(event);
    },
    [onMouseLeave]
  );

  // Press events
  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (!disabled) {
        setPressed(true);
        pressedRef.current = true; // update ref immediately
        onPressIn?.(e);

        // If user wants onLongPress, start the timer using a default delay of 500ms if not provided
        if (onLongPress) {
          const actualDelay = delayLongPress ?? 500;
          longPressTimer.current = setTimeout(() => {
            // Only invoke onLongPress if still pressed and not disabled
            if (pressedRef.current && !disabled) {
              onLongPress(e);
            }
          }, actualDelay);
        }
      }
    },
    [disabled, onPressIn, onLongPress, delayLongPress]
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      if (!disabled) {
        setPressed(false);
        pressedRef.current = false;
        onPressOut?.(e);

        // Cancel any pending long-press timer
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
        }
      }
    },
    [disabled, onPressOut]
  );

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (!disabled) {
        onPress?.(e);

        // If user tapped quickly, also clear the timer
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
        }
      }
    },
    [disabled, onPress]
  );

  // Build current state
  const pressableState: PressableState = {
    hovered,
    pressed,
    focused,
  };

  // Resolve style
  const resolvedStyle: StyleProp<ViewStyle> =
    typeof style === 'function' ? style(pressableState) : style;

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessible={!disabled}
      onFocus={() => !disabled && setFocused(true)}
      onBlur={() => setFocused(false)}
      {...(Platform.OS === 'web'
        ? {
            onMouseEnter: handleMouseEnter as any,
            onMouseLeave: handleMouseLeave as any,
          }
        : {})}
    >
      <View style={[styles.container, resolvedStyle]}>
        {typeof children === 'function' ? children(pressableState) : children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // This ensures the container can show background changes on web
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },
});

export default Pressable;
