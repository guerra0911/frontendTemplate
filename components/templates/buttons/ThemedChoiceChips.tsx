import React, { useMemo, useCallback } from "react";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedToggleButton from "./ThemedToggleButton";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

type ThemeColorType =
  | "choiceChipsBackground"
  | "choiceChipsBorderColor"
  | "choiceChipsShadowColor"
  | "choiceChipsPaddingColor";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

export interface ChoiceChipItem {
  title: string;
  iconName?:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof FontAwesome.glyphMap;
  iconLibrary?: SupportedIconLibraries; // Optional: Specify the icon library
}

export interface ThemedChoiceChipsProps {
  // FUNCTIONALITY
  items: ChoiceChipItem[];
  selectedIndices: number[];
  onSelectedChange: (newSelectedIndices: number[]) => void;
  disabled?: boolean;
  accessibilityLabel?: string;

  // SELECTION RULES
  minSelected?: number;
  maxSelected?: number;

  // LAYOUT
  numberOfRows?: number;
  verticalRowSpacing?: number;
  horizontalChipSpacing?: number;
  containerInternalPadding?: number;

  /**
   * If set to a number (e.g. 15),
   * even rows (index 0, 2, 4...) get marginLeft,
   * odd rows (index 1, 3, 5...) get marginRight.
   */
  stagger?: number;

  // DIMENSIONS (per chip)
  customHeight?: number;
  customWidth?: number;
  customRadius?: number | "factor";
  roundedAllCorners?: boolean;

  // COLORS & STYLES (container)
  containerStyle?: StyleProp<ViewStyle>;
  containerBackground?: {
    light?: string;
    dark?: string;
  };

