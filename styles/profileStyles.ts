import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor'; // Adjust the import path based on your project structure

export const profileStyles = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      position: 'relative',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: textColor,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
  });
};
