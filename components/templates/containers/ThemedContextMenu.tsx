// ThemedContextMenu.tsx

import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
  FlatList,
  LayoutRectangle,
  findNodeHandle,
  UIManager,
  Platform,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/templates/general/ThemedText"; // If desired

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

type ThemeColorType =
  | "contextMenuContainerBackgroundPrimary"
  | "contextMenuContainerBorderColorPrimary"
  | "contextMenuContainerShadowColorPrimary"
  | "contextMenuContainerBackgroundSecondary"
  | "contextMenuContainerBorderColorSecondary"
  | "contextMenuContainerShadowColorSecondary"
  | "contextMenuContainerBackgroundTertiary"
  | "contextMenuContainerBorderColorTertiary"
  | "contextMenuContainerShadowColorTertiary";

// ################################################################################
// TYPES
// ################################################################################

export interface ThemedContextMenuAction {
  title: string;
  subtitle?: string;
  destructive?: boolean;
  disabled?: boolean;
  selected?: boolean;
  iconColor?: string;
  icon?: string;
}

export interface ThemedContextMenuPressEvent {
  nativeEvent: {
    index: number;
    name: string;
  };
}

export interface ThemedContextMenuProps {
  // Title displayed at the top of the context menu
  title?: string;
  // The list of actions for this menu
  actions?: ThemedContextMenuAction[];
  // Called when an action is selected
  onPress?: (event: ThemedContextMenuPressEvent) => void;
  // Called when user cancels (taps outside)
  onCancel?: () => void;

  // Single-tap vs. long-press
  dropdownMenuMode?: boolean;
  disabled?: boolean;

  // The content that triggers the menu
  children: React.ReactNode;

  // THEMED container props
  themeType?: "primary" | "secondary" | "tertiary";
  containerStyle?: StyleProp<ViewStyle>;
  showContainerBorder?: boolean;
  showContainerShadow?: boolean;
  containerBorderWidth?: number;
  containerBorderRadius?: number;
  backgroundColor?: { light?: string; dark?: string };
  borderColor?: { light?: string; dark?: string };
  shadowColor?: { light?: string; dark?: string };

  // Additional styling for the overlay or menu
  overlayColor?: string;
  overlayOpacity?: number;

  // ############################################################################
  // ANCHOR PROPS
  // ############################################################################

  /**
   * If true, the menu is anchored to the child's location instead of centered.
   * We'll measure the child's position and position the menu accordingly.
   */
  anchorToChild?: boolean;

  /**
   * Where to show the menu relative to the child:
   * - "below" (default)
   * - "above"
   * - "left"
   * - "right"
   */
  anchorAlignment?: "below" | "above" | "left" | "right";

