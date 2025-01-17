import React, { isValidElement } from "react";
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import ThemedListSubheader from "./ThemedListSubheader";
import { ThemedDivider } from "../general/ThemedDivder";

export interface ThemedListSectionProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;

  /**
   * If true, inserts a divider after each child item.
   */
  dividerBetweenItems?: boolean;

  /**
   * Controls the height/width of the entire section if desired.
   */
  sectionSize?: number | string;
}

function ThemedListSection({
  title,
  titleStyle,
  style,
  children,
  dividerBetweenItems = false,
  sectionSize,
}: ThemedListSectionProps) {
  const containerStyle: ViewStyle = {
    marginVertical: 8,
    ...(sectionSize ? { height: sectionSize as ViewStyle['height'] } : {}),
  };

  const childArray = React.Children.toArray(children);

  return (
    <View style={[containerStyle, style]}>
      {title ? (
        <ThemedListSubheader style={titleStyle}>{title}</ThemedListSubheader>
      ) : null}
      {dividerBetweenItems
        ? childArray.map((child, index) => {
            if (!isValidElement(child)) return child;
            return (
              <React.Fragment key={index}>
                {child}
                {index < childArray.length - 1 && <ThemedDivider />}
              </React.Fragment>
            );
          })
        : childArray}
    </View>
  );
}

export default React.memo(ThemedListSection);
