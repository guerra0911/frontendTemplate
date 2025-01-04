// frontendTemplate/components/buttons/ThemedImageButtonStyles.ts

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

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
  circular?: boolean;
  backgroundColor: string;
  textColor: string;
}

const DEFAULT_SIZES = {
  small: { height: 40, width: 100 },
  medium: { height: 50, width: 200 },
  large: { height: 60, width: 250 },
};

export function themedImageButtonStyles({
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
  let fontSize: number;
  let defaultHeight = DEFAULT_SIZES[size].height;
  let defaultWidth = DEFAULT_SIZES[size].width;

  switch (size) {
    case 'small':
      fontSize = 14;
      break;
    case 'large':
      fontSize = 18;
      break;
    case 'medium':
    default:
      fontSize = 16;
      break;
  }

  // If circular, ensure width equals height
  if (circular) {
    defaultWidth = customWidth || defaultHeight;
  }

  const computedBorderRadius = circular
    ? customBorderRadius !== undefined
      ? customBorderRadius
      : (customHeight && customWidth ? Math.min(customHeight, customWidth) / 2 : defaultHeight / 2)
    : customBorderRadius !== undefined
    ? customBorderRadius
    : 8;

  return StyleSheet.create({
    button: {
      backgroundColor,
      borderRadius: computedBorderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
      flexDirection: 'row',
      height: customHeight || defaultHeight,
      width: customWidth || defaultWidth,
      position: 'relative',
      overflow: 'hidden', // Ensure image is clipped to borderRadius
      marginBottom: 15,
      // Removed borderWidth and borderColor
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
    } as ViewStyle,
    contentHidden: {
      opacity: 0,
    } as ViewStyle,
    loadingIndicator: {
      position: 'absolute',
      alignSelf: 'center',
    } as ViewStyle,
    imageBackground: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // Removed borderRadius from here
    } as ViewStyle,
    imageStyle: {
      borderRadius: computedBorderRadius, // Apply borderRadius here
      borderWidth: 2,                      // Example borderWidth
      borderColor: '#32CD32',              // Example borderColor
    } as ImageStyle,
  });
}
