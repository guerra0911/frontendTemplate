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
 * 1) The user can scroll offset=0..headerHeight to partially hide the header+tabs.
 * 2) If offset < 0 => fully shown, offset > headerHeight => fully hidden.
 * 3) On release, if offset is within [0..headerHeight], we snap the header alone
 *    (no forced content offset shift). So the content does not move in unison.
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
  } = props;

  // -------------------------------------------------------------------------
  // 1) LOCAL HEADER PROPS
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // 2) TABS / SEGMENTED CONTROL
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // 3) THEME
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // 4) LAYOUT & ANIMATION
  // -------------------------------------------------------------------------
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  // If headerHeight=0 and not fixed => measure dynamically
  const [dynamicHeaderHeight, setDynamicHeaderHeight] = useState(0);
  const finalHeaderHeight =
    useFixedHeaderHeight && headerHeight > 0 ? headerHeight : dynamicHeaderHeight;

  // The header's current offset (0 => fully visible, -headerHeight => hidden)
  const translateY = useRef(new Animated.Value(0)).current;

  // For snap logic
  const isAnimatingRef = useRef(false);
  const lastScrollY = useRef(0);

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

  // -------------------------------------------------------------------------
  // 5) PARTIAL HIDE => handleScroll
  // -------------------------------------------------------------------------
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isAnimatingRef.current || finalHeaderHeight <= 0) return;

    const offsetY = e.nativeEvent.contentOffset.y;
    lastScrollY.current = offsetY;

    // Restrict partial hide to [0..headerHeight]
    if (offsetY <= 0) {
      // fully shown
      translateY.setValue(0);
    } else if (offsetY >= finalHeaderHeight) {
      // fully hidden
      translateY.setValue(MIN_TRANSLATE);
    } else {
      // partial => -offsetY
      translateY.setValue(-offsetY);
    }
  };

  // -------------------------------------------------------------------------
  // 6) SNAP => only animate header (no forced scroll offset changes)
  // -------------------------------------------------------------------------
  function animateHeaderTo(toValue: number) {
    isAnimatingRef.current = true;
    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      isAnimatingRef.current = false;
    });
  }

  function snapOpen() {
    // Just animate the header from current to 0 (fully shown)
    animateHeaderTo(0);
    // We do NOT call scrollTo(0) => content stays put
  }

  function snapClosed() {
    // Just animate the header from current to -headerHeight (hidden)
    animateHeaderTo(MIN_TRANSLATE);
    // We do NOT call scrollTo(headerHeight)
  }

  function finalizeHeader() {
    if (isAnimatingRef.current || finalHeaderHeight <= 0) return;

    const offsetY = lastScrollY.current;
    if (offsetY <= 0) {
      // already open
      return;
    } else if (offsetY >= finalHeaderHeight) {
      // already closed
      return;
    }

    // pick half threshold
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

  // -------------------------------------------------------------------------
  // 7) REFRESH
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // 8) RENDERERS
  // -------------------------------------------------------------------------
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
          headerLeft={
            renderLeft ? renderLeft() : <ThemedHeaderBackButton />
          }
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
            style={[styles.segmentedControl, segmentedControlProps.style]}
          />
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
        {/* The top safe area behind the content */}
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
                height:
                  useFixedHeaderHeight && headerHeight > 0
                    ? headerHeight
                    : undefined,
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
              paddingTop: useFixedHeaderHeight && headerHeight > 0
                ? headerHeight
                : dynamicHeaderHeight,
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

/**
 * ---------------------------------------------------------------------------
 * STYLES
 * ---------------------------------------------------------------------------
 */
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
