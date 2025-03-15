// app/components/screens/ThemedStaticHeaderNonStaticTabbed.tsx

import React, { ReactNode, useState } from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  RefreshControl,
  Platform,
  View,
  useColorScheme,
  ScrollView,
  FlexAlignType,
} from "react-native";
import {
  Header as LibHeader,
  ScrollViewWithHeaders,
} from "@codeherence/react-native-header";
import { useSharedValue } from "react-native-reanimated";

import ThemedHeaderBackButton from "../headers/ThemedHeaderBackButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { BOTTOM_FOOTER_HEIGHT } from "@/constants/Layouts";
import ThemedSegmentedControl, {
  ThemedSegmentedControlProps,
} from "../buttons/ThemedSegmentedControl";

type ScrollViewWithHeadersProps = React.ComponentProps<
  typeof ScrollViewWithHeaders
>;

interface LocalHeaderProps {
  headerStyle?: StyleProp<ViewStyle>;
  noBottomBorder?: boolean;
  ignoreTopSafeArea?: boolean;
  initialBorderColor?: string;
  borderColor?: string;
  borderWidth?: number;
  renderLeft?: () => ReactNode;
  renderCenter?: () => ReactNode;
  renderRight?: () => ReactNode;

  headerContainerBorderBottomWidth?: number;
  headerContainerBorderBottomColor?: string;
  headerContainerPaddingTop?: number;
  headerContainerPaddingBottom?: number;
  headerContainerPaddingLeft?: number;
  headerContainerPaddingRight?: number;
  headerContainerMarginTop?: number;
  headerContainerMarginBottom?: number;
  headerContainerMarginLeft?: number;
  headerContainerMarginRight?: number;

  // Spacing between segmented control and header container borders
  headerSegmentedControlMarginBottom?: number;
  headerSegmentedControlMarginTop?: number;
}

type ThemeColorType =
  | "staticHeaderBackgroundPrimary"
  | "staticHeaderBackgroundSecondary"
  | "staticHeaderBackgroundTertiary"
  | "scrollViewBackgroundPrimary"
  | "scrollViewBackgroundSecondary"
  | "scrollViewBackgroundTertiary"
  | "segmentedControlBackgroundPrimary"
  | "segmentedControlBackgroundSecondary"
  | "segmentedControlBackgroundTertiary"
  | "headerContainerBorderBottomPrimary"
  | "headerContainerBorderBottomSecondary"
  | "headerContainerBorderBottomTertiary"
  | "libHeaderBorderPrimary"
  | "libHeaderBorderSecondary"
  | "libHeaderBorderTertiary";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface Tab {
  title: string;
  content: ReactNode;
}

export interface ThemedStaticHeaderNonStaticTabbedProps
  extends Omit<
    ScrollViewWithHeadersProps,
    "HeaderComponent" | "LargeHeaderComponent" | "children" | "refreshControl"
  > {
  themeType?: "primary" | "secondary" | "tertiary";
  backgroundColor?: { light?: string; dark?: string };
  headerProps?: Partial<LocalHeaderProps>;
  isRefreshable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  scrollViewBackgroundColor?: { light?: string; dark?: string };
  tabs: Tab[];
  segmentedControlProps?: Partial<ThemedSegmentedControlProps>;
  // Additional custom styling for the segmented control container, if desired.
  segmentedControlContainerStyle?: StyleProp<ViewStyle>;
  // Option to enable horizontal scrolling for segmented control tabs
  scrollableTabs?: boolean;
}

