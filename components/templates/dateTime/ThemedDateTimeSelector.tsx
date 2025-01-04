import React, { useState, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/templates/general/ThemedText"; // If you have a ThemedText
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Example library
import { FontAwesome } from "@expo/vector-icons";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

type ThemeColorType =
  // BACKGROUND
  | "dateTimeSelectorBackgroundPrimary"
  | "dateTimeSelectorBackgroundSecondary"
  | "dateTimeSelectorBackgroundTertiary"

  // TEXT
  | "dateTimeSelectorTextPrimary"
  | "dateTimeSelectorTextSecondary"
  | "dateTimeSelectorTextTertiary"

  // ICON
  | "dateTimeSelectorIconColorPrimary"
  | "dateTimeSelectorIconColorSecondary"
  | "dateTimeSelectorIconColorTertiary"

  // BORDERS
  | "dateTimeSelectorBorderColorPrimary"
  | "dateTimeSelectorBorderColorSecondary"
  | "dateTimeSelectorBorderColorTertiary"

  // SHADOW
  | "dateTimeSelectorShadowColorPrimary"
  | "dateTimeSelectorShadowColorSecondary"
  | "dateTimeSelectorShadowColorTertiary"

  // PADDING
  | "dateTimeSelectorPaddingColorPrimary"
  | "dateTimeSelectorPaddingColorSecondary"
  | "dateTimeSelectorPaddingColorTertiary";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

/**
 * Possible picker types:
 * - "date"      -> shows only date
 * - "time"      -> shows only time
 * - "datetime"  -> shows combined date & time
 * - "calendar"  -> in a real scenario, might integrate a more graphical calendar library
 */
export type DateTimePickerType = "date" | "time" | "datetime";

export interface ThemedDateTimeSelectorProps {
  // FUNCTIONALITY
  value: Date;                          // Currently selected date/time
  onChange: (newDate: Date) => void;    // Callback whenever date/time is selected
  disabled?: boolean;
  pickerType?: DateTimePickerType;
  style?: StyleProp<ViewStyle>;

  // DISPLAY
  displayText?: string;                // The visible text on the button
  iconName?: keyof typeof FontAwesome.glyphMap; // Optional icon (from FontAwesome) to display
  iconSize?: number;
  iconColor?: { light?: string; dark?: string };

  // THEME
  themeType?: "primary" | "secondary" | "tertiary";

  // BORDERS
  borders?: {
    color?: { light?: string; dark?: string };
    width?: number;
    style?: "solid" | "dashed" | "dotted";
  };

  // SHADOWS
  shadows?: {
    color?: string;
    offset?: { width: number; height: number };
    opacity?: number;
    radius?: number;
    elevation?: number;
  };

  // PADDING
  padding?: {
    internal?: number;
    color?: { light?: string; dark?: string };
  };

  // DIMENSIONS
  customHeight?: number;
  customWidth?: number;
  customRadius?: number | "factor";
  roundedAllCorners?: boolean;
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedDateTimeSelector: React.FC<ThemedDateTimeSelectorProps> = ({
  // FUNCTIONALITY
  value,
  onChange,
  disabled = false,
  pickerType = "date",
  style,

  // DISPLAY
  displayText = "Select Date/Time",
  iconName,
  iconSize = 20,
  iconColor = {},

  // THEME
  themeType = "primary",

  // BORDERS
  borders = {},

  // SHADOWS
  shadows = {},

  // PADDING
  padding = {},

  // DIMENSIONS
  customHeight = 50,
  customWidth = 200,
  customRadius = 8,
  roundedAllCorners = false,
}) => {
  // ############################################################################
  // THEME COLOR HELPER
  // ############################################################################
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType;
  };

  // ############################################################################
  // COLORS
  // ############################################################################

  // BACKGROUND
  const backgroundColor = useThemeColor(
    {},
    getColorKey("dateTimeSelectorBackground", themeType)
  );

  // TEXT
  const textColor = useThemeColor(
    {},
    getColorKey("dateTimeSelectorText", themeType)
  );

  // ICON
  const resolvedIconColor = useThemeColor(
    iconColor,
    getColorKey("dateTimeSelectorIconColor", themeType)
  );

  // BORDERS
  const {
    color: borderColorObj = {},
    width: borderWidth = 0,
    style: borderStyle = "solid",
  } = borders;

  const borderColor = useThemeColor(
    borderColorObj,
    getColorKey("dateTimeSelectorBorderColor", themeType)
  );

  // SHADOWS
  const {
    color: shadowColor,
    offset = { width: 0, height: 2 },
    opacity = 0.2,
    radius = 4,
    elevation = 5,
  } = shadows;

  const resolvedShadowColor = useThemeColor(
    { light: shadowColor, dark: shadowColor },
    getColorKey("dateTimeSelectorShadowColor", themeType)
  );

  const shadowStyle = {
    shadowColor: resolvedShadowColor,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };

  // PADDING
  const {
    internal: internalPadding = 10,
    color: paddingColorObj = {},
  } = padding;

  const paddingColor = useThemeColor(
    paddingColorObj,
    getColorKey("dateTimeSelectorPaddingColor", themeType)
  );

  // DIMENSIONS
  const effectiveBorderRadius = roundedAllCorners
    ? customHeight / 2
    : customRadius === "factor"
    ? customHeight / 2
    : (customRadius as number);

  // ############################################################################
  // STATE: SHOW/HIDE PICKER
  // ############################################################################
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = useCallback(() => {
    if (!disabled) {
      setPickerVisible(true);
    }
  }, [disabled]);

  const hidePicker = useCallback(() => {
    setPickerVisible(false);
  }, []);

  // ############################################################################
  // HANDLERS
  // ############################################################################
  const handleConfirm = useCallback(
    (selected: Date) => {
      hidePicker();
      onChange(selected);
    },
    [hidePicker, onChange]
  );

  // ############################################################################
  // MODE / DISPLAY
  // ############################################################################
  let finalMode: "date" | "time" | "datetime" = "date";
  switch (pickerType) {
    case "time":
      finalMode = "time";
      break;
    case "datetime":
      finalMode = "datetime";
      break;
    case "date":
    default:
      finalMode = "date";
      break;
  }

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <View style={[shadowStyle, style]}>
      <TouchableOpacity
        style={[
          styles.selectorContainer,
          {
            width: customWidth,
            height: customHeight,
            backgroundColor: backgroundColor,
            borderRadius: effectiveBorderRadius,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderStyle: borderStyle,
            opacity: disabled ? 0.6 : 1,
            padding: internalPadding,
          },
        ]}
        onPress={showPicker}
        disabled={disabled}
      >
        <View
          style={[
            styles.innerContainer,
            { backgroundColor: paddingColor, borderRadius: effectiveBorderRadius },
          ]}
        >
          {iconName && (
            <FontAwesome
              name={iconName}
              size={iconSize}
              color={resolvedIconColor}
              style={styles.icon}
            />
          )}
          <ThemedText style={[styles.displayText, { color: textColor }]}>
            {displayText}
          </ThemedText>
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={finalMode}
        date={value}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        // **** CENTER THE PICKERS ON iOS ****
        pickerContainerStyleIOS={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  selectorContainer: {
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  displayText: {
    fontSize: 14,
    fontWeight: "500",
  },
  icon: {
    marginRight: 8,
  },
});

export default React.memo(ThemedDateTimeSelector);
