/**
 * ThemedCrossFadeIcon
 *
 * Mirrors React Native Paper's CrossFadeIcon logic:
 * - Cross-fade + rotate transitions when icon changes
 * - Uses your typed color keys for "primary", "secondary", "tertiary"
 * - Follows the same approach as RNP's CrossFadeIcon for a smoother experience
 */

import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';
import ThemedIcon, { ThemedIconProps } from './ThemedIcon';
import { useThemeColor } from '@/hooks/useThemeColor';

type CrossFadeIconThemeColorType =
  | 'crossFadeIconColorPrimary'
  | 'crossFadeIconColorSecondary'
  | 'crossFadeIconColorTertiary';

export type CrossFadeIconType = 'primary' | 'secondary' | 'tertiary';

export interface ThemedCrossFadeIconProps {
  iconName: ThemedIconProps['iconName'];
  iconLibrary?: ThemedIconProps['iconLibrary'];
  color?: {
    light?: string;
    dark?: string;
  };
  type?: CrossFadeIconType;
  size?: number;
  style?: StyleProp<ViewStyle>;
  animationScale?: number;
  testID?: string;
}

const BASE_DURATION = 200;

function getColorKey(
  base: 'crossFadeIconColor',
  themeType: CrossFadeIconType
): CrossFadeIconThemeColorType {
  return `${base}${themeType.charAt(0).toUpperCase()}${themeType.slice(1)}` as CrossFadeIconThemeColorType;
}

const ThemedCrossFadeIcon: React.FC<ThemedCrossFadeIconProps> = ({
  iconName,
  iconLibrary = 'Ionicons',
  color,
  type = 'primary',
  size = 24,
  style,
  animationScale = 1,
  testID = 'themed-cross-fade-icon',
}) => {
  const [currentIcon, setCurrentIcon] = React.useState(iconName);
  const [previousIcon, setPreviousIcon] = React.useState<string | null>(null);

  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  if (currentIcon !== iconName) {
    setPreviousIcon(currentIcon);
    setCurrentIcon(iconName);
  }

  React.useEffect(() => {
    if (previousIcon && previousIcon !== currentIcon) {
      fadeAnim.setValue(1);

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: BASE_DURATION * animationScale,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
  }, [currentIcon, previousIcon, fadeAnim, animationScale]);

  const opacityPrev = fadeAnim;
  const rotatePrev = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  const opacityNext = previousIcon
    ? fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      })
    : 1;
  const rotateNext = previousIcon
    ? fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-180deg'],
      })
    : '0deg';

  const typedColorKey = getColorKey('crossFadeIconColor', type);

  const resolvedColor = useThemeColor(
    {
      light: color?.light,
      dark: color?.dark,
    },
    typedColorKey
  );

  return (
    <View
      style={[styles.container, { width: size, height: size }, style]}
      testID={testID}
    >
      {previousIcon && (
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              opacity: opacityPrev,
              transform: [{ rotate: rotatePrev }],
            },
          ]}
          testID={`${testID}-previous`}
        >
          <ThemedIcon
            iconName={previousIcon as any}
            iconLibrary={iconLibrary}
            size={size}
            color={resolvedColor}
          />
        </Animated.View>
      )}
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            opacity: opacityNext,
            transform: [{ rotate: rotateNext }],
          },
        ]}
        testID={`${testID}-current`}
      >
        <ThemedIcon
          iconName={currentIcon as any}
          iconLibrary={iconLibrary}
          size={size}
          color={resolvedColor}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default React.memo(ThemedCrossFadeIcon);
