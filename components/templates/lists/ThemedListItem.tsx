import React, { useState } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedTouchableRipple from "@/components/templates/buttons/ThemedTouchableRipple";
import { ThemedText } from "../typography/ThemedText";

/**
 * -----------------------------------------------------------------------------
 * THEME COLOR TYPE
 * -----------------------------------------------------------------------------
 */
type ListBackgroundColorType =
  | "listItemBackgroundPrimary"
  | "listItemBackgroundSecondary"
  | "listItemBackgroundTertiary";

type ListTextColorType =
  | "listItemTextColorPrimary"
  | "listItemTextColorSecondary"
  | "listItemTextColorTertiary";

type ListDescriptionColorType =
  | "listItemDescriptionColorPrimary"
  | "listItemDescriptionColorSecondary"
  | "listItemDescriptionColorTertiary";

export type ThemedListType = "primary" | "secondary" | "tertiary";

/**
 * -----------------------------------------------------------------------------
 * PROPS
 * -----------------------------------------------------------------------------
 * We add optional width & height to customize the container’s size.
 */
type TitleProp =
  | React.ReactNode
  | ((
      props: {
        color: string;
        fontSize: number;
        ellipsizeMode?: "head" | "middle" | "tail" | "clip";
      }
    ) => React.ReactNode);

type DescriptionProp =
  | React.ReactNode
  | ((
      props: {
        color: string;
        fontSize: number;
        ellipsizeMode?: "head" | "middle" | "tail" | "clip";
      }
    ) => React.ReactNode);

export interface ThemedListItemProps {
  title: TitleProp;
  description?: DescriptionProp;
  left?: (props: { color: string }) => React.ReactNode;
  right?: (props: { color: string }) => React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;

  // Title
  titleStyle?: StyleProp<TextStyle>;
  titleNumberOfLines?: number;
  titleEllipsizeMode?: "head" | "middle" | "tail" | "clip";
  titleMaxFontSizeMultiplier?: number;

  // Description
  descriptionStyle?: StyleProp<TextStyle>;
  descriptionNumberOfLines?: number;
  descriptionEllipsizeMode?: "head" | "middle" | "tail" | "clip";
  descriptionMaxFontSizeMultiplier?: number;

  // Theming
  themeType?: ThemedListType;

  /**
   * Custom dimensions for this item.
   */
  width?: number;
  height?: number;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
function ThemedListItem({
  themeType = "primary",
  title,
  description,
  left,
  right,
  onPress,
  style,
  contentStyle,
  titleStyle,
  titleNumberOfLines = 1,
  titleEllipsizeMode,
  titleMaxFontSizeMultiplier,
  descriptionStyle,
  descriptionNumberOfLines = 2,
  descriptionEllipsizeMode,
  descriptionMaxFontSizeMultiplier,

  // New custom dimension props
  width,
  height,
}: ThemedListItemProps) {
  // Build color keys
  const backgroundKey = `listItemBackground${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListBackgroundColorType;

  const textKey = `listItemTextColor${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListTextColorType;

  const descKey = `listItemDescriptionColor${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ListDescriptionColorType;

  const itemBackground = useThemeColor({}, backgroundKey);
  const itemTextColor = useThemeColor({}, textKey);
  const itemDescriptionColor = useThemeColor({}, descKey);

  const [alignToTop, setAlignToTop] = useState(false);

  const onDescriptionTextLayout = (
    e: NativeSyntheticEvent<TextLayoutEventData>
  ) => {
    setAlignToTop(e.nativeEvent.lines.length >= 2);
  };

  // Title logic
  const renderTitle = () => {
    const fontSize = 16;
    if (typeof title === "function") {
      return title({
        color: itemTextColor,
        fontSize,
        ellipsizeMode: titleEllipsizeMode,
      });
    }
    return (
      <ThemedText
        style={[{ color: itemTextColor, fontSize }, styles.title, titleStyle]}
        numberOfLines={titleNumberOfLines}
        ellipsizeMode={titleEllipsizeMode}
        maxFontSizeMultiplier={titleMaxFontSizeMultiplier}
      >
        {title}
      </ThemedText>
    );
  };

  // Description logic
  const renderDescription = () => {
    const fontSize = 14;
    if (!description) return null;

    if (typeof description === "function") {
      return description({
        color: itemDescriptionColor,
        fontSize,
        ellipsizeMode: descriptionEllipsizeMode,
      });
    }
    return (
      <ThemedText
        style={[
          { color: itemDescriptionColor, fontSize },
          styles.description,
          descriptionStyle,
        ]}
        numberOfLines={descriptionNumberOfLines}
        ellipsizeMode={descriptionEllipsizeMode}
        onTextLayout={onDescriptionTextLayout}
        maxFontSizeMultiplier={descriptionMaxFontSizeMultiplier}
      >
        {description}
      </ThemedText>
    );
  };

  // Left element
  const leftElement = left
    ? left({
        color: itemDescriptionColor,
      })
    : null;

  // Right element
  const rightElement = right
    ? right({
        color: itemDescriptionColor,
      })
    : null;

  return (
    <ThemedTouchableRipple
      onPress={onPress}
      style={[
        {
          backgroundColor: itemBackground,
          padding: 8,
        },
        styles.container,
        // Apply optional custom width/height
        { width, height },
        style,
      ]}
    >
      <View style={styles.row}>
        {leftElement && (
          <View style={[styles.leftContainer, alignToTop && styles.leftAlign]}>
            {leftElement}
          </View>
        )}
        <View style={[styles.content, contentStyle]}>
          {renderTitle()}
          {renderDescription()}
        </View>
        {rightElement && (
          <View
            style={[styles.rightContainer, alignToTop && styles.rightAlign]}
          >
            {rightElement}
          </View>
        )}
      </View>
    </ThemedTouchableRipple>
  );
}

export default React.memo(ThemedListItem);

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  leftContainer: {
    marginVertical: 6,
    paddingLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  leftAlign: {
    alignSelf: "flex-start",
  },
  content: {
    flex: 1,
    marginVertical: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  rightContainer: {
    marginVertical: 6,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  rightAlign: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
});
