import React, { ReactNode, useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  StyleProp,
  ViewStyle,
  FlexAlignType,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import { useSharedValue } from "react-native-reanimated";

import { Header as LibHeader } from "@codeherence/react-native-header";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import ThemedSegmentedControl, {
  ThemedSegmentedControlProps,
  SelectedIndicatorConfig,
} from "../buttons/ThemedSegmentedControl";

/**
 * --------------------------------------------------------------------------------
 * TYPES & INTERFACES
 * --------------------------------------------------------------------------------
 */

type ThemeColorType =
  | "hideOnScrollHeaderBackgroundPrimary"
  | "hideOnScrollHeaderBackgroundSecondary"
  | "hideOnScrollHeaderBackgroundTertiary"
  | "hideOnScrollScrollViewBackgroundPrimary"
  | "hideOnScrollScrollViewBackgroundSecondary"
  | "hideOnScrollScrollViewBackgroundTertiary"
  | "hideOnScrollTopSafeAreaBackgroundPrimary"
  | "hideOnScrollTopSafeAreaBackgroundSecondary"
  | "hideOnScrollTopSafeAreaBackgroundTertiary"
  | "segmentedControlBackgroundPrimary"
  | "segmentedControlBackgroundSecondary"
  | "segmentedControlBackgroundTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** A single tab definition */
export interface Tab {
  title: string;
  content: ReactNode;
}

export interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;

  headerSegmentedControlMarginTop?: number;
  headerSegmentedControlMarginBottom?: number;
  headerSegmentedControlPaddingTop?: number;
  headerSegmentedControlPaddingBottom?: number;
  headerSegmentedControlPaddingLeft?: number;
  headerSegmentedControlPaddingRight?: number;
}

export interface ThemedNonStaticHeaderStaticTabbedProps {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  scrollViewBackgroundColor?: { light?: string; dark?: string };
  topSafeAreaBackgroundColor?: { light?: string; dark?: string };

  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  blurOnSlide?: boolean;
  maxBlurAmount?: number;

  tabs: Tab[];
  segmentedControlProps?: Partial<ThemedSegmentedControlProps>;
  headerProps?: Partial<LocalHeaderProps>;
  initialHeaderOffset?: number;
  // New: Option to enable horizontal scrolling for the segmented control tabs.
  scrollableTabs?: boolean;
}

