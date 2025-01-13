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
 * Uses your new color approach via `useThemeColor`.
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
import { ThemedText } from "../typography/ThemedText";
import ThemedIcon, {
  IconName,
  SupportedIconLibraries,
} from "@/components/templates/icons/ThemedIcon";
import ThemedCrossFadeIcon from "@/components/templates/icons/ThemedCrossFadeIcon";
import ThemedActivityIndicator from "../loaders/ThemedActivityIndicator";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Possible color keys for a FAB across primary, secondary, tertiary:
 * - fabBackgroundXxx
 * - fabTextXxx
 * - fabRippleXxx
 * - fabBorderXxx
 */
type FABThemeColorType =
  | "fabBackgroundPrimary"
  | "fabBackgroundSecondary"
  | "fabBackgroundTertiary"
  | "fabTextPrimary"
  | "fabTextSecondary"
  | "fabTextTertiary"
  | "fabRipplePrimary"
  | "fabRippleSecondary"
  | "fabRippleTertiary"
  | "fabBorderPrimary"
  | "fabBorderSecondary"
  | "fabBorderTertiary";

// ################################################################################
// FAB TYPES
// ################################################################################

export type FABType = "primary" | "secondary" | "tertiary";
export type FABMode = "flat" | "elevated";
export type FABSize = "small" | "medium" | "large";

// ################################################################################
// PROPS
// ################################################################################

export interface ThemedFABProps {
  // ICON + LABEL
  iconName?: IconName;
  iconLibrary?: SupportedIconLibraries;
  animatedIcon?: boolean;
  label?: string;
  uppercase?: boolean;

  // THEME
  type?: FABType;
  mode?: FABMode;

  // DIMENSIONS
  size?: FABSize;
  customSize?: number;

  // STATE
  loading?: boolean;
  disabled?: boolean;

  // COLORS (overrides)
  color?: { light?: string; dark?: string };
  rippleColor?: { light?: string; dark?: string };
  backgroundColor?: { light?: string; dark?: string };
  borderColor?: { light?: string; dark?: string };
  borderWidth?: number;
  borderStyle?: "solid" | "dotted" | "dashed";

  // ELEVATION
  elevation?: number;

  // EVENTS
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;

  // STYLES
  style?: StyleProp<ViewStyle>;

  // VISIBILITY
  visible?: boolean;

  // MISC
  testID?: string;
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedFAB: React.FC<ThemedFABProps> = ({
  // ICON + LABEL
  iconName,
  iconLibrary = "Ionicons",
  animatedIcon = false,
  label,
  uppercase = false,

  // THEME
  type = "primary",
  mode = "elevated",

  // DIMENSIONS
  size = "medium",
  customSize,

  // STATE
  loading = false,
  disabled = false,

  // COLORS (overrides)
  color = {}, // default to empty object to avoid undefined
  rippleColor = {},
  backgroundColor = {},
  borderColor = {},
  borderWidth = 0,
  borderStyle = "solid",

  // ELEVATION
  elevation,

  // EVENTS
  onPress,
  onLongPress,

  // STYLES
  style,
  visible = true,

  // MISC
  testID = "themed-fab",
}) => {
  // ===========================================================================
  // ANIMATION: VISIBILITY
  // ===========================================================================
  const visibilityAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(visibilityAnim, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, visibilityAnim]);

  // ===========================================================================
  // THEME COLOR HELPERS
  // ===========================================================================
  function getColorKey(base: string, fabType: FABType): FABThemeColorType {
    // e.g. "fabBackgroundPrimary"
    return `${base}${fabType.charAt(0).toUpperCase() + fabType.slice(1)}` as FABThemeColorType;
  }

  // Background color
  const backgroundKey = getColorKey("fabBackground", type);
  const resolvedBackgroundColor = useThemeColor(
    backgroundColor,
    backgroundKey
  );

  // Text/Icon color
  const textKey = getColorKey("fabText", type);
  const resolvedTextColor = useThemeColor(color, textKey);

  // Ripple color
  const rippleKey = getColorKey("fabRipple", type);
  const resolvedRippleColor = useThemeColor(rippleColor, rippleKey);

  // Border color
  const borderKey = getColorKey("fabBorder", type);
  const resolvedBorderColor = useThemeColor(borderColor, borderKey);

  // ===========================================================================
  // ELEVATION LOGIC
  // ===========================================================================
  const finalElevation =
    elevation !== undefined
      ? elevation
      : mode === "elevated" && !disabled
      ? 6
      : 0;

  // ===========================================================================
  // DIMENSIONS LOGIC
  // ===========================================================================
  const fabSizeStyle = getFabSizeStyle({ size, customSize });
  const isExtended = !!label;
  const borderRadius = fabSizeStyle.borderRadius;

  // Decide which icon component to render
  const IconComponent = animatedIcon ? ThemedCrossFadeIcon : ThemedIcon;
  // Calculate icon size for the FAB
  const iconSz = iconSizeForFAB({ size, customSize });

  // ===========================================================================
  // RENDER
  // ===========================================================================
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
          rippleColor={{
            light: resolvedRippleColor,
            dark: resolvedRippleColor,
          }}
          disabled={disabled}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View style={[styles.content, fabSizeStyle]}>
            {/* Icon or loading indicator */}
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

            {/* Label (extended FAB) */}
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

// ################################################################################
// HELPER FUNCTIONS
// ################################################################################

interface FabSizeParams {
  size: FABSize;
  customSize?: number;
}

/** Returns width/height/borderRadius for the FAB */
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

/** Decides icon size based on FAB size */
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

// ################################################################################
// STYLES
// ################################################################################

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
