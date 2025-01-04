// ThemedToggleSwitch.tsx
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

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Define all possible color keys for ThemedToggleSwitch, matching your Colors.ts setup.
 */
type ThemeColorType =
  | "toggleContainerOff"
  | "toggleContainerOn"
  | "toggleCircleOff"
  | "toggleCircleOn";

export interface ThemedToggleSwitchProps {
  // FUNCTIONALITY
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;

  // DIMENSIONS
  width?: number;  // Default: 52
  height?: number; // Default: 32.7

  // COLOR OVERRIDES
  containerColorOn?: string;
  containerColorOff?: string;
  circleColorOn?: string;
  circleColorOff?: string;
}

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

  // COLOR OVERRIDES
  containerColorOn,
  containerColorOff,
  circleColorOn,
  circleColorOff,
}) => {
  // ############################################################################
  // THEMED COLORS
  // ############################################################################
  const inactiveBgColor = useThemeColor({}, "toggleContainerOff");
  const activeBgColor   = useThemeColor({}, "toggleContainerOn");
  const defaultCircleColorOff = useThemeColor({}, "toggleCircleOff");
  const defaultCircleColorOn  = useThemeColor({}, "toggleCircleOn");

  // ############################################################################
  // DIMENSIONS
  // ############################################################################
  const BASE_WIDTH  = 52;
  const BASE_HEIGHT = 32.7;

  const finalWidth  = width ?? BASE_WIDTH;
  const finalHeight = height ?? BASE_HEIGHT;

  // Circle dimension logic: a slight margin from the container edges
  // so the thumb doesn't touch the container border
  const circleBaseDiameter = finalHeight - 4; 
  const circleExpandedDiameter = circleBaseDiameter + 6; // expansion on press

  // ############################################################################
  // ANIMATION STATES
  // ############################################################################
  // Tracks whether toggle is ON (1) or OFF (0)
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));
  // Controls background color interpolation
  const [colorAnimatedValue] = useState(new Animated.Value(value ? 1 : 0));
  // Circle expansion
  const [circleWidthAnimatedValue] = useState(new Animated.Value(0));
  // Additional horizontal offset when pressed (only used if value == true)
  const [translateX] = useState(new Animated.Value(0));

  // ############################################################################
  // EFFECTS
  // ############################################################################
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

  // ############################################################################
  // PRESS HANDLERS
  // ############################################################################
  const onTouchStart = () => {
    if (!disabled) {
      Animated.timing(circleWidthAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      if (value) {
        // Slight pull to the left if it's ON
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
    if (!disabled) {
      onValueChange(!value);
    }
  }, [disabled, onValueChange, value]);

  // ############################################################################
  // INTERPOLATIONS
  // ############################################################################
  // The circle moves from leftMargin=2 to
  // rightMargin=(finalWidth - circleBaseDiameter - 2)
  const moveToggle = useMemo(
    () => animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [2, finalWidth - circleBaseDiameter - 2],
    }),
    [animatedValue, finalWidth, circleBaseDiameter]
  );

  // Circle diameter interpolates from base to expanded
  const circleDiameter = useMemo(
    () => circleWidthAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [circleBaseDiameter, circleExpandedDiameter],
    }),
    [circleWidthAnimatedValue, circleBaseDiameter, circleExpandedDiameter]
  );

  // Interpolate container track color
  const bgColor = colorAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      containerColorOff || inactiveBgColor,
      containerColorOn  || activeBgColor,
    ],
  });

  // Circle color (not animated)
  const currentCircleColor = value
    ? circleColorOn  || defaultCircleColorOn
    : circleColorOff || defaultCircleColorOff;

  // ############################################################################
  // RENDER
  // ############################################################################
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPress={handlePress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="switch"
        accessibilityState={{ disabled, checked: value } as AccessibilityState}
      >
        <Animated.View
          style={[
            styles.toggleContainer,
            {
              width: finalWidth,
              height: finalHeight,
              borderRadius: finalHeight * 0.5, // pill shape
              backgroundColor: bgColor,
              opacity: disabled ? 0.6 : 1,
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
                  outputRange: [circleBaseDiameter * 0.5, circleExpandedDiameter * 0.5],
                }),
                marginLeft: moveToggle,
                backgroundColor: currentCircleColor,
                transform: [{ translateX: translateX }],
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
    // All circle size & position handled by animation
    shadowColor: "#515151",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});

export default React.memo(ThemedToggleSwitch);