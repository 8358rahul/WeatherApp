import AnimatedBackground from '@/components/AnimatedBackground';
import SearchBar from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import WeatherCard from '@/components/WeatherCard';
import { useTheme } from '@/context/ThemeContext';
import { useWeather } from '@/hooks/useWeather';
import { useRouter } from 'expo-router';
import { ActivityIndicator, RefreshControl, ScrollView, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const {
    weatherData,
    loading,
    error,
    refreshing,
    searchQuery,
    setSearchQuery,
    handleRefresh,
    debouncedSearch
  } = useWeather();
  if (error) {
    router.push({ pathname: '/modal', params: { error } });
  }
  return (
    <View style={{ flex: 1  }}>
      <AnimatedBackground weatherCondition={weatherData?.currentConditions?.icon} />
      
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.text}
            colors={[colors.text]}
          />
        }
        contentContainerStyle={{ paddingBottom: vs(30) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: s(20), paddingTop: vs(20) }}>
          <SearchBar
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              debouncedSearch(text);
            }}
          />
        </View>

        {loading && !refreshing ? (
          <ActivityIndicator 
            size="large" 
            color={colors.text} 
            style={{ marginTop: vs(100) }} 
          />
        ) : weatherData ? (
          <WeatherCard weatherData={weatherData} />
        ) : (
          <View style={{ alignItems: 'center', marginTop: vs(150) }}>
            <ThemedText type='defaultSemiBold'>
              Search for a city to see weather
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </View>
  );
}