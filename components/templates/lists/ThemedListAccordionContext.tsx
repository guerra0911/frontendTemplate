import React from "react";

export interface ThemedListAccordionGroupContextType {
  expandedId: string | number | undefined;
  onAccordionPress: (expandedId: string | number) => void;
}

export const ThemedListAccordionGroupContext =
  React.createContext<ThemedListAccordionGroupContextType | null>(null);
