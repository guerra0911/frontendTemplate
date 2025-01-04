// components/headers/settings/SettingsIndexHeader.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme'; // Adjust the import path as needed
import HeaderBackButton from '@/components/buttons/HeaderBackButton';
import { DEFAULT_HEADER_HEIGHT, HEADER_BOTTOM_INNER_PADDING } from '@/constants/Layouts';

interface SettingsIndexHeaderProps {
  title: string;
  navigation: any;
  route: any;
  backgroundColor: string;
  textColor: string;
}

export const SettingsIndexHeader: React.FC<SettingsIndexHeaderProps> = ({
  title,
  navigation,
  route,
  backgroundColor,
  textColor,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const barStyle = isDark ? 'light-content' : 'dark-content';

  return (
    <SafeAreaView style={{ backgroundColor }} edges={['top']}>
      {/* Configure the StatusBar */}
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor} // Android only
        translucent={false}
      />
      <View style={[styles.container, { backgroundColor }]}>
        {/* Left Side: Optionally, a SettingsButton or empty space */}
        <HeaderBackButton />

        {/* Title */}
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>

        {/* Right Side: Optionally, other buttons or empty space */}
        <TouchableOpacity
          onPress={() => {}}
          accessibilityLabel="Placeholder"
          style={styles.rightPlaceholder}
          disabled={true} // Disabled if no action
        >
          {/* Empty TouchableOpacity to maintain spacing */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEFAULT_HEADER_HEIGHT, // Adjust the height as needed
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-end', // Align items to the bottom
    justifyContent: 'space-between',
    paddingBottom: HEADER_BOTTOM_INNER_PADDING, // Adjustable bottom padding
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  leftPlaceholder: {
    width: 24, // Width matching the icon size for spacing
    height: 24,
  },
  rightPlaceholder: {
    width: 24,
    height: 24,
  },
});
