// components/ThemedDropDownPicker.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedIcon from '../icons/ThemedIcon';

////////////////////////////////////////////////////////////////////////////////
// INTERFACES
////////////////////////////////////////////////////////////////////////////////

/**
 * Define all possible color keys for ThemedDropDownPicker.
 * These should match whatever you configure in your color template (e.g. ThemedDropDownPickerColors).
 */
type ThemeColorType =
  // PRIMARY THEME
  | "dropDownBackgroundPrimary"
  | "dropDownBorderPrimary"
  | "dropDownPlaceholderPrimary"
  | "dropDownTextPrimary"
  | "dropDownSelectedItemPrimary"
  | "dropDownListBackgroundPrimary"

  // SECONDARY THEME
  | "dropDownBackgroundSecondary"
  | "dropDownBorderSecondary"
  | "dropDownPlaceholderSecondary"
  | "dropDownTextSecondary"
  | "dropDownSelectedItemSecondary"
  | "dropDownListBackgroundSecondary"

  // TERTIARY THEME
  | "dropDownBackgroundTertiary"
  | "dropDownBorderTertiary"
  | "dropDownPlaceholderTertiary"
  | "dropDownTextTertiary"
  | "dropDownSelectedItemTertiary"
  | "dropDownListBackgroundTertiary";

/**
 * Props interface for ThemedDropDownPicker
 */
interface ThemedDropDownPickerProps {
  /** Array of items to display in the dropdown */
  items: Array<{ label: string; value: any }>;
  /** Placeholder text when no item is selected */
  placeholder?: string;
  /** Callback when the selected value changes */
  onValueChange: (value: any) => void;
  /** Currently selected value */
  value: any;
  /** Theme type to apply (primary, secondary, tertiary) */
  themeType?: "primary" | "secondary" | "tertiary";
  /** Custom styles for the container */
  containerStyle?: object;
  /** Custom styles for the dropdown container */
  dropDownContainerStyle?: object;
  /** Mode of the dropdown list */
  listMode?: 'FLATLIST' | 'SCROLLVIEW' | 'MODAL'; // Removed 'BADGE'
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

/**
 * ThemedDropDownPicker
 *
 * A themed dropdown picker component that adapts to the current theme.
 * It utilizes `react-native-dropdown-picker` and custom themed icons.
 *
 * @param {ThemedDropDownPickerProps} props - Props for configuring the dropdown picker.
 * @returns {React.ReactElement} The themed dropdown picker component.
 */
const ThemedDropDownPicker: React.FC<ThemedDropDownPickerProps> = ({
  items,
  placeholder = 'Select an option',
  onValueChange,
  value,
  themeType = "primary",
  containerStyle = {},
  dropDownContainerStyle = {},
  listMode = 'SCROLLVIEW', // Default to SCROLLVIEW to prevent nesting issues
}) => {
  ////////////////////////////////////////////////////////////////////////////
  // STATE
  ////////////////////////////////////////////////////////////////////////////

  const [open, setOpen] = useState(false);
  const [localItems, setLocalItems] = useState(items);

  ////////////////////////////////////////////////////////////////////////////
  // HELPERS
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Helper: generate color key from base + themeType
   *
   * @param {string} base - Base name of the color key
   * @param {"primary" | "secondary" | "tertiary"} theme - Current theme type
   * @returns {ThemeColorType} - Generated color key
   */
  const getColorKey = (
    base: string,
    theme: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${theme.charAt(0).toUpperCase() + theme.slice(1)}` as ThemeColorType;
  };

  ////////////////////////////////////////////////////////////////////////////
  // THEME COLORS
  ////////////////////////////////////////////////////////////////////////////

  // Retrieve colors based on the current theme and themeType
  const dropDownBackground = useThemeColor(
    {},
    getColorKey("dropDownBackground", themeType)
  );

  const dropDownBorder = useThemeColor(
    {},
    getColorKey("dropDownBorder", themeType)
  );

  const dropDownPlaceholder = useThemeColor(
    {},
    getColorKey("dropDownPlaceholder", themeType)
  );

  const dropDownText = useThemeColor(
    {},
    getColorKey("dropDownText", themeType)
  );

  const dropDownSelectedItem = useThemeColor(
    {},
    getColorKey("dropDownSelectedItem", themeType)
  );

  const dropDownListBackground = useThemeColor(
    {},
    getColorKey("dropDownListBackground", themeType)
  );

  ////////////////////////////////////////////////////////////////////////////
  // RENDER
  ////////////////////////////////////////////////////////////////////////////

  return (
    <View style={[styles.container, containerStyle]}>
      <DropDownPicker
        open={open}
        value={value}
        items={localItems}
        setOpen={setOpen}
        setValue={onValueChange}
        setItems={setLocalItems}
        placeholder={placeholder}
        placeholderStyle={{ color: dropDownPlaceholder }}
        style={{
          backgroundColor: dropDownBackground,
          borderColor: dropDownBorder,
        }}
        dropDownContainerStyle={{
          backgroundColor: dropDownListBackground,
          borderColor: dropDownBorder,
          ...dropDownContainerStyle,
        }}
        labelStyle={{
          color: dropDownText,
        }}
        selectedItemLabelStyle={{
          color: dropDownSelectedItem,
        }}
        listItemLabelStyle={{
          color: dropDownText,
        }}
        // Remove arrowIconStyle and tickIconStyle to prevent TypeScript errors
        // Use ThemedIcon for custom icons instead
        ArrowUpIconComponent={() => (
          <ThemedIcon
            iconName="chevron-up"
            iconLibrary="Ionicons"
            type={themeType}
            size={20}
          />
        )}
        ArrowDownIconComponent={() => (
          <ThemedIcon
            iconName="chevron-down"
            iconLibrary="Ionicons"
            type={themeType}
            size={20}
          />
        )}
        TickIconComponent={() => (
          <ThemedIcon
            iconName="checkmark"
            iconLibrary="Ionicons"
            type={themeType}
            size={20}
          />
        )}
        listMode={listMode} // Set listMode to SCROLLVIEW
        // Optional: Customize the search bar or other elements if needed
      />
    </View>
  );
};

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    zIndex: 1000, // Ensure the dropdown appears above other elements
  },
});

////////////////////////////////////////////////////////////////////////////////
// EXPORT
////////////////////////////////////////////////////////////////////////////////

export default ThemedDropDownPicker;
