import React, { useRef, useMemo, useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { initialQalmas, Qalma } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SpaceBackground } from '@/components/SpaceBackground';
import { loadQalmasData, resetAllQalmas } from '@/utils/storage';

const { width } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ZikrsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [savedQalmas, setSavedQalmas] = useState<{
    [key: number]: Qalma;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await loadQalmasData();
      setSavedQalmas(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Convert initialQalmas object to array for FlatList - using useMemo to prevent recreation on every render
  const zikrItems = useMemo(() => {
    // Use saved data if available, otherwise use initial data
    const qalmaData = savedQalmas || initialQalmas;

    return Object.keys(qalmaData)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => {
        const index = parseInt(key);
        const qalma = qalmaData[index];
        return {
          id: key,
          index,
          qalma: qalma.qalma,
          count: qalma.count,
          loop: qalma.loop,
          day: qalma.day,
        };
      });
  }, [savedQalmas]);

  const handleSelectZikr = React.useCallback((index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: '/(tabs)',
      params: { qalmaIndex: index.toString() },
    });
  }, []);

  const handleResetAll = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const success = await resetAllQalmas();
    if (success) {
      setSavedQalmas(null);
    }
  };

  // Memoize the render function to prevent unnecessary rerenders
  const renderItem = React.useCallback(
    ({ item, index }: { item: (typeof zikrItems)[0]; index: number }) => {
      return (
        <AnimatedTouchable
          entering={FadeInDown.delay(index * 100)
            .springify()
            .damping(15)}
          exiting={FadeOut}
          onPress={() => handleSelectZikr(item.index)}
          className="mx-4 my-3 overflow-hidden rounded-3xl"
          activeOpacity={0.7}
        >
          {/* Card content container with proper clipping */}
          <View className="overflow-hidden rounded-3xl">
            <LinearGradient
              colors={['rgba(94, 114, 235, 0.2)', 'rgba(58, 60, 136, 0.2)']}
              className="absolute left-0 right-0 top-0 bottom-0"
            />

            <View className="p-5">
              {/* Zikr number badge */}
              <View className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-indigo-600 items-center justify-center border-2 border-indigo-700 z-10">
                <Text className="text-white font-bold">{index + 1}</Text>
              </View>

              {/* Zikr content */}
              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white/60 text-xs">
                    Zikr {index + 1}
                  </Text>

                  {/* Day Badge */}
                  {item.day && (
                    <View className="bg-indigo-600/60 py-1 px-3 rounded-full">
                      <Text className="text-white text-xs">{item.day}</Text>
                    </View>
                  )}
                </View>

                <Text
                  className="text-orange-500 text-right text-2xl mb-4"
                  style={{ fontFamily: 'Amiri', lineHeight: 40 }}
                >
                  {item.qalma}
                </Text>

                {/* Stats */}
                <View className="flex-row flex-wrap justify-between mt-auto">
                  {/* Count */}
                  <View className="bg-white/15 rounded-xl py-2 px-3 flex-row items-center">
                    <MaterialIcons name="tag" size={16} color="white" />
                    <Text className="text-white ml-2">
                      Count: <Text className="font-bold">{item.count}</Text>
                    </Text>
                  </View>

                  {/* Loops */}
                  <View className="bg-white/15 rounded-xl py-2 px-3 flex-row items-center">
                    <MaterialIcons name="repeat" size={16} color="white" />
                    <Text className="text-white ml-2">
                      Loops: <Text className="font-bold">{item.loop}</Text>
                    </Text>
                  </View>
                </View>

                {/* Start button */}
                <View className="flex-row justify-center mt-6">
                  <TouchableOpacity
                    onPress={() => handleSelectZikr(item.index)}
                    className="bg-indigo-600 py-2 px-6 rounded-full flex-row items-center"
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="play-arrow" size={18} color="white" />
                    <Text className="text-white font-medium ml-1">
                      Start Counting
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </AnimatedTouchable>
      );
    },
    []
  );

  if (isLoading) {
    return (
      <SpaceBackground isDarkMode={isDarkMode}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Loading Zikrs...</Text>
        </View>
      </SpaceBackground>
    );
  }

  return (
    <SpaceBackground isDarkMode={isDarkMode}>
      <StatusBar style="light" />

      <View className="flex-1 pt-10">
        <View className="px-4 mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-white text-3xl font-bold">Zikrs</Text>
            <Text className="text-white/70">
              Select a zikr to begin counting
            </Text>
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            onPress={handleResetAll}
            className="bg-red-600/50 py-2 px-4 rounded-full"
            activeOpacity={0.7}
          >
            <Text className="text-white text-xs font-medium">Reset All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={zikrItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
          removeClippedSubviews={true}
          maxToRenderPerBatch={3}
          windowSize={3}
          initialNumToRender={3}
        />
      </View>
    </SpaceBackground>
  );
}
