/**
 * ThemedSurface
 *
 * Updated to match React Native Paper's Surface component in terms of:
 * - Elevation logic (iOS shadow + Android elevation)
 * - Background color usage
 * - "Mode" approach for flat vs. elevated
 *
 * We keep your separate colors and useThemeColor approach intact.
 */

import React, { useMemo } from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Animated,
  Platform,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type SurfaceMode = 'flat' | 'elevated';

export interface ThemedSurfaceProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  mode?: SurfaceMode;
  elevation?: number;
  backgroundColor?: {
    light?: string;
    dark?: string;
  };
  shadowColor?: {
    light?: string;
    dark?: string;
  };
}

const ThemedSurface: React.FC<ThemedSurfaceProps> = ({
  children,
  style,
  testID,
  mode = 'flat',
  elevation = 0,
  backgroundColor,
  shadowColor,
}) => {
  const bgColorKey =
    mode === 'flat' ? 'surfaceBackgroundFlat' : 'surfaceBackgroundElevated';

  const resolvedBackgroundColor = useThemeColor(
    {
      light: backgroundColor?.light,
      dark: backgroundColor?.dark,
    },
    bgColorKey
  );

  const resolvedShadowColor = useThemeColor(
    {
      light: shadowColor?.light,
      dark: shadowColor?.dark,
    },
    'surfaceShadowColor'
  );

  const computedShadowStyle = useMemo(() => {
    if (mode === 'flat' || elevation <= 0) {
      return {};
    }

    const iosShadow = {
      shadowColor: resolvedShadowColor,
      shadowOffset: { width: 0, height: elevation * 0.5 },
      shadowOpacity: 0.2 + 0.05 * Math.min(elevation, 5),
      shadowRadius: elevation,
    };

    const androidShadow = {
      elevation,
    };

    return { ...iosShadow, ...androidShadow };
  }, [mode, elevation, resolvedShadowColor]);

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.container,
        { backgroundColor: resolvedBackgroundColor },
        computedShadowStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
  },
});

export default React.memo(ThemedSurface);
