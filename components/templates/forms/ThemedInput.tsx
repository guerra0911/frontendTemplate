import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export const ThemedInput: React.FC<TextInputProps> = ({ style, ...rest }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');

  return (
    <TextInput
      style={[
        styles.input,
        { backgroundColor, borderColor, color: textColor },
        style,
      ]}
      placeholderTextColor={textColor}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1, // Android shadow
  },
});
