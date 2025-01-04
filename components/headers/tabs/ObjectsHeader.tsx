// components/headers/ObjectsHeader.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme'; // Adjust the import path as needed
import { DEFAULT_HEADER_HEIGHT, HEADER_BOTTOM_INNER_PADDING } from '@/constants/Layouts';

interface ObjectsHeaderProps {
  title: string;
  navigation: any;
  route: any;
  backgroundColor: string;
  textColor: string;
}

export const ObjectsHeader: React.FC<ObjectsHeaderProps> = ({
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
        {/* Left Icon: Back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Entypo name="chevron-left" size={24} color={textColor} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>

        {/* Right Icon: Add Object */}
        <TouchableOpacity
          onPress={() => navigation.navigate('AddObject')}
          accessibilityLabel="Add new object"
        >
          <Entypo name="plus" size={24} color={textColor} />
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
});
