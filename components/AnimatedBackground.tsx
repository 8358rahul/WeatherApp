 
import { weatherIcons } from '@/constants/icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { useTheme } from '../context/ThemeContext';
import { ThemedView } from './ThemedView';

interface AnimatedBackgroundProps {
  weatherCondition?: string;
}

export default function AnimatedBackground({ weatherCondition }: AnimatedBackgroundProps) {
  const { colors } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [weatherCondition]);

  const Illustration = weatherCondition 
    ? weatherIcons[weatherCondition] 
    : weatherIcons['default'];

  return (
    <ThemedView style={[StyleSheet.absoluteFill, { zIndex: -1 }]}>
      <Animated.View 
        style={[
          styles.background,
          { 
            backgroundColor: colors.primary,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      > 
          <MaterialCommunityIcons 
            name={Illustration || 'weather-cloudy'}
            size={ms(200)} 
            color={colors.background} 
            style={styles.fallbackIcon}
          /> 
      </Animated.View>
    </ThemedView>
  );
}

const styles = ScaledSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: "350@vs",
    borderBottomLeftRadius: "40@ms",
    borderBottomRightRadius: "40@ms",
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fallbackIcon: {
    opacity: 0.3,
  },
});