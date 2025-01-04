// styles/settingsStyles.ts

import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export const settingsStyles = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const loneIconColor = useThemeColor({}, 'loneIcon'); // Dynamic icon color

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor, // Dynamic background color
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: borderColor, // Dynamic border color
    },
    buttonText: {
      marginLeft: 12,
      fontSize: 16,
      color: textColor, // Dynamic text color
    },
    loneIcon: {
      color: loneIconColor, // Dynamic icon color
    },
  });
};
