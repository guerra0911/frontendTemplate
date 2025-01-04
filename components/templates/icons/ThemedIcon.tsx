// frontendTemplate/components/icons/ThemedIcon.tsx

import React, { useMemo } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemeColorType =
  | 'iconColorPrimary'
  | 'iconColorSecondary'
  | 'iconColorTertiary';

type SupportedIconLibraries = 'Ionicons' | 'MaterialIcons' | 'FontAwesome';

type IconName =
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof FontAwesome.glyphMap;

export interface ThemedIconProps {
  // FUNCTIONALITY
  iconName: IconName;
  iconLibrary?: SupportedIconLibraries;
  type?: 'primary' | 'secondary' | 'tertiary';

  // DIMENSIONS
  size?: number;

  // STYLE & COLOR
  style?: StyleProp<TextStyle>;
  color?: string;

  // ACCESSIBILITY
  accessibilityLabel?: string;
}

const ThemedIcon: React.FC<ThemedIconProps> = ({
  // FUNCTIONALITY
  iconName,
  iconLibrary = 'Ionicons',
  type = 'primary',

  // DIMENSIONS
  size = 24,

  // STYLE & COLOR
  style,
  color,

  // ACCESSIBILITY
  accessibilityLabel,
}) => {
  // FUNCTIONALITY
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

  // STYLE & COLOR
  const resolvedColor = color || useThemeColor({}, getColorKey('iconColor', type));

  // Combine inline styles with passed style prop
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
