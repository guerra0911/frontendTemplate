// components/templates/pages/ThemedPage.tsx

import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedHeader from "@/components/templates/headers/ThemedHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "../containers/ThemedView";

interface ThemedPageProps {
  title: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  scrollable?: boolean;
  refreshable?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  isSticky?: boolean;
  refreshIndicatorPosition?: "above" | "between"; // NEW PROP
  themeType?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

/**
 * ThemedPage
 *
 * A master component that integrates ThemedHeader and a content container.
 * It supports scrollable content, pull-to-refresh, and sticky/non-sticky header behavior based on props.
 */
const ThemedPage: React.FC<ThemedPageProps> = ({
  title,
  showBackButton = false,
  rightElement,
  leftElement,
  scrollable = false,
  refreshable = false,
  onRefresh,
  refreshing = false,
  isSticky = false,
  refreshIndicatorPosition = "between", // DEFAULT VALUE
  themeType = "primary",
  children,
}) => {
  // Define ThemeColorType
  type ThemeColorType =
    | "pageBackgroundPrimary"
    | "pageBackgroundSecondary"
    | "pageBackgroundTertiary"
    | "refreshControlColorPrimary"
    | "refreshControlColorSecondary"
    | "refreshControlColorTertiary"
    | "headerBackgroundPrimary"
    | "headerBackgroundSecondary"
    | "headerBackgroundTertiary";

  // Resolve page background color
  const pageBackgroundColor = useThemeColor(
    {},
    `pageBackground${capitalize(themeType)}` as ThemeColorType
  );

  // Resolve header background color
  const headerBackgroundColor = useThemeColor(
    {},
    `headerBackground${capitalize(themeType)}` as ThemeColorType
  );

  // Resolve RefreshControl color
  const refreshControlColor = useThemeColor(
    {},
    `refreshControlColor${capitalize(themeType)}` as ThemeColorType
  );

  // Resolve insets
  const insets = useSafeAreaInsets();

  // Helper function to capitalize
  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Define padding based on isSticky
  const contentPadding = isSticky
    ? { paddingTop: 56 + insets.top, paddingHorizontal: 16 }
    : { paddingHorizontal: 0 };

  // Render RefreshControl
  const renderRefreshControl = () =>
    refreshable && onRefresh ? (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={[refreshControlColor]} // For Android
        tintColor={refreshControlColor} // For iOS
        // Ensure the pull-down area matches the header's background
        progressBackgroundColor={headerBackgroundColor}
      />
    ) : undefined;

  // Layout when refresh indicator is "above"
  const renderAboveLayout = () => (
    <View style={{ flex: 1 }}>
      {/* Refresh Indicator Above */}
      {refreshable && onRefresh && (
        <View style={[styles.refreshIndicatorContainer, { backgroundColor: headerBackgroundColor }]}>
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[refreshControlColor]}
            tintColor={refreshControlColor}
            progressBackgroundColor={headerBackgroundColor}
          />
        </View>
      )}

      {/* Header */}
      <ThemedHeader
        title={title}
        showBackButton={showBackButton}
        rightElement={rightElement}
        leftElement={leftElement}
        themeType={themeType}
      />

      {/* Scrollable Content */}
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[styles.contentContainer, contentPadding]}
          refreshControl={renderRefreshControl()}
          style={{ backgroundColor: pageBackgroundColor }}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.contentContainer, contentPadding]}>
          {children}
        </View>
      )}
    </View>
  );

  // Layout when refresh indicator is "between"
  const renderBetweenLayout = () => (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <ThemedHeader
        title={title}
        showBackButton={showBackButton}
        rightElement={rightElement}
        leftElement={leftElement}
        themeType={themeType}
      />

      {/* Scrollable Content */}
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[styles.contentContainer, contentPadding]}
          refreshControl={renderRefreshControl()}
          style={{ backgroundColor: pageBackgroundColor }}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.contentContainer, contentPadding]}>
          {children}
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: pageBackgroundColor }]}>
      {refreshIndicatorPosition === "above" && isSticky
        ? renderAboveLayout()
        : refreshIndicatorPosition === "above"
        ? renderAboveLayout()
        : renderBetweenLayout()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshIndicatorContainer: {
    height: 56, // Same as header height
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexGrow: 1,
  },
  nonScrollableContainer: {
    flex: 1,
    padding: 16,
  },
  nonStickyContent: {
    padding: 16,
  },
});

export default ThemedPage;
