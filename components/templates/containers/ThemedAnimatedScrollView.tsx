// app/components/ThemedAnimatedScrollView.tsx

import React from 'react';
import {
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

////////////////////////////////////////////////////////////////////////////////
// INTERFACES
////////////////////////////////////////////////////////////////////////////////

interface ThemedAnimatedScrollViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  horizontal?: boolean;
  pagingEnabled?: boolean;
  scrollEnabled?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

/**
 * ThemedAnimatedScrollView
 *
 * A themed and animated ScrollView component that adapts to the current theme.
 * It supports horizontal scrolling, paging, and custom scroll event handling.
 *
 * @param {ThemedAnimatedScrollViewProps} props - Props for configuring the ScrollView.
 * @returns {React.ReactElement} The themed animated ScrollView component.
 */
const ThemedAnimatedScrollView: React.FC<ThemedAnimatedScrollViewProps> = ({
  children,
  style,
  contentContainerStyle,
  horizontal = false,
  pagingEnabled = false,
  scrollEnabled = true,
  showsHorizontalScrollIndicator = true,
  scrollEventThrottle = 16,
  onScroll,
}) => {
  //////////////////////////////////////////////////////////////////////////////
  // THEME COLORS
  //////////////////////////////////////////////////////////////////////////////

  const backgroundColor = useThemeColor({}, 'background');

  //////////////////////////////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////////////////////////////

  return (
    <Animated.ScrollView
      style={[styles.scrollView, { backgroundColor }, style]}
      contentContainerStyle={contentContainerStyle}
      horizontal={horizontal}
      pagingEnabled={pagingEnabled}
      scrollEnabled={scrollEnabled}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={onScroll}
    >
      {children}
    </Animated.ScrollView>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////

export default ThemedAnimatedScrollView;
