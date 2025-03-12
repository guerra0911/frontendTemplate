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
import { BlurView } from "@react-native-community/blur";
import { useSharedValue } from "react-native-reanimated";

import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";

// Retained ThemeColorType definition:
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

export interface ThemedNonStaticHeaderTopProps {
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

  /**
   * The height of the header in px.
   * The user can scroll from offsetY=0 => offsetY=headerHeight 
   * to hide the header fully. 
   * @default 60
   */
  headerHeight?: number;

  /** If true, we blur the header as it slides. */
  blurOnSlide?: boolean;
  /** Max blur amount. @default 20 */
  maxBlurAmount?: number;
}

const DEFAULT_HEADER_HEIGHT = 60;
const DEFAULT_MAX_BLUR = 20;

export function ThemedNonStaticHeaderTop(props: ThemedNonStaticHeaderTopProps) {
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

  // Theming
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const capTheme = capitalize(themeType);

  const headerColorKey = `hideOnScrollHeaderBackground${capTheme}` as ThemeColorType;
  const scrollViewColorKey = `hideOnScrollScrollViewBackground${capTheme}` as ThemeColorType;
  const topSafeAreaColorKey = `hideOnScrollTopSafeAreaBackground${capTheme}` as ThemeColorType;

  const resolvedBgColor = useThemeColor(backgroundColor, headerColorKey);
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    scrollViewColorKey
  );
  const resolvedTopSafeAreaBg = useThemeColor(
    topSafeAreaBackgroundColor || {},
    topSafeAreaColorKey
  );

  // Refs & state
  const insets = useSafeAreaInsets();
  const showNavBar = useSharedValue(1);

  // Animated translation: 0 => fully visible, -headerHeight => fully hidden.
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  // Track last scroll delta (velocity proxy)
  const lastScrollDelta = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // For snapping logic & animation control
  const isAnimatingRef = useRef(false); // ignore updates during snap animation
  const MIN_TRANSLATE = -headerHeight;
  const MAX_TRANSLATE = 0;

  // For blur
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

  // Partial hide: update translation as user scrolls.
  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (isAnimatingRef.current) return;
    const offsetY = e.nativeEvent.contentOffset.y;
    // Compute delta (velocity proxy)
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

  // Finalize header snap: if momentum (delta) is high (>2 px), delay snapping.
  function finalizeHeader() {
    if (!scrollViewRef.current || isAnimatingRef.current) return;
    const offsetY = lastScrollY.current;
    if (offsetY <= 0 || offsetY >= headerHeight) return;

    const velocityThreshold = 2; // threshold of 2 pixels
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

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
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

  const renderHeader = () => (
    <LibHeader
      showNavBar={showNavBar}
      noBottomBorder={noBottomBorder}
      ignoreTopSafeArea={ignoreTopSafeArea}
      initialBorderColor={initialBorderColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      headerStyle={[
        { backgroundColor: resolvedBgColor, height: headerHeight },
        headerStyle,
      ]}
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
            { backgroundColor: resolvedTopSafeAreaBg, height: useSafeAreaInsets().top },
          ]}
        />
        <View style={styles.flexOne}>
          <Animated.View
            style={[
              styles.headerContainer,
              { transform: [{ translateY }] },
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
            ref={scrollViewRef}
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
});

export default ThemedNonStaticHeaderTop;
