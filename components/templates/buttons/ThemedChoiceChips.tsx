import React, { useMemo, useCallback } from "react";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedToggleButton from "./ThemedToggleButton";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Below are all possible container color states for ThemedChoiceChips.
 * We cover primary, secondary, tertiary for both normal and disabled states,
 * plus shadows, borders, and padding colors.
 */
type ThemeColorType =
  // NORMAL (container)
  | "choiceChipsContainerBackgroundPrimary"
  | "choiceChipsContainerBorderColorPrimary"
  | "choiceChipsContainerShadowColorPrimary"
  | "choiceChipsContainerPaddingColorPrimary"

  | "choiceChipsContainerBackgroundSecondary"
  | "choiceChipsContainerBorderColorSecondary"
  | "choiceChipsContainerShadowColorSecondary"
  | "choiceChipsContainerPaddingColorSecondary"

  | "choiceChipsContainerBackgroundTertiary"
  | "choiceChipsContainerBorderColorTertiary"
  | "choiceChipsContainerShadowColorTertiary"
  | "choiceChipsContainerPaddingColorTertiary"

  // DISABLED (container)
  | "choiceChipsContainerDisabledBackgroundPrimary"
  | "choiceChipsContainerDisabledBorderColorPrimary"
  | "choiceChipsContainerDisabledShadowColorPrimary"
  | "choiceChipsContainerDisabledPaddingColorPrimary"

  | "choiceChipsContainerDisabledBackgroundSecondary"
  | "choiceChipsContainerDisabledBorderColorSecondary"
  | "choiceChipsContainerDisabledShadowColorSecondary"
  | "choiceChipsContainerDisabledPaddingColorSecondary"

  | "choiceChipsContainerDisabledBackgroundTertiary"
  | "choiceChipsContainerDisabledBorderColorTertiary"
  | "choiceChipsContainerDisabledShadowColorTertiary"
  | "choiceChipsContainerDisabledPaddingColorTertiary";

// ################################################################################
// ICON LIBRARIES
// ################################################################################

type SupportedIconLibraries = "Ionicons" | "MaterialIcons" | "FontAwesome";

export interface ChoiceChipItem {
  title: string;
  iconName?:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof FontAwesome.glyphMap;
  iconLibrary?: SupportedIconLibraries;
}

// ################################################################################
// PROPS INTERFACES
// ################################################################################

/**
 * Container-level props are grouped here to align with your new structure.
 * They control the theming, styling, and shape of the outer container.
 */
export interface ThemedChoiceChipsContainerProps {
  // Theming
  themeType?: "primary" | "secondary" | "tertiary";
  disabled?: boolean; // If true, container uses a disabled theme

  // Dimensions / Layout
  style?: StyleProp<ViewStyle>; // Additional container-level style
  borderRadius?: number | "factor"; // Container-level radius if desired
  borderWidth?: number;
  borderStyle?: "solid" | "dashed" | "dotted";

  // Colors overrides
  background?: { light?: string; dark?: string };
  borderColor?: { light?: string; dark?: string };
  shadowColor?: { light?: string; dark?: string };
  paddingColor?: { light?: string; dark?: string };

  // Shadows
  shadows?: {
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  };

  // Internal padding
  internalPadding?: number;
}

/**
 * Main props for ThemedChoiceChips, including container, items, selection rules, etc.
 */
export interface ThemedChoiceChipsProps {
  // FUNCTIONALITY
  items: ChoiceChipItem[];
  selectedIndices: number[];
  onSelectedChange: (newSelectedIndices: number[]) => void;
  accessibilityLabel?: string;

  // SELECTION RULES
  minSelected?: number;
  maxSelected?: number;

  // LAYOUT FOR THE CHIPS
  numberOfRows?: number;
  verticalRowSpacing?: number;
  horizontalChipSpacing?: number;
  stagger?: number; // left-right staggering of rows

  // PER-CHIP DIMENSIONS & APPEARANCE
  customHeight?: number;
  customWidth?: number;
  customRadius?: number | "factor";
  roundedAllCorners?: boolean;

  // CHIP-LEVEL THEME & PROPS (these pass to ThemedToggleButton)
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

