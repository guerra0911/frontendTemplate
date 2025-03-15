// app/components/screens/ThemedNoHeaderNonStaticTabbed.tsx

import React, { useRef, useState, useEffect, ReactNode } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedSegmentedControl, { ThemedSegmentedControlProps } from "../buttons/ThemedSegmentedControl";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";
import { BlurView } from "@react-native-community/blur";

/**
 * ---------------------------------------------------------------------------
 * TYPES & INTERFACES
 * ---------------------------------------------------------------------------
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
  | "hideOnScrollTopSafeAreaBackgroundTertiary";

/** Clamp utility */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Tab definition */
export interface Tab {
  title: string;
  content: ReactNode;
}

/** Props for ThemedNoHeaderNonStaticTabbed */
export interface ThemedNoHeaderNonStaticTabbedProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean; // For consistency with header components
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  scrollViewBackgroundColor?: { light?: string; dark?: string };
  topSafeAreaBackgroundColor?: { light?: string; dark?: string };
  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  tabs: Tab[];
  segmentedControlProps?: Partial<ThemedSegmentedControlProps>;
  headerHeight?: number;
  blurOnSlide?: boolean;
  maxBlurAmount?: number;
  // New: Option to enable horizontal scrolling for segmented control tabs.
  scrollableTabs?: boolean;
}

const DEFAULT_HEADER_HEIGHT = 60;
const DEFAULT_MAX_BLUR = 20;

/**
 * ---------------------------------------------------------------------------
 * COMPONENT: ThemedNoHeaderNonStaticTabbed
 * ---------------------------------------------------------------------------
 *
 * This component provides a non-static (hideable) segmented control tabs header.
 * When scrolling down, the segmented control slides out (hiding behind the safe area).
 * On upward momentum release (or when scrolled to the top), it slides back into view.
 */
