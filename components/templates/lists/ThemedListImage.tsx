import React from "react";
import { Image, StyleSheet, StyleProp, ImageStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 */
export type ThemedListImageType = "primary" | "secondary" | "tertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 */
export interface ThemedListImageProps {
  source: any;
  variant?: "image" | "video";
  style?: StyleProp<ImageStyle>;
  themeType?: ThemedListImageType;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
export default function ThemedListImage({
  source,
  variant = "image",
  style,
  themeType = "primary",
}: ThemedListImageProps) {
  // If you want to thematically color behind the image, you could do so.
  const getStyles = () => {
    if (variant === "video") {
      return [styles.video, style];
    }
    return [styles.image, style];
  };

  return (
    <Image
      style={getStyles()}
      source={source}
      accessibilityIgnoresInvertColors
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 56,
    height: 56,
  },
  video: {
    width: 100,
    height: 64,
    marginLeft: 0,
  },
});
