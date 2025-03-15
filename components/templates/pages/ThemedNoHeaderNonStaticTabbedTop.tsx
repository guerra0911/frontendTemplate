// app/components/screens/ThemedNoHeaderNonStaticTabbedTop.tsx

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
import { BlurView } from "@react-native-community/blur";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSharedValue } from "react-native-reanimated";
import ThemedSegmentedControl, { ThemedSegmentedControlProps } from "../buttons/ThemedSegmentedControl";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

/**
 * ---------------------------------------------------------------------------
 * TYPES & INTERFACES
 * ---------------------------------------------------------------------------
 */

/** Theme color keys used for background colors. */
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

/** Utility function to clamp a value within a range. */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** A single tab definition. */
export interface Tab {
  title: string;
  content: ReactNode;
}

/** Props for ThemedNoHeaderNonStaticTabbedTop. */
export interface ThemedNoHeaderNonStaticTabbedTopProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean; // Retained for consistency
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
  /** The height of the segmented control container in px.
   * The user can scroll from offsetY=0 => offsetY=headerHeight to hide the tabs.
   * @default 60
   */
  headerHeight?: number;
  /** If true, the segmented control will blur as it slides. */
  blurOnSlide?: boolean;
  /** Maximum blur amount. @default 20 */
  maxBlurAmount?: number;
  // New: Option to enable horizontal scrolling for segmented control tabs.
  scrollableTabs?: boolean;
}

const DEFAULT_HEADER_HEIGHT = 60;
const DEFAULT_MAX_BLUR = 20;

/**
 * ---------------------------------------------------------------------------
 * COMPONENT: ThemedNoHeaderNonStaticTabbedTop
 * ---------------------------------------------------------------------------
 *
 * This component provides a non-static (snap-enabled) segmented control tabs header.
 * When scrolling down (finger moving from bottom to top), the segmented control slides out (behind the safe area).
 * When scrolling up, it remains hidden until you reach the very top,
 * at which point it smoothly slides into view.
 */
export function ThemedNoHeaderNonStaticTabbedTop(
  props: ThemedNoHeaderNonStaticTabbedTopProps
) {
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
    scrollableTabs = false, // New prop defaulting to false
  } = props;

  // Resolve theming colors.
  const capitalizedThemeType = themeType.charAt(0).toUpperCase() + themeType.slice(1);
  const headerColorKey = `hideOnScrollHeaderBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedBgColor = useThemeColor(backgroundColor, headerColorKey);

  const scrollViewColorKey = `hideOnScrollScrollViewBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    scrollViewColorKey
  );

  const topSafeAreaColorKey = `hideOnScrollTopSafeAreaBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedTopSafeAreaBg = useThemeColor(
    topSafeAreaBackgroundColor || {},
    topSafeAreaColorKey
  );

  const insets = useSafeAreaInsets();

  // Animated translation: 0 = fully visible, -headerHeight = fully hidden.
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const lastScrollDelta = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const isAnimatingRef = useRef(false);

  const MIN_TRANSLATE = -headerHeight;
  const MAX_TRANSLATE = 0;

  // Handle optional blur based on scroll progress.
  const [blurAmount, setBlurAmount] = useState(0);
  useEffect(() => {
    if (blurOnSlide) {
      const listenerId = translateY.addListener(({ value }) => {
        const progress = Math.abs(value) / headerHeight;
        const newBlur = clamp(progress * maxBlurAmount, 0, maxBlurAmount);
        setBlurAmount(newBlur);
      });
      return () => translateY.removeListener(listenerId);
    }
  }, [blurOnSlide, maxBlurAmount, translateY, headerHeight]);

  // Handle scroll event: update translateY proportionally.
  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (isAnimatingRef.current) return;
    const offsetY = e.nativeEvent.contentOffset.y;
    const delta = offsetY - lastScrollY.current;
    lastScrollDelta.current = delta;
    lastScrollY.current = offsetY;

    if (offsetY <= 0) {
      translateY.setValue(0);
    } else if (offsetY >= headerHeight) {
      translateY.setValue(MIN_TRANSLATE);
    } else {
      translateY.setValue(-offsetY);
    }
  }

  // Finalize the segmented control snap based on scroll position and velocity.
  function finalizeHeader() {
    if (!scrollViewRef.current || isAnimatingRef.current) return;
    const offsetY = lastScrollY.current;
    if (offsetY <= 0 || offsetY >= headerHeight) return;

    const velocityThreshold = 2; // pixels threshold
    if (Math.abs(lastScrollDelta.current) > velocityThreshold) {
      setTimeout(finalizeHeader, 100);
      return;
    }

    const half = headerHeight / 2;
    if (offsetY < half) {
      snapOpen();
    } else {
      snapClosed();
    }
  }

  function snapOpen() {
    isAnimatingRef.current = true;
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      isAnimatingRef.current = false;
    });
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    lastScrollY.current = 0;
  }

  function snapClosed() {
    isAnimatingRef.current = true;
    Animated.timing(translateY, {
      toValue: -headerHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      isAnimatingRef.current = false;
    });
    scrollViewRef.current?.scrollTo({ y: headerHeight, animated: true });
    lastScrollY.current = headerHeight;
  }

  const handleScrollBeginDrag = () => {};
  const handleScrollEndDrag = () => finalizeHeader();
  const handleMomentumScrollBegin = () => {};
  const handleMomentumScrollEnd = () => finalizeHeader();

  const maybeRefreshControl = isRefreshable && onRefresh ? (
    <RefreshControl
      refreshing={!!refreshing}
      onRefresh={onRefresh}
      progressViewOffset={headerHeight}
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

  // Manage active tab state for the segmented control.
  const [activeIndex, setActiveIndex] = useState(0);

  // Render the segmented control header.
  const renderHeader = () => (
    <View style={[styles.segmentedHeader, { backgroundColor: resolvedBgColor, height: headerHeight }, headerStyle]}>
      {scrollableTabs ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedSegmentedControl
            values={tabs.map((tab) => tab.title)}
            selectedIndex={activeIndex}
            onChange={setActiveIndex}
            style={[styles.segmentedControl, segmentedControlProps.style, { backgroundColor: "transparent" }]}
            {...segmentedControlProps}
          />
        </ScrollView>
      ) : (
        <ThemedSegmentedControl
          values={tabs.map((tab) => tab.title)}
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
        <View style={styles.flexOne}>
          <Animated.View style={[styles.headerContainer, { height: headerHeight, transform: [{ translateY }] }]}>
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
          {/* Map over tabs so each gets its own ScrollView to maintain independent scroll state */}
          {tabs.map((tab, index) => (
            <View key={index} style={{ flex: 1, display: index === activeIndex ? "flex" : "none" }}>
              <ScrollView
                ref={index === activeIndex ? scrollViewRef : null}
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
  flexOne: {
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

export default ThemedNoHeaderNonStaticTabbedTop;
