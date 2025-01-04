import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  Fragment,
  memo,
} from "react";
import * as Haptics from "expo-haptics";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
  Easing,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedIcon from "../icons/ThemedIcon";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Define all color keys needed for the main FAB and its speed dial buttons.
 * This includes background, text, icon, disabled, borders, shadows, etc.
 */
type ThemeColorType =
  // MAIN FAB
  | "fabBackgroundPrimary"
  | "fabTextPrimary"
  | "fabIconColorPrimary"
  | "fabDisabledBackgroundPrimary"
  | "fabDisabledTextPrimary"
  | "fabDisabledIconColorPrimary"
  | "fabBorderColorPrimary"
  | "fabShadowColorPrimary"
  | "fabPaddingColorPrimary"
  | "fabLoadingColorPrimary"
  | "fabBackgroundSecondary"
  | "fabTextSecondary"
  | "fabIconColorSecondary"
  | "fabDisabledBackgroundSecondary"
  | "fabDisabledTextSecondary"
  | "fabDisabledIconColorSecondary"
  | "fabBorderColorSecondary"
  | "fabShadowColorSecondary"
  | "fabPaddingColorSecondary"
  | "fabLoadingColorSecondary"
  | "fabBackgroundTertiary"
  | "fabTextTertiary"
  | "fabIconColorTertiary"
  | "fabDisabledBackgroundTertiary"
  | "fabDisabledTextTertiary"
  | "fabDisabledIconColorTertiary"
  | "fabBorderColorTertiary"
  | "fabShadowColorTertiary"
  | "fabPaddingColorTertiary"
  | "fabLoadingColorTertiary"

  // SPEED DIAL BUTTONS
  | "speedDialBackgroundPrimary"
  | "speedDialTextPrimary"
  | "speedDialIconColorPrimary"
  | "speedDialDisabledBackgroundPrimary"
  | "speedDialDisabledTextPrimary"
  | "speedDialDisabledIconColorPrimary"
  | "speedDialBorderColorPrimary"
  | "speedDialShadowColorPrimary"
  | "speedDialPaddingColorPrimary"
  | "speedDialLoadingColorPrimary"
  | "speedDialBackgroundSecondary"
  | "speedDialTextSecondary"
  | "speedDialIconColorSecondary"
  | "speedDialDisabledBackgroundSecondary"
  | "speedDialDisabledTextSecondary"
  | "speedDialDisabledIconColorSecondary"
  | "speedDialBorderColorSecondary"
  | "speedDialShadowColorSecondary"
  | "speedDialPaddingColorSecondary"
  | "speedDialLoadingColorSecondary"
  | "speedDialBackgroundTertiary"
  | "speedDialTextTertiary"
  | "speedDialIconColorTertiary"
  | "speedDialDisabledBackgroundTertiary"
  | "speedDialDisabledTextTertiary"
  | "speedDialDisabledIconColorTertiary"
  | "speedDialBorderColorTertiary"
  | "speedDialShadowColorTertiary"
  | "speedDialPaddingColorTertiary"
  | "speedDialLoadingColorTertiary";

// ################################################################################
// TYPES & INTERFACES
// ################################################################################

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

/**
 * SpeedDialButtonProps define the configuration for each speed dial button.
 */
export interface SpeedDialButtonProps {
  // FUNCTIONALITY
  title?: string;
  onPress?: () => void;
  disabled?: boolean;

  // THEME & TYPE
  themeType?: "primary" | "secondary" | "tertiary";

  // DIMENSIONS
  customHeight?: number;
  customWidth?: number;
  roundedAllCorners?: boolean;
  customRadius?: number | "factor";

  // ICON
  iconName?:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof FontAwesome.glyphMap;
  iconLibrary?: SupportedIconLibraries;
  iconSize?: number;

  // STYLES
  style?: StyleProp<ViewStyle>;

  // TEXT
  textStyle?: TextStyle;

  // BORDERS
  borders?: {
    color?: { light?: string; dark?: string };
    width?: number;
    style?: "solid" | "dashed" | "dotted";
  };

