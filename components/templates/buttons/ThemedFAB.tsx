/**
 * ThemedFAB.tsx
 *
 * A floating action button supporting primary, secondary, tertiary variants,
 * with typed color keys from ThemedFABColors (including new border color keys).
 */

import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedSurface from "@/components/templates/containers/ThemedSurface";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import { ThemedText } from "../general/ThemedText";
import ThemedIcon, {
  IconName,
  SupportedIconLibraries,
} from "@/components/templates/icons/ThemedIcon";
import ThemedCrossFadeIcon from "@/components/templates/icons/ThemedCrossFadeIcon";
import ThemedActivityIndicator from "../loaders/ThemedActivityIndicator";

// Extend the typed color keys to include border colors as well
type FABThemeColorType =
  // background
  | "fabBackgroundPrimary"
  | "fabBackgroundSecondary"
  | "fabBackgroundTertiary"
  // text/icon
  | "fabTextPrimary"
  | "fabTextSecondary"
  | "fabTextTertiary"
  // ripple
  | "fabRipplePrimary"
  | "fabRippleSecondary"
  | "fabRippleTertiary"
  // border
  | "fabBorderPrimary"
  | "fabBorderSecondary"
  | "fabBorderTertiary";

export type FABType = "primary" | "secondary" | "tertiary";
export type FABMode = "flat" | "elevated";
export type FABSize = "small" | "medium" | "large";

export interface ThemedFABProps {
  // Basic function, icon, label
  iconName?: IconName;
  iconLibrary?: SupportedIconLibraries;
  animatedIcon?: boolean;
  label?: string;
  uppercase?: boolean;

  // Theming
  type?: FABType; // e.g. primary => uses fabBackgroundPrimary if no overrides
  mode?: FABMode; // "flat" or "elevated"

  // Sizing
  size?: FABSize; // "small", "medium", "large"
  customSize?: number;

  // States
  loading?: boolean;
  disabled?: boolean;

  // Colors (override the defaults)
  color?: { light?: string; dark?: string };           // text & icon
  rippleColor?: { light?: string; dark?: string };     // ripple
  backgroundColor?: { light?: string; dark?: string }; // background
  borderColor?: { light?: string; dark?: string };     // border

  // Border and Elevation
  borderWidth?: number;
  borderStyle?: "solid" | "dotted" | "dashed";
  elevation?: number; // default 6 if mode=elevated

  // Pressing
  onPress?: (event: GestureResponderEvent) => void;

  // Style & layout
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  testID?: string;
}