  /**
   * Container-level props object for the outer box styling and theming.
   * If not specified, defaults are used.
   */
  container?: ThemedChoiceChipsContainerProps;
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedChoiceChips: React.FC<ThemedChoiceChipsProps> = ({
  // FUNCTIONALITY
  items,
  selectedIndices,
  onSelectedChange,
  accessibilityLabel = "Choice Chips",
  minSelected = 0,
  maxSelected = Infinity,

  // LAYOUT
  numberOfRows,
  verticalRowSpacing = 10,
  horizontalChipSpacing = 10,
  stagger = 0,

  // PER-CHIP DIMENSIONS & APPEARANCE
  customHeight = 40,
  customWidth = 100,
  customRadius = 8,
  roundedAllCorners = false,

  // CHIP-LEVEL PROPS
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

  // CONTAINER PROPS
  container,
}) => {
  // Pull out container props (with some defaults)
  const {
    themeType: containerThemeType = "primary",
    disabled = false,
    style: containerStyle,
    borderRadius = 8,
    borderWidth = 0,
    borderStyle = "solid",
    background: containerBackground = {},
    borderColor: containerBorderColorOverride = {},
    shadowColor: containerShadowColorOverride = {},
    paddingColor: containerPaddingColorOverride = {},
    shadows: containerShadows = {},
    internalPadding = 10,
  } = container || {};

  // ############################################################################
  // HELPER: map string -> ThemeColorType
  // ############################################################################
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary",
    isDisabledState: boolean
  ): ThemeColorType => {
    /**
     * e.g. base = "choiceChipsContainerBackground"
     *      variant = "primary"
     * => "choiceChipsContainerBackgroundPrimary"
     *
     * If disabled, => "choiceChipsContainerDisabledBackgroundPrimary"
     */
    const disabledPrefix = isDisabledState ? "Disabled" : "";
    return `${base}${disabledPrefix}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as ThemeColorType;
  };

  const containerIsDisabled = disabled || loading.isLoading;

  // ############################################################################
  // RESOLVE CONTAINER COLORS
  // ############################################################################
  // Background color
  const resolvedContainerBgColor = useThemeColor(
    containerBackground,
    getColorKey("choiceChipsContainerBackground", containerThemeType, containerIsDisabled)
  );

  // Border color
  const resolvedContainerBorderColor = useThemeColor(
    containerBorderColorOverride,
    getColorKey("choiceChipsContainerBorderColor", containerThemeType, containerIsDisabled)
  );

  // Shadow color
  const resolvedContainerShadowColor = useThemeColor(
    containerShadowColorOverride,
    getColorKey("choiceChipsContainerShadowColor", containerThemeType, containerIsDisabled)
  );

  // Padding color
  const resolvedContainerPaddingColor = useThemeColor(
    containerPaddingColorOverride,
    getColorKey("choiceChipsContainerPaddingColor", containerThemeType, containerIsDisabled)
  );

  // ############################################################################
  // CONTAINER SHADOWS
  // ############################################################################
  const {
    offset: containerShadowOffset = { width: 0, height: 2 },
    opacity: containerShadowOpacity = 0.15,
    radius: containerShadowRadius = 3,
    elevation: containerShadowElevation = 3,
  } = containerShadows;

  const containerShadowStyle = {
    shadowColor: resolvedContainerShadowColor,
    shadowOffset: containerShadowOffset,
    shadowOpacity: containerShadowOpacity,
    shadowRadius: containerShadowRadius,
    elevation: containerShadowElevation,
  };

  // ############################################################################
  // DETERMINE ROWS
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
      // If container is disabled or loading, block toggles
      if (containerIsDisabled) return;

      const currentlySelected = selectedIndices.includes(globalIndex);
      if (currentlySelected) {
        // Deselect if above minSelected
        if (selectedIndices.length > minSelected) {
          onSelectedChange(selectedIndices.filter((i) => i !== globalIndex));
        }
      } else {
        // Select if below maxSelected
        if (selectedIndices.length < maxSelected) {
          onSelectedChange([...selectedIndices, globalIndex]);
        }
      }
    },
    [containerIsDisabled, selectedIndices, minSelected, maxSelected, onSelectedChange]
  );

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.container,
        containerShadowStyle,
        containerStyle,
        {
          backgroundColor: resolvedContainerBgColor,
          borderColor: resolvedContainerBorderColor,
          borderWidth: borderWidth,
          borderRadius: borderRadius === "factor" ? customHeight / 2 : borderRadius,
          borderStyle: borderStyle,
          padding: internalPadding,
        },
      ]}
    >
      <View
        style={{
          backgroundColor: resolvedContainerPaddingColor,
          borderRadius: borderRadius === "factor" ? customHeight / 2 : borderRadius,
        }}
      >
        {rows.map((rowItems, rowIndex) => {
          const isEvenRow = rowIndex % 2 === 0;
          const rowStyle = {
            marginBottom: rowIndex < rowCount - 1 ? verticalRowSpacing : 0,
            marginLeft: isEvenRow && stagger ? stagger : 0,
            marginRight: !isEvenRow && stagger ? stagger : 0,
          };

          return (
            <View key={`row-${rowIndex}`} style={[styles.row, rowStyle]}>
              {rowItems.map((item, colIndex) => {
                // Calculate global index for this chip
                let globalPointer = 0;
                for (let r = 0; r < rowIndex; r++) {
                  globalPointer += r < remainder ? baseCount + 1 : baseCount;
                }
                const globalIndex = globalPointer + colIndex;

                const isSelected = selectedIndices.includes(globalIndex);

                return (
                  <View
                    key={`choice-chip-${globalIndex}`}
                    style={{
                      marginRight:
                        colIndex < rowItems.length - 1 ? horizontalChipSpacing : 0,
                    }}
                  >
                    <ThemedToggleButton
                      value={isSelected}
                      onValueChange={() => handleToggle(globalIndex)}
                      disabled={containerIsDisabled}
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
    width: "100%",
  },
  row: {
    // Row styling: full width, horizontal arrangement, center content
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

// ################################################################################
// EXPORT
// ################################################################################

export default React.memo(ThemedChoiceChips);
