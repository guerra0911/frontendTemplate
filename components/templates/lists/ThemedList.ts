import React from "react";

// We’ll import each sub-component from separate files:
import ThemedListAccordion from "./ThemedListAccordion";
import ThemedListAccordionGroup from "./ThemedListAccordionGroup";
import ThemedListItem from "./ThemedListItem";
import ThemedListIcon from "./ThemedListIcon";
import ThemedListImage from "./ThemedListImage";
import ThemedListSection from "./ThemedListSection";
import ThemedListSubheader from "./ThemedListSubheader";

/**
 * ThemedList acts as a container for all sub-components:
 * - ThemedList.Accordion
 * - ThemedList.AccordionGroup
 * - ThemedList.Item
 * - ThemedList.Icon
 * - ThemedList.Image
 * - ThemedList.Section
 * - ThemedList.Subheader
 */
function ThemedListBase() {
  return null;
}

const ThemedList = ThemedListBase as unknown as {
  (): null;
  Accordion: typeof ThemedListAccordion;
  AccordionGroup: typeof ThemedListAccordionGroup;
  Item: typeof ThemedListItem;
  Icon: typeof ThemedListIcon;
  Image: typeof ThemedListImage;
  Section: typeof ThemedListSection;
  Subheader: typeof ThemedListSubheader;
};

// Attach each sub-component
ThemedList.Accordion = ThemedListAccordion;
ThemedList.AccordionGroup = ThemedListAccordionGroup;
ThemedList.Item = ThemedListItem;
ThemedList.Icon = ThemedListIcon;
ThemedList.Image = ThemedListImage;
ThemedList.Section = ThemedListSection;
ThemedList.Subheader = ThemedListSubheader;

export default ThemedList;
