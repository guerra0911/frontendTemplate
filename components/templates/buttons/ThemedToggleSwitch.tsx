import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Pressable,
  Easing,
  StyleProp,
  ViewStyle,
  AccessibilityState,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 * Enumerates all container (track) and circle (thumb) color states
 * across primary, secondary, tertiary, plus disabled states.
 */
type ThemeColorType =
  // ON (container track)
  | "toggleSwitchContainerOnPrimary"
  | "toggleSwitchContainerOnSecondary"
  | "toggleSwitchContainerOnTertiary"
  | "toggleSwitchContainerOnDisabledPrimary"
  | "toggleSwitchContainerOnDisabledSecondary"
  | "toggleSwitchContainerOnDisabledTertiary"

  // OFF (container track)
  | "toggleSwitchContainerOffPrimary"
  | "toggleSwitchContainerOffSecondary"
  | "toggleSwitchContainerOffTertiary"
  | "toggleSwitchContainerOffDisabledPrimary"
  | "toggleSwitchContainerOffDisabledSecondary"
  | "toggleSwitchContainerOffDisabledTertiary"

  // ON (circle / thumb)
  | "toggleSwitchCircleOnPrimary"
  | "toggleSwitchCircleOnSecondary"
  | "toggleSwitchCircleOnTertiary"
  | "toggleSwitchCircleOnDisabledPrimary"
  | "toggleSwitchCircleOnDisabledSecondary"
  | "toggleSwitchCircleOnDisabledTertiary"

  // OFF (circle / thumb)
  | "toggleSwitchCircleOffPrimary"
  | "toggleSwitchCircleOffSecondary"
  | "toggleSwitchCircleOffTertiary"
  | "toggleSwitchCircleOffDisabledPrimary"
  | "toggleSwitchCircleOffDisabledSecondary"
  | "toggleSwitchCircleOffDisabledTertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS INTERFACE
 * -----------------------------------------------------------------------------
 */
export interface ThemedToggleSwitchProps {
  // FUNCTIONALITY
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;

  // DIMENSIONS
  width?: number; // default: 52
  height?: number; // default: 32.7

  // THEME
  themeType?: "primary" | "secondary" | "tertiary";

