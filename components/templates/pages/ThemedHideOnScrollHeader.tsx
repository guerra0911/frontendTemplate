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

type ThemeColorType =
  | "hideOnScrollHeaderBackgroundPrimary"
  | "hideOnScrollHeaderBackgroundSecondary"
  | "hideOnScrollHeaderBackgroundTertiary";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export interface ThemedHideOnScrollHeaderProps {
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
  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  children?: ReactNode;
  headerHeight?: number;
}

const DEFAULT_HEADER_HEIGHT = 60;

export function ThemedHideOnScrollHeader(props: ThemedHideOnScrollHeaderProps) {
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
    isRefreshable,
    refreshing,
    onRefresh,
    children,
    headerHeight = DEFAULT_HEADER_HEIGHT,
  } = props;

  const colorKey = `hideOnScrollHeaderBackground${
    themeType.charAt(0).toUpperCase() + themeType.slice(1)
  }` as ThemeColorType;
  const resolvedBgColor = useThemeColor(backgroundColor, colorKey);

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
  }, [initialized, headerHeight, insets.top]);

  const animateHeaderTo = (newVal: number) => {
    Animated.timing(headerOffset, {
      toValue: newVal,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (!isUserDragging.current) {
      setLastScrollY(offsetY);
      return;
    }
    const delta = offsetY - lastScrollY;
    const newTranslate = currentHeaderTranslateRef.current - delta;
    const clamped = clamp(newTranslate, MIN_TRANSLATE, MAX_TRANSLATE);

    currentHeaderTranslateRef.current = clamped;
    animateHeaderTo(clamped);

    setLastScrollY(offsetY);
  };

  const handleScrollBeginDrag = () => {
    isUserDragging.current = true;
  };
  const handleScrollEndDrag = () => {
    isUserDragging.current = false;
  };
  const handleMomentumScrollBegin = () => {
    isUserDragging.current = false;
  };
  const handleMomentumScrollEnd = () => {
    /* no-op */
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
        progressViewOffset={headerBottom-56}
        // Added platform-specific props
        {...Platform.select({
          android: {
            progressBackgroundColor: '#ffffff',
            colors: ['#999999'],
          },
          ios: {
            tintColor: '#999999',
          },
        })}
      />
    ) : undefined;

  return (
    <View style={styles.fullScreenContainer}>
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <View style={[styles.topSafeArea, { height: insets.top }]} />

        <View style={{ flex: 1 }}>
          <Animated.View
            onLayout={(e) => {
              if (!layoutCalculated.current) {
                const { height } = e.nativeEvent.layout;
                const bottom = insets.top + height;
                setHeaderBottom(bottom);
                layoutCalculated.current = true;
                console.log("Header layout calculated, bottom:", bottom);
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
              headerLeft={
                renderLeft ? renderLeft() : <ThemedHeaderBackButton />
              }
              headerCenter={renderCenter?.()}
              headerRight={renderRight?.()}
            />
          </Animated.View>

          <ScrollView
            style={styles.scrollView}
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
    backgroundColor: "#fafafa",
  },
  topSafeArea: {
    backgroundColor: "green",
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