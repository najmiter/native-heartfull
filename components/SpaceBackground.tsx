import React, { useEffect, useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Create fixed stars with different positions and sizes
const generateStars = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    left: Math.random() * width,
    top: Math.random() * height,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2000,
    duration: Math.random() * 3000 + 2000,
  }));
};

interface SpaceBackgroundProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
}

export function SpaceBackground({
  children,
  isDarkMode = true,
}: SpaceBackgroundProps) {
  // Use useMemo to generate stars only once instead of on every render
  const stars = useMemo(() => generateStars(150), []);

  const shootingStarPos = useSharedValue({
    x: -50,
    y: Math.random() * height * 0.6,
  });
  const shootingStarOpacity = useSharedValue(0);

  // Create a shooting star effect
  useEffect(() => {
    const animateShootingStar = () => {
      // Reset position
      shootingStarPos.value = {
        x: -50,
        y: Math.random() * height * 0.6,
      };

      // Animate opacity
      shootingStarOpacity.value = 0;
      shootingStarOpacity.value = withDelay(
        Math.random() * 5000 + 3000,
        withTiming(1, { duration: 300 })
      );

      // Animate position
      shootingStarPos.value = withDelay(
        Math.random() * 5000 + 3000,
        withTiming(
          {
            x: width + 50,
            y: shootingStarPos.value.y + 100 + Math.random() * 100,
          },
          {
            duration: 1000,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }
        )
      );

      // Fade out at the end
      shootingStarOpacity.value = withDelay(
        Math.random() * 5000 + 4000,
        withTiming(0, { duration: 300 })
      );

      // Schedule next animation
      setTimeout(animateShootingStar, Math.random() * 8000 + 5000);
    };

    animateShootingStar();

    // Cleanup function to prevent memory leaks
    return () => {};
  }, []); // Empty dependency array so it only runs once

  const shootingStarStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: shootingStarPos.value.x,
      top: shootingStarPos.value.y,
      width: 40,
      height: 2,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      opacity: shootingStarOpacity.value,
      transform: [{ rotate: '20deg' }, { translateX: 0 }, { translateY: 0 }],
    };
  });

  return (
    <View className="flex-1">
      <LinearGradient
        colors={
          isDarkMode
            ? ['#0B0B20', '#13123A', '#0F0F25']
            : ['#1A2980', '#26D0CE']
        }
        className="absolute left-0 right-0 top-0 bottom-0"
      />

      {/* Stars */}
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}

      {/* Shooting star */}
      <Animated.View style={shootingStarStyle} />

      {/* Nebula effects */}
      <View className="absolute w-full h-full opacity-30">
        <View
          className="absolute w-60 h-60 rounded-full bg-purple-500/20 blur-3xl"
          style={{ top: height * 0.1, left: -30 }}
        />
        <View
          className="absolute w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"
          style={{ top: height * 0.6, right: -40 }}
        />
        <View
          className="absolute w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl"
          style={{ top: height * 0.4, left: width * 0.5 }}
        />
      </View>

      {children}
    </View>
  );
}

// Individual star component with gentle floating and twinkling animation
const Star = React.memo(function Star({
  left,
  top,
  size,
  delay,
  duration,
}: {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}) {
  const opacity = useSharedValue(Math.random() * 0.5 + 0.3);
  const translateY = useSharedValue(0);

  useEffect(() => {
    // Subtle twinkling effect
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(Math.random() * 0.3 + 0.5, { duration: duration * 1.5 }),
        -1, // infinite repeat
        true // reverse animation
      )
    );

    // Gentle floating motion - moves up and down slowly
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-(Math.random() * 3 + 2), {
            duration: 4000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.sin),
          }),
          withTiming(Math.random() * 3 + 2, {
            duration: 4000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.sin),
          })
        ),
        -1, // infinite repeat
        true // reverse animation
      )
    );

    // Clean up function
    return () => {};
  }, []); // Empty dependency array ensures this only runs once

  const starStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: 0.8 + opacity.value * 0.3 },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left,
          top,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#FFFFFF',
        },
        starStyle,
      ]}
    />
  );
});
