// navigation/transitions.ts

import { StackCardInterpolationProps } from '@react-navigation/stack';

export const forFadeOverlay = ({ current, closing }: StackCardInterpolationProps) => {
  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0], // Adjust the initial opacity as needed
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      opacity: current.progress,
    },
    overlayStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Translucent black overlay
      opacity: overlayOpacity,
    },
  };
};