  // SHADOWS
  shadows?: {
    color?: string;
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  };

  // PADDING
  padding?: {
    internal?: number;
    color?: { light?: string; dark?: string };
  };

  // LOADING
  loading?: {
    isLoading: boolean;
    text?: string;
    color?: string;
  };
}

/**
 * ThemedFABProps define the configuration for the main FAB and its speed dial buttons.
 */
export interface ThemedFABProps {
  // ############################################################################
  // FUNCTIONALITY
  // ############################################################################
  onPress?: () => void; // Action when main FAB is pressed (if any)
  title?: string;
  disabled?: boolean; // Disable the main FAB
  speedDial?: SpeedDialButtonProps[]; // Speed dial button configurations
  isOpen?: boolean; // Control whether speed dial is open or closed (optional controlled state)
  onOpenChange?: (open: boolean) => void; // Callback when speed dial is toggled

  // ############################################################################
  // THEME TYPE
  // ############################################################################
  themeType?: "primary" | "secondary" | "tertiary";

  // ############################################################################
  // DIMENSIONS
  // ############################################################################
  customHeight?: number;
  customWidth?: number;
  roundedAllCorners?: boolean;
  customRadius?: number | "factor";

  // ############################################################################
  // ANIMATIONS
  // ############################################################################
  animatedPress?: boolean;
  expandAnimationDuration?: number; // Duration of expansion/retraction animation
  hapticFeedbackStyle?: Haptics.ImpactFeedbackStyle | null;

  // ############################################################################
  // BACKGROUND & TEXT
  // ############################################################################
  background?: {
    light?: string;
    dark?: string;
  };
  text?: {
    style?: TextStyle;
    content?: string;
    color?: {
      light?: string;
      dark?: string;
    };
  };

  // ############################################################################
  // ICON
  // ############################################################################
  iconName?:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof FontAwesome.glyphMap;
  iconLibrary?: SupportedIconLibraries;
  iconSize?: number;

  // ############################################################################
  // BORDERS
  // ############################################################################
  borders?: {
    color?: { light?: string; dark?: string };
    width?: number;
    style?: "solid" | "dashed" | "dotted";
  };

  // ############################################################################
  // SHADOWS
  // ############################################################################
  shadows?: {
    color?: string;
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  };

  // ############################################################################
  // PADDING
  // ############################################################################
  padding?: {
    internal?: number;
    color?: { light?: string; dark?: string };
  };

  // ############################################################################
  // LOADING
  // ############################################################################
  loading?: {
    isLoading: boolean;
    text?: string;
    color?: string;
  };

  // ############################################################################
  // CUSTOM STYLES
  // ############################################################################
  style?: StyleProp<ViewStyle>; // Additional styling for the container or FAB
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedFAB: React.FC<ThemedFABProps> = ({
  // FUNCTIONALITY
  onPress,
  title,
  disabled = false,
  speedDial = [],
  isOpen,
  onOpenChange,

  // THEME TYPE
  themeType = "primary",

  // DIMENSIONS
  customHeight = 60,
  customWidth = 60,
  roundedAllCorners = false,
  customRadius = "factor",

  // ANIMATIONS
  animatedPress = false,
  expandAnimationDuration = 200,
  hapticFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,

  // BACKGROUND & TEXT
  background = {},
  text = {},

  // ICON
  iconName = "add",
  iconLibrary = "Ionicons",
  iconSize = 24,

  // BORDERS
  borders = {},

  // SHADOWS
  shadows = {},

  // PADDING
  padding = {},

  // LOADING
  loading = {
    isLoading: false,
    text: "",
    color: "",
  },

  // CUSTOM STYLES
  style,
}) => {
  // ############################################################################
  // STATE
  // ############################################################################
  const [openState, setOpenState] = useState<boolean>(false);
  const isSpeedDialOpen = isOpen !== undefined ? isOpen : openState;

  const toggleOpen = useCallback(() => {
    if (!disabled && !loading.isLoading) {
      const nextOpen = !isSpeedDialOpen;
      setOpenState(nextOpen);
      onOpenChange?.(nextOpen);
    }
  }, [disabled, isSpeedDialOpen, loading.isLoading, onOpenChange]);

  // ############################################################################
  // ANIMATIONS
  // ############################################################################
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (!disabled && !loading.isLoading) {
      if (hapticFeedbackStyle) {
        Haptics.impactAsync(hapticFeedbackStyle);
      }
      onPress?.(); // Main FAB action
      toggleOpen();
    }
  };