  // CHIPS PROPS
  themeType?: "primary" | "secondary" | "tertiary";
  animatedPress?: boolean;
  backgroundUntoggled?: { light?: string; dark?: string };
  textIconUntoggledColor?: { light?: string; dark?: string };
  backgroundToggled?: { light?: string; dark?: string };
  textIconToggledColor?: { light?: string; dark?: string };
  textStyle?: { style?: any };
  icons?: {
    iconPosition?: "left" | "right" | "top" | "bottom";
    iconSize?: number;
    iconPadding?: {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    };
  };
  borders?: {
    color?: { light?: string; dark?: string };
    width?: number;
    style?: "solid" | "dashed" | "dotted";
  };
  shadows?: {
    color?: string;
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  };
  padding?: {
    internal?: number;
    color?: { light?: string; dark?: string };
  };
  loading?: {
    isLoading: boolean;
    text?: string;
    color?: string;
  };
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedChoiceChips: React.FC<ThemedChoiceChipsProps> = ({
  // FUNCTIONALITY
  items,
  selectedIndices,
  onSelectedChange,
  disabled = false,
  accessibilityLabel = "Choice Chips",

  // SELECTION RULES
  minSelected = 0,
  maxSelected = Infinity,

  // LAYOUT
  numberOfRows,
  verticalRowSpacing = 10,
  horizontalChipSpacing = 10,
  containerInternalPadding = 10,
  stagger = 0,

  // DIMENSIONS
  customHeight = 40,
  customWidth = 100,
  customRadius = 8,
  roundedAllCorners = false,

  // CONTAINER
  containerStyle,
  containerBackground = {},

  // CHIPS COMMON PROPS
  themeType = "primary",
  animatedPress = false,
  backgroundUntoggled = {},
  textIconUntoggledColor = {},
  backgroundToggled = {},
  textIconToggledColor = {},
  textStyle = {},
  icons = {},
  borders = {},
  shadows = {},
  padding = {},
  loading = { isLoading: false },
}) => {
  // ############################################################################
  // Map string -> ThemeColorType
  // ############################################################################
  const getColorKey = (base: string): ThemeColorType => {
    return base as ThemeColorType;
  };

  // ############################################################################
  // Container Colors
  // ############################################################################
  const containerBgColor = useThemeColor(
    containerBackground,
    getColorKey("choiceChipsBackground")
  );
  const containerBorderColor = useThemeColor(
    {},
    getColorKey("choiceChipsBorderColor")
  );
  const containerShadowColor = useThemeColor(
    {},
    getColorKey("choiceChipsShadowColor")
  );
  const containerPaddingColor = useThemeColor(
    {},
    getColorKey("choiceChipsPaddingColor")
  );

  // ############################################################################
  // Determine Rows with "Top Rows Get Remainder First"
  // ############################################################################
  const totalItems = items.length;
  const rowCount = numberOfRows && numberOfRows > 0 ? numberOfRows : 1;

  const baseCount = Math.floor(totalItems / rowCount);
  const remainder = totalItems % rowCount;

  const rows = useMemo(() => {
    const newRows = [];
    let pointer = 0;
    for (let r = 0; r < rowCount; r++) {
      const rowSize = r < remainder ? baseCount + 1 : baseCount;
      const rowItems = items.slice(pointer, pointer + rowSize);
      pointer += rowSize;
      newRows.push(rowItems);
    }
    return newRows;
  }, [items, rowCount, baseCount, remainder]);

  // ############################################################################
  // EVENT HANDLER
  // ############################################################################
  const handleToggle = useCallback(
    (globalIndex: number) => {
      if (disabled || loading.isLoading) return;
      const currentlySelected = selectedIndices.includes(globalIndex);

      if (currentlySelected) {
        // Deselect
        onSelectedChange(selectedIndices.filter((i) => i !== globalIndex));
      } else {
        // Select
        if (selectedIndices.length < maxSelected) {
          onSelectedChange([...selectedIndices, globalIndex]);
        }
      }
    },
    [disabled, loading.isLoading, selectedIndices, maxSelected, onSelectedChange]
  );

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.container,
        containerStyle,
        {
          backgroundColor: containerBgColor,
          borderColor: containerBorderColor,
          borderWidth: borders.width,
          borderRadius: customRadius ?? 8,
          padding: containerInternalPadding,
        },
      ]}
    >
      <View
        style={{
          backgroundColor: containerPaddingColor,
          borderRadius: customRadius ?? 8,
        }}
      >
        {rows.map((rowItems, rowIndex) => {
          // Add stagger
          const isEvenRow = rowIndex % 2 === 0;
          const rowStyle = {
            marginBottom: rowIndex < rowCount - 1 ? verticalRowSpacing : 0,
            marginLeft: isEvenRow && stagger ? stagger : 0,
            marginRight: !isEvenRow && stagger ? stagger : 0,
          };

          return (
            <View key={rowIndex} style={[styles.row, rowStyle]}>
              {rowItems.map((item, colIndex) => {
                // Calculate the "globalIndex" for this chip
                let globalPointer = 0;
                for (let r = 0; r < rowIndex; r++) {
                  globalPointer += r < remainder ? baseCount + 1 : baseCount;
                }
                const globalIndex = globalPointer + colIndex;

                const isSelected = selectedIndices.includes(globalIndex);

                return (
                  <View
                    key={globalIndex}
                    style={{
                      marginRight:
                        colIndex < rowItems.length - 1 ? horizontalChipSpacing : 0,
                    }}
                  >
                    <ThemedToggleButton
                      value={isSelected}
                      onValueChange={() => handleToggle(globalIndex)}
                      disabled={disabled}
                      themeType={themeType}
                      animatedPress={animatedPress}
                      customHeight={customHeight}
                      customWidth={customWidth}
                      customRadius={customRadius}
                      roundedAllCorners={roundedAllCorners}
                      backgroundUntoggled={backgroundUntoggled}
                      textIconUntoggledColor={textIconUntoggledColor}
                      backgroundToggled={backgroundToggled}
                      textIconToggledColor={textIconToggledColor}
                      text={{ style: textStyle.style }}
                      icons={{
                        iconName: item.iconName,
                        iconLibrary: item.iconLibrary,
                        iconPosition: icons.iconPosition,
                        iconSize: icons.iconSize,
                        iconPadding: icons.iconPadding,
                      }}
                      borders={borders}
                      shadows={shadows}
                      padding={padding}
                      loading={loading}
                      title={item.title}
                    />
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start", // container-level alignment
  },
  row: {
    // 1) We make the row full-width so it can center the items horizontally.
    width: "100%",
    // 2) Horizontal layout
    flexDirection: "row",
    // 3) center them horizontally
    justifyContent: "center",
    // 4) center them vertically (as a row)
    alignItems: "center",
  },
});

// ################################################################################
// EXPORT
// ################################################################################

export default React.memo(ThemedChoiceChips);
