// app/(tabs)/profile/screens/StaticHeaderExample.tsx

import React, { useState } from "react";
import { Text, View } from "react-native";
import ThemedStaticHeader from "@/components/templates/pages/ThemedStaticHeader";

export default function StaticHeaderExample() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <ThemedStaticHeader
      // Theme customization: "primary", "secondary", or "tertiary"
      themeType="primary"
      // Override header background colors (for light and dark modes)
      backgroundColor={{ 
        light: "#FF5733", // Bright Red-Orange (Light Mode)
        dark: "#003366" // Deep Navy Blue (Dark Mode)
      }}
      // Override scroll view container background colors
      scrollViewBackgroundColor={{ 
        light: "#4CAF50", // Vivid Green (Light Mode)
        dark: "#800080" // Deep Purple (Dark Mode)
      }}
      // Overall scroll view container style
      style={{ flex: 1, margin: 0 }}
      // Inner content container style (applied to the scrollable area)
      contentContainerStyle={{
        padding: 16,
        backgroundColor: "#FFD700", // Bright Gold
      }}
      // Enable pull-to-refresh with refresh handlers
      isRefreshable
      refreshing={refreshing}
      onRefresh={onRefresh}
      // Header customizations
      headerProps={{
        // NOTE: Since no renderLeft is provided here, the default ThemedHeaderBackButton will be used.
        // To override the back button, supply a custom renderLeft function.
        renderCenter: () => (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Static Header
          </Text>
        ),
        // Optionally, you can also provide a custom right component:
        renderRight: () => (
          <Text style={{ color: "#FF00FF", fontSize: 16 }}> 
            {/* Magenta for the text on the right */}
            Custom Right
          </Text>
        ),
        // Whether to hide the bottom border (false shows it)
        noBottomBorder: false,
        // Whether to ignore the top safe area (false honors safe areas)
        ignoreTopSafeArea: false,
        // Initial border color (before scrolling or interaction)
        initialBorderColor: "#008080", // Teal
        // Border color when activated (after scrolling, for example)
        borderColor: "#FF4500", // Bright Orange-Red
        // Border width in pixels
        borderWidth: 2,
        // Header style: customize dimensions, padding, alignment, etc.
        headerStyle: {
          height: 110, // Set header height to 110 as requested
          width: "100%", // Full width
          paddingVertical: 10,
          // You can also customize backgroundColor, but note that it will be overridden by the theme color
          backgroundColor: "#4682B4", // Steel Blue
          justifyContent: "center",
          alignItems: "center",
        },
        // Optional blur effect: if provided, the header is wrapped in a BlurView
        blurAmount: 50,
      }}
    >
      {/* Main content area */}
      <View
        style={{
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          This is the main content area.
        </Text>
        <Text style={{ fontSize: 14 }}>
          Use this example as documentation for customizing every prop.
        </Text>
      </View>
    </ThemedStaticHeader>
  );
}
