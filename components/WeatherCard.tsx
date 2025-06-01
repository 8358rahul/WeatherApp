import { useTheme } from '@/context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, View } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { ThemedText } from './ThemedText';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  weatherData: WeatherData;
}

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  const { colors } = useTheme();
  const current:any = weatherData.currentConditions;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const styles = ScaledSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: "25@ms",
      padding: "25@ms",
      marginHorizontal: "25@ms",
      marginTop: "20@vs",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: "20@ms",
      elevation: "5@ms",
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
    }, 
    date: { 
      color: colors.textSecondary, 
    },
    currentWeather: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
    },
    tempContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    }, 
    unit: { 
      color: colors.textSecondary, 
    },
    description: { 
      color: colors.textSecondary,
        textTransform: 'capitalize', 
    },
    details: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    detailItem: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: "5@vs",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    detailText: { 
      marginLeft: "10@s",
      color: colors.textSecondary,
      fontSize: "14@ms",
    },
  });

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <View>
          <ThemedText type='subtitle'>{weatherData?.resolvedAddress}</ThemedText>
          <ThemedText type='default' style={styles.date}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </ThemedText>
        </View>
        <WeatherIcon icon={current?.icon} size={ms(40)} />
      </View>

      <View style={styles.currentWeather}>
        <View>
          <View style={styles.tempContainer}>
            <ThemedText type='title'>{Math.round(current?.temp)}</ThemedText>
            <ThemedText type='subtitle' style={styles.unit}>°C</ThemedText>
          </View>
          <ThemedText type='defaultSemiBold' style={styles.description}>{current?.conditions}</ThemedText>
        </View>
        
        <WeatherIcon icon={current?.icon} size={ms(100)}/>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons 
            name="water-percent" 
            size={ms(22)} 
            color={colors.textSecondary} 
          />
          <ThemedText type='defaultSemiBold' style={styles.detailText}>Humidity: {current?.humidity}%</ThemedText>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons 
            name="weather-windy" 
            size={ms(22)} 
            color={colors.textSecondary} 
          />
          <ThemedText  type='defaultSemiBold' style={styles.detailText}>Wind: {Math.round(current?.windspeed * 3.6)} km/h</ThemedText>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons 
            name="gauge" 
            size={ms(22)} 
            color={colors.textSecondary} 
          />
          <ThemedText type='defaultSemiBold' style={styles.detailText}>Pressure: {current?.pressure} hPa</ThemedText>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons 
            name="weather-sunset-up" 
            size={ms(22)} 
            color={colors.textSecondary} 
          />
          <ThemedText type='defaultSemiBold' style={styles.detailText}>Sunrise: {current?.sunrise}</ThemedText>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons 
            name="weather-sunset-down" 
            size={ms(22)} 
            color={colors.textSecondary} 
          />
          <ThemedText type='defaultSemiBold' style={styles.detailText}>Sunset: {current?.sunset}</ThemedText>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons 
            name="eye-outline" 
            size={ms(22)} 
            color={colors.textSecondary} 
          />
          <ThemedText type='defaultSemiBold' style={styles.detailText}>Visibility: {current?.visibility} km</ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}