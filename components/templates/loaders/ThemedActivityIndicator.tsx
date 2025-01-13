import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Defines all possible color keys for ThemedActivityIndicator across
 * primary, secondary, and tertiary states (optionally disabled if needed).
 */
type ThemeColorType =
  | "activityIndicatorColorPrimary"
  | "activityIndicatorColorSecondary"
  | "activityIndicatorColorTertiary";

// ################################################################################
// PROPS
// ################################################################################

/**
 * A grouped approach for clarity:
 * - functionality: animating, hidesWhenStopped
 * - dimension: size
 * - color & theming: themeType, color override
 * - style: container style
 */
export interface ThemedActivityIndicatorProps {
  // FUNCTIONALITY
  animating?: boolean;
  hidesWhenStopped?: boolean;

  // DIMENSIONS
  size?: number;

  // COLOR & THEMING
  themeType?: "primary" | "secondary" | "tertiary";
  color?: { light?: string; dark?: string };

  // STYLING
  style?: StyleProp<ViewStyle>;
}

// ################################################################################
// CONSTANTS
// ################################################################################

const DURATION = 2400;

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedActivityIndicator: React.FC<ThemedActivityIndicatorProps> = ({
  // FUNCTIONALITY
  animating = true,
  hidesWhenStopped = true,

  // DIMENSIONS
  size = 24,

  // COLOR & THEMING
  themeType = "primary",
  color = {}, // default to empty object => avoids undefined

  // STYLING
  style,
}) => {
  // ============================================================================
  // ANIMATION REFS
  // ============================================================================
  const timer = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(
    new Animated.Value(!animating && hidesWhenStopped ? 0 : 1)
  ).current;
  const rotation = React.useRef<Animated.CompositeAnimation>();

  // ============================================================================
  // THEME COLOR
  // ============================================================================
  /**
   * Build the color key dynamically, e.g. "activityIndicatorColorPrimary"
   */
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${
      variant.charAt(0).toUpperCase() + variant.slice(1)
    }` as ThemeColorType;
  };

  const ringColor = useThemeColor(
    color, // user override
    getColorKey("activityIndicatorColor", themeType)
  );

  // ============================================================================
  // ANIMATION FUNCTIONS
  // ============================================================================
  const startRotation = React.useCallback(() => {
    Animated.timing(fadeAnim, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start();

    if (rotation.current) {
      timer.setValue(0);
      Animated.loop(rotation.current).start();
    }
  }, [fadeAnim, timer]);

  const stopRotation = React.useCallback(() => {
    if (rotation.current) {
      rotation.current.stop();
    }
  }, []);

  React.useEffect(() => {
    // Initialize rotation if undefined
    if (rotation.current === undefined) {
      rotation.current = Animated.timing(timer, {
        duration: DURATION,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== "web",
        toValue: 1,
      });
    }

    if (animating) {
      startRotation();
    } else if (hidesWhenStopped) {
      Animated.timing(fadeAnim, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start(stopRotation);
    } else {
      stopRotation();
    }
  }, [animating, hidesWhenStopped, fadeAnim, startRotation, stopRotation, timer]);

  // ============================================================================
  // RENDER
  // ============================================================================
  const frames = (60 * DURATION) / 1000;
  const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);
  const containerStyle: ViewStyle = {
    width: size,
    height: size / 2,
    overflow: "hidden",
  };

  return (
    <View
      style={[styles.container, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: animating }}
    >
      <Animated.View
        style={[{ width: size, height: size, opacity: fadeAnim }]}
        collapsable={false}
      >
        {[0, 1].map((index) => {
          const inputRange = Array.from(
            new Array(frames),
            (_, frameIndex) => frameIndex / (frames - 1)
          );

          const outputRange = Array.from(
            new Array(frames),
            (_, frameIndex) => {
              let progress = (2 * frameIndex) / (frames - 1);
              const rotationDeg = index ? +(360 - 15) : -(180 - 15);
              if (progress > 1.0) {
                // Reverse direction
                progress = 2.0 - progress;
              }
              const direction = index ? -1 : +1;
              return `${direction * (180 - 30) * easing(progress) +
                rotationDeg}deg`;
            }
          );

          const layerStyle = {
            width: size,
            height: size,
            transform: [
              {
                rotate: timer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    `${0 + 30 + 15}deg`,
                    `${2 * 360 + 30 + 15}deg`,
                  ],
                }),
              },
            ],
          };

          const viewportStyle = {
            width: size,
            height: size,
            transform: [
              {
                translateY: index ? -size / 2 : 0,
              },
              {
                rotate: timer.interpolate({ inputRange, outputRange }),
              },
            ],
          };

          const offsetStyle: ViewStyle | null = index ? { top: size / 2 } : null;

          const lineStyle = {
            width: size,
            height: size,
            borderColor: ringColor, // our resolved theme color
            borderWidth: size / 10,
            borderRadius: size / 2,
          };

          return (
            <Animated.View key={index} style={styles.layer}>
              <Animated.View style={layerStyle}>
                <Animated.View
                  style={[containerStyle, offsetStyle]}
                  collapsable={false}
                >
                  <Animated.View style={viewportStyle}>
                    <Animated.View style={containerStyle} collapsable={false}>
                      <Animated.View style={lineStyle} />
                    </Animated.View>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(ThemedActivityIndicator);
