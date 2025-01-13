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

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Enumerates all color keys for ThemedChasingDotLoadingIndicator 
 * across primary, secondary, and tertiary.
 */
type ThemeColorType =
  | "chasingDotIndicatorColorPrimary"
  | "chasingDotIndicatorColorSecondary"
  | "chasingDotIndicatorColorTertiary";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

export interface ThemedChasingDotLoadingIndicatorProps {
  // FUNCTIONALITY
  animating?: boolean;
  hidesWhenStopped?: boolean;

  // DIMENSIONS
  size?: number;

  // THEME & COLOR
  themeType?: "primary" | "secondary" | "tertiary";
  color?: { light?: string; dark?: string };

  // STYLING
  style?: StyleProp<ViewStyle>;
}

// ################################################################################
// CONSTANTS
// ################################################################################

const DEFAULT_DOT_COUNT = 12; 
const ANIMATION_DURATION = 1200;
const DEFAULT_OPACITY_WHEN_STOPPED = 0.3;

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedChasingDotLoadingIndicator: React.FC<ThemedChasingDotLoadingIndicatorProps> = ({
  // FUNCTIONALITY
  animating = true,
  hidesWhenStopped = true,

  // DIMENSIONS
  size = 50,

  // THEME & COLOR
  themeType = "primary",
  color = {}, // Default to empty object => no undefined passed to useThemeColor

  // STYLING
  style,
}) => {
  // ---------------------------------------------------------------------------
  // THEME COLOR
  // ---------------------------------------------------------------------------
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    // e.g. "chasingDotIndicatorColorPrimary"
    return `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  const resolvedRingColor = useThemeColor(
    color,
    getColorKey("chasingDotIndicatorColor", themeType)
  );

  // ---------------------------------------------------------------------------
  // ANIMATION REFS
  // ---------------------------------------------------------------------------
  const dotCount = DEFAULT_DOT_COUNT;
  const dotSize = size / 10;
  const radius = size / 2 - dotSize / 2;

  const animations = React.useRef(
    Array.from({ length: dotCount }, () => new Animated.Value(0))
  ).current;

  const fadeAnim = React.useRef(new Animated.Value(animating ? 1 : 0)).current;

  // ---------------------------------------------------------------------------
  // ANIMATION HANDLERS
  // ---------------------------------------------------------------------------
  const startDotAnimations = React.useCallback(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Each dot has a separate loop with delay
    const animationSequences = animations.map((anim, index) => {
      return Animated.loop(
        Animated.sequence([
          // Delay for a stagger effect
          Animated.delay((ANIMATION_DURATION / dotCount) * index),
          // Dot brightens
          Animated.timing(anim, {
            toValue: 1,
            duration: ANIMATION_DURATION / 2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          // Dot dims
          Animated.timing(anim, {
            toValue: DEFAULT_OPACITY_WHEN_STOPPED,
            duration: ANIMATION_DURATION / 2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      );
    });

    // Start all in parallel
    Animated.parallel(animationSequences).start();
  }, [animations, fadeAnim, dotCount]);

  const stopDotAnimations = React.useCallback(() => {
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Reset each dot to 0
      animations.forEach((anim) => {
        anim.stopAnimation();
        anim.setValue(0);
      });
    });
  }, [animations, fadeAnim]);

  React.useEffect(() => {
    if (animating) {
      startDotAnimations();
    } else if (hidesWhenStopped) {
      stopDotAnimations();
    } else {
      // remain visible => set each dot to ~30% opacity
      animations.forEach((anim) => anim.setValue(DEFAULT_OPACITY_WHEN_STOPPED));
    }

    return () => {
      // On unmount or re-render, stop all
      animations.forEach((anim) => anim.stopAnimation());
    };
  }, [animating, hidesWhenStopped, startDotAnimations, stopDotAnimations, animations]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  /**
   * Each dot is positioned around a circle using trigonometry:
   * angle, rad => (x, y) offset from the center
   */
  const getDotStyle = (index: number) => {
    const angleDegrees = index * (360 / dotCount) + 90; // start from top
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const x = radius * Math.cos(angleRadians);
    const y = radius * Math.sin(angleRadians);

    return {
      position: "absolute" as const,
      left: size / 2 + x - dotSize / 2,
      top: size / 2 + y - dotSize / 2,
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor: resolvedRingColor,
      opacity: animations[index],
      transform: [
        {
          scale: animations[index].interpolate({
            inputRange: [DEFAULT_OPACITY_WHEN_STOPPED, 1],
            outputRange: [0.6, 1],
          }),
        },
      ],
    };
  };

  return (
    <View
      style={[styles.outerContainer, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: animating }}
    >
      <View style={[styles.innerContainer, { width: size, height: size }]}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {animations.map((_, index) => (
            <Animated.View key={index} style={getDotStyle(index)} />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    position: "relative",
  },
});

export default React.memo(ThemedChasingDotLoadingIndicator);
