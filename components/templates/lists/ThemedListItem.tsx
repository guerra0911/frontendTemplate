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
  /** Title text or function. */
  title: TitleProp;
  /** Description text or function. */
  description?: DescriptionProp;
  /** Callback returning a left element (icon, avatar, etc.). */
  left?: (props: { color: string }) => React.ReactNode;
  /** Callback returning a right element. */
  right?: (props: { color: string }) => React.ReactNode;
  /** Press handler. */
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

  // Custom dimensions
  width?: number;
  height?: number;

  /**
   * Extra spacing between the left container and the middle (content).
   * @default 8
   */
  leftToContentSpacing?: number;

  /**
   * Extra spacing between the middle (content) and the right container.
   * @default 8
   */
  contentToRightSpacing?: number;

  /**
   * How to align text within the content block: left, center, or right.
   * This sets `textAlign` on the Title/Description.
   */
  contentAlignment?: "left" | "center" | "right";

  disableRippleEffect?: boolean;
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
  width,
  height,
  leftToContentSpacing = 8,
  contentToRightSpacing = 8,
  contentAlignment = "left",
  disableRippleEffect = false,
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
        style={[
          {
            color: itemTextColor,
            fontSize,
            textAlign: contentAlignment,
          },
          styles.title,
          titleStyle,
        ]}
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
          {
            color: itemDescriptionColor,
            fontSize,
            textAlign: contentAlignment,
          },
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
      disableRippleEffect={disableRippleEffect}
      style={[
        {
          backgroundColor: itemBackground,
          padding: 8,
          width,
          height,
        },
        styles.container,
        style,
      ]}
    >
      <View style={styles.row}>
        {/* Left container */}
        {leftElement && (
          <View style={[styles.leftContainer, alignToTop && styles.leftAlign]}>
            {leftElement}
          </View>
        )}

        {/* Middle content container */}
        <View
          style={[
            styles.content,
            {
              // If left is present, add spacing from left
              marginLeft: leftElement ? leftToContentSpacing : 0,
              // If right is present, add spacing from right
              marginRight: rightElement ? contentToRightSpacing : 0,
            },
            contentStyle,
          ]}
        >
          {renderTitle()}
          {renderDescription()}
        </View>

        {/* Right container */}
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