  // COLOR OVERRIDES
  backgroundOn?: { light?: string; dark?: string };
  backgroundOff?: { light?: string; dark?: string };
  circleOn?: { light?: string; dark?: string };
  circleOff?: { light?: string; dark?: string };
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
const ThemedToggleSwitch: React.FC<ThemedToggleSwitchProps> = ({
  // FUNCTIONALITY
  value,
  onValueChange,
  disabled = false,
  style,
  accessibilityLabel = "Toggle Switch",

  // DIMENSIONS
  width,
  height,

  // THEME
  themeType = "primary",

  // COLOR OVERRIDES (light/dark)
  backgroundOn = {},
  backgroundOff = {},
  circleOn = {},
  circleOff = {},
}) => {
  /**
   * ---------------------------------------------------------------------------
   * 1) HELPER: getColorKey(baseColor, onOrOff, themeType, isDisabled)
   * ---------------------------------------------------------------------------
   * Dynamically constructs the color key, e.g.:
   *   baseColor = "toggleSwitchContainer", onOrOff = "On", themeType = "Primary"
   * => "toggleSwitchContainerOnPrimary"
   */
  const getColorKey = (
    baseColor: "toggleSwitchContainer" | "toggleSwitchCircle",
    onOrOff: "On" | "Off",
    variant: "primary" | "secondary" | "tertiary",
    isDisabledState: boolean
  ): ThemeColorType => {
    /**
     * e.g. "toggleSwitchContainer" + "On" + "Primary" => "toggleSwitchContainerOnPrimary"
     * if disabled => "toggleSwitchContainerOnDisabledPrimary"
     */
    const disabledSegment = isDisabledState ? "Disabled" : "";
    // Example: "toggleSwitchContainer" + "On" + "Disabled" + "Primary"
    return `${baseColor}${onOrOff}${disabledSegment}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  const isDisabled = disabled;

  /**
   * ---------------------------------------------------------------------------
   * 2) THEMED COLORS
   * ---------------------------------------------------------------------------
   * We do not directly import ThemedToggleSwitchColors; we rely on useThemeColor
   * with the color keys from the ThemeColorType enumerations.
   *
   * Four color lookups:
   *   containerOnKey, containerOffKey
   *   circleOnKey, circleOffKey
   * We'll choose them based on `value` (true=ON, false=OFF) and `isDisabled`.
   */
  const containerOnColor = useThemeColor(
    backgroundOn,
    getColorKey("toggleSwitchContainer", "On", themeType, isDisabled)
  );
  const containerOffColor = useThemeColor(
    backgroundOff,
    getColorKey("toggleSwitchContainer", "Off", themeType, isDisabled)
  );

  const circleOnColor = useThemeColor(
    circleOn,
    getColorKey("toggleSwitchCircle", "On", themeType, isDisabled)
  );
  const circleOffColor = useThemeColor(
    circleOff,
    getColorKey("toggleSwitchCircle", "Off", themeType, isDisabled)
  );

  /**
   * ---------------------------------------------------------------------------
   * 3) DIMENSIONS
   * ---------------------------------------------------------------------------
   */
  const BASE_WIDTH = 52;
  const BASE_HEIGHT = 32.7;

  const finalWidth = width ?? BASE_WIDTH;
  const finalHeight = height ?? BASE_HEIGHT;

  // Circle dimension logic
  const circleBaseDiameter = finalHeight - 4;
  const circleExpandedDiameter = circleBaseDiameter + 6;

  /**
   * ---------------------------------------------------------------------------
   * 4) ANIMATION STATES
   * ---------------------------------------------------------------------------
   */
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));       // track toggle on/off
  const [colorAnimatedValue] = useState(new Animated.Value(value ? 1 : 0)); // track background color
  const [circleWidthAnimatedValue] = useState(new Animated.Value(0));       // press expansion
  const [translateX] = useState(new Animated.Value(0));                     // slight push/pull

  /**
   * ---------------------------------------------------------------------------
   * 5) EFFECTS (animate background track and position)
   * ---------------------------------------------------------------------------
   */
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 110,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    Animated.timing(colorAnimatedValue, {
      toValue: value ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue, colorAnimatedValue]);

  /**
   * ---------------------------------------------------------------------------
   * 6) PRESS HANDLERS
   * ---------------------------------------------------------------------------
   */
  const onTouchStart = () => {
    if (!isDisabled) {
      Animated.timing(circleWidthAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      if (value) {
        Animated.timing(translateX, {
          toValue: -5,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const onTouchEnd = () => {
    Animated.timing(circleWidthAnimatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(translateX, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onValueChange(!value);
    }
  }, [isDisabled, onValueChange, value]);

  /**
   * ---------------------------------------------------------------------------
   * 7) INTERPOLATIONS
   * ---------------------------------------------------------------------------
   */
  // Move the circle from left to right
  const moveToggle = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, finalWidth - circleBaseDiameter - 2],
      }),
    [animatedValue, finalWidth, circleBaseDiameter]
  );

  // Circle diameter from base to expanded
  const circleDiameter = useMemo(
    () =>
      circleWidthAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [circleBaseDiameter, circleExpandedDiameter],
      }),
    [circleWidthAnimatedValue, circleBaseDiameter, circleExpandedDiameter]
  );

  // Interpolate container track color
  const bgColor = colorAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [containerOffColor, containerOnColor],
  });

  // Determine circle color (no interpolation needed; it’s a direct pick)
  const currentCircleColor = value ? circleOnColor : circleOffColor;

  /**
   * ---------------------------------------------------------------------------
   * 8) RENDER
   * ---------------------------------------------------------------------------
   */
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPress={handlePress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="switch"
        accessibilityState={{ disabled: isDisabled, checked: value } as AccessibilityState}
      >
        <Animated.View
          style={[
            styles.toggleContainer,
            {
              width: finalWidth,
              height: finalHeight,
              borderRadius: finalHeight * 0.5,
              backgroundColor: bgColor,
              opacity: isDisabled ? 0.6 : 1,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.toggleCircle,
              {
                height: circleDiameter,
                width: circleDiameter,
                borderRadius: circleDiameter.interpolate({
                  inputRange: [circleBaseDiameter, circleExpandedDiameter],
                  outputRange: [
                    circleBaseDiameter * 0.5,
                    circleExpandedDiameter * 0.5,
                  ],
                }),
                marginLeft: moveToggle,
                backgroundColor: currentCircleColor,
                transform: [{ translateX }],
              },
            ]}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

// ############################################################################
// STYLES
// ############################################################################

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  toggleContainer: {
    justifyContent: "center",
  },
  toggleCircle: {
    // The circle’s size & position are handled by animation,
    // but we can still add a subtle shadow here if desired
    shadowColor: "#515151",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});

export default React.memo(ThemedToggleSwitch);
