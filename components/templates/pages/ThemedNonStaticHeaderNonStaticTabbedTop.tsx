import React, { ReactNode, useRef, useState, useEffect } from "react";
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
  | "hideOnScrollTopSafeAreaBackgroundTertiary"
  | "segmentedControlBackgroundPrimary"
  | "segmentedControlBackgroundSecondary"
  | "segmentedControlBackgroundTertiary";

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

export interface ThemedNonStaticHeaderNonStaticTabbedTopProps {
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

  /**
   * The total "header" (header + tabs) height in px.
   * If 0 => measure dynamically.
   * We restrict partial hide to this range: offsetY in [0..headerHeight].
   */
  headerHeight?: number;

  /**
   * If true => treat `headerHeight` as a fixed dimension;
   * if false => measure if it's 0.
   */
  useFixedHeaderHeight?: boolean;

  // New: Option to enable horizontal scrolling for segmented control tabs.
  scrollableTabs?: boolean;
}

/**
 * ---------------------------------------------------------------------------
 * HELPERS
 * ---------------------------------------------------------------------------
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const DEFAULT_MAX_BLUR = 20;

/**
 * ---------------------------------------------------------------------------
 * COMPONENT
 * ---------------------------------------------------------------------------
 *
 * Behavior:
 * 1) The user can scroll offset=0..headerHeight to partially hide the header+tabs.
 * 2) If offset < 0 => fully shown, offset > headerHeight => fully hidden.
 * 3) On release, if offset is within [0..headerHeight], the header snaps open or closed
 *    and forces the content offset so that the header and page move together.
 * 4) To preserve momentum, if the scroll velocity is above a threshold, we delay snapping.
 */
