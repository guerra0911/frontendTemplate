import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  StatusBar,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import tailwind from "twrnc";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;

type TabsProps = {
  tabName: string;
  imageSrc: ImageSourcePropType;
};

const tabs: TabsProps[] = [
  { tabName: "Tab 1", imageSrc: require("./dynamic/photo1.jpg") },
  { tabName: "Tab 2", imageSrc: require("./dynamic/photo2.jpg") },
  { tabName: "Tab 3", imageSrc: require("./dynamic/photo3.jpg") },
  { tabName: "Tab 4", imageSrc: require("./dynamic/photo4.jpg") },
];

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
type FlatListImageProps = { item: TabsProps };

type FlatListTextProps = {
  item: TabsProps;
  index: number;
  viewTranslatePoints: number[];
  setViewTranslatePoints: React.Dispatch<React.SetStateAction<number[]>>;
  tabWidths: number[];
  setTabWidths: React.Dispatch<React.SetStateAction<number[]>>;
};

const FlatListImage = ({ item }: FlatListImageProps) => {
  return (
    <Animated.View
      key={item.tabName}
      style={tailwind.style(`h-[${SCREEN_HEIGHT}px] w-[${SCREEN_WIDTH}px]`)}
    >
      <Image style={tailwind.style("h-full w-full")} source={item.imageSrc} />
    </Animated.View>
  );
};

const FlatListText = ({
  item,
  index,
  viewTranslatePoints,
  setViewTranslatePoints,
  tabWidths,
  setTabWidths,
}: FlatListTextProps) => {
  const handleViewLayout = (event: LayoutChangeEvent) => {
    const { x } = event.nativeEvent.layout;
    const currentPoints = [...viewTranslatePoints];
    currentPoints[index] = x;
    setViewTranslatePoints(currentPoints);
  };

  const handleTextLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    const currentTabWidths = [...tabWidths];
    currentTabWidths[index] = width;
    setTabWidths(currentTabWidths);
  };

  return (
    <Animated.View onLayout={handleViewLayout} key={item.tabName}>
      <Text
        onLayout={handleTextLayout}
        style={tailwind.style("text-lg font-bold text-white")}
      >
        {item.tabName}
      </Text>
    </Animated.View>
  );
};

type TabProps = {
  scrollXValue: SharedValue<number>;
};

const Tabs = ({ scrollXValue }: TabProps) => {
    const [viewTranslatePoints, setViewTranslatePoints] = useState<number[]>([]);
    const [tabWidths, setTabWidths] = useState<number[]>([]);
  
    const indicatorStyle = useAnimatedStyle(() => {
      if (tabWidths.length === tabs.length && viewTranslatePoints.length === tabs.length) {
        return {
          width: interpolate(
            scrollXValue.value,
            tabs.map((_, i) => i * SCREEN_WIDTH),
            tabWidths,
            Extrapolation.CLAMP
          ),
          transform: [
            {
              translateX: interpolate(
                scrollXValue.value,
                tabs.map((_, i) => i * SCREEN_WIDTH),
                viewTranslatePoints,
                Extrapolation.CLAMP
              ),
            },
          ],
        };
      } else {
        return {
          width: 0,
          transform: [{ translateX: 0 }],
        };
      }
    });
    return (
        <Animated.View style={tailwind.style("relative w-full px-4 z-20")}>
          <View style={tailwind.style("flex flex-row items-start justify-between")}>
            {tabs.map((value, index) => (
              <FlatListText
                key={value.tabName}
                item={value}
                index={index}
                viewTranslatePoints={viewTranslatePoints}
                setViewTranslatePoints={setViewTranslatePoints}
                tabWidths={tabWidths}
                setTabWidths={setTabWidths}
              />
            ))}
          </View>
          <Animated.View
            style={[
              tailwind.style("absolute h-2 bg-white rounded-md -bottom-3"),
              indicatorStyle,
              { zIndex: 30 },
            ]}
          />
        </Animated.View>
      );
    };

export default function DynamicTabExample() {
  const { top } = useSafeAreaInsets();
  const scrollValue = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollValue.value = event.contentOffset.x;
    },
  });

  const scrollMomentumEndHandler = useAnimatedScrollHandler({
    onMomentumEnd: event => {
      const scrollDiff = event.contentOffset.x % SCREEN_WIDTH;
      if (scrollDiff > SCREEN_WIDTH / 2) {
        const scrollMultiplier = Math.ceil(
          event.contentOffset.x / SCREEN_WIDTH,
        );
        scrollTo(scrollRef, scrollMultiplier * SCREEN_WIDTH, 0, true);
      } else {
        const scrollMultiplier = Math.floor(
          event.contentOffset.x / SCREEN_WIDTH,
        );
        scrollTo(scrollRef, scrollMultiplier * SCREEN_WIDTH, 0, true);
      }
    },
  });

  return (
    <View style={tailwind.style(`flex-1 pt-[${top}px] bg-[#141414]`)}>
      <StatusBar barStyle={"light-content"} />
      <Tabs scrollXValue={scrollValue} />
      <LinearGradient
        colors={["rgba(0,0,0,1)", "transparent"]}
        style={tailwind.style(`absolute inset-0 h-[${top * 2}px] z-10`)}
      />
      <AnimatedFlatlist
        // @ts-ignore
        ref={scrollRef}
        onMomentumScrollEnd={scrollMomentumEndHandler}
        onScroll={scrollHandler}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={16}
        style={tailwind.style("absolute z-0")}
        data={tabs}
        renderItem={({ item }) => {
          return <FlatListImage item={item as TabsProps} />;
        }}
      />
    </View>
  );
};