  const onPressIn = () => {
    if (animatedPress && !loading.isLoading) {
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start();
    }
  };

  const onPressOut = () => {
    if (animatedPress && !loading.isLoading) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start();
    }
  };

  // Expand/Contract the speed dial
  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: isSpeedDialOpen ? 1 : 0,
      duration: expandAnimationDuration,
      useNativeDriver: false,
      easing: Easing.out(Easing.quad),
    }).start();
  }, [isSpeedDialOpen, expandAnimationDuration, expandAnim]);

  // ############################################################################
  // HELPER: getColorKey
  // ############################################################################
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${
      theme.charAt(0).toUpperCase() + theme.slice(1)
    }` as ThemeColorType;
  };

  // ############################################################################
  // THEME COLORS
  // ############################################################################

  // DISABLED
  const disabledBackgroundColor = useThemeColor(
    {},
    getColorKey("fabDisabledBackground", themeType)
  );
  const disabledTextColor = useThemeColor(
    {},
    getColorKey("fabDisabledText", themeType)
  );
  const disabledIconColor = useThemeColor(
    {},
    getColorKey("fabDisabledIconColor", themeType)
  );

  // MAIN FAB BACKGROUND
  const resolvedBackgroundColor = useThemeColor(
    {
      light: background.light,
      dark: background.dark,
    },
    getColorKey("fabBackground", themeType)
  );

  // MAIN FAB TEXT
  const { style: textStyle = {}, color: textColors = {} } = text;

  const mainFABTextColor = useThemeColor(
    {
      light: textColors.light,
      dark: textColors.dark,
    },
    getColorKey("fabText", themeType)
  );

  // ICON COLOR
  const mainFABIconColor = useThemeColor(
    {},
    getColorKey("fabIconColor", themeType)
  );

  // BORDERS
  const {
    color: borderColor = {},
    width: borderWidth = 0,
    style: borderStyle = "solid",
  } = borders;
  const resolvedBorderColor = useThemeColor(
    borderColor,
    getColorKey("fabBorderColor", themeType)
  );

  // SHADOWS
  const {
    color: shadowColor,
    offset = { width: 0, height: 2 },
    opacity = 0.2,
    radius = 4,
    elevation = 5,
  } = shadows;

  const resolvedShadowColor = useThemeColor(
    { light: shadowColor, dark: shadowColor },
    getColorKey("fabShadowColor", themeType)
  );
  const shadowStyle = {
    shadowColor: resolvedShadowColor,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };

  // PADDING
  const {
    internal: customInternalPadding = 10,
    color: customPaddingColor = {},
  } = padding;
  const resolvedPaddingColor = useThemeColor(
    customPaddingColor,
    getColorKey("fabPaddingColor", themeType)
  );

  // LOADING
  const resolvedLoadingColor = loading.color
    ? loading.color
    : useThemeColor({}, getColorKey("fabLoadingColor", themeType));

  // ############################################################################
  // DIMENSIONS
  // ############################################################################
  const effectiveBorderRadius = roundedAllCorners
    ? customHeight / 2
    : customRadius === "factor"
    ? customHeight / 2
    : (customRadius as number);

  // ############################################################################
  // SPEED DIAL BUTTONS RENDER
  // ############################################################################

  // We'll align speed dial buttons so the main FAB center lines up with each button's center.
  // We position them absolutely above (or below) the main FAB, with an animated vertical offset.

  const speedDialButtons = speedDial.map((buttonProps, index) => {
    return (
      <SpeedDialButton
        key={index}
        index={index}
        totalButtons={speedDial.length}
        expandAnim={expandAnim}
        themeType={buttonProps.themeType || themeType}
        {...buttonProps}
        customHeight={buttonProps.customHeight ?? 50}
        customWidth={buttonProps.customWidth ?? 50}
      />
    );
  });

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <View
      // Instead of absolute here, let the parent handle exact placement
      // This container is 'relative' to hold the speed dial within
      style={[styles.container, style]}
    >
      {/* SPEED DIAL BUTTONS */}
      {speedDialButtons}

      {/* MAIN FAB */}
      <Animated.View
        style={[
          shadowStyle,
          {
            width: customWidth,
            height: customHeight,
            borderRadius: effectiveBorderRadius,
            backgroundColor: disabled
              ? disabledBackgroundColor
              : resolvedBackgroundColor,
            // Removed absolute positioning
            borderColor: disabled ? "transparent" : resolvedBorderColor,
            borderWidth: disabled ? 0 : borderWidth,
            borderStyle,
            transform: [{ scale: animatedPress ? scaleAnim : 1 }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: customInternalPadding,
              backgroundColor: resolvedPaddingColor,
              borderRadius: effectiveBorderRadius,
            },
          ]}
          onPress={handlePress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          disabled={disabled || loading.isLoading}
        >
          {loading.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color={resolvedLoadingColor}
                style={styles.loadingIndicator}
              />
              {loading.text && (
                <Text
                  style={[
                    styles.text,
                    { color: disabled ? disabledTextColor : mainFABTextColor },
                    textStyle,
                  ]}
                >
                  {loading.text}
                </Text>
              )}
            </View>
          ) : (
            <Fragment>
              {/* If there's an icon */}
              {iconName && (
                <ThemedIcon
                  iconName={iconName}
                  iconLibrary={iconLibrary}
                  size={iconSize}
                  color={disabled ? disabledIconColor : mainFABIconColor}
                />
              )}
              {/* If there's a title text */}
              {title || text?.color ? (
                <Text
                  style={[
                    styles.text,
                    {
                      marginLeft: iconName ? 8 : 0,
                      color: disabled ? disabledTextColor : mainFABTextColor,
                    },
                    textStyle,
                  ]}
                >
                  {title ?? ""}
                </Text>
              ) : null}
            </Fragment>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// ################################################################################
// SPEED DIAL BUTTON COMPONENT (Internal)
// ################################################################################

interface InternalSpeedDialButtonProps extends SpeedDialButtonProps {
  index: number;
  totalButtons: number;
  expandAnim: Animated.Value;
}

const SpeedDialButton: React.FC<InternalSpeedDialButtonProps> = ({
  // External props from SpeedDialButtonProps
  title,
  onPress,
  disabled = false,
  themeType = "primary",
  roundedAllCorners = false,
  customRadius = "factor",
  iconName = "add",
  iconLibrary = "Ionicons",
  iconSize = 20,
  style,
  textStyle,
  borders = {},
  shadows = {},
  padding = {},
  loading = {
    isLoading: false,
    text: "",
    color: "",
  },

  // Internal props
  index,
  totalButtons,
  expandAnim,
  customHeight,
  customWidth,
}) => {
  // HELPER getColorKey
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${
      theme.charAt(0).toUpperCase() + theme.slice(1)
    }` as ThemeColorType;
  };

  // THEME COLORS
  // Disabled
  const disabledBackgroundColor = useThemeColor(
    {},
    getColorKey("speedDialDisabledBackground", themeType)
  );
  const disabledTextColor = useThemeColor(
    {},
    getColorKey("speedDialDisabledText", themeType)
  );
  const disabledIconColor = useThemeColor(
    {},
    getColorKey("speedDialDisabledIconColor", themeType)
  );

  // Normal
  const backgroundColor = useThemeColor(
    {},
    getColorKey("speedDialBackground", themeType)
  );
  const textColor = useThemeColor({}, getColorKey("speedDialText", themeType));
  const iconColor = useThemeColor(
    {},
    getColorKey("speedDialIconColor", themeType)
  );

  // BORDERS
  const {
    color: borderColor = {},
    width: borderWidth = 0,
    style: borderStyle = "solid",
  } = borders;
  const resolvedBorderColor = useThemeColor(
    borderColor,
    getColorKey("speedDialBorderColor", themeType)
  );

  // SHADOWS
  const {
    color: shadowColor,
    offset = { width: 0, height: 1 },
    opacity = 0.2,
    radius = 2,
    elevation = 3,
  } = shadows;
  const resolvedShadowColor = useThemeColor(
    { light: shadowColor, dark: shadowColor },
    getColorKey("speedDialShadowColor", themeType)
  );
  const shadowStyle = {
    shadowColor: resolvedShadowColor,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };

  // PADDING
  const { internal: internalPadding = 10, color: paddingColor = {} } = padding;
  const resolvedPaddingColor = useThemeColor(
    paddingColor,
    getColorKey("speedDialPaddingColor", themeType)
  );

  // LOADING
  const resolvedLoadingColor = loading.color
    ? loading.color
    : useThemeColor({}, getColorKey("speedDialLoadingColor", themeType));

  // DIMENSIONS
  const effectiveRadius = roundedAllCorners
    ? (customHeight ?? 50) / 2
    : customRadius === "factor"
    ? (customHeight ?? 50) / 2
    : (customRadius as number);

  // ANIMATION / POSITIONING
  // We'll position each button with an Animated.View, offset from the main FAB.
  // A simple approach: each button slides up or down by (index + 1) * (distance).
  // For vertical stacking, negative offsets (above the main FAB).
  // You can fine-tune the offset or orientation as desired.

  // For this example, let's offset each button by 60 + margin * index:
  const offsetDistance = 70; // distance between each speed dial button
  const margin = 10; // spacing margin
  const translateY = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -((offsetDistance + margin) * (index + 1))],
  });
  const animatedOpacity = expandAnim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0, 1],
  });

  const handleSpeedDialPress = () => {
    if (!disabled && !loading.isLoading) {
      onPress?.();
    }
  };

  return (
    <Animated.View
      style={[
        styles.speedDialButtonContainer,
        {
          // Absolute inside the parent container
          position: "absolute",
          // center horizontally:
          left: ((customWidth ?? 50) / 2) * -1, // shift left by half button width if needed
          // Alternatively, you can do left: "50%", transform: translateX(- customWidth/2),
          transform: [
            { translateY },
            { translateX: -((customWidth ?? 50) / 2) }, // center alignment
          ],
          opacity: animatedOpacity,
        },
      ]}
    >
      <View
        style={[
          shadowStyle,
          {
            width: customWidth,
            height: customHeight,
            borderRadius: effectiveRadius,
            backgroundColor: disabled
              ? disabledBackgroundColor
              : backgroundColor,
            borderColor: disabled ? "transparent" : resolvedBorderColor,
            borderWidth: disabled ? 0 : borderWidth,
            borderStyle,
          },
          style,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: internalPadding,
              backgroundColor: resolvedPaddingColor,
              borderRadius: effectiveRadius,
            },
          ]}
          onPress={handleSpeedDialPress}
          disabled={disabled || loading.isLoading}
        >
          {loading.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color={resolvedLoadingColor}
                style={styles.loadingIndicator}
              />
              {loading.text && (
                <Text
                  style={[
                    styles.text,
                    { color: disabled ? disabledTextColor : textColor },
                    textStyle,
                  ]}
                >
                  {loading.text}
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.row}>
              {/* Icon */}
              {iconName && (
                <ThemedIcon
                  iconName={iconName}
                  iconLibrary={iconLibrary}
                  size={iconSize}
                  color={disabled ? disabledIconColor : iconColor}
                />
              )}
              {/* Title */}
              {title && (
                <Text
                  style={[
                    styles.text,
                    {
                      marginLeft: iconName ? 8 : 0,
                      color: disabled ? disabledTextColor : textColor,
                    },
                    textStyle,
                  ]}
                >
                  {title}
                </Text>
              )}
            </View>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  text: {
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingIndicator: {
    marginRight: 8,
  },
  speedDialButtonContainer: {},
});

export default memo(ThemedFAB);
