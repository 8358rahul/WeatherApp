import { MaterialCommunityIcons } from '@expo/vector-icons';

export const weatherIcons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  'clear-day': 'weather-sunny',
  'clear-night': 'weather-night',
  rain: 'weather-rainy',
  snow: 'weather-snowy',
  sleet: 'weather-snowy-rainy',
  wind: 'weather-windy',
  fog: 'weather-fog',
  cloudy: 'weather-cloudy',
  'partly-cloudy-day': 'weather-partly-cloudy',
  'partly-cloudy-night': 'weather-night-partly-cloudy',
  hail: 'weather-hail',
  thunderstorm: 'weather-lightning',
  tornado: 'weather-tornado',
};