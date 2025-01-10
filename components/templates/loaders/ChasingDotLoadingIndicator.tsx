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

export interface ChasingDotLoadingIndicatorProps {
  animating?: boolean;
  color?: { light?: string; dark?: string };
  size?: number;
  hidesWhenStopped?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_DOT_COUNT = 12; // Increased from 6 to 12 for more circular appearance
const ANIMATION_DURATION = 1200;

const ChasingDotLoadingIndicator: React.FC<ChasingDotLoadingIndicatorProps> = ({
  animating = true,
  color,
  size = 50,
  hidesWhenStopped = true,
  style,
}) => {
  const dotCount = DEFAULT_DOT_COUNT;
  const dotSize = size / 10; // Reduced dot size for better proportions with more dots
  const radius = (size / 2) - (dotSize / 2); // Adjusted radius calculation

  const ringColor = useThemeColor(
    {
      light: color?.light,
      dark: color?.dark,
    },
    'activityIndicatorColor'
  );

  const dots = Array.from({ length: dotCount });
  const animations = React.useRef(
    dots.map(() => new Animated.Value(0))
  ).current;
  const fadeAnim = React.useRef(new Animated.Value(animating ? 1 : 0)).current;

  const startDotAnimations = React.useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const animationsSequence = dots.map((_, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay((ANIMATION_DURATION / dotCount) * index),
          Animated.timing(animations[index], {
            toValue: 1,
            duration: ANIMATION_DURATION / 2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(animations[index], {
            toValue: 0.3,
            duration: ANIMATION_DURATION / 2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      );
    });

    Animated.parallel(animationsSequence).start();
  }, [animations, dots, fadeAnim, dotCount]);

  const stopDotAnimations = React.useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
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
      animations.forEach((anim) => anim.setValue(0.3));
    }

    return () => {
      animations.forEach((anim) => anim.stopAnimation());
    };
  }, [animating, hidesWhenStopped, startDotAnimations, stopDotAnimations, animations]);

  const getDotStyle = (index: number) => {
    const angle = (index * (360 / dotCount)) + 90; // Added 90 degrees to start from the top
    const rad = (angle * Math.PI) / 180;

    // Calculate position on the circle
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);

    return {
      position: 'absolute' as const,
      left: size / 2 + x - dotSize / 2,
      top: size / 2 + y - dotSize / 2,
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor: ringColor,
      opacity: animations[index],
      transform: [
        {
          scale: animations[index].interpolate({
            inputRange: [0.3, 1],
            outputRange: [0.6, 1], // Adjusted scale range for smoother animation
          }),
        },
      ],
    };
  };

  return (
    <View
      style={[styles.container, { width: size, height: size }, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: animating }}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        {dots.map((_, index) => (
          <Animated.View key={index} style={getDotStyle(index)} />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(ChasingDotLoadingIndicator);