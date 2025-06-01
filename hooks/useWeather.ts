
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { fetchWeather } from '../services/weather';
import { useDebounce } from './useDebounce';

export function useWeather() {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadCachedWeather = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('lastWeatherData');
      if (cachedData) {
        setWeatherData(JSON.parse(cachedData));
      }
    } catch (err) {
      console.error('Failed to load cached weather:', err);
    }
  };

  useEffect(() => {
    loadCachedWeather();
  }, []);

  useEffect(() => {
    if (error) {
      router.push({ pathname: '/modal', params: { error } });
      setError(null);
    }
  }, [error]);

  const fetchWeatherData = useCallback(async (city: string) => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(city); 
      if (data) {
        setWeatherData(data);
        await AsyncStorage.setItem('lastWeatherData', JSON.stringify(data)); 
        Keyboard.dismiss();
      }else{
        setWeatherData(null);
        setError('No weather data found for this city');
      }

    } catch (err: any) {
      let errorMessage = 'Failed to fetch weather data';
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = 'Please enter a valid city name';
        } else if (err.response.status === 404) {
          errorMessage = 'City not found';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error, please try again later';
        }
      } else if (err.request) {
        errorMessage = 'Network error, check your connection';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const debouncedSearch = useDebounce(fetchWeatherData, 500);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWeatherData(searchQuery);
  }, [searchQuery, fetchWeatherData]);

  return {
    weatherData,
    loading,
    error,
    refreshing,
    searchQuery,
    setSearchQuery,
    handleRefresh,
    debouncedSearch,
  };
}