  /**
   * Additional offset (in px) to shift the menu from the child's location.
   * Positive or negative values are allowed.
   */
  anchorOffsetX?: number;
  anchorOffsetY?: number;
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedContextMenu: React.FC<ThemedContextMenuProps> = ({
  title,
  actions = [],
  onPress,
  onCancel,
  dropdownMenuMode = false,
  disabled = false,
  children,

  // THEMED container props
  themeType = "primary",
  containerStyle,
  showContainerBorder = false,
  showContainerShadow = false,
  containerBorderWidth = 0,
  containerBorderRadius = 8,
  backgroundColor = {},
  borderColor = {},
  shadowColor = {},
  overlayOpacity = 0.0,
  overlayColor = "rgba(0, 0, 0, 0)",

  // ANCHOR PROPS
  anchorToChild = false,
  anchorAlignment = "below",
  anchorOffsetX = 0,
  anchorOffsetY = 0,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  // We'll store the child's layout coords
  const [childLayout, setChildLayout] = useState<LayoutRectangle | null>(null);

  // ref to the Pressable or wrapper to measure
  const childRef = useRef<View>(null);

  // ############################################################################
  // THEME
  // ############################################################################

  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${
      theme.charAt(0).toUpperCase() + theme.slice(1)
    }` as ThemeColorType;
  };

  const themedBackgroundColor = useThemeColor(
    backgroundColor,
    getColorKey("contextMenuContainerBackground", themeType)
  );
  const themedBorderColor = useThemeColor(
    borderColor,
    getColorKey("contextMenuContainerBorderColor", themeType)
  );
  const themedShadowColor = useThemeColor(
    shadowColor,
    getColorKey("contextMenuContainerShadowColor", themeType)
  );

  // ############################################################################
  // STYLES
  // ############################################################################

  const containerShadowStyle = showContainerShadow
    ? {
        shadowColor: themedShadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      }
    : {};

  const menuStyle = {
    backgroundColor: themedBackgroundColor,
    borderColor: showContainerBorder ? themedBorderColor : "transparent",
    borderWidth: showContainerBorder ? containerBorderWidth : 0,
    borderRadius: containerBorderRadius,
  };

  // ############################################################################
  // HANDLERS
  // ############################################################################

  const closeMenu = () => {
    setMenuVisible(false);
    onCancel?.();
  };

  const handlePressAction = useCallback(
    (index: number, name: string) => {
      setMenuVisible(false);
      if (onPress) {
        onPress({
          nativeEvent: {
            index,
            name,
          },
        });
      }
    },
    [onPress]
  );

  /**
   * We'll measure the child container's position and size, then open the menu.
   */
  const openMenu = () => {
    if (disabled) return;

    if (anchorToChild && childRef.current) {
      const nodeHandle = findNodeHandle(childRef.current);
      if (nodeHandle) {
        UIManager.measure(nodeHandle, (x, y, width, height, pageX, pageY) => {
          // store layout in state
          setChildLayout({ x: pageX, y: pageY, width, height });
          setMenuVisible(true);
        });
      } else {
        // fallback if measure fails
        setMenuVisible(true);
      }
    } else {
      setMenuVisible(true);
    }
  };

  // `dropdownMenuMode` => single tap to open, else long-press
  const pressProps =
    dropdownMenuMode === true
      ? { onPress: openMenu }
      : { onLongPress: openMenu };

  // ############################################################################
  // POSITIONING LOGIC
  // ############################################################################

  /**
   * We'll compute the absolute position for the menu if anchorToChild is true.
   * Otherwise, we center it in the screen.
   */
  const getMenuPositionStyle = (): ViewStyle => {
    if (!anchorToChild || !childLayout) {
      // Centered approach
      return {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      };
    }

    // We have child layout => absolutely position the menu container
    let top = childLayout.y;
    let left = childLayout.x;

    // By default "below" => top = child's y + child's height
    switch (anchorAlignment) {
      case "below":
        top = childLayout.y + childLayout.height + anchorOffsetY;
        left += anchorOffsetX; // maybe center horizontally over the child
        break;
      case "above":
        top = childLayout.y - anchorOffsetY; // might want to subtract menu height, but we don't know it yet
        left += anchorOffsetX;
        break;
      case "left":
        // anchor menu to the left of the child
        top += anchorOffsetY;
        left = childLayout.x - anchorOffsetX;
        break;
      case "right":
        top += anchorOffsetY;
        left = childLayout.x + childLayout.width + anchorOffsetX;
        break;
    }

    return {
      position: "absolute",
      top,
      left,
    };
  };

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <View style={[styles.wrapperContainer, containerStyle]}>
      <View ref={childRef}>
        <Pressable disabled={disabled} {...pressProps}>
          {children}
        </Pressable>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        {/* Tap outside to dismiss */}
        <Pressable
          style={[
            styles.overlay,
            {
              backgroundColor: overlayColor.replace(
                /rgba?\(([^)]+)\)/,
                (_, color) =>
                  `rgba(${color
                    .split(",")
                    .slice(0, 3)
                    .join(",")}, ${overlayOpacity})`
              ), // Combine overlayColor and overlayOpacity
            },
          ]}
          onPress={closeMenu}
        />

        {/* The container that either is centered or absolutely positioned */}
        <View
          style={[styles.modalContainer, getMenuPositionStyle()]}
          pointerEvents="box-none"
        >
          <View style={[styles.menuContainer, containerShadowStyle, menuStyle]}>
            {/* Title */}
            {title ? (
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
              </View>
            ) : null}

            <FlatList
              data={actions}
              keyExtractor={(_, index) => String(index)}
              contentContainerStyle={{ flexGrow: 0 }}
              renderItem={({ item, index }) => {
                const { destructive, disabled, selected } = item;
                return (
                  <Pressable
                    onPress={() =>
                      !disabled && handlePressAction(index, item.title)
                    }
                    style={[styles.actionItem, disabled && styles.itemDisabled]}
                  >
                    <Text
                      style={[
                        styles.actionText,
                        destructive && { color: "red" },
                        disabled && { color: "#999" },
                        selected && { fontWeight: "bold" },
                      ]}
                    >
                      {item.title}
                      {item.subtitle ? `\n${item.subtitle}` : ""}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  wrapperContainer: {
    // Container for the child
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    // By default we center, but if anchorToChild is true, we position absolutely
  },
  menuContainer: {
    minWidth: 200,
    maxWidth: 300,
    maxHeight: 300, // ensure menu doesn't fill the screen
    paddingVertical: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  titleContainer: {
    padding: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actionText: {
    fontSize: 15,
    color: "#000",
  },
  itemDisabled: {
    opacity: 0.5,
  },
});

export default React.memo(ThemedContextMenu);