export function ThemedNonStaticHeaderNonStaticTabbedTop(
  props: ThemedNonStaticHeaderNonStaticTabbedTopProps
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
    headerHeight = 0,
    useFixedHeaderHeight = false,
    scrollableTabs = false, // New prop defaulting to false
  } = props;

  // 1) LOCAL HEADER PROPS
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

  // 2) TABS / SEGMENTED CONTROL
  const [activeIndexState, setActiveIndexState] = useState(0);
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
  const finalValues =
    segmentedControlProps.values ?? tabs.map((tab) => tab.title);
  const finalSelectedIndex =
    segmentedControlProps.selectedIndex ?? activeIndexState;
  const finalOnChange =
    segmentedControlProps.onChange ?? setActiveIndexState;

  // 3) THEME
  const capTheme = capitalize(themeType);
  const headerColorKey = `hideOnScrollHeaderBackground${capTheme}` as ThemeColorType;
  const scrollViewColorKey = `hideOnScrollScrollViewBackground${capTheme}` as ThemeColorType;
  const topSafeAreaColorKey = `hideOnScrollTopSafeAreaBackground${capTheme}` as ThemeColorType;
  const resolvedHeaderBg = useThemeColor(backgroundColor, headerColorKey);
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    scrollViewColorKey
  );
  const resolvedTopSafeAreaBg = useThemeColor(
    topSafeAreaBackgroundColor || {},
    topSafeAreaColorKey
  );
  const segmentedControlBg = useThemeColor(
    {},
    `segmentedControlBackground${capTheme}` as ThemeColorType
  );

  // 4) LAYOUT & ANIMATION
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [dynamicHeaderHeight, setDynamicHeaderHeight] = useState(0);
  const finalHeaderHeight =
    useFixedHeaderHeight && headerHeight > 0 ? headerHeight : dynamicHeaderHeight;
  const translateY = useRef(new Animated.Value(0)).current;
  const isAnimatingRef = useRef(false);
  const lastScrollY = useRef(0);
  // We'll also track the last scroll delta (as a proxy for velocity)
  const lastScrollDelta = useRef(0);

  const MIN_TRANSLATE = -finalHeaderHeight;
  const MAX_TRANSLATE = 0;

  // For blur
  const [blurAmount, setBlurAmount] = useState(0);
  useEffect(() => {
    if (blurOnSlide) {
      const id = translateY.addListener(({ value }) => {
        if (finalHeaderHeight > 0) {
          const progress = Math.abs(value) / finalHeaderHeight;
          const newBlur = clamp(progress * maxBlurAmount, 0, maxBlurAmount);
          setBlurAmount(newBlur);
        }
      });
      return () => translateY.removeListener(id);
    }
  }, [blurOnSlide, maxBlurAmount, finalHeaderHeight, translateY]);

  // 5) PARTIAL HIDE => handleScroll
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isAnimatingRef.current || finalHeaderHeight <= 0) return;

    const offsetY = e.nativeEvent.contentOffset.y;
    // Compute delta (for velocity estimation)
    const delta = offsetY - lastScrollY.current;
    lastScrollDelta.current = delta;
    lastScrollY.current = offsetY;

    // Restrict partial hide to [0..finalHeaderHeight]
    if (offsetY <= 0) {
      translateY.setValue(0);
    } else if (offsetY >= finalHeaderHeight) {
      translateY.setValue(MIN_TRANSLATE);
    } else {
      translateY.setValue(-offsetY);
    }
  };

  // 6) SNAP => snap the header and force content offset so they move together
  function animateHeaderTo(toValue: number, duration: number = 300) {
    isAnimatingRef.current = true;
    Animated.timing(translateY, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(() => {
      isAnimatingRef.current = false;
    });
  }

  function snapOpen() {
    animateHeaderTo(0, 300);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    lastScrollY.current = 0;
  }

  function snapClosed() {
    animateHeaderTo(MIN_TRANSLATE, 300);
    scrollViewRef.current?.scrollTo({ y: finalHeaderHeight, animated: true });
    lastScrollY.current = finalHeaderHeight;
  }

  // New finalizeHeader that delays snapping if velocity is high.
  function finalizeHeader() {
    if (isAnimatingRef.current || finalHeaderHeight <= 0) return;
    const offsetY = lastScrollY.current;

    // If offset is already at an extreme, no need to snap.
    if (offsetY <= 0 || offsetY >= finalHeaderHeight) return;

    // If the last scroll delta is still high (indicating momentum), delay finalizing.
    const velocityThreshold = 2; // Adjust threshold as needed.
    if (Math.abs(lastScrollDelta.current) > velocityThreshold) {
      // Wait a bit to let momentum decay, then try finalizing again.
      setTimeout(finalizeHeader, 100);
      return;
    }

    // Otherwise, pick a half threshold to decide snapping.
    const half = finalHeaderHeight / 2;
    if (offsetY < half) {
      snapOpen();
    } else {
      snapClosed();
    }
  }

  const handleScrollBeginDrag = () => {};
  const handleScrollEndDrag = () => finalizeHeader();
  const handleMomentumScrollBegin = () => {};
  const handleMomentumScrollEnd = () => finalizeHeader();

  // 7) REFRESH
  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl
        refreshing={!!refreshing}
        onRefresh={onRefresh}
        progressViewOffset={finalHeaderHeight}
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

  // 8) RENDERERS
  function renderHeaderAndTabs() {
    return (
      <View
        style={styles.headerAndTabsBlock}
        onLayout={(evt) => {
          if (!useFixedHeaderHeight) {
            const measuredH = evt.nativeEvent.layout.height;
            if (measuredH !== dynamicHeaderHeight) {
              setDynamicHeaderHeight(measuredH);
            }
          }
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
        <View
          style={[
            styles.segmentedControlContainer,
            {
              backgroundColor: resolvedHeaderBg,
              marginTop: headerSegmentedControlMarginTop,
              marginBottom: headerSegmentedControlMarginBottom,
              paddingTop: headerSegmentedControlPaddingTop,
              paddingBottom: headerSegmentedControlPaddingBottom,
              paddingLeft: headerSegmentedControlPaddingLeft,
              paddingRight: headerSegmentedControlPaddingRight,
            },
          ]}
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
                padding={{
                  color: { light: segmentedControlBg, dark: segmentedControlBg },
                  internal: segmentedControlProps.padding?.internal ?? 0,
                }}
                style={[
                  styles.segmentedControl,
                  segmentedControlProps.style,
                  { backgroundColor: "transparent", alignSelf: "flex-start" },
                ]}
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
              padding={{
                color: { light: segmentedControlBg, dark: segmentedControlBg },
                internal: segmentedControlProps.padding?.internal ?? 0,
              }}
              style={[
                styles.segmentedControl,
                segmentedControlProps.style,
                { backgroundColor: "transparent" },
              ]}
            />
          )}
        </View>
      </View>
    );
  }

  const effectiveTabIndex =
    finalSelectedIndex < tabs.length ? finalSelectedIndex : 0;
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
              {
                transform: [{ translateY }],
                height: useFixedHeaderHeight && headerHeight > 0 ? headerHeight : undefined,
              },
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
                {renderHeaderAndTabs()}
              </View>
            ) : (
              renderHeaderAndTabs()
            )}
          </Animated.View>
          <ScrollView
            ref={scrollViewRef}
            style={[styles.scrollView, { backgroundColor: resolvedScrollViewBg }]}
            contentContainerStyle={{
              paddingTop: useFixedHeaderHeight && headerHeight > 0 ? headerHeight : dynamicHeaderHeight,
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
            {tabs[effectiveTabIndex]?.content}
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
    zIndex: 1000,
  },
  flexOne: {
    flex: 1,
  },
  animatedHeaderContainer: {
    position: "absolute",
    left: 0,
    width,
    zIndex: 999,
  },
  headerAndTabsBlock: {
    flexDirection: "column",
  },
  segmentedControlContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  segmentedControl: {
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
  },
});

export default ThemedNonStaticHeaderNonStaticTabbedTop;
