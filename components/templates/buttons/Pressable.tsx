/**
 * Pressable.tsx
 *
 * A custom Pressable component adhering to your standards.
 * It handles hovered, pressed, and focused states (especially for web).
 * If you prefer, you can extend from React Native's default Pressable
 * and wrap the logic. For demonstration, we're doing everything manually.
 */

import React, { useState, useCallback } from "react";
import {
  Platform,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
} from "react-native";

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export interface PressableState {
  hovered: boolean;
  pressed: boolean;
  focused: boolean;
}

export interface PressableProps {
  children?: React.ReactNode | ((state: PressableState) => React.ReactNode);
  style?: StyleProp<ViewStyle> | ((state: PressableState) => StyleProp<ViewStyle>);
  disabled?: boolean;

  // Touch handlers
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;

  // Web-specific
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
  onMouseEnter,
  onMouseLeave,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

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
        onPressIn?.(e);
      }
    },
    [disabled, onPressIn]
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      if (!disabled) {
        setPressed(false);
        onPressOut?.(e);
      }
    },
    [disabled, onPressOut]
  );

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (!disabled) {
        onPress?.(e);
      }
    },
    [disabled, onPress]
  );

  const handleLongPress = useCallback(
    (e: GestureResponderEvent) => {
      if (!disabled) {
        onLongPress?.(e);
      }
    },
    [disabled, onLongPress]
  );

  // Build current state
  const pressableState: PressableState = {
    hovered,
    pressed,
    focused,
  };

  // Resolve style
  const resolvedStyle: StyleProp<ViewStyle> =
    typeof style === "function" ? style(pressableState) : style;

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessible={!disabled}
      onFocus={() => !disabled && setFocused(true)}
      onBlur={() => setFocused(false)}
      {...(Platform.OS === "web"
        ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
        : {})}
    >
      <View style={[styles.container, resolvedStyle]}>{renderChildren()}</View>
    </TouchableWithoutFeedback>
  );

  function renderChildren() {
    if (typeof children === "function") {
      return children(pressableState);
    }
    return children;
  }
};

const styles = StyleSheet.create({
  container: {
    // This ensures the container can show background changes on web
    cursor: Platform.OS === "web" ? "pointer" : undefined,
  },
});

export default Pressable;
