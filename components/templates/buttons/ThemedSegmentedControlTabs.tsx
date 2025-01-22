import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  FlexAlignType,
} from "react-native";
import ThemedSegmentedControl, {
  ThemedSegmentedControlProps,
} from "./ThemedSegmentedControl";
import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * ThemeColorType for the container behind the segmented control tabs.
 * This must match the naming pattern used in ThemedSegmentedControlColors.
 */
type ThemeColorType =
  | "segmentedTabsBackgroundPrimary"
  | "segmentedTabsBackgroundSecondary"
  | "segmentedTabsBackgroundTertiary";

/**
 * For each tab, we have a label and a component to render.
 */
export interface SegmentedTab {
  label: string;
  component: React.ReactNode;
}

/**
 * Props for ThemedSegmentedControlTabs.
 */
export interface ThemedSegmentedControlTabsProps
  extends Omit<
    ThemedSegmentedControlProps,
    "values" | "onChange" | "selectedIndex" | "style"
  > {
  /**
   * Array of objects, each with a `label` and a `component`.
   */
  tabs: SegmentedTab[];

  /**
   * Optionally control which tab is selected from outside.
   */
  selectedIndex?: number;

  /**
   * Callback when the tab changes.
   */
  onIndexChange?: (index: number) => void;

  /**
   * By default, we mount all tabs so switching does NOT re-mount or lose state.
   * If false, we only render the selected tab. (re-renders on each switch)
   */
  renderAllTabs?: boolean;

  /**
   * Overall container style. This wraps both the segmented control container + the tab pages.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The container that specifically wraps the ThemedSegmentedControl.
   * This container will have a themable background color. You can add
   * margin, padding, etc. here as well.
   */
  segmentControlContainerStyle?: StyleProp<ViewStyle>;

  /**
   * The container that wraps the tab content pages (the area below).
   */
  tabsContainerStyle?: StyleProp<ViewStyle>;

  /**
   * The theme type for the background behind the segmented control.
   * It picks from segmentedTabsBackgroundPrimary | Secondary | Tertiary.
   * @default "primary"
   */
  tabsThemeType?: "primary" | "secondary" | "tertiary";

  /**
   * Horizontal alignment for the segmented control inside its container.
   * "left", "center", or "right" (default = "center").
   */
  segmentControlAlignment?: "left" | "center" | "right";
}

/**
 * ThemedSegmentedControlTabs
 *
 * Renders a themable container with a ThemedSegmentedControl at the top,
 * and shows the corresponding component for the selected tab below.
 * By default, it mounts all tabs once (so switching doesn't lose state).
 */
const ThemedSegmentedControlTabs: React.FC<ThemedSegmentedControlTabsProps> = ({
  tabs,
  selectedIndex: controlledIndex,
  onIndexChange,
  renderAllTabs = true,

  // Container & style props
  containerStyle,
  segmentControlContainerStyle,
  tabsContainerStyle,

  // The new theming for this container
  tabsThemeType = "primary",

  // Horizontal alignment for the actual segmented control
  segmentControlAlignment = "center",

  // The rest of ThemedSegmentedControlProps (excluding values/onChange/selectedIndex/style)
  animatedSwitch,
  themeType,
  customHeight,
  customWidth,
  customRadius,
  segmentSpacing,
  roundedAllCorners,
  background,
  text,
  icons,
  separator,
  borders,
  shadows,
  disabled,
  padding,
  selectedIndicator,
}) => {
  // If user doesn't provide selectedIndex, we manage it internally:
  const [internalIndex, setInternalIndex] = useState(0);
  const actualIndex =
    controlledIndex !== undefined ? controlledIndex : internalIndex;

  // Build the array of labels to pass to ThemedSegmentedControl
  const labels = useMemo(() => tabs.map((t) => t.label), [tabs]);

  // Handler for tab press
  const handleChange = (idx: number) => {
    onIndexChange?.(idx);
    if (controlledIndex === undefined) {
      setInternalIndex(idx);
    }
  };

  // 1) Resolve container background color from theme
  //    e.g. "segmentedTabsBackgroundPrimary"
  const getColorKey = (
    base: string,
    variant: "primary" | "secondary" | "tertiary"
  ): ThemeColorType => {
    return `${base}${
      variant.charAt(0).toUpperCase() + variant.slice(1)
    }` as ThemeColorType;
  };
  const containerColorKey = getColorKey("segmentedTabsBackground", tabsThemeType);
  const containerBgColor = useThemeColor({}, containerColorKey);

  // 2) Convert "left"/"center"/"right" to the appropriate flex alignment
  const alignmentToFlex: Record<
    "left" | "center" | "right",
    FlexAlignType
  > = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* This is the container that holds the ThemedSegmentedControl */}
      <View
        style={[
          styles.segmentControlContainer,
          {
            backgroundColor: containerBgColor,
            alignItems: alignmentToFlex[segmentControlAlignment],
          },
          segmentControlContainerStyle,
        ]}
      >
        <ThemedSegmentedControl
          values={labels}
          selectedIndex={actualIndex}
          onChange={handleChange}
          animatedSwitch={animatedSwitch}
          themeType={themeType}
          customHeight={customHeight}
          customWidth={customWidth}
          customRadius={customRadius}
          segmentSpacing={segmentSpacing}
          roundedAllCorners={roundedAllCorners}
          background={background}
          text={text}
          icons={icons}
          separator={separator}
          borders={borders}
          shadows={shadows}
          disabled={disabled}
          padding={padding}
          selectedIndicator={selectedIndicator}
          // We do NOT pass style here because we
          // are controlling alignment with a wrapper container
        />
      </View>

      {/* The actual tab content below */}
      <View style={[styles.tabsContainer, tabsContainerStyle]}>
        {renderAllTabs
          ? tabs.map((tabItem, idx) => {
              const isSelected = idx === actualIndex;
              return (
                <View
                  key={idx}
                  style={[
                    styles.tabPage,
                    {
                      display: isSelected ? "flex" : "none",
                    },
                  ]}
                >
                  {tabItem.component}
                </View>
              );
            })
          : tabs[actualIndex]?.component}
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1, // Let this container expand
    width: "100%",
  },
  segmentControlContainer: {
    // By default, center the items horizontally
    padding: 8, // You can override in segmentControlContainerStyle
    width: "100%",
  },
  tabsContainer: {
    flex: 1,
  },
  tabPage: {
    flex: 1,
    width: "100%",
  },
});

export default React.memo(ThemedSegmentedControlTabs);
