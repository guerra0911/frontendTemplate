/**
 * ThemedCardCover.tsx
 *
 * A cover image for the card. Typically displayed at the top.
 */

import React from "react";
import {
  Image,
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  ImageProps,
} from "react-native";

export interface ThemedCardCoverProps extends ImageProps {
  /** Optional style for the container wrapping the image. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Override the default height? */
  height?: number;
}

const ThemedCardCover: React.FC<ThemedCardCoverProps> = ({
  containerStyle,
  height = 180,
  style,
  ...rest
}) => {
  return (
    <View style={[{ height, overflow: "hidden" }, containerStyle]}>
      <Image
        style={[styles.image, { height }, style]}
        resizeMode="cover"
        {...rest}
      />
    </View>
  );
};

export default React.memo(ThemedCardCover);

const styles = StyleSheet.create({
  image: {
    width: "100%",
  },
});
