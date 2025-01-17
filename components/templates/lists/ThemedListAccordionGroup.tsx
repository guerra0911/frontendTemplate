import React, { createContext, useState, ReactNode, isValidElement } from "react";
import { ThemedDivider } from "../general/ThemedDivder";

export type ThemedListAccordionGroupContextType = {
  expandedId: string | number | undefined;
  onAccordionPress: (id: string | number) => void;
} | null;

export const ThemedListAccordionGroupContext =
  createContext<ThemedListAccordionGroupContextType>(null);

export interface ThemedListAccordionGroupProps {
  expandedId?: string | number;
  onAccordionPress?: (expandedId: string | number) => void;
  children: ReactNode;

  /**
   * If true, automatically inserts a divider between each child Accordion
   */
  dividerBetweenAccordions?: boolean;
}

function ThemedListAccordionGroup({
  expandedId: expandedIdProp,
  onAccordionPress,
  children,
  dividerBetweenAccordions = false,
}: ThemedListAccordionGroupProps) {
  const [expandedId, setExpandedId] = useState<string | number | undefined>(
    undefined
  );

  const handlePressDefault = (id: string | number) => {
    setExpandedId((current) => (current === id ? undefined : id));
  };

  const isControlled = expandedIdProp !== undefined && onAccordionPress !== undefined;
  const contextValue = {
    expandedId: isControlled ? expandedIdProp : expandedId,
    onAccordionPress: isControlled ? onAccordionPress! : handlePressDefault,
  };

  // If we want to add a divider between each child
  const childrenArray = React.Children.toArray(children);

  return (
    <ThemedListAccordionGroupContext.Provider value={contextValue}>
      {dividerBetweenAccordions
        ? childrenArray.map((child, index) => {
            if (!isValidElement(child)) {
              return child;
            }
            return (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && <ThemedDivider />}
              </React.Fragment>
            );
          })
        : childrenArray}
    </ThemedListAccordionGroupContext.Provider>
  );
}

export default React.memo(ThemedListAccordionGroup);
