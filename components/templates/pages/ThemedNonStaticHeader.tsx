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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Header as LibHeader } from "@codeherence/react-native-header";
import { useSharedValue } from "react-native-reanimated";

import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";
import { BlurView } from "@react-native-community/blur";

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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export interface ThemedNonStaticHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  scrollViewBackgroundColor?: { light?: string; dark?: string };
  topSafeAreaBackgroundColor?: { light?: string; dark?: string };
  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  children?: ReactNode;
  headerHeight?: number;
  blurOnSlide?: boolean;
  maxBlurAmount?: number;
}

const DEFAULT_HEADER_HEIGHT = 60;
const DEFAULT_MAX_BLUR = 20;

export function ThemedNonStaticHeader(props: ThemedNonStaticHeaderProps) {
  const {
    headerStyle,
    noBottomBorder,
    ignoreTopSafeArea = true,
    initialBorderColor,
    borderColor,
    borderWidth,
    renderLeft,
    renderCenter,
    renderRight,
    themeType = "primary",
    backgroundColor = {},
    scrollViewBackgroundColor,
    topSafeAreaBackgroundColor,
    isRefreshable,
    refreshing,
    onRefresh,
    children,
    headerHeight = DEFAULT_HEADER_HEIGHT,
    blurOnSlide = false,
    maxBlurAmount = DEFAULT_MAX_BLUR,
  } = props;

  // Resolve header background
  const capitalizedThemeType =
    themeType.charAt(0).toUpperCase() + themeType.slice(1);
  const headerColorKey = `hideOnScrollHeaderBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedBgColor = useThemeColor(backgroundColor, headerColorKey);

  // Resolve scrollView background
  const scrollViewColorKey = `hideOnScrollScrollViewBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    scrollViewColorKey
  );

  // Resolve top safe area color
  const topSafeAreaColorKey = `hideOnScrollTopSafeAreaBackground${capitalizedThemeType}` as ThemeColorType;
  const resolvedTopSafeAreaBg = useThemeColor(
    topSafeAreaBackgroundColor || {},
    topSafeAreaColorKey
  );

  const [lastScrollY, setLastScrollY] = useState(0);
  const isUserDragging = useRef(false);
  const layoutCalculated = useRef(false);

  const MIN_TRANSLATE = -headerHeight;
  const MAX_TRANSLATE = 0;
  const INITIAL_HEADER_OFFSET = 0;

  const currentHeaderTranslateRef = useRef(INITIAL_HEADER_OFFSET);
  const headerOffset = useRef(
    new Animated.Value(INITIAL_HEADER_OFFSET)
  ).current;

  const showNavBar = useSharedValue(1);
  const [headerBottom, setHeaderBottom] = useState(0);
  const insets = useSafeAreaInsets();

  // Change blurAmount to a number state instead of Animated.Value
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    if (blurOnSlide) {
      const listenerId = headerOffset.addListener(({ value }) => {
        // Calculate blur intensity based on scroll position
        const progress = Math.abs(value / MIN_TRANSLATE);
        const newBlurAmount = clamp(progress * maxBlurAmount, 0, maxBlurAmount);
        setBlurAmount(newBlurAmount);
      });

      return () => {
        headerOffset.removeListener(listenerId);
      };
    }
  }, [blurOnSlide, maxBlurAmount, headerOffset, MIN_TRANSLATE]);

  // Track the last scroll delta
  const lastScrollDelta = useRef(0);

  // Enhanced initialization logic
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      // Calculate initial headerBottom value
      const calculatedBottom = insets.top + headerHeight;
      setHeaderBottom(calculatedBottom);

      currentHeaderTranslateRef.current = INITIAL_HEADER_OFFSET;
      headerOffset.setValue(INITIAL_HEADER_OFFSET);
      setInitialized(true);

      // Force a layout pass
      layoutCalculated.current = true;
    }
  }, [initialized, headerHeight, insets.top, headerOffset]);

  // Modified animateHeaderTo to allow dynamic duration
  const animateHeaderTo = (newVal: number, duration: number = 300) => {
    Animated.timing(headerOffset, {
      toValue: newVal,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    // Edge case: When at the very top, header must always be visible.
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
    // When swiping down (finger moves from bottom to top), update header proportionally.
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
      // User scrolled down – hide header.
      animateHeaderTo(MIN_TRANSLATE, 300);
      currentHeaderTranslateRef.current = MIN_TRANSLATE;
    } else if (lastScrollDelta.current < 0) {
      // User scrolled up – reveal header.
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

  const { top: safeTop } = useSafeAreaInsets();
  // Adjusted buffer calculation based on platform
  const offsetBuffer = Platform.select({
    ios: 130, // 65 + 65 for iOS
    android: 100, // Reduced for Android
    default: 130,
  });

  const refreshProgressOffset = safeTop + offsetBuffer;

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
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

  const renderHeader = () => (
    <LibHeader
      showNavBar={showNavBar}
      noBottomBorder={noBottomBorder}
      ignoreTopSafeArea={true}
      initialBorderColor={initialBorderColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      headerStyle={[
        { backgroundColor: resolvedBgColor, height: headerHeight },
        headerStyle,
      ]}
      headerLeftStyle={{ marginLeft: 0, paddingLeft: 0 }}
      headerLeft={renderLeft ? renderLeft() : <ThemedHeaderBackButton />}
      headerCenter={renderCenter?.()}
      headerRight={renderRight?.()}
    />
  );

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
            style={[
              styles.headerContainer,
              {
                height: headerHeight,
                transform: [{ translateY: headerOffset }],
              },
            ]}
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
            {children}
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
  container: {
    flex: 1,
  },
  topSafeArea: {
    zIndex: 1000,
  },
  headerContainer: {
    position: "absolute",
    left: 0,
    width: width,
    zIndex: 999,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
});
