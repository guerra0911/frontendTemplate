import React from "react";
import { Image, StyleSheet, ImageSourcePropType, StyleProp, ImageStyle } from "react-native";

export interface ThemedListImageProps {
  source: ImageSourcePropType;
  variant?: "image" | "video";
  style?: StyleProp<ImageStyle>;
}

function ThemedListImage({
  source,
  variant = "image",
  style,
}: ThemedListImageProps) {
  // If variant=video, we can enlarge the preview.
  const getStyle = () => {
    if (variant === "video") {
      return [styles.video, style];
    } else {
      return [styles.image, style];
    }
  };

  return (
    <Image
      source={source}
      style={getStyle()}
      accessibilityIgnoresInvertColors
      resizeMode="cover"
    />
  );
}

export default React.memo(ThemedListImage);

const styles = StyleSheet.create({
  image: {
    width: 56,
    height: 56,
  },
  video: {
    width: 100,
    height: 64,
  },
});
