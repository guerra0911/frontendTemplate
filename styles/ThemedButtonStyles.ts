// frontendTemplate/components/buttons/ThemedButtonStyles.ts

import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export type ButtonType = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

interface StyleProps {
  buttonType: ButtonType;
  size: ButtonSize;
  disabled: boolean;
  transparent: boolean;
  customHeight?: number;
  customWidth?: number;
  customBorderRadius?: number;
  circular?: boolean; // Added circular prop
  backgroundColor: string; // Passed from ThemedButton
  textColor: string; // Passed from ThemedButton
}

export function themedButtonStyles({
  buttonType,
  size,
  disabled,
  transparent,
  customHeight,
  customWidth,
  customBorderRadius,
  circular = false,
  backgroundColor,
  textColor,
}: StyleProps) {
  // Size-based styling
  let paddingVertical: number;
  let paddingHorizontal: number;
  let fontSize: number;

  switch (size) {
    case 'small':
      paddingVertical = 8;
      paddingHorizontal = 16;
      fontSize = 14;
      break;
    case 'large':
      paddingVertical = 16;
      paddingHorizontal = 24;
      fontSize = 18;
      break;
    case 'medium':
    default:
      paddingVertical = 12;
      paddingHorizontal = 20;
      fontSize = 16;
      break;
  }

  // Adjust padding for circular buttons
  if (circular) {
    paddingVertical = 0;
    paddingHorizontal = 0;
  }

  return StyleSheet.create({
    button: {
      backgroundColor,
      paddingVertical,
      paddingHorizontal,
      borderRadius: circular
        ? customBorderRadius
          ? customBorderRadius
          : customHeight && customWidth
          ? Math.min(customHeight, customWidth) / 2
          : 50 // Default value if not provided
        : customBorderRadius !== undefined
        ? customBorderRadius
        : 8,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
      flexDirection: 'row',
      height: customHeight,
      width: customWidth,
      position: 'relative', // Needed for absolute positioning of ActivityIndicator
    } as ViewStyle,
    text: {
      color: textColor,
      fontSize,
      fontWeight: '600',
    } as TextStyle,
    iconContainer: {
      marginHorizontal: 5,
    } as ViewStyle,
    contentWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: circular ? 0 : 1, // Prevent stretching in circular buttons
    } as ViewStyle,
    contentHidden: {
      opacity: 0,
    } as ViewStyle,
    loadingIndicator: {
      position: 'absolute',
      alignSelf: 'center',
    } as ViewStyle,
  });
}
