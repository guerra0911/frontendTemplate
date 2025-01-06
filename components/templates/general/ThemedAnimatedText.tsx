import React from 'react';
import { Animated, StyleSheet, TextStyle, I18nManager } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor'; // your hook

/**
 * Props for ThemedAnimatedText
 */
export interface ThemedAnimatedTextProps
  extends React.ComponentProps<typeof Animated.Text> {
  /**
   * Optionally override the text color from your color file:
   * e.g. { light?: string, dark?: string }
   */
  color?: { light?: string; dark?: string };
  style?: TextStyle | TextStyle[];
  testID?: string;
}

/**
 * A minimal AnimatedText that uses your theming approach
 * for text color, plus standard styling props.
 */
const ThemedAnimatedText: React.FC<ThemedAnimatedTextProps> = ({
  style,
  color,
  testID = 'themed-animated-text',
  ...rest
}) => {
  // If user has a color override, use it; else default to "text" from your Colors.
  const resolvedColor = useThemeColor(color ?? {}, 'text');
  const writingDirection = I18nManager.isRTL ? 'rtl' : 'ltr';

  return (
    <Animated.Text
      testID={testID}
      {...rest}
      style={[
        styles.default,
        { color: resolvedColor, writingDirection },
        style, // just ensure we don't pass null
      ]}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    textAlign: 'left',
  },
});

export default React.memo(ThemedAnimatedText);