/**
 * The top LibHeader can slide fully behind the safe area,
 * while the segmented control remains pinned at the top.
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const DEFAULT_MAX_BLUR = 20;

export function ThemedNonStaticHeaderStaticTabbed(
  props: ThemedNonStaticHeaderStaticTabbedProps
) {
  const {
    themeType = "primary",
    backgroundColor = {},
    scrollViewBackgroundColor,
    topSafeAreaBackgroundColor,
    isRefreshable,
    refreshing,
    onRefresh,
    blurOnSlide = false,
    maxBlurAmount = DEFAULT_MAX_BLUR,
    tabs,
    segmentedControlProps = {},
    headerProps = {},
    initialHeaderOffset = 0,
    scrollableTabs = false, // New prop defaulting to false
  } = props;

  const {
    headerStyle,
    noBottomBorder = true,
    ignoreTopSafeArea = true,
    initialBorderColor,
    borderColor,
    borderWidth,
    renderLeft,
    renderCenter,
    renderRight,
    headerSegmentedControlMarginTop = 0,
    headerSegmentedControlMarginBottom = 0,
    headerSegmentedControlPaddingTop = 0,
    headerSegmentedControlPaddingBottom = 0,
    headerSegmentedControlPaddingLeft = 0,
    headerSegmentedControlPaddingRight = 0,
  } = headerProps;

  const [activeIndex, setActiveIndex] = useState(0);

  const capitalizedThemeType = themeType.charAt(0).toUpperCase() + themeType.slice(1);
  const headerColorKey = `hideOnScrollHeaderBackground${capitalizedThemeType}` as ThemeColorType;
  const scrollViewColorKey = `hideOnScrollScrollViewBackground${capitalizedThemeType}` as ThemeColorType;
  const topSafeAreaColorKey = `hideOnScrollTopSafeAreaBackground${capitalizedThemeType}` as ThemeColorType;

  const resolvedHeaderBg = useThemeColor(backgroundColor, headerColorKey);
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    scrollViewColorKey
  );
  const resolvedTopSafeAreaBg = useThemeColor(
    topSafeAreaBackgroundColor || {},
    topSafeAreaColorKey
  );

  // For segmented control background
  const segmentedControlBg = useThemeColor(
    {},
    `segmentedControlBackground${capitalize(themeType)}` as ThemeColorType
  );

  // We'll measure ONLY the top LibHeader portion that can fully hide.
  const [libHeaderHeight, setLibHeaderHeight] = useState(0);
  // We'll measure only the segmented control portion that remains pinned.
  const [tabsHeight, setTabsHeight] = useState(0);

  // Animate the sliding of the LibHeader (the pinned tabs will always be visible)
  const headerOffset = useRef(new Animated.Value(initialHeaderOffset)).current;
  const currentHeaderTranslateRef = useRef(initialHeaderOffset);

  const [blurAmount, setBlurAmount] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isUserDragging = useRef(false);
  const lastScrollDelta = useRef(0);

  useEffect(() => {
    if (blurOnSlide) {
      const listenerId = headerOffset.addListener(({ value }) => {
        if (libHeaderHeight > 0) {
          const progress = Math.abs(value / -libHeaderHeight);
          const newBlur = clamp(progress * maxBlurAmount, 0, maxBlurAmount);
          setBlurAmount(newBlur);
        }
      });
      return () => headerOffset.removeListener(listenerId);
    }
  }, [blurOnSlide, maxBlurAmount, libHeaderHeight, headerOffset]);

  // MIN_TRANSLATE is how far the LibHeader can hide (pushing it fully out of view)
  const MIN_TRANSLATE = libHeaderHeight ? -libHeaderHeight : 0;
  const MAX_TRANSLATE = 0;

  // Updated animateHeaderTo accepts a dynamic duration.
  const animateHeaderTo = (toValue: number, duration: number = 300) => {
    Animated.timing(headerOffset, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(() => {
      currentHeaderTranslateRef.current = toValue;
    });
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!libHeaderHeight) return;
    const offsetY = e.nativeEvent.contentOffset.y;
    // Edge case: When at the very top, header must be fully visible.
    if (offsetY <= 0) {
      if (currentHeaderTranslateRef.current !== MAX_TRANSLATE) {
        animateHeaderTo(MAX_TRANSLATE, 200);
      }
      setLastScrollY(offsetY);
      return;
    }
    if (!isUserDragging.current) {
      setLastScrollY(offsetY);
      return;
    }
    const delta = offsetY - lastScrollY;
    // For downward swipe (finger moves from bottom to top), update header proportionally.
    if (delta > 0) {
      const newTranslate = currentHeaderTranslateRef.current - delta;
      const clamped = clamp(newTranslate, MIN_TRANSLATE, MAX_TRANSLATE);
      currentHeaderTranslateRef.current = clamped;
      headerOffset.setValue(clamped);
    }
    // For upward swipe (delta < 0), do not update header in real time.
    lastScrollDelta.current = delta;
    setLastScrollY(offsetY);
  };

  const handleScrollBeginDrag = () => {
    isUserDragging.current = true;
  };

  const handleScrollEndDrag = () => {
    isUserDragging.current = false;
    if (lastScrollDelta.current > 0) {
      // User scrolled down (finger moves from bottom to top): hide the header.
      animateHeaderTo(MIN_TRANSLATE, 300);
    } else if (lastScrollDelta.current < 0) {
      // User scrolled up (finger moves from top to bottom): reveal header.
      const absDelta = Math.abs(lastScrollDelta.current);
      const duration = Math.max(100, 300 - absDelta * 15);
      animateHeaderTo(MAX_TRANSLATE, duration);
    }
  };

  const handleMomentumScrollBegin = () => {
    isUserDragging.current = false;
  };

  const handleMomentumScrollEnd = () => {
    if (lastScrollDelta.current > 0) {
      animateHeaderTo(MIN_TRANSLATE, 300);
    } else if (lastScrollDelta.current < 0) {
      const absDelta = Math.abs(lastScrollDelta.current);
      const duration = Math.max(100, 300 - absDelta * 15);
      animateHeaderTo(MAX_TRANSLATE, duration);
    }
  };

  // Total top block is the sum of the LibHeader and pinned tabs heights.
  const totalTopBlock = libHeaderHeight + tabsHeight;

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl
        refreshing={!!refreshing}
        onRefresh={onRefresh}
        progressViewOffset={totalTopBlock}
        {...Platform.select({
          android: {
            progressBackgroundColor: resolvedScrollViewBg,
            colors: [resolvedScrollViewBg],
          },
          ios: {
            tintColor: resolvedScrollViewBg,
          },
        })}
      />
    ) : undefined;

  // Merge segmented control props.
  const defaultSelectedIndicator: SelectedIndicatorConfig = {
    useUnderline: true,
    underlineThickness: 4,
  };
  const finalSelectedIndicator: SelectedIndicatorConfig = {
    ...defaultSelectedIndicator,
    ...(segmentedControlProps.selectedIndicator ?? {}),
  };
  const finalAnimatedSwitch =
    segmentedControlProps.animatedSwitch !== undefined
      ? segmentedControlProps.animatedSwitch
      : true;
  const finalSegmentedThemeType = segmentedControlProps.themeType || themeType;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const finalValues =
    segmentedControlProps.values ?? tabs.map((tab) => tab.title);
  const finalSelectedIndex =
    segmentedControlProps.selectedIndex ?? activeTabIndex;
  const finalOnChange = segmentedControlProps.onChange ?? setActiveTabIndex;

  // Define segmented control style; if scrollable, force left alignment.
  const segmentedControlStyle = [
    styles.segmentedControl,
    segmentedControlProps.style,
    { backgroundColor: "transparent" },
    scrollableTabs && { alignSelf: "flex-start" as FlexAlignType },
  ];

  function renderLibHeader() {
    return (
      <View
        style={styles.libHeaderContainer}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (h !== libHeaderHeight) setLibHeaderHeight(h);
        }}
      >
        <LibHeader
          showNavBar={useSharedValue(1)}
          noBottomBorder={noBottomBorder}
          ignoreTopSafeArea={ignoreTopSafeArea}
          initialBorderColor={initialBorderColor}
          borderColor={borderColor}
          borderWidth={borderWidth}
          headerStyle={[{ backgroundColor: resolvedHeaderBg }, headerStyle]}
          headerLeft={renderLeft ? renderLeft() : <ThemedHeaderBackButton />}
          headerCenter={renderCenter?.()}
          headerRight={renderRight?.()}
        />
      </View>
    );
  }

  function renderPinnedTabs() {
    return (
      <View
        style={[
          styles.pinnedTabsContainer,
          { backgroundColor: resolvedHeaderBg },
        ]}
        onLayout={(e) => {
          const th = e.nativeEvent.layout.height;
          if (th !== tabsHeight) setTabsHeight(th);
        }}
      >
        <View
          style={{
            marginTop: headerSegmentedControlMarginTop,
            marginBottom: headerSegmentedControlMarginBottom,
            paddingTop: headerSegmentedControlPaddingTop,
            paddingBottom: headerSegmentedControlPaddingBottom,
            paddingLeft: headerSegmentedControlPaddingLeft,
            paddingRight: headerSegmentedControlPaddingRight,
          }}
        >
          {scrollableTabs ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
            >
              <ThemedSegmentedControl
                {...segmentedControlProps}
                values={finalValues}
                selectedIndex={finalSelectedIndex}
                onChange={finalOnChange}
                themeType={finalSegmentedThemeType}
                animatedSwitch={finalAnimatedSwitch}
                selectedIndicator={finalSelectedIndicator}
                style={segmentedControlStyle}
                padding={{
                  color: { light: segmentedControlBg, dark: segmentedControlBg },
                  internal: segmentedControlProps.padding?.internal ?? 0,
                }}
              />
            </ScrollView>
          ) : (
            <ThemedSegmentedControl
              {...segmentedControlProps}
              values={finalValues}
              selectedIndex={finalSelectedIndex}
              onChange={finalOnChange}
              themeType={finalSegmentedThemeType}
              animatedSwitch={finalAnimatedSwitch}
              selectedIndicator={finalSelectedIndicator}
              style={segmentedControlStyle}
              padding={{
                color: { light: segmentedControlBg, dark: segmentedControlBg },
                internal: segmentedControlProps.padding?.internal ?? 0,
              }}
            />
          )}
        </View>
      </View>
    );
  }

  const effectiveTabIndex =
    finalSelectedIndex < tabs.length ? finalSelectedIndex : 0;
  const insets = useSafeAreaInsets();
  const insetsTop = insets.top;

  return (
    <View style={styles.fullScreenContainer}>
      <SafeAreaView
        style={[styles.safeAreaRoot, { backgroundColor: resolvedScrollViewBg }]}
        edges={["left", "right", "bottom"]}
      >
        <View
          style={[
            styles.topSafeArea,
            { backgroundColor: resolvedTopSafeAreaBg, height: insetsTop },
          ]}
        />

        <View style={styles.flexOne}>
          <Animated.View
            style={[
              styles.animatedHeaderContainer,
              { transform: [{ translateY: headerOffset }] },
            ]}
          >
            {blurOnSlide ? (
              <View style={StyleSheet.absoluteFill}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType={Platform.select({ ios: "light", android: "light" })}
                  blurAmount={blurAmount}
                  reducedTransparencyFallbackColor={resolvedHeaderBg}
                />
                {renderLibHeader()}
              </View>
            ) : (
              renderLibHeader()
            )}
            {renderPinnedTabs()}
          </Animated.View>

          <ScrollView
            style={[styles.scrollView, { backgroundColor: resolvedScrollViewBg }]}
            contentContainerStyle={{
              paddingTop: libHeaderHeight + tabsHeight,
              paddingBottom: BOTTOM_FOOTER_HEIGHT,
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            onMomentumScrollBegin={handleMomentumScrollBegin}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            refreshControl={maybeRefreshControl}
          >
            {tabs[effectiveTabIndex].content}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  safeAreaRoot: {
    flex: 1,
  },
  topSafeArea: {
    zIndex: 9999,
  },
  flexOne: {
    flex: 1,
  },
  animatedHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    zIndex: 999,
  },
  libHeaderContainer: {},
  pinnedTabsContainer: {
    flexDirection: "column",
  },
  segmentedControl: {
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
  },
});

export default ThemedNonStaticHeaderStaticTabbed;
