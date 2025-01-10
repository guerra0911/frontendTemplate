// components/ThemedScrollContainer.tsx

import React, { useCallback } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  StyleProp,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { ThemedView } from '@/components/templates/containers/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BOTTOM_FOOTER_HEIGHT } from '@/constants/Layouts';

////////////////////////////////////////////////////////////////////////////////
// INTERFACES
////////////////////////////////////////////////////////////////////////////////

interface ThemedScrollContainerProps {
  children: React.ReactNode;
  isScrollable?: boolean;
  isRefreshable?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  // Extend with additional props as needed
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedScrollContainer: React.FC<ThemedScrollContainerProps> = ({
  children,
  isScrollable = true,
  isRefreshable = false,
  onRefresh,
  refreshing = false,
  style,
  contentContainerStyle,
}) => {
  // ############################################################################
  // THEME COLORS
  // ############################################################################

  const backgroundColor = useThemeColor({}, 'background');

  // ############################################################################
  // HANDLERS
  // ############################################################################

  /**
   * Handler for pull-to-refresh functionality.
   */
  const handleRefresh = useCallback(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <ThemedView style={[styles.container, style]}>
      {/* ##########################################################################
          Scrollable Content
      ########################################################################## */}
      {isScrollable ? (
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            contentContainerStyle,
            { backgroundColor },
          ]}
          scrollEnabled={isScrollable}
          showsVerticalScrollIndicator={false}
          refreshControl={
            isRefreshable && onRefresh ? (
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            ) : undefined
          }
        >
          {children}
        </Animated.ScrollView>
      ) : (
        /* ##########################################################################
            Non-Scrollable Content
        ########################################################################## */
        <View
          style={[
            styles.contentContainer,
            contentContainerStyle,
            { backgroundColor },
          ]}
        >
          {children}
        </View>
      )}
    </ThemedView>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: BOTTOM_FOOTER_HEIGHT,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 50,
  },
});

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////

export default ThemedScrollContainer;
