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

/** For standard or functional Title/Description. */
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
  /** Standard Title and Description (optional). */
  title?: TitleProp;
  description?: DescriptionProp;

  /**
   * Left callback: (props: { color: string }) => ReactNode
   * If you want a dynamic icon, etc.
   * But we also allow explicit child with leftChildren.
   */
  left?: (props: { color: string }) => React.ReactNode;
  right?: (props: { color: string }) => React.ReactNode;

  /** 
   * NEW: Arbitrary child components in each region. 
   * If these are present, they appear in addition to or in place of left/right?
   * It's up to you if you want them combined or override the existing left/right.
   */
  leftChildren?: React.ReactNode;
  middleChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;

  /** Press handler => item is pressable. */
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

  // Spacing & alignment
  leftToContentSpacing?: number;    // default 8
  contentToRightSpacing?: number;   // default 8
  contentAlignment?: "left" | "center" | "right";

  // Ripple disable
  disableRippleEffect?: boolean;
}

/**
 * -----------------------------------------------------------------------------
 * COMPONENT
 * -----------------------------------------------------------------------------
 */
function ThemedListItem({
  // Title/Description
  title,
  description,
  titleStyle,
  titleNumberOfLines = 1,
  titleEllipsizeMode,
  titleMaxFontSizeMultiplier,
  descriptionStyle,
  descriptionNumberOfLines = 2,
  descriptionEllipsizeMode,
  descriptionMaxFontSizeMultiplier,

  // Extra children approach
  left,
  right,
  leftChildren,
  middleChildren,
  rightChildren,

  // Pressable
  onPress,
  disableRippleEffect = false,

  // Theming
  themeType = "primary",

  // Dimensions
  width,
  height,

  // Spacing / alignment
  leftToContentSpacing = 8,
  contentToRightSpacing = 8,
  contentAlignment = "left",

  // Style
  style,
  contentStyle,
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

  // If multiline desc => align top
  const [alignToTop, setAlignToTop] = useState(false);
  const onDescriptionTextLayout = (
    e: NativeSyntheticEvent<TextLayoutEventData>
  ) => {
    setAlignToTop(e.nativeEvent.lines.length >= 2);
  };

  // RENDER TITLE
  const renderTitle = () => {
    if (!title) return null;
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

  // RENDER DESCRIPTION
  const renderDescription = () => {
    if (!description) return null;
    const fontSize = 14;
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

  // Left element (callback) or leftChildren
  const leftElement = left
    ? left({ color: itemDescriptionColor })
    : leftChildren; // if both are present, you can decide to combine or let left override

  // Right element (callback) or rightChildren
  const rightElement = right
    ? right({ color: itemDescriptionColor })
    : rightChildren;

  // Middle content
  // If user gave middleChildren, we can show them plus or instead of title/desc
  // We'll show both for maximum flexibility. Or you can choose to skip title/desc if middleChildren exist.
  const middleContent = (
    <>
      {renderTitle()}
      {renderDescription()}
      {middleChildren}
    </>
  );

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

        {/* Middle container */}
        <View
          style={[
            styles.content,
            {
              marginLeft: leftElement ? leftToContentSpacing : 0,
              marginRight: rightElement ? contentToRightSpacing : 0,
            },
            contentStyle,
          ]}
        >
          {middleContent}
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
