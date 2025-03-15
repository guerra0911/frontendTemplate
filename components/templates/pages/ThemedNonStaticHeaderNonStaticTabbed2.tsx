// app/components/screens/ThemedNonStaticHeaderNonStaticTabbed2.tsx

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

////////////////////////////////////////////////////////////////////////////////
// TYPES & INTERFACES
////////////////////////////////////////////////////////////////////////////////

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

export interface ThemedNonStaticHeaderNonStaticTabbed2Props {
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

////////////////////////////////////////////////////////////////////////////////
// HELPER
////////////////////////////////////////////////////////////////////////////////

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

////////////////////////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////////////////////////

const DEFAULT_MAX_BLUR = 20;

export function ThemedNonStaticHeaderNonStaticTabbed2(
  props: ThemedNonStaticHeaderNonStaticTabbed2Props
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
    scrollableTabs = false, // New prop with default false
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

  const [activeIndexState, setActiveIndexState] = useState(0);

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

  const segmentedControlBg = useThemeColor(
    {},
    `segmentedControlBackground${capitalize(themeType)}` as ThemeColorType
  );

  // Refs & animation
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [headerMeasuredHeight, setHeaderMeasuredHeight] = useState(0);

  const headerOffset = useRef(new Animated.Value(initialHeaderOffset)).current;
  const currentHeaderTranslateRef = useRef(initialHeaderOffset);

  const [blurAmount, setBlurAmount] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isUserDragging = useRef(false);
  const lastScrollDelta = useRef(0);

  useEffect(() => {
    if (blurOnSlide) {
      const listenerId = headerOffset.addListener(({ value }) => {
        if (headerMeasuredHeight > 0) {
          const progress = Math.abs(value / -headerMeasuredHeight);
          const newBlurAmount = clamp(progress * maxBlurAmount, 0, maxBlurAmount);
          setBlurAmount(newBlurAmount);
        }
      });
      return () => headerOffset.removeListener(listenerId);
    }
  }, [blurOnSlide, maxBlurAmount, headerMeasuredHeight, headerOffset]);

  const MIN_TRANSLATE = headerMeasuredHeight ? -headerMeasuredHeight : 0;
  const MAX_TRANSLATE = 0;

  const animateHeaderTo = (toValue: number) => {
    Animated.timing(headerOffset, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      currentHeaderTranslateRef.current = toValue;
    });
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!headerMeasuredHeight) {
      return;
    }
    if (!isUserDragging.current) {
      setLastScrollY(e.nativeEvent.contentOffset.y);
      return;
    }

    const offsetY = e.nativeEvent.contentOffset.y;
    const delta = offsetY - lastScrollY;
    lastScrollDelta.current = delta;

    const newTranslate = currentHeaderTranslateRef.current - delta;
    const clamped = clamp(newTranslate, MIN_TRANSLATE, MAX_TRANSLATE);

    headerOffset.setValue(clamped);
    currentHeaderTranslateRef.current = clamped;
    setLastScrollY(offsetY);
  };

  const handleScrollBeginDrag = () => {
    isUserDragging.current = true;
  };

  const handleScrollEndDrag = () => {
    isUserDragging.current = false;
    if (lastScrollDelta.current > 0) {
      animateHeaderTo(MIN_TRANSLATE);
      currentHeaderTranslateRef.current = MIN_TRANSLATE;
    } else if (lastScrollDelta.current < 0) {
      animateHeaderTo(MAX_TRANSLATE);
      currentHeaderTranslateRef.current = MAX_TRANSLATE;
    }
  };

  const handleMomentumScrollBegin = () => {
    isUserDragging.current = false;
  };

  const handleMomentumScrollEnd = () => {
    if (lastScrollDelta.current > 0) {
      animateHeaderTo(MIN_TRANSLATE);
      currentHeaderTranslateRef.current = MIN_TRANSLATE;
    } else if (lastScrollDelta.current < 0) {
      animateHeaderTo(MAX_TRANSLATE);
      currentHeaderTranslateRef.current = MAX_TRANSLATE;
    }
  };

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl
        refreshing={!!refreshing}
        onRefresh={onRefresh}
        progressViewOffset={headerMeasuredHeight}
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

  // Setup for segmented control
  const defaultSelectedIndicator: SelectedIndicatorConfig = {
    useUnderline: true,
    underlineThickness: 4,
  };
  const mergedSegmentedProps = {
    animatedSwitch: true,
    selectedIndicator: defaultSelectedIndicator,
    ...segmentedControlProps,
  };
  const finalValues =
    mergedSegmentedProps.values ?? tabs.map((tab) => tab.title);
  const finalSelectedIndex =
    mergedSegmentedProps.selectedIndex ?? activeIndexState;
  const finalOnChange = mergedSegmentedProps.onChange ?? setActiveIndexState;

  function renderLibHeaderAndTabs() {
    return (
      <View
        style={styles.flexColumn}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (h !== headerMeasuredHeight) {
            setHeaderMeasuredHeight(h);
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
            styles.segmentedControlArea,
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
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <ThemedSegmentedControl
                {...mergedSegmentedProps}
                values={finalValues}
                selectedIndex={finalSelectedIndex}
                onChange={finalOnChange}
                padding={{
                  color: { light: segmentedControlBg, dark: segmentedControlBg },
                  internal: mergedSegmentedProps.padding?.internal ?? 0,
                }}
                style={[
                  styles.segmentedControl,
                  mergedSegmentedProps.style,
                  { backgroundColor: "transparent" },
                ]}
              />
            </ScrollView>
          ) : (
            <ThemedSegmentedControl
              {...mergedSegmentedProps}
              values={finalValues}
              selectedIndex={finalSelectedIndex}
              onChange={finalOnChange}
              padding={{
                color: { light: segmentedControlBg, dark: segmentedControlBg },
                internal: mergedSegmentedProps.padding?.internal ?? 0,
              }}
              style={[
                styles.segmentedControl,
                mergedSegmentedProps.style,
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

  return (
    <View style={styles.fullScreenContainer}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: resolvedScrollViewBg }]}
        edges={["left", "right", "bottom"]}
      >
        <View
          style={[
            styles.topSafeArea,
            { backgroundColor: resolvedTopSafeAreaBg, height: insets.top },
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
                {renderLibHeaderAndTabs()}
              </View>
            ) : (
              renderLibHeaderAndTabs()
            )}
          </Animated.View>
          <>
            {tabs.map((tab, index) => (
              <View
                key={index}
                style={{ flex: 1, display: index === effectiveTabIndex ? "flex" : "none" }}
              >
                <ScrollView
                  ref={index === effectiveTabIndex ? scrollViewRef : null}
                  style={[styles.scrollView, { backgroundColor: resolvedScrollViewBg }]}
                  contentContainerStyle={{
                    paddingTop: headerMeasuredHeight,
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
          </>
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
  flexOne: {
    flex: 1,
  },
  animatedHeaderContainer: {
    position: "absolute",
    left: 0,
    width,
    zIndex: 999,
  },
  flexColumn: {
    flexDirection: "column",
  },
  segmentedControlArea: {
    justifyContent: "center",
    alignItems: "center",
  },
  segmentedControl: {
    paddingVertical: 0,
    marginBottom: 0,
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
  },
});

export default ThemedNonStaticHeaderNonStaticTabbed2;