const ThemedFAB: React.FC<ThemedFABProps> = ({
  iconName,
  iconLibrary = "Ionicons",
  animatedIcon = false,
  label,
  uppercase = false,
  type = "primary",
  mode = "elevated",
  size = "medium",
  customSize,
  loading = false,
  disabled = false,

  color,
  rippleColor,
  backgroundColor,
  borderColor,
  borderWidth = 0,
  borderStyle = "solid",
  elevation,

  onPress,
  style,
  visible = true,
  testID = "themed-fab",
}) => {
  // Animate appear/disappear
  const visibilityAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(visibilityAnim, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, visibilityAnim]);

  // Helpers to produce typed color keys
  function getBackgroundColorKey(base: string, fabType: FABType): FABThemeColorType {
    // e.g. "fabBackgroundPrimary"
    return `${base}${fabType.charAt(0).toUpperCase()}${fabType.slice(1)}` as FABThemeColorType;
  }
  function getTextColorKey(base: string, fabType: FABType): FABThemeColorType {
    // e.g. "fabTextPrimary"
    return `${base}${fabType.charAt(0).toUpperCase()}${fabType.slice(1)}` as FABThemeColorType;
  }
  function getRippleColorKey(base: string, fabType: FABType): FABThemeColorType {
    // e.g. "fabRipplePrimary"
    return `${base}${fabType.charAt(0).toUpperCase()}${fabType.slice(1)}` as FABThemeColorType;
  }
  function getBorderColorKey(base: string, fabType: FABType): FABThemeColorType {
    // e.g. "fabBorderPrimary"
    return `${base}${fabType.charAt(0).toUpperCase()}${fabType.slice(1)}` as FABThemeColorType;
  }

  // Resolve background color from theme or override
  const backgroundKey = getBackgroundColorKey("fabBackground", type);
  const resolvedBackgroundColor = useThemeColor(
    backgroundColor ?? {},
    backgroundKey
  );

  // Resolve text/icon color
  const textKey = getTextColorKey("fabText", type);
  const resolvedTextColor = useThemeColor(
    color ?? {},
    textKey
  );

  // Resolve ripple color
  const rippleKey = getRippleColorKey("fabRipple", type);
  const resolvedRippleColor = useThemeColor(
    rippleColor ?? {},
    rippleKey
  );

  // Resolve border color
  const borderKey = getBorderColorKey("fabBorder", type);
  const resolvedBorderColor = useThemeColor(
    borderColor ?? {},
    borderKey
  );

  // Decide elevation (default 6 if mode=elevated)
  const finalElevation =
    elevation !== undefined
      ? elevation
      : mode === "elevated" && !disabled
      ? 6
      : 0;

  // Compute size
  const fabSizeStyle = getFabSizeStyle({ size, customSize });
  const isExtended = !!label;
  const borderRadius = fabSizeStyle.borderRadius;

  // Decide which icon to use
  const IconComponent = animatedIcon ? ThemedCrossFadeIcon : ThemedIcon;

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
      pointerEvents={visible ? "auto" : "none"}
    >
      {/* The background/elevation container */}
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
        {/* The ripple & pressable surface */}
        <ThemedTouchableRipple
          style={[
            styles.rippleContainer,
            { borderRadius },
            isExtended ? { paddingHorizontal: 12 } : {},
          ]}
          rippleColor={{ light: resolvedRippleColor, dark: resolvedRippleColor }}
          disabled={disabled}
          onPress={onPress}
        >
          <View style={[styles.content, fabSizeStyle]}>
            {/* Icon or loading spinner */}
            {!loading && iconName ? (
              <IconComponent
                iconName={iconName}
                iconLibrary={iconLibrary}
                size={iconSizeForFAB({ size, customSize })}
                color={resolvedTextColor}
              />
            ) : null}
            {loading ? (
              <ThemedActivityIndicator
                size={iconSizeForFAB({ size, customSize }) - 6}
                color={{ light: resolvedTextColor, dark: resolvedTextColor }}
                animating
              />
            ) : null}

            {/* If there's a label => extended FAB */}
            {label ? (
              <ThemedText
                style={[
                  styles.label,
                  {
                    color: resolvedTextColor,
                    marginLeft: iconName || loading ? 8 : 0,
                    textTransform: uppercase ? "uppercase" : "none",
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

// Size styling
function getFabSizeStyle({ size, customSize }: FabSizeParams) {
  if (customSize) {
    return {
      width: customSize,
      height: customSize,
      borderRadius: customSize / 2,
    };
  }
  switch (size) {
    case "small":
      return { width: 40, height: 40, borderRadius: 20 };
    case "large":
      return { width: 64, height: 64, borderRadius: 32 };
    case "medium":
    default:
      return { width: 56, height: 56, borderRadius: 28 };
  }
}

// Icon size
function iconSizeForFAB({ size, customSize }: FabSizeParams): number {
  if (customSize) {
    return Math.floor(customSize / 2.5);
  }
  switch (size) {
    case "small":
      return 20;
    case "large":
      return 28;
    case "medium":
    default:
      return 24;
  }
}

const styles = StyleSheet.create({
  container: {},
  rippleContainer: {
    flexDirection: "row",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
  },
});

export default React.memo(ThemedFAB);
