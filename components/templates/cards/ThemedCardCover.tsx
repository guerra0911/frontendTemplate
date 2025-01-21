/**
 * ThemedCardCover.tsx
 *
 * A component for displaying a cover image within a ThemedCard.
 * You can control which corners are rounded using the new props.
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ImageStyle,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface ThemedCardCoverProps {
  source: ImageSourcePropType;
  /** Height of the cover image */
  height?: number;
  /** Additional styling for the cover wrapper (outer container) */
  style?: StyleProp<ViewStyle>;
  /**
   * If true, only the top edges of the image are rounded
   * (the bottom edges will be squared off).
   */
  roundTopOnly?: boolean;
  /**
   * If true, only the bottom edges of the image are rounded
   * (the top edges will be squared off).
   */
  roundBottomOnly?: boolean;
  /**
   * The radius used for rounded corners.
   * Defaults to 8.
   */
  cornerRadius?: number;
}

const ThemedCardCover: React.FC<ThemedCardCoverProps> = ({
  source,
  height = 200,
  style,
  roundTopOnly = false,
  roundBottomOnly = false,
  cornerRadius = 8,
}) => {
  // Compute the border radius values based on the flags.
  let computedBorderStyle: ViewStyle = {};

  if (roundTopOnly) {
    computedBorderStyle = {
      borderTopLeftRadius: cornerRadius,
      borderTopRightRadius: cornerRadius,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    };
  } else if (roundBottomOnly) {
    computedBorderStyle = {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: cornerRadius,
      borderBottomRightRadius: cornerRadius,
    };
  } else {
    // Default: all corners rounded.
    computedBorderStyle = {
      borderRadius: cornerRadius,
    };
  }

  return (
    // Wrap the Image in a View to enforce correct clipping.
    <View
      style={[
        styles.wrapper,
        { height },
        computedBorderStyle,
        // This extra style allows the user to tweak the outer container.
        style,
      ]}
    >
      <Image
        source={source}
        style={[styles.image, { height: '100%' }]}
        resizeMode="cover"
      />
    </View>
  );
};

export default React.memo(ThemedCardCover);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    overflow: 'hidden', // ensures that any content is clipped to the rounded corners
  },
  image: {
    width: '100%',
  },
});
