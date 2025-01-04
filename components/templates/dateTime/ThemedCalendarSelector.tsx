// ThemedCalendarSelector.tsx

import React, { useCallback } from "react";
import { StyleSheet, View, StyleProp, ViewStyle, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import DateTimePicker, {
  DateType,
  ModeType,
} from "react-native-ui-datepicker";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Extend or define your theme color keys specific to ThemedCalendarSelector.
 * These should match the color definitions in ThemedCalendarSelectorColors.ts
 */
type ThemeColorType =
  // CONTAINER
  | "calendarSelectorContainerBackgroundPrimary"
  | "calendarSelectorContainerBorderColorPrimary"
  | "calendarSelectorContainerShadowColorPrimary"
  | "calendarSelectorContainerBackgroundSecondary"
  | "calendarSelectorContainerBorderColorSecondary"
  | "calendarSelectorContainerShadowColorSecondary"
  | "calendarSelectorContainerBackgroundTertiary"
  | "calendarSelectorContainerBorderColorTertiary"
  | "calendarSelectorContainerShadowColorTertiary"

  // TEXT
  | "calendarSelectorTextColorPrimary"
  | "calendarSelectorTextColorSecondary"
  | "calendarSelectorTextColorTertiary"

  // SEPARATOR (e.g., line under days)
  | "calendarSelectorSeparatorColorPrimary"
  | "calendarSelectorSeparatorColorSecondary"
  | "calendarSelectorSeparatorColorTertiary";

// ################################################################################
// PROPS INTERFACE
// ################################################################################

export interface ThemedCalendarSelectorProps {
  // FUNCTIONALITY (from react-native-ui-datepicker)
  mode?: ModeType; // 'single' | 'range' | 'multiple'
  locale?: string; // default 'en'
  minDate?: DateType;
  maxDate?: DateType;
  disabledDates?: DateType[] | ((date: DateType) => boolean);
  firstDayOfWeek?: number; // 0 = Sunday, 6 = Saturday
  displayFullDays?: boolean;
  initialView?: "day" | "month" | "year" | "time";
  height?: number;

  // SINGLE MODE
  date?: DateType;
  onChangeSingle?: (params: { date: DateType }) => void;
  timePicker?: boolean;

  // RANGE MODE
  startDate?: DateType;
  endDate?: DateType;
  onChangeRange?: (params: { startDate: DateType; endDate: DateType }) => void;

  // MULTIPLE MODE
  dates?: DateType[];
  onChangeMultiple?: (params: { dates: DateType[] }) => void;

  // STYLING PROPS (from react-native-ui-datepicker)
  calendarTextStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  selectedItemColor?: string;
  headerContainerStyle?: ViewStyle;
  headerTextContainerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  headerButtonStyle?: ViewStyle;
  headerButtonColor?: string;
  headerButtonSize?: number;
  headerButtonsPosition?: "around" | "right" | "left";
  buttonPrevIcon?: React.ReactNode;
  buttonNextIcon?: React.ReactNode;
  dayContainerStyle?: ViewStyle;
  todayContainerStyle?: ViewStyle;
  todayTextStyle?: TextStyle;
  monthContainerStyle?: ViewStyle;
  yearContainerStyle?: ViewStyle;
  weekDaysContainerStyle?: ViewStyle;
  weekDaysTextStyle?: TextStyle;
  timePickerContainerStyle?: ViewStyle;
  timePickerTextStyle?: TextStyle;
  timePickerIndicatorStyle?: ViewStyle;
  timePickerDecelerationRate?: "normal" | "fast" | number;
  selectedRangeBackgroundColor?: string;

  // THEMED CONTAINER STYLES
  themeType?: "primary" | "secondary" | "tertiary"; // to pick the color set
  containerStyle?: StyleProp<ViewStyle>;
  showContainerBorder?: boolean;
  showContainerShadow?: boolean;
  containerBorderWidth?: number;
  containerBorderRadius?: number;
  backgroundColor?: { light?: string; dark?: string };
  borderColor?: { light?: string; dark?: string };
  shadowColor?: { light?: string; dark?: string };

  // NEW: TEXT & SEPARATOR COLOR
  textColor?: { light?: string; dark?: string };
  separatorColor?: { light?: string; dark?: string };
}

// ################################################################################
// COMPONENT
// ################################################################################

const ThemedCalendarSelector: React.FC<ThemedCalendarSelectorProps> = ({
  // FUNCTIONALITY
  mode = "single",
  locale = "en",
  minDate,
  maxDate,
  disabledDates,
  firstDayOfWeek = 0,
  displayFullDays = false,
  initialView = "day",
  height,

  // SINGLE MODE
  date,
  onChangeSingle,
  timePicker = false,

  // RANGE MODE
  startDate,
  endDate,
  onChangeRange,

  // MULTIPLE MODE
  dates,
  onChangeMultiple,

  // STYLING (from library)
  calendarTextStyle,
  selectedTextStyle,
  selectedItemColor,
  headerContainerStyle,
  headerTextContainerStyle,
  headerTextStyle,
  headerButtonStyle,
  headerButtonColor,
  headerButtonSize,
  headerButtonsPosition,
  buttonPrevIcon,
  buttonNextIcon,
  dayContainerStyle,
  todayContainerStyle,
  todayTextStyle,
  monthContainerStyle,
  yearContainerStyle,
  weekDaysContainerStyle,
  weekDaysTextStyle,
  timePickerContainerStyle,
  timePickerTextStyle,
  timePickerIndicatorStyle,
  timePickerDecelerationRate,
  selectedRangeBackgroundColor,

  // THEMED CONTAINER STYLES
  themeType = "primary",
  containerStyle,
  showContainerBorder = true,
  showContainerShadow = false,
  containerBorderWidth = 1,
  containerBorderRadius = 8,
  backgroundColor = {},
  borderColor = {},
  shadowColor = {},

  // NEW: TEXT & SEPARATOR COLOR
  textColor = {},
  separatorColor = {},
}) => {
  // ############################################################################
  // HELPER: generating color keys from themeType
  // ############################################################################
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return (`${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType);
  };

  // ############################################################################
  // THEME COLORS - CONTAINER
  // ############################################################################
  const themedBackgroundColor = useThemeColor(
    backgroundColor,
    getColorKey("calendarSelectorContainerBackground", themeType)
  );
  const themedBorderColor = useThemeColor(
    borderColor,
    getColorKey("calendarSelectorContainerBorderColor", themeType)
  );
  const themedShadowColor = useThemeColor(
    shadowColor,
    getColorKey("calendarSelectorContainerShadowColor", themeType)
  );

  // ############################################################################
  // THEME COLORS - TEXT & SEPARATOR
  // ############################################################################
  const themedTextColor = useThemeColor(
    textColor,
    getColorKey("calendarSelectorTextColor", themeType)
  );
  const themedSeparatorColor = useThemeColor(
    separatorColor,
    getColorKey("calendarSelectorSeparatorColor", themeType)
  );

  // ############################################################################
  // SHADOW STYLE
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

  // ############################################################################
  // MERGE LIBRARY STYLES WITH THEMED COLORS
  // ############################################################################

  // Final text color merged into existing `calendarTextStyle`.
  // This affects days, months, years, hours, and minutes, if no color is already set.
  const finalCalendarTextStyle = {
    color: themedTextColor,
    ...(calendarTextStyle ?? {}),
  };

  // Weekdays text style
  const finalWeekDaysTextStyle = {
    color: themedTextColor,
    ...(weekDaysTextStyle ?? {}),
  };

  // Header text style (month/year/time)
  const finalHeaderTextStyle = {
    color: themedTextColor,
    ...(headerTextStyle ?? {}),
  };

  // If user didn't supply `headerButtonColor`, use the themed text color for buttons.
  const finalHeaderButtonColor = headerButtonColor ?? themedTextColor;

  // For the "separator" line under weekdays, for example, we can conditionally apply border color:
  const finalWeekDaysContainerStyle = {
    ...(weekDaysContainerStyle ?? {}),
    // For demonstration, add a top border to separate weekdays from the days grid:
    // borderTopColor: themedSeparatorColor,
    // borderTopWidth:
    //   weekDaysContainerStyle?.borderTopWidth ?? 1, // default to 1 if not set
  };

  // ############################################################################
  // ON CHANGE HANDLER
  // ############################################################################
  const handleChange = useCallback(
    (params: any) => {
      if (mode === "single" && onChangeSingle) {
        onChangeSingle(params); // { date }
      } else if (mode === "range" && onChangeRange) {
        onChangeRange(params); // { startDate, endDate }
      } else if (mode === "multiple" && onChangeMultiple) {
        onChangeMultiple(params); // { dates }
      }
    },
    [mode, onChangeSingle, onChangeRange, onChangeMultiple]
  );

  // ############################################################################
  // RENDER
  // ############################################################################

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          backgroundColor: themedBackgroundColor,
          borderColor: showContainerBorder ? themedBorderColor : "transparent",
          borderWidth: showContainerBorder ? containerBorderWidth : 0,
          borderRadius: containerBorderRadius,
          ...containerShadowStyle,
        },
      ]}
    >
      <DateTimePicker
        // FUNCTIONALITY
        mode={mode}
        locale={locale}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        firstDayOfWeek={firstDayOfWeek}
        displayFullDays={displayFullDays}
        initialView={initialView}
        height={height}
        // SINGLE
        date={date}
        onChange={handleChange}
        timePicker={timePicker}
        // RANGE
        startDate={startDate}
        endDate={endDate}
        // MULTIPLE
        dates={dates}
        // LIBRARY STYLING (merged with theme colors)
        calendarTextStyle={finalCalendarTextStyle}
        weekDaysTextStyle={finalWeekDaysTextStyle}
        headerTextStyle={finalHeaderTextStyle}
        headerButtonColor={finalHeaderButtonColor}
        headerButtonStyle={headerButtonStyle}
        headerButtonSize={headerButtonSize}
        headerButtonsPosition={headerButtonsPosition}
        headerContainerStyle={headerContainerStyle}
        headerTextContainerStyle={headerTextContainerStyle}
        dayContainerStyle={dayContainerStyle}
        todayContainerStyle={todayContainerStyle}
        todayTextStyle={todayTextStyle}
        monthContainerStyle={monthContainerStyle}
        yearContainerStyle={yearContainerStyle}
        timePickerContainerStyle={timePickerContainerStyle}
        timePickerTextStyle={timePickerTextStyle}
        timePickerIndicatorStyle={timePickerIndicatorStyle}
        timePickerDecelerationRate={timePickerDecelerationRate}
        selectedRangeBackgroundColor={selectedRangeBackgroundColor}
        selectedTextStyle={selectedTextStyle}
        selectedItemColor={selectedItemColor}
        // Apply finalWeekDaysContainerStyle for the separator
        weekDaysContainerStyle={finalWeekDaysContainerStyle}
        buttonPrevIcon={buttonPrevIcon}
        buttonNextIcon={buttonNextIcon}
      />
    </View>
  );
};

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  container: {
    // Some default container styling
    justifyContent: "center",
    alignItems: "center",
  },
});

// ################################################################################
// EXPORT
// ################################################################################

export default React.memo(ThemedCalendarSelector);
