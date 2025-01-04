// frontendTemplate/components/styles/ThemedIconStyles.ts

import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ThemedIconStylesProps {
  size: number;
  color: string;
  style?: ViewStyle;
}

export const themedIconStyles = ({
  size,
  color,
  style,
}: ThemedIconStylesProps) => {
  return StyleSheet.create({
    icon: {
      fontSize: size,
      color: color,
      ...style,
    } as TextStyle,
  });
};
