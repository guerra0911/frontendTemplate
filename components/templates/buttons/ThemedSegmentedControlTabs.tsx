import React, {
    useState,
    useMemo,
    useRef,
    useEffect,
    Dispatch,
    SetStateAction,
  } from "react";
  import {
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    FlexAlignType,
    LayoutChangeEvent,
    Animated,
    Easing,
  } from "react-native";
  import ThemedSegmentedControl, {
    ThemedSegmentedControlProps,
  } from "./ThemedSegmentedControl";
  import { useThemeColor } from "@/hooks/useThemeColor";
  import ThemedScrollContainer from "../containers/ThemedScrollContainer";
  import { ThemedView } from "@/components/templates/containers/ThemedView";
  
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
     * By default, we mount all tabs once so switching doesn't re-mount or lose state.
     * If false, we only render the selected tab. (re-renders on each switch).
     * 
     * If animatedPageSlide is true, we must always render all tabs.
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
  
    /**
     * If true, the pages themselves slide horizontally when switching tabs.
     * This requires all tabs be rendered side by side in a horizontal row.
     * @default false
     */
    animatedPageSlide?: boolean;
  
    /**
     * NEW: If true, each tab's content is wrapped in a ThemedScrollContainer,
     * giving a vertical scroll. If false, we wrap in a ThemedView with no scroll.
     * @default false
     */
    scrollable?: boolean;
  
    /**
     * NEW: If true and `scrollable` is true, each tab has a pull-to-refresh.
     * Each tab can refresh independently.
     * @default false
     */
    refreshable?: boolean;
  
    /**
     * Optional callback if you want to run custom logic upon refresh. 
     * Called with the tab index that was pulled-to-refresh. 
     * You can then do async logic. 
     * You must eventually call "setTabRefreshing(index, false)" or 
     * some approach to end the refresh. 
     * If omitted, we do a default 1-second timeout.
     */
    onTabRefresh?: (tabIndex: number, setTabRefreshing: RefreshSetter) => void;
  }
  
  /**
   * We create a type for a function that can set refreshing state:
   */
  export type RefreshSetter = (index: number, isRefreshing: boolean) => void;
  
  /**
   * ThemedSegmentedControlTabs
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
  
    // The rest of ThemedSegmentedControlProps
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
  
    // Page sliding
    animatedPageSlide = false,
  
    // NEW: scrolling & refresh props
    scrollable = false,
    refreshable = false,
    onTabRefresh,
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
    const alignmentToFlex: Record<"left" | "center" | "right", FlexAlignType> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };
  
    // ---------------------------------------------------------------------------
    // Animated Page Slide logic
    // ---------------------------------------------------------------------------
    const [containerWidth, setContainerWidth] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;
  
    // If animatedPageSlide => we must always render all tabs
    const shouldRenderAll = animatedPageSlide ? true : renderAllTabs;
  
    // On tab change, if animated page slide is enabled => animate horizontally
    useEffect(() => {
      if (animatedPageSlide && containerWidth > 0) {
        const toValue = -actualIndex * containerWidth;
        Animated.timing(translateX, {
          toValue,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false, // we are animating layout, so it's fine
        }).start();
      }
    }, [animatedPageSlide, actualIndex, containerWidth, translateX]);
  
    const onTabsContainerLayout = (e: LayoutChangeEvent) => {
      if (!animatedPageSlide) return;
      setContainerWidth(e.nativeEvent.layout.width);
    };
  
    // ---------------------------------------------------------------------------
    // Refresh states for each tab
    // ---------------------------------------------------------------------------
    const [refreshingStates, setRefreshingStates] = useState<boolean[]>(
      () => new Array(tabs.length).fill(false)
    );
  
    const setTabRefreshing = (tabIdx: number, isRef: boolean) => {
      setRefreshingStates((prev) => {
        const updated = [...prev];
        updated[tabIdx] = isRef;
        return updated;
      });
    };
  
    const handleTabRefresh = (tabIdx: number) => {
      // If user provided custom callback => let them handle the logic.
      if (onTabRefresh) {
        setTabRefreshing(tabIdx, true);
        onTabRefresh(tabIdx, setTabRefreshing);
      } else {
        // Otherwise, do a default 1-second refresh simulation:
        setTabRefreshing(tabIdx, true);
        setTimeout(() => {
          setTabRefreshing(tabIdx, false);
        }, 1000);
      }
    };
  
    // ---------------------------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------------------------
  
    return (
      <View style={[styles.container, containerStyle]}>
        {/* Segmented control container */}
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
          />
        </View>
  
        {/* Tabs container */}
        <View
          style={[styles.tabsContainer, tabsContainerStyle]}
          onLayout={onTabsContainerLayout}
        >
          {animatedPageSlide ? (
            <Animated.View
              style={[
                styles.horizontalPages,
                {
                  width: containerWidth * tabs.length,
                  transform: [{ translateX }],
                },
              ]}
            >
              {tabs.map((tabItem, idx) => {
                const isSelected = idx === actualIndex;
                // If "scrollable" => ThemedScrollContainer, else ThemedView
                if (scrollable) {
                  return (
                    <View
                      key={idx}
                      style={[styles.singlePage, { width: containerWidth }]}
                    >
                      <ThemedScrollContainer
                        isScrollable
                        isRefreshable={refreshable}
                        onRefresh={() => handleTabRefresh(idx)}
                        refreshing={refreshingStates[idx]}
                        style={{ flex: 1 }}
                      >
                        {tabItem.component}
                      </ThemedScrollContainer>
                    </View>
                  );
                } else {
                  return (
                    <View
                      key={idx}
                      style={[styles.singlePage, { width: containerWidth }]}
                    >
                      <ThemedView style={{ flex: 1 }}>
                        {tabItem.component}
                      </ThemedView>
                    </View>
                  );
                }
              })}
            </Animated.View>
          ) : (
            shouldRenderAll
              ? tabs.map((tabItem, idx) => {
                  const isSelected = idx === actualIndex;
                  // If "scrollable" => ThemedScrollContainer, else ThemedView
                  return (
                    <View
                      key={idx}
                      style={[
                        styles.tabPage,
                        { display: isSelected ? "flex" : "none" },
                      ]}
                    >
                      {scrollable ? (
                        <ThemedScrollContainer
                          isScrollable
                          isRefreshable={refreshable}
                          onRefresh={() => handleTabRefresh(idx)}
                          refreshing={refreshingStates[idx]}
                          style={{ flex: 1 }}
                        >
                          {tabItem.component}
                        </ThemedScrollContainer>
                      ) : (
                        <ThemedView style={{ flex: 1 }}>
                          {tabItem.component}
                        </ThemedView>
                      )}
                    </View>
                  );
                })
              : // single tab only
                scrollable ? (
                  <ThemedScrollContainer
                    isScrollable
                    isRefreshable={refreshable}
                    onRefresh={() => handleTabRefresh(actualIndex)}
                    refreshing={refreshingStates[actualIndex]}
                    style={{ flex: 1 }}
                  >
                    {tabs[actualIndex]?.component}
                  </ThemedScrollContainer>
                ) : (
                  <ThemedView style={{ flex: 1 }}>
                    {tabs[actualIndex]?.component}
                  </ThemedView>
                )
          )}
        </View>
      </View>
    );
  };
  
  // -----------------------------------------------------------------------------
  // STYLES
  // -----------------------------------------------------------------------------
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    segmentControlContainer: {
      padding: 8,
      width: "100%",
    },
    tabsContainer: {
      flex: 1,
    },
    tabPage: {
      flex: 1,
      width: "100%",
    },
    // For animated horizontal sliding
    horizontalPages: {
      flexDirection: "row",
      height: "100%",
    },
    singlePage: {
      height: "100%",
    },
  });
  
  export default React.memo(ThemedSegmentedControlTabs);
  