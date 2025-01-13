/**
 * ThemedFABGroup
 *
 * Matches React Native Paper's FAB.Group:
 * - Open/close animation with a backdrop
 * - Speed dial items that animate in/out
 * - Press/long-press toggling
 * - Uses ThemedFAB for mini-fabs
 */
import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Pressable,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  TextStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedFAB, {
  ThemedFABProps,
  FABSize,
  FABType,
} from "@/components/templates/buttons/ThemedFAB";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { IconName } from "@/components/templates/icons/ThemedIcon";

// ################################################################################
// ACTION INTERFACE
// ################################################################################

export interface ThemedFABGroupAction {
  iconName: IconName;
  label?: string;
  onPress?: (event: GestureResponderEvent) => void;

  // Theming / color overrides
  color?: { light?: string; dark?: string };
  labelTextColor?: { light?: string; dark?: string };
  rippleColor?: { light?: string; dark?: string };
  backgroundColor?: { light?: string; dark?: string };
  borderColor?: { light?: string; dark?: string };
  borderWidth?: number;
  borderStyle?: "solid" | "dotted" | "dashed";
  elevation?: number;
  type?: FABType;

  // Sizing
  size?: FABSize;

  // Additional styling
  style?: StyleProp<ViewStyle>;
  labelContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export interface ThemedFABGroupProps {
  actions: ThemedFABGroupAction[];
  open: boolean;
  onStateChange: (state: { open: boolean }) => void;
  iconName: IconName;

  // Press events for the main FAB
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;

  // Behavior
  toggleStackOnLongPress?: boolean;
  enableLongPressWhenStackOpened?: boolean;
  visible?: boolean;

  // Backdrop
  backdropColor?: { light?: string; dark?: string };

  // Additional styling
  style?: StyleProp<ViewStyle>;
  testID?: string;

  // Speed-dial spacing
  speedDialToMainSpacing?: number;
  speedDialBetweenSpacing?: number;

  // Extended label on the main FAB
  label?: string;

  // Provide partial ThemedFABProps for different states
  closedMainFabProps?: Partial<ThemedFABProps>;
  openMainFabProps?: Partial<ThemedFABProps>;
  miniFabProps?: Partial<ThemedFABProps>;
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedFABGroup: React.FC<ThemedFABGroupProps> = ({
  actions,
  open,
  onStateChange,
  iconName,
  onPress,
  onLongPress,
  toggleStackOnLongPress = false,
  enableLongPressWhenStackOpened = false,
  visible = true,
  backdropColor,
  speedDialToMainSpacing = -40,
  speedDialBetweenSpacing = 100,
  style,
  testID = "themed-fab-group",
  label,
  closedMainFabProps = {},
  openMainFabProps = {},
  miniFabProps = {},
}) => {
  // Safe area insets for iPhone X, etc.
  const safeArea = useSafeAreaInsets();

  // Backdrop animation
  const backdropAnim = useRef(new Animated.Value(0)).current;

  // Individual action animations
  const actionAnimations = useRef(actions.map(() => new Animated.Value(open ? 1 : 0)));

  // Re-init action animations if actions change
  useEffect(() => {
    actionAnimations.current = actions.map(
      (_, i) => actionAnimations.current[i] || new Animated.Value(open ? 1 : 0)
    );
  }, [actions, open]);

  // Animate open/close
  useEffect(() => {
    if (open) {
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.stagger(
        50,
        actionAnimations.current
          .map((anim) =>
            Animated.timing(anim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            })
          )
          .reverse()
      ).start();
    } else {
      Animated.parallel(
        actionAnimations.current.map((anim) =>
          Animated.timing(anim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          })
        )
      ).start();
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [open, actions]);

  // Helpers to close/toggle
  const closeStack = () => onStateChange({ open: false });
  const toggleStack = () => onStateChange({ open: !open });

  // Fallback backdrop
  const fallbackBackdrop = {
    light: "rgba(0,0,0,0.5)",
    dark: "rgba(255,255,255,0.2)",
  };

  // Resolve backdrop color
  const resolvedBackdropColor = useThemeColor(
    backdropColor ?? fallbackBackdrop,
    "fabRipplePrimary" // or a more specific color key if you prefer
  );

  // Main press handlers
  const handleMainPress = (e: GestureResponderEvent) => {
    onPress?.(e);
    // If user didn't request toggling on longPress only, or if stack is open, toggle
    if (!toggleStackOnLongPress || open) {
      toggleStack();
    }
  };

  const handleGroupLongPress = (e: GestureResponderEvent) => {
    if (!open || enableLongPressWhenStackOpened) {
      onLongPress?.(e);
      if (toggleStackOnLongPress) {
        toggleStack();
      }
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <View testID={testID} pointerEvents="box-none" style={[styles.container, style]}>
      {/* Backdrop */}
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: resolvedBackdropColor,
            opacity: backdropAnim,
          },
        ]}
      >
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={closeStack}
          testID={`${testID}-backdrop-pressable`}
        />
      </Animated.View>

      {/* Speed-dial mini-FABs */}
      <View
        pointerEvents={open ? "box-none" : "none"}
        style={[
          styles.actionsContainer,
          {
            paddingRight: safeArea.right + 16,
            paddingBottom: safeArea.bottom + 16,
            paddingLeft: safeArea.left,
            paddingTop: safeArea.top,
          },
        ]}
      >
        {actions.map((action, i) => {
          // We animate from the last item to the first => reverse index
          const idx = actions.length - 1 - i;
          const anim = actionAnimations.current[idx];

          // The distance to move upward for each action
          const translateDistance = speedDialToMainSpacing + i * speedDialBetweenSpacing;

          // Animate scale + Y translation
          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          });
          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -translateDistance],
          });

          const hasLabel = !!action.label;

          return (
            <View
              key={`fab-action-${i}`}
              style={styles.actionWrapper}
              pointerEvents={open ? "box-none" : "none"}
            >
              {/* Optional label */}
              {hasLabel && (
                <Animated.View
                  style={[
                    styles.labelContainer,
                    action.labelContainerStyle,
                    {
                      opacity: anim,
                      transform: [{ scale }, { translateY }],
                    },
                  ]}
                >
                  <Pressable
                    style={styles.labelPressable}
                    onPress={(e) => {
                      action.onPress?.(e);
                      closeStack();
                    }}
                  >
                    <ThemedText
                      style={[
                        styles.labelText,
                        action.labelStyle,
                        {
                          // fallback text color is #FFF if not provided
                          color: action.labelTextColor?.light ?? "#FFFFFF",
                        },
                      ]}
                      type="defaultSemiBold"
                    >
                      {action.label}
                    </ThemedText>
                  </Pressable>
                </Animated.View>
              )}

              {/* Mini-FAB itself */}
              <Animated.View
                style={[
                  styles.miniFabContainer,
                  {
                    transform: [{ scale }, { translateY }],
                    opacity: anim,
                  },
                  action.style,
                ]}
              >
                <ThemedFAB
                  {...miniFabProps}
                  iconName={action.iconName}
                  type={action.type ?? miniFabProps.type ?? "primary"}
                  size={action.size ?? miniFabProps.size ?? "small"}
                  backgroundColor={action.backgroundColor ?? miniFabProps.backgroundColor}
                  borderColor={action.borderColor ?? miniFabProps.borderColor}
                  borderWidth={action.borderWidth ?? miniFabProps.borderWidth}
                  borderStyle={action.borderStyle ?? miniFabProps.borderStyle}
                  elevation={action.elevation ?? miniFabProps.elevation}
                  color={action.color ?? miniFabProps.color}
                  rippleColor={action.rippleColor ?? miniFabProps.rippleColor}
                  onPress={(e) => {
                    action.onPress?.(e);
                    closeStack();
                  }}
                />
              </Animated.View>
            </View>
          );
        })}
      </View>

      {/* Main FAB */}
      <View
        style={[
          styles.mainFabContainer,
          {
            right: safeArea.right + 16,
            bottom: safeArea.bottom + 16,
          },
        ]}
      >
        {open ? (
          <ThemedFAB
            iconName={iconName}
            label={label}
            onPress={handleMainPress}
            onLongPress={handleGroupLongPress}
            disabled={false}
            {...openMainFabProps}
          />
        ) : (
          <ThemedFAB
            iconName={iconName}
            label={label}
            onPress={handleMainPress}
            onLongPress={handleGroupLongPress}
            disabled={false}
            {...closedMainFabProps}
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(ThemedFABGroup);

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  actionsContainer: {
    alignItems: "flex-end",
  },
  actionWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelContainer: {
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  labelPressable: {
    flex: 1,
  },
  labelText: {
    fontSize: 14,
    color: "#fff",
  },
  miniFabContainer: {},
  mainFabContainer: {
    position: "absolute",
  },
});
