/**
 * ThemedFABGroup.tsx
 *
 * A “speed-dial” grouping of multiple FABs that appear when the main FAB is pressed.
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
import { ThemedText } from "@/components/templates/general/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { IconName } from "@/components/templates/icons/ThemedIcon";

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export interface ThemedFABGroupAction {
  iconName: IconName;
  label?: string;
  onPress?: (event: GestureResponderEvent) => void;
  color?: { light?: string; dark?: string };
  labelTextColor?: { light?: string; dark?: string };
  style?: StyleProp<ViewStyle>;
  labelContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  rippleColor?: { light?: string; dark?: string };
  size?: FABSize;
  backgroundColor?: { light?: string; dark?: string };
  borderColor?: { light?: string; dark?: string };
  borderWidth?: number;
  borderStyle?: "solid" | "dotted" | "dashed";
  elevation?: number;
  type?: FABType;
}

export interface ThemedFABGroupProps {
  actions: ThemedFABGroupAction[];
  open: boolean;
  onStateChange: (state: { open: boolean }) => void;
  iconName: IconName;

  // If user wants onPress on the main FAB
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;

  // Toggling approach
  toggleStackOnLongPress?: boolean;
  enableLongPressWhenStackOpened?: boolean;

  // Visibility
  visible?: boolean;

  // For backdrop color
  backdropColor?: { light?: string; dark?: string };

  // Overall style
  style?: StyleProp<ViewStyle>;
  testID?: string;

  // Spacing
  /**
   * Distance from the main FAB to the first mini-FAB.
   * @default -40
   */
  speedDialToMainSpacing?: number;

  /**
   * Distance between subsequent mini-FABs.
   * @default 100
   */
  speedDialBetweenSpacing?: number;

  // The main FAB labeling
  label?: string;

  // If you want two distinct designs for the main FAB in "closed" vs "open" states:
  closedMainFabProps?: Partial<ThemedFABProps>;
  openMainFabProps?: Partial<ThemedFABProps>;

  // If you want all mini-FABs to share certain styling
  miniFabProps?: Partial<ThemedFABProps>;
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

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

  // Distinct main FAB styling
  closedMainFabProps = {},
  openMainFabProps = {},

  // Uniform mini-FAB styling
  miniFabProps = {},
}) => {
  const safeArea = useSafeAreaInsets();

  // Animate backdrop
  const backdropAnim = useRef(new Animated.Value(0)).current;
  // Animate each action
  const actionAnimations = useRef(
    actions.map(() => new Animated.Value(open ? 1 : 0))
  );

  useEffect(() => {
    actionAnimations.current = actions.map(
      (_, i) => actionAnimations.current[i] || new Animated.Value(open ? 1 : 0)
    );
  }, [actions, open]);

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

  const closeStack = () => onStateChange({ open: false });
  const toggleStack = () => onStateChange({ open: !open });

  const fallbackBackdrop = {
    light: "rgba(0,0,0,0.5)",
    dark: "rgba(255,255,255,0.2)",
  };
  const resolvedBackdropColor = useThemeColor(
    backdropColor ?? fallbackBackdrop,
    "fabRipplePrimary"
  );

  const handleMainPress = (e: GestureResponderEvent) => {
    onPress?.(e);
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
    <View
      testID={testID}
      pointerEvents="box-none"
      style={[styles.container, style]}
    >
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
          const idx = actions.length - 1 - i;
          const anim = actionAnimations.current[idx];

          // Distances
          const translateDistance =
            speedDialToMainSpacing + i * speedDialBetweenSpacing;
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
                  // Merge the user's override for each action with the global miniFabProps
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

      {/* Main FAB - pick open vs closed styling */}
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
            // merge user props for "open" state
            iconName={iconName}
            label={label}
            onPress={handleMainPress}
            disabled={false}
            {...openMainFabProps}
          />
        ) : (
          <ThemedFAB
            // merge user props for "closed" state
            iconName={iconName}
            label={label}
            onPress={handleMainPress}
            disabled={false}
            {...closedMainFabProps}
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(ThemedFABGroup);

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

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
