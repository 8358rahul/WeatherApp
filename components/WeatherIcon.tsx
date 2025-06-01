import { weatherIcons } from '@/constants/icons';
import { useTheme } from '@/context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ms } from 'react-native-size-matters';

interface WeatherIconProps {
  icon: string;
  size?: number;
}

export default function WeatherIcon({ icon, size = ms(24) }: WeatherIconProps) {
  const { colors } = useTheme();
  return (
    <MaterialCommunityIcons
      name={weatherIcons[icon] || 'weather-cloudy'}
      size={size}
      color={colors.primary}
    />
  );
}