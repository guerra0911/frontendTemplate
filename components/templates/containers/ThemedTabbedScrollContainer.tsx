// components/ThemedTabbedScrollContainer.tsx

import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemedView } from '@/components/templates/containers/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BOTTOM_FOOTER_HEIGHT } from '@/constants/Layouts';

////////////////////////////////////////////////////////////////////////////////
// INTERFACES
////////////////////////////////////////////////////////////////////////////////

interface Tab {
  label: string;
  component: React.ReactNode;
}

interface ThemedTabbedScrollContainerProps {
  tabs: Tab[];
  isScrollable?: boolean;
  isRefreshable?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const ThemedTabbedScrollContainer: React.FC<ThemedTabbedScrollContainerProps> = ({
  tabs,
  isScrollable = true,
  isRefreshable = false,
  onRefresh,
  refreshing = false,
  style,
  contentContainerStyle,
}) => {
  // ############################################################################
  // STATE
  // ############################################################################

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // ############################################################################
  // THEME COLORS
  // ############################################################################

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const headerBackgroundColor = useThemeColor({}, 'headerBackground');
  const activeTabBorderColor = useThemeColor({}, 'tint');

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

  /**
   * Handler for tab press events.
   * @param index - The index of the tab that was pressed.
   */
  const handleTabPress = (index: number) => {
    setActiveTabIndex(index);
  };

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <ThemedView style={[styles.container, style]}>
      {/* ##########################################################################
          Tab Headers
      ########################################################################## */}
      <View style={[styles.tabContainer, { backgroundColor: headerBackgroundColor }]}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTabIndex === index && { borderBottomColor: activeTabBorderColor, borderBottomWidth: 2 },
            ]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabLabel,
                { color: textColor },
                activeTabIndex === index && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ##########################################################################
          Content Area
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
          {tabs[activeTabIndex].component}
        </Animated.ScrollView>
      ) : (
        <View
          style={[
            styles.contentContainer,
            contentContainerStyle,
            { backgroundColor },
          ]}
        >
          {tabs[activeTabIndex].component}
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
  tabContainer: {
    flexDirection: 'row',
    // Flex properties handle spacing, no need for justifyContent
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabLabel: {
    fontSize: 16,
    // Additional label styles can be added here
  },
  activeTabLabel: {
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////

export default ThemedTabbedScrollContainer;
