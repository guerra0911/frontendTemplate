/**
 * ThemedCrossFadeIcon.tsx
 *
 * A cross-fade (with rotation) icon component that transitions
 * from one icon to another. Supports primary, secondary, and tertiary
 * variants for light/dark modes, using a typed color key approach (getColorKey).
 */

import React from "react";
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  StyleProp,
  ViewStyle,
} from "react-native";
import ThemedIcon, { ThemedIconProps } from "./ThemedIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

/**
 * Typed union for color keys. Add more if needed.
 */
type CrossFadeIconThemeColorType =
  | "crossFadeIconColorPrimary"
  | "crossFadeIconColorSecondary"
  | "crossFadeIconColorTertiary";

/**
 * The color "type" for the icon: primary, secondary, or tertiary.
 */
export type CrossFadeIconType = "primary" | "secondary" | "tertiary";

export interface ThemedCrossFadeIconProps {
  /**
   * The icon name to display (e.g. "home", "rocket") from Ionicons, MaterialIcons, or FontAwesome
   */
  iconName: ThemedIconProps["iconName"];

  /** Which icon library (Ionicons, MaterialIcons, FontAwesome)? @default Ionicons */
  iconLibrary?: ThemedIconProps["iconLibrary"];

  /**
   * If you want to override the default color, provide your own for light/dark.
   * This bypasses the type-based color keys.
   */
  color?: {
    light?: string;
    dark?: string;
  };

  /**
   * Whether this icon is "primary", "secondary", or "tertiary".
   * Used to build the color key (e.g. crossFadeIconColorPrimary).
   * @default "primary"
   */
  type?: CrossFadeIconType;

  /** Size of the icon in pixels. @default 24 */
  size?: number;

  /** Additional style for the container. */
  style?: StyleProp<ViewStyle>;

  /** 
   * A multiplier for the base cross-fade duration (200ms).
   * e.g. 1.5 => 300ms
   * @default 1
   */
  animationScale?: number;

  /**
   * Test ID for internal or automated testing.
   * @default "themed-cross-fade-icon"
   */
  testID?: string;
}

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

/** Base duration for the cross-fade animation */
const BASE_DURATION = 200;

////////////////////////////////////////////////////////////////////////////////
// getColorKey UTILITY
////////////////////////////////////////////////////////////////////////////////

/**
 * Helper function to build a typed color key from
 * the base name and theme type (primary, secondary, tertiary).
 *
 * Example: getColorKey("crossFadeIconColor", "primary") => "crossFadeIconColorPrimary"
 */
function getColorKey(
  base: "crossFadeIconColor",
  themeType: CrossFadeIconType
): CrossFadeIconThemeColorType {
  return `${base}${themeType.charAt(0).toUpperCase()}${themeType.slice(1)}` as CrossFadeIconThemeColorType;
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedCrossFadeIcon: React.FC<ThemedCrossFadeIconProps> = ({
  iconName,
  iconLibrary = "Ionicons",
  color,
  type = "primary",
  size = 24,
  style,
  animationScale = 1,
  testID = "themed-cross-fade-icon",
}) => {
  // State: track the current and previous icons
  const [currentIcon, setCurrentIcon] = React.useState(iconName);
  const [previousIcon, setPreviousIcon] = React.useState<string | null>(null);

  // Animated value for cross-fade
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  // If iconName changes, set the old one as previous, and update current
  if (currentIcon !== iconName) {
    setPreviousIcon(currentIcon);
    setCurrentIcon(iconName);
  }

  // Animate fade from 1 -> 0 when icon changes
  React.useEffect(() => {
    if (previousIcon && previousIcon !== currentIcon) {
      fadeAnim.setValue(1);

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: BASE_DURATION * animationScale,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
  }, [currentIcon, previousIcon, fadeAnim, animationScale]);

  //////////////////////////////////////////////////////////////////////////
  // OPACITIES & ROTATIONS
  //////////////////////////////////////////////////////////////////////////

  // Outgoing icon transitions from opacity 1 -> 0, rotate 0 -> -90deg
  const opacityPrev = fadeAnim;
  const rotatePrev = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "0deg"],
  });

  // Incoming icon transitions from opacity 0 -> 1, rotate -180deg -> 0deg
  // We reverse the fade interpolation to show the new icon after old fades out
  const opacityNext = previousIcon
    ? fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      })
    : 1;
  const rotateNext = previousIcon
    ? fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-180deg"],
      })
    : "0deg";

  //////////////////////////////////////////////////////////////////////////
  // THEME COLOR
  //////////////////////////////////////////////////////////////////////////

  // Build the typed color key if no custom color is provided
  const typedColorKey = getColorKey("crossFadeIconColor", type);

  // If user didn't provide override color, fallback to typed color key
  const resolvedColor = useThemeColor(
    {
      light: color?.light,
      dark: color?.dark,
    },
    typedColorKey
  );

  //////////////////////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////////////////////

  return (
    <View
      style={[styles.container, { width: size, height: size }, style]}
      testID={testID}
    >
      {/* Outgoing (previous) icon */}
      {previousIcon && (
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              opacity: opacityPrev,
              transform: [{ rotate: rotatePrev }],
            },
          ]}
          testID={`${testID}-previous`}
        >
          <ThemedIcon
            iconName={previousIcon as any}
            iconLibrary={iconLibrary}
            size={size}
            color={resolvedColor}
          />
        </Animated.View>
      )}

      {/* Incoming (current) icon */}
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            opacity: opacityNext,
            transform: [{ rotate: rotateNext }],
          },
        ]}
        testID={`${testID}-current`}
      >
        <ThemedIcon
          iconName={currentIcon as any}
          iconLibrary={iconLibrary}
          size={size}
          color={resolvedColor}
        />
      </Animated.View>
    </View>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////

export default React.memo(ThemedCrossFadeIcon);
