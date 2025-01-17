import React, { useMemo } from "react";
import {
  View,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageProps,
  TextStyle,
  ImageStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedIcon from "@/components/templates/icons/ThemedIcon";
import { ThemedText } from "../typography/ThemedText";

// ----------------------------------------------------------------------------
// THEME COLOR TYPE
// ----------------------------------------------------------------------------

/**
 * We define background color keys for "primary", "secondary", "tertiary".
 * We may also define text/icon color keys if needed for the "Text" or "Icon" variant.
 */
type AvatarBackgroundColorType =
  | "avatarBackgroundPrimary"
  | "avatarBackgroundSecondary"
  | "avatarBackgroundTertiary";

type AvatarTextColorType =
  | "avatarTextColorPrimary"
  | "avatarTextColorSecondary"
  | "avatarTextColorTertiary";

type AvatarIconColorType =
  | "avatarIconColorPrimary"
  | "avatarIconColorSecondary"
  | "avatarIconColorTertiary";

/**
 * Which "type" for the avatar's background (primary, secondary, tertiary).
 */
export type ThemedAvatarType = "primary" | "secondary" | "tertiary";

// ----------------------------------------------------------------------------
// AVATAR SHARED PROPS
// ----------------------------------------------------------------------------

interface ThemedAvatarSharedProps {
  /**
   * Which theme type (controls background color).
   * @default "primary"
   */
  type?: ThemedAvatarType;

  /**
   * The diameter of the avatar circle.
   * @default 64
   */
  size?: number;

  /**
   * Optional background color override.
   */
  backgroundColor?: { light?: string; dark?: string };

  /**
   * Additional style for the outer container.
   */
  style?: StyleProp<ViewStyle>;
}

// ----------------------------------------------------------------------------
// ThemedAvatar.Icon PROPS
// ----------------------------------------------------------------------------

export interface ThemedAvatarIconProps extends ThemedAvatarSharedProps {
  /**
   * The name of the icon to display, e.g. "folder" or "home".
   */
  iconName: string;

  /**
   * Optional library for the icon. e.g. "MaterialIcons".
   * @default "Ionicons"
   */
  iconLibrary?: "Ionicons" | "MaterialIcons" | "FontAwesome";

  /**
   * Optional icon color override.
   */
  iconColor?: { light?: string; dark?: string };
}

// ----------------------------------------------------------------------------
// ThemedAvatar.Text PROPS
// ----------------------------------------------------------------------------

export interface ThemedAvatarTextProps extends ThemedAvatarSharedProps {
  /**
   * The text/initials to display in the circle.
   */
  label: string;

  /**
   * Optional text color override.
   */
  textColor?: { light?: string; dark?: string };

  /**
   * Additional text style props for fine-grained control (fontWeight, etc.).
   */
  labelStyle?: StyleProp<TextStyle>;
}

// ----------------------------------------------------------------------------
// ThemedAvatar.Image PROPS
// ----------------------------------------------------------------------------

export interface ThemedAvatarImageProps extends ThemedAvatarSharedProps {
  /**
   * Standard React Native Image source OR a function returning an image node.
   */
  source:
    | ImageProps["source"]
    | ((props: { size: number }) => React.ReactNode);

  /**
   * Optional: image load callbacks or style overrides
   */
  onError?: ImageProps["onError"];
  onLayout?: ImageProps["onLayout"];
  onLoad?: ImageProps["onLoad"];
  onLoadEnd?: ImageProps["onLoadEnd"];
  onLoadStart?: ImageProps["onLoadStart"];
  onProgress?: ImageProps["onProgress"];
  imageStyle?: StyleProp<ImageStyle>; // For the image specifically
}

// ----------------------------------------------------------------------------
// ThemedAvatar (BASE) - acts as a container only
// ----------------------------------------------------------------------------

const defaultSize = 64;

/**
 * For internal usage. We'll create sub-components below:
 * - ThemedAvatar.Icon
 * - ThemedAvatar.Text
 * - ThemedAvatar.Image
 */
function ThemedAvatarBase() {
  // This base does nothing by itself
  return null;
}

// ----------------------------------------------------------------------------
// ThemedAvatar.Icon
// ----------------------------------------------------------------------------

function ThemedAvatarIcon({
  type = "primary",
  size = defaultSize,
  style,
  backgroundColor = {},
  iconName,
  iconLibrary,
  iconColor = {},
}: ThemedAvatarIconProps) {
  // Resolve background color from theme
  const getColorKey = (
    base: string,
    variant: ThemedAvatarType
  ): AvatarBackgroundColorType => {
    return (`${base}${capitalize(variant)}` as AvatarBackgroundColorType);
  };

  const backgroundColorKey = getColorKey("avatarBackground", type);
  const resolvedBackground = useThemeColor(backgroundColor, backgroundColorKey);

  // Resolve icon color from theme
  const getIconColorKey = (
    base: string,
    variant: ThemedAvatarType
  ): AvatarIconColorType => {
    return (`${base}${capitalize(variant)}` as AvatarIconColorType);
  };

  const iconColorKey = getIconColorKey("avatarIconColor", type);
  const resolvedIconColor = useThemeColor(iconColor, iconColorKey);

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: resolvedBackground,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <ThemedIcon
        iconName={iconName}
        iconLibrary={iconLibrary || "Ionicons"}
        size={size * 0.6}
        color={resolvedIconColor}
      />
    </View>
  );
}