export function ThemedNoHeaderNonStaticTabbed(props: ThemedNoHeaderNonStaticTabbedProps) {
  const {
    headerStyle,
    noBottomBorder,
    ignoreTopSafeArea = true,
    initialBorderColor,
    borderColor,
    borderWidth,
    themeType = "primary",
    backgroundColor = {},
    scrollViewBackgroundColor,
    topSafeAreaBackgroundColor,
    isRefreshable,
    refreshing,
    onRefresh,
    tabs,
    segmentedControlProps = {},
    headerHeight = DEFAULT_HEADER_HEIGHT,
    blurOnSlide = false,
    maxBlurAmount = DEFAULT_MAX_BLUR,
    scrollableTabs = false, // New prop, defaults to false
  } = props;

  // Resolve theming colors
  const capitalizedThemeType = themeType.charAt(0).toUpperCase() + themeType.slice(1);
  const headerColorKey = `hideOnScrollHeaderBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedBgColor = useThemeColor(backgroundColor, headerColorKey);

  const scrollViewColorKey = `hideOnScrollScrollViewBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedScrollViewBg = useThemeColor(scrollViewBackgroundColor || {}, scrollViewColorKey);

  const topSafeAreaColorKey = `hideOnScrollTopSafeAreaBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedTopSafeAreaBg = useThemeColor(topSafeAreaBackgroundColor || {}, topSafeAreaColorKey);

  const [lastScrollY, setLastScrollY] = useState(0);
  const isUserDragging = useRef(false);
  const layoutCalculated = useRef(false);

  const MIN_TRANSLATE = -headerHeight;
  const MAX_TRANSLATE = 0;
  const INITIAL_HEADER_OFFSET = 0;

  const currentHeaderTranslateRef = useRef(INITIAL_HEADER_OFFSET);
  const headerOffset = useRef(new Animated.Value(INITIAL_HEADER_OFFSET)).current;

  const showNavBar = useSharedValue(1);
  const [headerBottom, setHeaderBottom] = useState(0);
  const insets = useSafeAreaInsets();

  // Change blurAmount based on scroll position if blur is enabled.
  const [blurAmount, setBlurAmount] = useState(0);
  useEffect(() => {
    if (blurOnSlide) {
      const listenerId = headerOffset.addListener(({ value }) => {
        const progress = Math.abs(value / MIN_TRANSLATE);
        const newBlurAmount = clamp(progress * maxBlurAmount, 0, maxBlurAmount);
        setBlurAmount(newBlurAmount);
      });
      return () => {
        headerOffset.removeListener(listenerId);
      };
    }
  }, [blurOnSlide, maxBlurAmount, headerOffset, MIN_TRANSLATE]);

  // Track the last scroll delta for determining header animation.
  const lastScrollDelta = useRef(0);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      const calculatedBottom = insets.top + headerHeight;
      setHeaderBottom(calculatedBottom);
      currentHeaderTranslateRef.current = INITIAL_HEADER_OFFSET;
      headerOffset.setValue(INITIAL_HEADER_OFFSET);
      setInitialized(true);
      layoutCalculated.current = true;
    }
  }, [initialized, headerHeight, insets.top, headerOffset]);

  // Animate header offset to new value.
  const animateHeaderTo = (newVal: number, duration: number = 300) => {
    Animated.timing(headerOffset, {
      toValue: newVal,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    // Edge case: When at the very top, ensure segmented control is visible.
    if (offsetY <= 0) {
      if (currentHeaderTranslateRef.current !== MAX_TRANSLATE) {
        animateHeaderTo(MAX_TRANSLATE, 200);
        currentHeaderTranslateRef.current = MAX_TRANSLATE;
      }
      setLastScrollY(offsetY);
      return;
    }
    if (!isUserDragging.current) {
      setLastScrollY(offsetY);
      return;
    }
    const delta = offsetY - lastScrollY;
    if (delta > 0) {
      // Scrolling down – hide segmented control proportionally.
      const newTranslate = currentHeaderTranslateRef.current - delta;
      const clamped = clamp(newTranslate, MIN_TRANSLATE, MAX_TRANSLATE);
      currentHeaderTranslateRef.current = clamped;
      headerOffset.setValue(clamped);
    }
    // Upward swipe: do not update in real time.
    lastScrollDelta.current = delta;
    setLastScrollY(offsetY);
  };

  const handleScrollBeginDrag = () => {
    isUserDragging.current = true;
  };

  const handleScrollEndDrag = () => {
    isUserDragging.current = false;
    if (lastScrollDelta.current > 0) {
      // Scrolled down – ensure segmented control stays hidden.
      animateHeaderTo(MIN_TRANSLATE, 300);
      currentHeaderTranslateRef.current = MIN_TRANSLATE;
    } else if (lastScrollDelta.current < 0) {
      // Scrolled up – reveal segmented control.
      const absDelta = Math.abs(lastScrollDelta.current);
      const duration = Math.max(100, 300 - absDelta * 15);
      animateHeaderTo(MAX_TRANSLATE, duration);
      currentHeaderTranslateRef.current = MAX_TRANSLATE;
    }
  };

  const handleMomentumScrollBegin = () => {
    isUserDragging.current = false;
  };

  const handleMomentumScrollEnd = () => {
    if (lastScrollDelta.current > 0) {
      animateHeaderTo(MIN_TRANSLATE, 300);
      currentHeaderTranslateRef.current = MIN_TRANSLATE;
    } else if (lastScrollDelta.current < 0) {
      const absDelta = Math.abs(lastScrollDelta.current);
      const duration = Math.max(100, 300 - absDelta * 15);
      animateHeaderTo(MAX_TRANSLATE, duration);
      currentHeaderTranslateRef.current = MAX_TRANSLATE;
    }
  };

  const { top: safeTop } = insets;
  const offsetBuffer = Platform.select({
    ios: 130,
    android: 100,
    default: 130,
  });
  const refreshProgressOffset = safeTop + offsetBuffer;

  const maybeRefreshControl = isRefreshable && onRefresh ? (
    <RefreshControl
      refreshing={!!refreshing}
      onRefresh={onRefresh}
      progressViewOffset={headerBottom - 56}
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

  // Manage active tab state for segmented control.
  const [activeIndex, setActiveIndex] = useState(0);

  // Render the segmented control header.
  const renderHeader = () => (
    <View style={[styles.segmentedHeader, { backgroundColor: resolvedBgColor, height: headerHeight }, headerStyle]}>
      {scrollableTabs ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start", alignItems: "center" }}
        >
          <ThemedSegmentedControl
            values={tabs.map(tab => tab.title)}
            selectedIndex={activeIndex}
            onChange={setActiveIndex}
            style={[styles.segmentedControl, segmentedControlProps.style, { backgroundColor: "transparent" }]}
            {...segmentedControlProps}
          />
        </ScrollView>
      ) : (
        <ThemedSegmentedControl
          values={tabs.map(tab => tab.title)}
          selectedIndex={activeIndex}
          onChange={setActiveIndex}
          style={[styles.segmentedControl, segmentedControlProps.style, { backgroundColor: "transparent" }]}
          {...segmentedControlProps}
        />
      )}
    </View>
  );

  return (
    <View style={styles.fullScreenContainer}>
      <SafeAreaView style={[styles.container, { backgroundColor: resolvedScrollViewBg }]} edges={["left", "right", "bottom"]}>
        <View style={[styles.topSafeArea, { backgroundColor: resolvedTopSafeAreaBg, height: insets.top }]} />
        <View style={{ flex: 1 }}>
          <Animated.View
            onLayout={(e) => {
              if (!layoutCalculated.current) {
                const { height } = e.nativeEvent.layout;
                const bottom = insets.top + height;
                setHeaderBottom(bottom);
                layoutCalculated.current = true;
              }
            }}
            style={[styles.headerContainer, { height: headerHeight, transform: [{ translateY: headerOffset }] }]}
          >
            {blurOnSlide ? (
              <View style={StyleSheet.absoluteFill}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType={Platform.select({ ios: "light", android: "light" })}
                  blurAmount={blurAmount}
                  reducedTransparencyFallbackColor={resolvedBgColor}
                />
                {renderHeader()}
              </View>
            ) : (
              renderHeader()
            )}
          </Animated.View>
          {/* Render each tab's content in its own ScrollView */}
          {tabs.map((tab, index) => (
            <View key={index} style={{ flex: 1, display: index === activeIndex ? "flex" : "none" }}>
              <ScrollView
                style={[styles.scrollView, { backgroundColor: resolvedScrollViewBg }]}
                contentContainerStyle={{
                  paddingTop: headerHeight,
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
                {tab.content}
              </ScrollView>
            </View>
          ))}
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
  container: {
    flex: 1,
  },
  topSafeArea: {
    zIndex: 1000,
  },
  headerContainer: {
    position: "absolute",
    left: 0,
    width,
    zIndex: 999,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  segmentedHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentedControl: {
    alignSelf: "center",
  },
});

export default ThemedNoHeaderNonStaticTabbed;
