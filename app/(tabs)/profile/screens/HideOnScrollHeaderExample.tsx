// HideOnScrollHeaderExample.tsx

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/templates/typography/ThemedText";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// 1) Import the "Header" component and any reanimated hooks needed:
import { Header as LibHeader } from "@codeherence/react-native-header";
import { useSharedValue } from "react-native-reanimated";

// If you have a custom back button component:
import ThemedHeaderBackButton from "@/components/templates/headers/ThemedHeaderBackButton";
// Or wherever it’s located (adjust import path as needed).
import { router } from "expo-router";

/**
 * Utility to clamp a numeric value between min and max
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const HEADER_HEIGHT = 60;

export default function HideOnScrollHeaderExample() {
  const insets = useSafeAreaInsets();

  // We keep track of the last known ScrollView offset to compute deltas
  const [lastScrollY, setLastScrollY] = useState(0);
  const isUserDragging = useRef(false);

  // For pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  /**
   * The total distance the header can hide.
   * Example: If insets.top = 44 on an iPhone X, then
   * HIDE_OFFSET = 60 + 44 = 104.
   */
  const HIDE_OFFSET = HEADER_HEIGHT + insets.top;

  // We'll store the "current" animated translation in a normal ref,
  // then sync it with an Animated.Value for smooth UI updates.
  const currentHeaderTranslateRef = useRef(0);
  const headerOffset = useRef(new Animated.Value(0)).current;

  /**
   * For your final hidden or visible positions,
   * you can tweak these “min” and “max” values.
   */
  const MIN_TRANSLATE = -HIDE_OFFSET * 1.5; // fully hidden + some extra
  const MAX_TRANSLATE = -HEADER_HEIGHT;     // partially visible in your example

  /**
   * If you want to start partially hidden on load, set an initial value here.
   * Or set to 0 for fully visible initially.
   */
  const INITIAL_HEADER_OFFSET = -HIDE_OFFSET / 2;

  // 2) We also need a SharedValue for showNavBar to pass to LibHeader
  //    so it matches the expected type {Animated.SharedValue<number>}
  const showNavBar = useSharedValue(1); // always "1" => we always show the nav bar's content

  // Initialize the header position once
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      currentHeaderTranslateRef.current = INITIAL_HEADER_OFFSET;
      headerOffset.setValue(INITIAL_HEADER_OFFSET);
      setInitialized(true);
    }
  }, [initialized, headerOffset]);

  /**
   * This function instantly updates the header’s Animated.Value to `newVal`.
   * For a direct follow effect, we keep duration=0.
   */
  const animateHeaderTo = (newVal: number) => {
    Animated.timing(headerOffset, {
      toValue: newVal,
      duration: 0, // no animation duration => direct follow
      useNativeDriver: true,
    }).start();
  };

  /**
   * Proportional hide/show logic:
   * - Only run if user is physically dragging (ignore bounce/momentum).
   * - We compute the scroll delta from lastScrollY.
   * - We adjust currentHeaderTranslateRef by that delta (inverted).
   * - Then we clamp and update the Animated.Value.
   */
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;

    if (!isUserDragging.current) {
      // Always update lastScrollY, but skip header logic
      setLastScrollY(offsetY);
      return;
    }

    const delta = offsetY - lastScrollY;
    // Scrolling down => delta>0 => we push header more negative
    // Scrolling up => delta<0 => we push header toward zero
    const newTranslate = currentHeaderTranslateRef.current - delta;

    // clamp between MIN_TRANSLATE and MAX_TRANSLATE
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {/**
         * 3) We keep the same Animated.View for the Y-translation logic.
         *    Instead of your old ThemedText, we render LibHeader from codeherence.
         */}
        <Animated.View
          style={[
            styles.header,
            {
              top: insets.top,
              transform: [{ translateY: headerOffset }],
            },
          ]}
        >
          {/**
           * 4) Use <LibHeader> from codeherence
           *    We must pass showNavBar as a SharedValue
           */}
          <LibHeader
            showNavBar={showNavBar} 
            headerStyle={[{ backgroundColor: "#6200ea" }]}
            // If you want to remove the bottom border or safe area offset:
            // noBottomBorder={true}
            // ignoreTopSafeArea={true}
            // borderColor={"#ddd"}
            // borderWidth={0}
            headerLeft={<ThemedHeaderBackButton onPress={() => router.back()} />}
            headerCenter={
              <ThemedText style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                Proportional Hide Header
              </ThemedText>
            }
            headerRight={<View />}
          />
        </Animated.View>

        {/**
         * 5) Keep your existing ScrollView code the same
         *    (i.e., no changes to the animation or refresh logic)
         */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          onMomentumScrollBegin={handleMomentumScrollBegin}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={HIDE_OFFSET - HEADER_HEIGHT + 8}
              colors={["#6200ea"]}
              tintColor="#6200ea"
            />
          }
        >
          <View style={styles.placeholder}>
            <ThemedText style={{ textAlign: "center" }}>
              The header hides/shows proportionally as you scroll,
              but now using the codeherence Header UI.
            </ThemedText>
          </View>

          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.listItem}>
              <ThemedText>Item #{i + 1}</ThemedText>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    position: "absolute",
    left: 0,
    width,
    height: HEADER_HEIGHT,
    // Keep a fixed 60px to match your logic
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  scrollView: {
    flex: 1,
  },
  placeholder: {
    height: 200,
    backgroundColor: "#E1BEE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  listItem: {
    height: 60,
    backgroundColor: "#D1C4E9",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
