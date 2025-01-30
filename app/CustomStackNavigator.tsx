// navigation/CustomStack.tsx

import React from 'react';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { forFadeOverlay } from '@/utils/transitions';
// Import your screens
// Note: Screens will be dynamically loaded by Expo Router, so no need to import them here

const Stack = createStackNavigator();

const CustomStackNavigator = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: forFadeOverlay,
        cardOverlayEnabled: true,
        // Optional: adjust the base animation if desired
        animation: 'fade', // 'slide_from_right' is default; 'fade' can be used alternatively
      }}
    >
      {children}
    </Stack.Navigator>
  );
};

export default CustomStackNavigator;
