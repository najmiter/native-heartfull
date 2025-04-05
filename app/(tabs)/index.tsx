import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';

import { initialQalmas, Qalma, DEFAULT_TARGET } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SpaceBackground } from '@/components/SpaceBackground';
import { loadQalmasData, updateAndSaveQalma } from '@/utils/storage';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDarkMode = colorScheme === 'dark';
  const params = useLocalSearchParams<{ qalmaIndex: string }>();

  // Get qalmaIndex from params, default to current day (monday is 0)

  const today = new Date().getDay();
  const initialQalmaIndex = params.qalmaIndex
    ? parseInt(params.qalmaIndex)
    : today;
  console.log('dayOfWeek', initialQalmaIndex);

  const [allQalmas, setAllQalmas] = useState<{ [key: number]: Qalma }>(
    initialQalmas
  );
  const [currentQalma, setCurrentQalma] = useState<Qalma>({
    ...initialQalmas[initialQalmaIndex as keyof typeof initialQalmas],
  });
  const [currentQalmaIndex, setCurrentQalmaIndex] = useState(initialQalmaIndex);
  const [target, setTarget] = useState(DEFAULT_TARGET);
  const [isLoading, setIsLoading] = useState(true);

  // Animated value for progress
  const progressWidth = useSharedValue(0);

  // Load saved data on initial mount
  useEffect(() => {
    const loadSavedData = async () => {
      setIsLoading(true);
      const savedData = await loadQalmasData();

      if (savedData) {
        setAllQalmas(savedData);
        // Use the saved data for the initial qalma if available
        const savedQalma = savedData[initialQalmaIndex];
        if (savedQalma) {
          setCurrentQalma(savedQalma);
        }
      }

      setIsLoading(false);
    };

    loadSavedData();
  }, []);

  // Update when params change (coming from zikrs screen)
  useEffect(() => {
    if (params.qalmaIndex) {
      const index = parseInt(params.qalmaIndex);
      setCurrentQalmaIndex(index);

      // Use the saved data if available, otherwise use initial data
      const qalma =
        allQalmas[index] || initialQalmas[index as keyof typeof initialQalmas];
      setCurrentQalma(qalma);

      // Update progress immediately when changing qalma
      progressWidth.value = withTiming(qalma.count / target, {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
  }, [params.qalmaIndex, allQalmas]);

  // Update progress width when count changes
  useEffect(() => {
    const newProgressWidth = currentQalma.count / target;
    progressWidth.value = withTiming(newProgressWidth, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [currentQalma.count, target]);

  const handlePress = React.useCallback(async () => {
    // Provide haptic feedback on tap

    const newCount = currentQalma.count + 1;
    const newLoop =
      newCount >= target ? currentQalma.loop + 1 : currentQalma.loop;
    const updatedCount = newCount >= target ? 0 : newCount;
    if (newCount == target)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const updatedQalma = {
      ...currentQalma,
      count: updatedCount,
      loop: newLoop,
    };

    // Update state
    setCurrentQalma(updatedQalma);
    setAllQalmas((prev) => ({ ...prev, [currentQalmaIndex]: updatedQalma }));

    // Save to storage
    await updateAndSaveQalma(currentQalmaIndex, updatedQalma, allQalmas);
  }, [currentQalma]);

  // Create animated style for progress bar
  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value * 100}%`,
      backgroundColor: progressWidth.value === 1 ? '#4ade80' : '#ec4899',
    };
  });
  console.log('c', currentQalma, initialQalmas[initialQalmaIndex]);

  if (isLoading) {
    return (
      <SpaceBackground isDarkMode={isDarkMode}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-xl">Loading...</Text>
        </View>
      </SpaceBackground>
    );
  }

  return (
    <SpaceBackground isDarkMode={isDarkMode}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']}
          className="flex-1 justify-center items-center pt-10 pb-20 px-4"
        >
          <TouchableOpacity
            className="w-full flex-1 items-center justify-center "
            onPress={handlePress}
            activeOpacity={0.9}
          >
            {/* Main Content Container */}
            <View className="w-full max-w-md backdrop-blur-md rounded-3xl p-6 items-center shadow-lg border border-white/20">
              {/* <View className="flex-row justify-center items-center mb-2">
                <MaterialIcons name="auto-awesome" size={20} color="#FFC700" />
                <Text className="text-white font-bold ml-2">TASBIH</Text>
              </View>

              <Text className="text-white/80 text-xs mb-5 text-center">
                Tap anywhere to count
              </Text> */}

              {/* Day of Week Badge */}
              {currentQalma.day && (
                <View className="bg-indigo-600/60 py-1 px-4 rounded-full mb-3">
                  <Text className="text-white text-xs font-medium">
                    {currentQalma.day}
                  </Text>
                </View>
              )}

              {/* Qalma Display */}
              <View className="bg-white/15 rounded-2xl py-5 px-4 w-full mb-6">
                <Text className="text-white/60 text-xs mb-1 text-center">
                  Current Zikr
                </Text>
                <Text
                  className="text-orange-500 text-2xl text-center"
                  style={{ fontFamily: 'Amiri', lineHeight: 40 }}
                >
                  {currentQalma.qalma}
                </Text>
              </View>

              {/* Count Display */}
              <View className="flex-row items-end mb-2">
                <Text className="text-white text-7xl font-bold">
                  {currentQalma.count}
                </Text>
                <Text className="text-white/60 text-xl mb-2 ml-2">
                  / {target}
                </Text>
              </View>

              {/* Progress Bar with Animation */}
              <View className="w-full h-2 bg-white/20 rounded-full mb-4 overflow-hidden">
                <Animated.View className="h-full" style={progressBarStyle} />
              </View>

              {/* Loop Counter */}
              <View className="bg-white/15 rounded-xl py-2 px-4 flex-row items-center">
                <MaterialIcons name="repeat" size={18} color="white" />
                <Text className="text-white ml-2">
                  Loops: <Text className="font-bold">{currentQalma.loop}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SpaceBackground>
  );
}
