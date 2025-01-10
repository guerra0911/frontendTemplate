import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
  Platform,
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
  const timer = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(
    new Animated.Value(!animating && hidesWhenStopped ? 0 : 1)
  ).current;

  const ringColor = useThemeColor(
    {
      light: color?.light,
      dark: color?.dark,
    },
    'activityIndicatorColor'
  );

  const rotation = React.useRef<Animated.CompositeAnimation>();

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
    if (rotation.current === undefined) {
      rotation.current = Animated.timing(timer, {
        duration: DURATION,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
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

  const frames = (60 * DURATION) / 1000;
  const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);

  const containerStyle: ViewStyle = {
    width: size,
    height: size / 2,
    overflow: 'hidden',
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
          const outputRange = Array.from(new Array(frames), (_, frameIndex) => {
            let progress = (2 * frameIndex) / (frames - 1);
            const rotation = index ? +(360 - 15) : -(180 - 15);

            if (progress > 1.0) {
              progress = 2.0 - progress;
            }

            const direction = index ? -1 : +1;

            return `${direction * (180 - 30) * easing(progress) + rotation}deg`;
          });

          const layerStyle = {
            width: size,
            height: size,
            transform: [
              {
                rotate: timer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [`${0 + 30 + 15}deg`, `${2 * 360 + 30 + 15}deg`],
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
            borderColor: ringColor,
            borderWidth: size / 10,
            borderRadius: size / 2,
          };

          return (
            <Animated.View key={index} style={[styles.layer]}>
              <Animated.View style={layerStyle}>
                <Animated.View
                  style={[containerStyle as any, offsetStyle]}
                  collapsable={false}
                >
                  <Animated.View style={viewportStyle}>
                    <Animated.View style={containerStyle as any} collapsable={false}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(ThemedActivityIndicator);