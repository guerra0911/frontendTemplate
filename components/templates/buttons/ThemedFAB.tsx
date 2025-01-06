/**
 * ThemedFAB
 *
 * Matches React Native Paper's FAB in:
 * - Sizing: "small", "medium", "large"
 * - Mode: "flat", "elevated"
 * - Label (extended FAB)
 * - Loading state with ActivityIndicator
 * - Press ripple, disabled state, onPress + onLongPress, etc.
 *
 * We keep your color usage via `useThemeColor`.
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedSurface from '@/components/templates/containers/ThemedSurface';
import ThemedTouchableRipple from '@/components/templates/buttons/ThemedTouchableRipple';
import { ThemedText } from '../general/ThemedText';
import ThemedIcon, {
  IconName,
  SupportedIconLibraries,
} from '@/components/templates/icons/ThemedIcon';
import ThemedCrossFadeIcon from '@/components/templates/icons/ThemedCrossFadeIcon';
import ThemedActivityIndicator from '../loaders/ThemedActivityIndicator';

type FABThemeColorType =
  | 'fabBackgroundPrimary'
  | 'fabBackgroundSecondary'
  | 'fabBackgroundTertiary'
  | 'fabTextPrimary'
  | 'fabTextSecondary'
  | 'fabTextTertiary'
  | 'fabRipplePrimary'
  | 'fabRippleSecondary'
  | 'fabRippleTertiary'
  | 'fabBorderPrimary'
  | 'fabBorderSecondary'
  | 'fabBorderTertiary';

export type FABType = 'primary' | 'secondary' | 'tertiary';
export type FABMode = 'flat' | 'elevated';
export type FABSize = 'small' | 'medium' | 'large';

export interface ThemedFABProps {
  iconName?: IconName;
  iconLibrary?: SupportedIconLibraries;
  animatedIcon?: boolean;
  label?: string;
  uppercase?: boolean;
  type?: FABType;
  mode?: FABMode;
  size?: FABSize;
  customSize?: number;
  loading?: boolean;
  disabled?: boolean;
  color?: { light?: string; dark?: string };
  rippleColor?: { light?: string; dark?: string };
  backgroundColor?: { light?: string; dark?: string };
  borderColor?: { light?: string; dark?: string };
  borderWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  elevation?: number;

  /**
   * Called when the user taps on the FAB.
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Called when the user long-presses the FAB.
   */
  onLongPress?: (event: GestureResponderEvent) => void;

  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  testID?: string;
}

