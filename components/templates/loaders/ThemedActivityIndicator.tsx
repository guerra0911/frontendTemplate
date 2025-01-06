/**
 * ThemedActivityIndicator
 *
 * Updated to match React Native Paper's ActivityIndicator:
 * - Spinning loop
 * - Hides when stopped, with fade out
 * - Same ring-based approach, but still uses your custom "activityIndicatorColor"
 *   from your color file
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface ThemedActivityIndicatorProps {
  animating?: boolean;
  color?: { light?: string; dark?: string };
  size?: number;
  hidesWhenStopped?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DURATION = 2400;

const ThemedActivityIndicator: React.FC<ThemedActivityIndicatorProps> = ({
  animating = true,
  color,
  size = 24,
  hidesWhenStopped = true,
  style,
}) => {
  const spinnerAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(animating ? 1 : 0)).current;

  const ringColor = useThemeColor(
    {
      light: color?.light,
      dark: color?.dark,
    },
    'activityIndicatorColor'
  );

  const rotationRef = React.useRef<Animated.CompositeAnimation>();
  const startRotation = React.useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (rotationRef.current) {
      spinnerAnim.setValue(0);
      Animated.loop(rotationRef.current).start();
    }
  }, [fadeAnim, spinnerAnim]);

  const stopRotation = React.useCallback(() => {
    if (rotationRef.current) {
      rotationRef.current.stop();
    }
  }, []);

  React.useEffect(() => {
    if (!rotationRef.current) {
      rotationRef.current = Animated.timing(spinnerAnim, {
        toValue: 1,
        duration: DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      });
    }

    if (animating) {
      startRotation();
    } else if (hidesWhenStopped) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(stopRotation);
    } else {
      stopRotation();
    }
  }, [animating, hidesWhenStopped, fadeAnim, stopRotation, startRotation, spinnerAnim]);

  const spinInterpolate = spinnerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const containerStyle = {
    width: size,
    height: size / 2,
    overflow: 'hidden' as const,
  };

  return (
    <View
      style={[styles.container, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: animating }}
    >
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            opacity: fadeAnim,
            transform: [{ rotate: spinInterpolate }],
          },
        ]}
      >
        {[0, 1].map((_, index) => {
          return (
            <Animated.View key={index} style={[styles.layer]}>
              <Animated.View style={{ width: size, height: size }}>
                <View style={containerStyle}>
                  <View
                    style={[
                      {
                        width: size,
                        height: size,
                        borderWidth: size / 10,
                        borderRadius: size / 2,
                        borderColor: ringColor,
                        borderTopColor: 'transparent',
                      },
                    ]}
                  />
                </View>
              </Animated.View>
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(ThemedActivityIndicator);
