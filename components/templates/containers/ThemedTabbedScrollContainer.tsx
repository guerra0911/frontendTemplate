// components/ThemedTabbedScrollContainer.tsx

import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  RefreshControl,
  View,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

// ----------------------------------------------------------------------------
// THEME COLOR TYPE
// ----------------------------------------------------------------------------
type ThemeColorType =
  | "tabbedScrollContainerBackgroundPrimary"
  | "tabbedScrollContainerBackgroundSecondary"
  | "tabbedScrollContainerBackgroundTertiary"
  | "tabbedScrollContainerHeaderBackgroundPrimary"
  | "tabbedScrollContainerHeaderBackgroundSecondary"
  | "tabbedScrollContainerHeaderBackgroundTertiary"
  | "tabbedScrollContainerTextPrimary"
  | "tabbedScrollContainerTextSecondary"
  | "tabbedScrollContainerTextTertiary"
  | "tabbedScrollContainerTintPrimary"
  | "tabbedScrollContainerTintSecondary"
  | "tabbedScrollContainerTintTertiary";

// ----------------------------------------------------------------------------
// INTERFACES
// ----------------------------------------------------------------------------
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

  // Theming
  themeType?: "primary" | "secondary" | "tertiary";

  // Optional overrides
  backgroundColor?: { light?: string; dark?: string };
  headerBackgroundColor?: { light?: string; dark?: string };
  textColor?: { light?: string; dark?: string };
  tintColor?: { light?: string; dark?: string };
}

// ----------------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------------
const ThemedTabbedScrollContainer: React.FC<ThemedTabbedScrollContainerProps> = ({
  tabs,
  isScrollable = true,
  isRefreshable = false,
  onRefresh,
  refreshing = false,
  style,
  contentContainerStyle,
  themeType = "primary",
  backgroundColor = {},
  headerBackgroundColor = {},
  textColor = {},
  tintColor = {},
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Helper to build color keys
  const getColorKey = (base: string, variant: "primary" | "secondary" | "tertiary") =>
    `${base}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;

  // Resolve container background
  const containerBgKey = getColorKey("tabbedScrollContainerBackground", themeType);
  const resolvedContainerBgColor = useThemeColor(backgroundColor, containerBgKey);

  // Resolve header background
  const headerBgKey = getColorKey("tabbedScrollContainerHeaderBackground", themeType);
  const resolvedHeaderBgColor = useThemeColor(headerBackgroundColor, headerBgKey);

  // Resolve text color
  const textColorKey = getColorKey("tabbedScrollContainerText", themeType);
  const resolvedTextColor = useThemeColor(textColor, textColorKey);

  // Resolve tint color (for active tab underline, etc.)
  const tintColorKey = getColorKey("tabbedScrollContainerTint", themeType);
  const resolvedTintColor = useThemeColor(tintColor, tintColorKey);

  // Handler for pull-to-refresh
  const handleRefresh = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  // Handler for tab press
  const handleTabPress = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <ThemedView style={[styles.container, style]}>
      {/* Tab Headers */}
      <View style={[styles.tabContainer, { backgroundColor: resolvedHeaderBgColor }]}>
        {tabs.map((tab, index) => {
          const isActive = activeTabIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                isActive && {
                  borderBottomColor: resolvedTintColor,
                  borderBottomWidth: 2,
                },
              ]}
              onPress={() => handleTabPress(index)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  { color: resolvedTextColor },
                  isActive && styles.activeTabLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content Area */}
      {isScrollable ? (
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            contentContainerStyle,
            { backgroundColor: resolvedContainerBgColor },
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            isRefreshable ? (
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
            { backgroundColor: resolvedContainerBgColor },
          ]}
        >
          {tabs[activeTabIndex].component}
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: BOTTOM_FOOTER_HEIGHT,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabLabel: {
    fontSize: 16,
  },
  activeTabLabel: {
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default ThemedTabbedScrollContainer;