const ThemedFAB: React.FC<ThemedFABProps> = ({
  iconName,
  iconLibrary = 'Ionicons',
  animatedIcon = false,
  label,
  uppercase = false,
  type = 'primary',
  mode = 'elevated',
  size = 'medium',
  customSize,
  loading = false,
  disabled = false,
  color,
  rippleColor,
  backgroundColor,
  borderColor,
  borderWidth = 0,
  borderStyle = 'solid',
  elevation,
  onPress,
  onLongPress,
  style,
  visible = true,
  testID = 'themed-fab',
}) => {
  // Animated scale/opacity for appear/disappear
  const visibilityAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(visibilityAnim, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, visibilityAnim]);

  // Helper to build typed color keys
  function getBackgroundColorKey(base: string, fabType: FABType): FABThemeColorType {
    return `${base}${fabType.charAt(0).toUpperCase()}${fabType.slice(1)}` as FABThemeColorType;
  }
  function getTextColorKey(base: string, fabType: FABType): FABThemeColorType {
    return `${base}${fabType.charAt(0).toUpperCase()}${fabType.slice(1)}` as FABThemeColorType;
  }
  function getRippleColorKey(base: string, fabType: FABType): FABThemeColorType {
    return `${base}${fabType.charAt(0).toUpperCase()}${fabType.slice(1)}` as FABThemeColorType;
  }
  function getBorderColorKey(base: string, fabType: FABType): FABThemeColorType {
    return `${base}${fabType.charAt(0).toUpperCase()}${fabType.slice(1)}` as FABThemeColorType;
  }

  // Resolve main background color
  const backgroundKey = getBackgroundColorKey('fabBackground', type);
  const resolvedBackgroundColor = useThemeColor(backgroundColor ?? {}, backgroundKey);

  // Resolve text/icon color
  const textKey = getTextColorKey('fabText', type);
  const resolvedTextColor = useThemeColor(color ?? {}, textKey);

  // Resolve ripple color
  const rippleKey = getRippleColorKey('fabRipple', type);
  const resolvedRippleColor = useThemeColor(rippleColor ?? {}, rippleKey);

  // Resolve border color
  const borderKey = getBorderColorKey('fabBorder', type);
  const resolvedBorderColor = useThemeColor(borderColor ?? {}, borderKey);

  // Decide elevation if not specified
  const finalElevation =
    elevation !== undefined ? elevation : mode === 'elevated' && !disabled ? 6 : 0;

  // Compute size
  const fabSizeStyle = getFabSizeStyle({ size, customSize });
  const isExtended = !!label;
  const borderRadius = fabSizeStyle.borderRadius;

  const IconComponent = animatedIcon ? ThemedCrossFadeIcon : ThemedIcon;
  const iconSz = iconSizeForFAB({ size, customSize });

  return (
    <Animated.View
      testID={`${testID}-container`}
      style={[
        {
          transform: [{ scale: visibilityAnim }],
          opacity: visibilityAnim,
        },
        styles.container,
        style,
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <ThemedSurface
        style={[
          {
            backgroundColor: resolvedBackgroundColor,
            borderRadius,
            elevation: finalElevation,
            borderColor: resolvedBorderColor,
            borderWidth,
            borderStyle,
          },
        ]}
      >
        <ThemedTouchableRipple
          style={[
            styles.rippleContainer,
            { borderRadius },
            isExtended ? { paddingHorizontal: 12 } : {},
          ]}
          rippleColor={{ light: resolvedRippleColor, dark: resolvedRippleColor }}
          disabled={disabled}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View style={[styles.content, fabSizeStyle]}>
            {!loading && iconName ? (
              <IconComponent
                iconName={iconName}
                iconLibrary={iconLibrary}
                size={iconSz}
                color={resolvedTextColor}
              />
            ) : null}

            {loading ? (
              <ThemedActivityIndicator
                size={iconSz - 6}
                color={{ light: resolvedTextColor, dark: resolvedTextColor }}
                animating
              />
            ) : null}

            {label ? (
              <ThemedText
                style={[
                  styles.label,
                  {
                    color: resolvedTextColor,
                    marginLeft: iconName || loading ? 8 : 0,
                    textTransform: uppercase ? 'uppercase' : 'none',
                  },
                ]}
                type="defaultSemiBold"
              >
                {label}
              </ThemedText>
            ) : null}
          </View>
        </ThemedTouchableRipple>
      </ThemedSurface>
    </Animated.View>
  );
};

interface FabSizeParams {
  size: FABSize;
  customSize?: number;
}

function getFabSizeStyle({ size, customSize }: FabSizeParams) {
  if (customSize) {
    return {
      width: customSize,
      height: customSize,
      borderRadius: customSize / 2,
    };
  }
  switch (size) {
    case 'small':
      return { width: 40, height: 40, borderRadius: 20 };
    case 'large':
      return { width: 64, height: 64, borderRadius: 32 };
    case 'medium':
    default:
      return { width: 56, height: 56, borderRadius: 28 };
  }
}

function iconSizeForFAB({ size, customSize }: FabSizeParams): number {
  if (customSize) {
    return Math.floor(customSize / 2.5);
  }
  switch (size) {
    case 'small':
      return 20;
    case 'large':
      return 28;
    case 'medium':
    default:
      return 24;
  }
}

const styles = StyleSheet.create({
  container: {},
  rippleContainer: {
    flexDirection: 'row',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
  },
});

export default React.memo(ThemedFAB);