// ----------------------------------------------------------------------------
// ThemedAvatar.Text
// ----------------------------------------------------------------------------

function ThemedAvatarText({
  type = "primary",
  size = defaultSize,
  style,
  backgroundColor = {},
  label,
  textColor = {},
  labelStyle,
}: ThemedAvatarTextProps) {
  // Resolve background color
  const backgroundKey = (`avatarBackground${capitalize(
    type
  )}` as AvatarBackgroundColorType);
  const resolvedBackground = useThemeColor(backgroundColor, backgroundKey);

  // Resolve text color
  const textKey = (`avatarTextColor${capitalize(type)}` as AvatarTextColorType);
  const resolvedTextColor = useThemeColor(textColor, textKey);

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: resolvedBackground,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <ThemedText
        style={[
          {
            fontSize: size / 2,
            lineHeight: size,
            textAlign: "center",
            color: resolvedTextColor,
          },
          labelStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </ThemedText>
    </View>
  );
}

// ----------------------------------------------------------------------------
// ThemedAvatar.Image
// ----------------------------------------------------------------------------

function ThemedAvatarImage({
  type = "primary",
  size = defaultSize,
  style,
  backgroundColor = {},
  source,
  onError,
  onLayout,
  onLoad,
  onLoadEnd,
  onLoadStart,
  onProgress,
  imageStyle,
}: ThemedAvatarImageProps) {
  // Resolve background color
  const backgroundKey = (`avatarBackground${capitalize(
    type
  )}` as AvatarBackgroundColorType);
  const resolvedBackground = useThemeColor(backgroundColor, backgroundKey);

  const content = useMemo(() => {
    if (typeof source === "function") {
      // If user provides a render function
      return source({ size });
    } else {
      // Standard RN Image
      return (
        <Image
          source={source}
          style={[
            { width: size, height: size, borderRadius: size / 2 },
            imageStyle,
          ]}
          onError={onError}
          onLayout={onLayout}
          onLoad={onLoad}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
        />
      );
    }
  }, [
    source,
    size,
    imageStyle,
    onError,
    onLayout,
    onLoad,
    onLoadEnd,
    onLoadStart,
    onProgress,
  ]);

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: resolvedBackground,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {content}
    </View>
  );
}

// ----------------------------------------------------------------------------
// Attach Sub-Components
// ----------------------------------------------------------------------------

interface ThemedAvatarInterface
  extends React.MemoExoticComponent<() => null> {
  Icon: typeof ThemedAvatarIcon;
  Image: typeof ThemedAvatarImage;
  Text: typeof ThemedAvatarText;
}

// We create a base "Avatar" that does nothing on its own:
const ThemedAvatarBaseMemo = React.memo(ThemedAvatarBase) as ThemedAvatarInterface;

ThemedAvatarBaseMemo.Icon = ThemedAvatarIcon;
ThemedAvatarBaseMemo.Image = ThemedAvatarImage;
ThemedAvatarBaseMemo.Text = ThemedAvatarText;

// Helper to capitalize first letter
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ----------------------------------------------------------------------------
// EXPORT
// ----------------------------------------------------------------------------

export default ThemedAvatarBaseMemo;
