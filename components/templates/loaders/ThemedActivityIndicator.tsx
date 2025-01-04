/**
 * ThemedActivityIndicator.tsx
 *
 * A custom loading indicator with a "stutter loop" or slow–fast–slow effect.
 * It uses your global Colors + useThemeColor for default ring color,
 * then adds a scale interpolation to simulate an accelerate–decelerate pattern.
 */

import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export interface ThemedActivityIndicatorProps {
  /** Whether to show (spin) the indicator or hide/stop it. @default true */
  animating?: boolean;

  /** Override ring color: { light?: string; dark?: string } */
  color?: { light?: string; dark?: string };

  /** Diameter of the indicator ring. @default 24 */
  size?: number;

  /**
   * Whether to fade out the ring when not animating.
   * If false, ring remains visible but not spinning.
   * @default true
   */
  hidesWhenStopped?: boolean;

  /** Additional style for the container. */
  style?: StyleProp<ViewStyle>;
}

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/**
 * For a "stutter" animation, you can tweak these to find the right feel:
 * - ROTATION_DURATION: How long one full spin takes (in ms).
 * - EASING: A custom function for slow–fast–slow motion.
 */
const ROTATION_DURATION = 1200;
const EASING = Easing.inOut(Easing.quad); // or try Easing.bezier(0.5, 0, 0.5, 1)

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedActivityIndicator: React.FC<ThemedActivityIndicatorProps> = ({
  animating = true,
  color,
  size = 24,
  hidesWhenStopped = true,
  style,
}) => {
  //////////////////////////////////////////////////////////////////////////
  // ANIMATION STATES
  //////////////////////////////////////////////////////////////////////////

  // Spin animation value, 0 -> 1 repeated
  const spinAnim = React.useRef(new Animated.Value(0)).current;

  // Fade animation to hide/show indicator
  const fadeAnim = React.useRef(new Animated.Value(animating ? 1 : 0)).current;

  //////////////////////////////////////////////////////////////////////////
  // THEME COLOR
  //////////////////////////////////////////////////////////////////////////

  // If user provided a color override, use it; else fallback to "activityIndicatorColor"
  const ringColor = useThemeColor(
    {
      light: color?.light,
      dark: color?.dark,
    },
    "activityIndicatorColor"
  );

  //////////////////////////////////////////////////////////////////////////
  // START/STOP ANIMATIONS
  //////////////////////////////////////////////////////////////////////////

  const startSpinning = React.useCallback(() => {
    // Reset spinAnim to 0 to start fresh each loop
    spinAnim.setValue(0);

    // Loop the rotation forever with our custom EASING
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: ROTATION_DURATION,
        easing: EASING,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const stopSpinning = React.useCallback(() => {
    spinAnim.stopAnimation();
  }, [spinAnim]);

  //////////////////////////////////////////////////////////////////////////
  // FADE & SPIN LOGIC
  //////////////////////////////////////////////////////////////////////////

  React.useEffect(() => {
    if (animating) {
      // Fade in if hidesWhenStopped
      if (hidesWhenStopped) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          startSpinning();
        });
      } else {
        startSpinning();
      }
    } else {
      // Not animating
      if (hidesWhenStopped) {
        // Fade out, then stop spinning
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          stopSpinning();
        });
      } else {
        stopSpinning();
      }
    }

    // Cleanup when unmounting
    return () => stopSpinning();
  }, [animating, hidesWhenStopped, fadeAnim, startSpinning, stopSpinning]);

  //////////////////////////////////////////////////////////////////////////
  // INTERPOLATIONS
  //////////////////////////////////////////////////////////////////////////

  // Map spinAnim [0..1] -> rotation degrees
  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // A subtle "shrink–grow" effect to enhance stutter feeling
  // e.g. 1.0 -> 0.85 -> 1.0
  const scaleInterpolate = spinAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.85, 1],
  });

  //////////////////////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////////////////////

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityState={{ busy: animating }}
    >
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            opacity: fadeAnim,
            transform: [
              { rotate: spinInterpolate },
              { scale: scaleInterpolate },
            ],
          },
        ]}
      >
        <View
          style={[
            {
              width: size,
              height: size,
              borderWidth: size / 10, // thickness
              borderColor: ringColor,
              borderRadius: size / 2,
              borderTopColor: "transparent", // create a gap
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(ThemedActivityIndicator);
