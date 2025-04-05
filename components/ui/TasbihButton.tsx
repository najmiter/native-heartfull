import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

type TasbihButtonProps = {
  label: string;
  onPress: () => void;
  isSelected?: boolean;
};

export function TasbihButton({
  label,
  onPress,
  isSelected = false,
}: TasbihButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-2 px-4 my-1 mx-1 border ${
        isSelected
          ? 'bg-indigo-600/80 border-white/40'
          : 'bg-transparent border-white/20'
      } rounded-full`}
      style={
        isSelected
          ? {
              shadowColor: '#fff',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5,
            }
          : {}
      }
    >
      <Text
        className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