export function ThemedStaticHeaderNonStaticTabbed(
  props: ThemedStaticHeaderNonStaticTabbedProps
) {
  const {
    themeType = "primary",
    backgroundColor = {},
    headerProps = {},
    scrollViewBackgroundColor,
    style,
    contentContainerStyle,
    isRefreshable,
    refreshing,
    onRefresh,
    tabs,
    segmentedControlProps = {},
    segmentedControlContainerStyle,
    scrollableTabs = false,
    ...scrollProps
  } = props;

  const {
    noBottomBorder = false,
    headerContainerBorderBottomWidth = 1,
    headerContainerBorderBottomColor = undefined,
    headerContainerPaddingTop = 0,
    headerContainerPaddingBottom = 8,
    headerContainerPaddingLeft = 0,
    headerContainerPaddingRight = 0,
    headerContainerMarginTop = 0,
    headerContainerMarginBottom = 0,
    headerContainerMarginLeft = 0,
    headerContainerMarginRight = 0,
    ignoreTopSafeArea,
    initialBorderColor,
    borderColor,
    borderWidth,
    headerStyle,
    renderLeft,
    renderCenter,
    renderRight,
    headerSegmentedControlMarginBottom = 0,
    headerSegmentedControlMarginTop = 0,
  } = headerProps;

  const [activeIndex, setActiveIndex] = useState(0);
  const showNavBar = useSharedValue(1);

  const colorKey = `staticHeaderBackground${capitalize(themeType)}` as ThemeColorType;
  const resolvedBg = useThemeColor(backgroundColor, colorKey);

  const libHeaderBorderColor = useThemeColor(
    {},
    `libHeaderBorder${capitalize(themeType)}` as ThemeColorType
  );

  const themeBorderBottomKey = `headerContainerBorderBottom${capitalize(
    themeType
  )}` as ThemeColorType;
  const defaultHeaderContainerBorderBottomColor = useThemeColor(
    {},
    themeBorderBottomKey
  );
  const finalHeaderContainerBorderBottomColor =
    headerContainerBorderBottomColor || defaultHeaderContainerBorderBottomColor;

  const segmentedControlBg = useThemeColor(
    {},
    `segmentedControlBackground${capitalize(themeType)}` as ThemeColorType
  );

  const defaultScrollViewColorKey = `scrollViewBackground${capitalize(
    themeType
  )}` as ThemeColorType;
  const resolvedScrollViewBg = useThemeColor(
    scrollViewBackgroundColor || {},
    defaultScrollViewColorKey
  );

  const colorScheme = useColorScheme();
  const refreshIndicatorColor = colorScheme === "dark" ? "#fff" : "#000";

  const maybeRefreshControl =
    isRefreshable && onRefresh ? (
      <RefreshControl
        refreshing={!!refreshing}
        onRefresh={onRefresh}
        tintColor={refreshIndicatorColor}
        colors={[refreshIndicatorColor]}
        progressBackgroundColor={
          Platform.OS === "android" ? refreshIndicatorColor : undefined
        }
      />
    ) : undefined;

  const mergedContentContainerStyle = [
    { paddingBottom: BOTTOM_FOOTER_HEIGHT, backgroundColor: resolvedScrollViewBg },
    contentContainerStyle,
  ];

  const mergedScrollViewStyle = [
    styles.container,
    { backgroundColor: resolvedScrollViewBg },
    style,
  ];

  // HeaderComponent renders the header (LibHeader) that scrolls with content
  const HeaderComponent = ({ showNavBar: _unused }: { showNavBar: any }) => {
    return (
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: resolvedBg,
            borderBottomWidth: headerContainerBorderBottomWidth,
            borderBottomColor: finalHeaderContainerBorderBottomColor,
            paddingTop: headerContainerPaddingTop,
            paddingBottom: headerContainerPaddingBottom,
            paddingLeft: headerContainerPaddingLeft,
            paddingRight: headerContainerPaddingRight,
            marginTop: headerContainerMarginTop,
            marginBottom: headerContainerMarginBottom,
            marginLeft: headerContainerMarginLeft,
            marginRight: headerContainerMarginRight,
          },
        ]}
      >
        <LibHeader
          showNavBar={showNavBar}
          noBottomBorder={noBottomBorder}
          ignoreTopSafeArea={ignoreTopSafeArea}
          initialBorderColor={initialBorderColor}
          borderColor={borderColor || libHeaderBorderColor}
          borderWidth={borderWidth}
          headerStyle={[{ backgroundColor: resolvedBg }, headerStyle]}
          headerLeft={
            renderLeft ? (
              renderLeft()
            ) : (
              <ThemedHeaderBackButton onPress={() => router.back()} />
            )
          }
          headerCenter={renderCenter ? renderCenter() : null}
          headerRight={renderRight ? renderRight() : null}
        />
      </View>
    );
  };

  // Build segmented control style; if scrollable, force left alignment
  const segmentedControlStyle = [
    styles.segmentedControl,
    segmentedControlProps.style,
    { backgroundColor: "transparent" },
    scrollableTabs && { alignSelf: "flex-start" as FlexAlignType },
  ];

  // Render separate scroll containers for each tab so that each maintains its own scroll state.
  return (
    <>
      {tabs.map((tab, index) => (
        <View key={index} style={{ flex: 1, display: index === activeIndex ? "flex" : "none" }}>
          <ScrollViewWithHeaders
            HeaderComponent={HeaderComponent}
            refreshControl={maybeRefreshControl}
            style={mergedScrollViewStyle}
            contentContainerStyle={mergedContentContainerStyle}
            {...scrollProps}
          >
            <View
              style={[
                styles.segmentedControlContainer,
                {
                  marginTop: headerSegmentedControlMarginTop,
                  marginBottom: headerSegmentedControlMarginBottom,
                },
                segmentedControlContainerStyle,
              ]}
            >
              {scrollableTabs ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
                >
                  <ThemedSegmentedControl
                    values={tabs.map((tab) => tab.title)}
                    selectedIndex={activeIndex}
                    onChange={setActiveIndex}
                    style={segmentedControlStyle}
                    padding={{
                      color: { light: segmentedControlBg, dark: segmentedControlBg },
                      internal: segmentedControlProps.padding?.internal ?? 0,
                    }}
                    {...segmentedControlProps}
                  />
                </ScrollView>
              ) : (
                <ThemedSegmentedControl
                  values={tabs.map((tab) => tab.title)}
                  selectedIndex={activeIndex}
                  onChange={setActiveIndex}
                  style={segmentedControlStyle}
                  padding={{
                    color: { light: segmentedControlBg, dark: segmentedControlBg },
                    internal: segmentedControlProps.padding?.internal ?? 0,
                  }}
                  {...segmentedControlProps}
                />
              )}
            </View>
            {tab.content}
          </ScrollViewWithHeaders>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "stretch",
  },
  segmentedControlContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  segmentedControl: {
    paddingVertical: 0,
    marginBottom: 0,
    alignSelf: "center",
  },
});

export default ThemedStaticHeaderNonStaticTabbed;
