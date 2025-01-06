/**
 * ThemedIcon
 *
 * Renders an icon from Ionicons / MaterialIcons / FontAwesome, matching
 * React Native Paper's Icon usage in terms of size, color, and theming.
 * Keeps your color approach intact, referencing the "iconColor*" keys.
 */

import React, { useMemo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemeColorType = 'iconColorPrimary' | 'iconColorSecondary' | 'iconColorTertiary';

/**
 * Allow a plain string in addition to known glyphMap keys,
 * so you can pass any custom icon name from Ionicons or others.
 */
export type IconName =
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof FontAwesome.glyphMap
  | string;

export type SupportedIconLibraries = 'Ionicons' | 'MaterialIcons' | 'FontAwesome';

export interface ThemedIconProps {
  iconName: IconName;
  iconLibrary?: SupportedIconLibraries;
  type?: 'primary' | 'secondary' | 'tertiary';
  size?: number;
  style?: StyleProp<TextStyle>;
  color?: string;
  accessibilityLabel?: string;
}

const ThemedIcon: React.FC<ThemedIconProps> = ({
  iconName,
  iconLibrary = 'Ionicons',
  type = 'primary',
  size = 24,
  style,
  color,
  accessibilityLabel,
}) => {
  const getColorKey = (
    base: string,
    theme: 'primary' | 'secondary' | 'tertiary'
  ): ThemeColorType => {
    return `${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType;
  };

  const IconComponent = useMemo(() => {
    switch (iconLibrary) {
      case 'MaterialIcons':
        return MaterialIcons;
      case 'FontAwesome':
        return FontAwesome;
      case 'Ionicons':
      default:
        return Ionicons;
    }
  }, [iconLibrary]);

  // If color is not provided, fallback to theme: "iconColorPrimary" etc.
  const resolvedColor =
    color || useThemeColor({}, getColorKey('iconColor', type));

  const iconStyle = [{ fontSize: size, color: resolvedColor }, style];

  return (
    <IconComponent
      name={iconName as any}
      size={size}
      color={resolvedColor}
      style={iconStyle}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

export default React.memo(ThemedIcon);
