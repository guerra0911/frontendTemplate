import React from "react";
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  StyleProp,
  ViewStyle,
} from "react-native";
import ThemedIcon, { ThemedIconProps } from "./ThemedIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

type CrossFadeIconThemeColorType =
  | "crossFadeIconColorPrimary"
  | "crossFadeIconColorSecondary"
  | "crossFadeIconColorTertiary";

export type CrossFadeIconType = "primary" | "secondary" | "tertiary";

export interface ThemedCrossFadeIconProps {
  iconName: ThemedIconProps["iconName"];
  iconLibrary?: ThemedIconProps["iconLibrary"];

  // Now color can be a string or an object. We provide a default = {}
  color?: string | { light?: string; dark?: string };

  type?: CrossFadeIconType;
  size?: number;
  style?: StyleProp<ViewStyle>;
  animationScale?: number;
  testID?: string;
}

const BASE_DURATION = 200;

/** Build the cross-fade icon color key: "crossFadeIconColorPrimary", etc. */
function getColorKey(
  base: "crossFadeIconColor",
  themeType: CrossFadeIconType
): CrossFadeIconThemeColorType {
  return `${base}${themeType.charAt(0).toUpperCase()}${themeType.slice(1)}` as CrossFadeIconThemeColorType;
}

const ThemedCrossFadeIcon: React.FC<ThemedCrossFadeIconProps> = ({
  iconName,
  iconLibrary = "Ionicons",
  color = {}, // default to an object
  type = "primary",
  size = 24,
  style,
  animationScale = 1,
  testID = "themed-cross-fade-icon",
}) => {
  const [currentIcon, setCurrentIcon] = React.useState(iconName);
  const [previousIcon, setPreviousIcon] = React.useState<string | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  // If the icon changed, we set up a transition
  if (currentIcon !== iconName) {
    setPreviousIcon(currentIcon);
    setCurrentIcon(iconName);
  }

  // Animate cross-fade + rotation
  React.useEffect(() => {
    if (previousIcon && previousIcon !== currentIcon) {
      fadeAnim.setValue(1);

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: BASE_DURATION * animationScale,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
  }, [currentIcon, previousIcon, fadeAnim, animationScale]);

  const opacityPrev = fadeAnim;
  const rotatePrev = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "0deg"],
  });

  const opacityNext = previousIcon
    ? fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      })
    : 1;
  const rotateNext = previousIcon
    ? fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-180deg"],
      })
    : "0deg";

  // Resolve color via theming if color is an object, or use the string as-is
  let resolvedColor: string;
  if (typeof color === "string") {
    resolvedColor = color;
  } else {
    // color is an object or empty
    const typedColorKey = getColorKey("crossFadeIconColor", type);
    resolvedColor = useThemeColor(color, typedColorKey);
  }

  return (
    <View
      style={[styles.container, { width: size, height: size }, style]}
      testID={testID}
    >
      {previousIcon && (
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              opacity: opacityPrev,
              transform: [{ rotate: rotatePrev }],
            },
          ]}
          testID={`${testID}-previous`}
        >
          <ThemedIcon
            iconName={previousIcon}
            iconLibrary={iconLibrary}
            size={size}
            color={resolvedColor}
          />
        </Animated.View>
      )}

      <Animated.View
        style={[
          styles.iconWrapper,
          {
            opacity: opacityNext,
            transform: [{ rotate: rotateNext }],
          },
        ]}
        testID={`${testID}-current`}
      >
        <ThemedIcon
          iconName={currentIcon}
          iconLibrary={iconLibrary}
          size={size}
          color={resolvedColor}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default React.memo(ThemedCrossFadeIcon);
