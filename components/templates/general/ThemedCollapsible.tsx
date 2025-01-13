import React, { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { ThemedText } from "@/components/templates/typography/ThemedText";
import { ThemedView } from "@/components/templates/containers/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

// ################################################################################
// THEME COLOR TYPE
// ################################################################################

/**
 * Defines color keys for ThemedCollapsible:
 * - collapsibleBackgroundPrimary / Secondary / Tertiary
 * - collapsibleTextPrimary / Secondary / Tertiary
 * - collapsibleIconPrimary / Secondary / Tertiary
 */
type ThemeColorType =
  | "collapsibleBackgroundPrimary"
  | "collapsibleBackgroundSecondary"
  | "collapsibleBackgroundTertiary"
  | "collapsibleTextPrimary"
  | "collapsibleTextSecondary"
  | "collapsibleTextTertiary"
  | "collapsibleIconPrimary"
  | "collapsibleIconSecondary"
  | "collapsibleIconTertiary";

// ################################################################################
// PROPS
// ################################################################################

export interface ThemedCollapsibleProps extends PropsWithChildren {
  title: string;
  themeType?: "primary" | "secondary" | "tertiary";

  /**
   * Override the background color of the collapsible container
   * { light?: string; dark?: string }
   */
  backgroundColor?: { light?: string; dark?: string };

  /**
   * Override the text color of the heading
   */
  textColor?: { light?: string; dark?: string };

  /**
   * Override the icon color
   */
  iconColor?: { light?: string; dark?: string };

  /**
   * Optional style if you want to further customize
   */
  style?: ViewStyle;
}

// ################################################################################
// COMPONENT
// ################################################################################

export function ThemedCollapsible({
  children,
  title,
  themeType = "primary",
  backgroundColor = {}, // default to empty => no undefined
  textColor = {},
  iconColor = {},
  style,
}: ThemedCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ----------------------------------------------------------------------------
  // HELPER: getColorKey
  // ----------------------------------------------------------------------------
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${
      variant.charAt(0).toUpperCase() + variant.slice(1)
    }` as ThemeColorType;
  };

  // ----------------------------------------------------------------------------
  // THEME COLOR RESOLUTION
  // ----------------------------------------------------------------------------
  const backgroundKey = getColorKey("collapsibleBackground", themeType);
  const resolvedBackgroundColor = useThemeColor(backgroundColor, backgroundKey);

  const textKey = getColorKey("collapsibleText", themeType);
  const resolvedTextColor = useThemeColor(textColor, textKey);

  const iconKey = getColorKey("collapsibleIcon", themeType);
  const resolvedIconColor = useThemeColor(iconColor, iconKey);

  // ----------------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------------
  return (
    <ThemedView
      style={[
        // By default, we set the container’s background color to the theme
        { backgroundColor: resolvedBackgroundColor },
        style,
      ]}
    >
      {/* Heading row with toggle icon + title */}
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={resolvedIconColor}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <ThemedText
          type="defaultSemiBold"
          style={{ color: resolvedTextColor }}
        >
          {title}
        </ThemedText>
      </TouchableOpacity>

      {/* Collapsible content when open */}
      {isOpen && (
        <ThemedView style={styles.content}>{children}</ThemedView>
      )}
    </ThemedView>
  );
}

// ################################################################################
// STYLES
// ################################################################################

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    // You can add vertical padding if you want a bigger click target:
    // paddingVertical: 4,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
