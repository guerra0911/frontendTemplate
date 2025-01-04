// frontendTemplate/components/toggle/ThemedToggleSwitchStyles.ts

import { StyleSheet, ViewStyle } from 'react-native';

interface StyleProps {
  width: number;
  height: number;
  circleRadius: number;
  containerRadius: number;
  containerColor: string;
  containerBorderColor: string;
  containerBorderWidth: number;
  circleColor: string;
  circleBorderColor: string;
  circleBorderWidth: number;
  disabled: boolean;
}

export function themedToggleSwitchStyles({
  width,
  height,
  circleRadius,
  containerRadius,
  containerColor,
  containerBorderColor,
  containerBorderWidth,
  circleColor,
  circleBorderColor,
  circleBorderWidth,
  disabled,
}: StyleProps) {
  return StyleSheet.create({
    container: {
      width,
      height,
      borderRadius: containerRadius,
      borderColor: containerBorderColor,
      borderWidth: containerBorderWidth,
      justifyContent: 'center',
      padding: 2,
      opacity: disabled ? 0.6 : 1,
      backgroundColor: containerColor,
    } as ViewStyle,
    circle: {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      backgroundColor: circleColor,
      borderColor: circleBorderColor,
      borderWidth: circleBorderWidth,
      // Initial transform handled by Animated.View
    } as ViewStyle,
  });
}
