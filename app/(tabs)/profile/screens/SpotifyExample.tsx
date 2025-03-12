import React from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import { playlist, PlaylistType } from './spotify/playlists';
import { ChevronLeft } from './spotify/ChevronLeft';
import { EllipsisHorizontal } from './spotify/EllipsisHorizontal';
import { EllipsisVertical } from './spotify/EllipsisVertical';

const formatter = Intl.NumberFormat('en-IN');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const posterSize = Dimensions.get('screen').height / 2;
const headerTop = 44 - 16;

type AnimationProps = {
  sv: SharedValue<number>;
};

const ScreenHeader: React.FC<AnimationProps> = ({ sv }) => {
  const inset = useSafeAreaInsets();
  const headerRange = posterSize - (headerTop + inset.top);
  const opacityAnim = useAnimatedStyle(() => {
    // Simplified interpolation range for opacity, scale, and translateY
    const opacity = interpolate(sv.value, [headerRange * 0.75, headerRange + 1], [0, 1], Extrapolation.CLAMP);
    const scale = interpolate(sv.value, [headerRange * 0.75, headerRange + 1], [0.98, 1], Extrapolation.CLAMP);
    const translateY = interpolate(sv.value, [headerRange * 0.75, headerRange + 1], [-10, 0], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ scale }, { translateY }],
      paddingTop: inset.top === 0 ? 8 : inset.top,
    };
  });
  return (
    <Animated.View
      style={[
        tailwind.style(
          'absolute w-full px-4 pb-2 flex flex-row items-start justify-between z-10 bg-black'
        ),
        opacityAnim,
      ]}
    >
      <ChevronLeft />
      <Animated.Text style={tailwind.style('text-xl text-white font-medium')}>
        John Krasinski
      </Animated.Text>
      <EllipsisVertical />
    </Animated.View>
  );
};

const PosterImage: React.FC<AnimationProps> = ({ sv }) => {
  const inset = useSafeAreaInsets();
  // Cache layoutY value once measured
  const layoutY = useSharedValue(0);
  const opacityAnim = useAnimatedStyle(() => {
    // Simplified opacity interpolation for the poster image
    return {
      opacity: interpolate(sv.value, [0, posterSize - (headerTop + inset.top) * 1.1], [1, 0], Extrapolation.CLAMP),
    };
  });
  const textAnim = useAnimatedStyle(() => {
    // Simplify text opacity and scale interpolations
    return {
      opacity: interpolate(sv.value, [-posterSize / 8, 0, posterSize * 0.6], [0, 1, 0], Extrapolation.CLAMP),
      transform: [
        {
          scale: interpolate(sv.value, [-posterSize / 8, 0, posterSize * 0.5], [1.1, 1, 0.95], Extrapolation.CLAMP),
        },
      ],
    };
  });
  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(sv.value, [-50, 0], [1.3, 1], {
            extrapolateLeft: 'extend',
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.imageContainer, opacityAnim]}>
      <Animated.Image
        style={[styles.imageStyle, scaleAnim]}
        source={require('./spotify/artist.jpeg')}
      />
      <Animated.View
        onLayout={(event: LayoutChangeEvent) => {
          'worklet';
          layoutY.value = event.nativeEvent.layout.y;
        }}
        style={[
          tailwind.style(
            'absolute bottom-0 top-0 left-0 right-0 justify-end items-center px-5 z-10'
          ),
          textAnim,
        ]}
      >
        <Animated.Text
          numberOfLines={2}
          style={tailwind.style('text-6xl font-bold text-white text-center')}
        >
          John Krasinski
        </Animated.Text>
      </Animated.View>
      <AnimatedLinearGradient
        style={[tailwind.style('absolute inset-0'), scaleAnim]}
        colors={[
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.5)',
          'rgba(0,0,0,0.8)',
          'rgba(0,0,0,1)',
        ]}
      />
    </Animated.View>
  );
};

const Playlist = () => {
  return (
    <View style={tailwind.style('bg-black')}>
      {playlist.map((song: PlaylistType, index: number) => (
        <View
          style={tailwind.style('flex flex-row items-center justify-between py-2 mr-5')}
          key={JSON.stringify(song.name + index)}
        >
          <View style={tailwind.style('flex flex-row items-center')}>
            <View style={tailwind.style('absolute w-10 flex-row items-center justify-center')}>
              <Text style={tailwind.style('text-sm text-center font-bold text-white opacity-50')}>
                {index + 1}
              </Text>
            </View>
            <View style={tailwind.style('pl-10')}>
              <Text style={tailwind.style('text-base font-medium text-white')}>
                {song.name}
              </Text>
              <Text style={tailwind.style('text-sm text-white opacity-60')}>
                {formatter.format(song.plays)}
              </Text>
            </View>
          </View>
          <EllipsisHorizontal />
        </View>
      ))}
    </View>
  );
};

export default function SpotifyExample() {
  const inset = useSafeAreaInsets();
  const sv = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet';
      sv.value = event.contentOffset.y;
    },
  });

  const initialTranslateValue = posterSize;

  const animatedScrollStyle = useAnimatedStyle(() => {
    return {
      paddingTop: initialTranslateValue,
    };
  });

  const layoutY = useSharedValue(0);

  const stickyElement = useAnimatedStyle(() => {
    return {
      backgroundColor: 'black',
      transform: [
        {
          translateY: interpolate(
            sv.value,
            [
              layoutY.value - (headerTop + inset.top) - 1,
              layoutY.value - (headerTop + inset.top),
              layoutY.value - (headerTop + inset.top) + 1,
            ],
            [0, 0, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View style={[tailwind.style('flex-1 bg-black')]}>
      <ScreenHeader sv={sv} />
      <PosterImage sv={sv} />
      <Animated.View style={tailwind.style('flex-1')}>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={tailwind.style('flex-1')}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[animatedScrollStyle, tailwind.style('pb-10')]}>
            {/* Button Section */}
            <Animated.View
              onLayout={(event: LayoutChangeEvent) => {
                'worklet';
                layoutY.value = event.nativeEvent.layout.y;
              }}
              style={[
                tailwind.style('flex items-center justify-center z-10 pb-4 pt-4'),
                stickyElement,
              ]}
            >
              <Pressable style={tailwind.style('bg-green-500 px-10 py-2 items-center rounded-full')}>
                <Text style={tailwind.style('text-base font-bold text-white uppercase')}>
                  Shuffle Play
                </Text>
              </Pressable>
            </Animated.View>
            <Animated.View style={tailwind.style('flex items-start justify-center pb-3 pt-4 bg-black')}>
              <Pressable style={tailwind.style('px-10 items-start rounded-full')}>
                <Text style={tailwind.style('text-[18px] tracking-[.15] font-bold text-white')}>
                  Popular
                </Text>
              </Pressable>
            </Animated.View>
            {/* Songs List */}
            <Playlist />
          </Animated.View>
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width,
    position: 'absolute',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
