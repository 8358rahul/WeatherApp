import { useTheme } from '@/context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, TextInput } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const styles = ScaledSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: "20@ms",
      paddingHorizontal: "20@mvs",
      paddingVertical: "8@vs",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: "10@ms",
      elevation: "3@ms",
    },
    input: {
      flex: 1,
      marginLeft: "10@s",
      color: colors.text,
      fontSize: "16@ms",
      fontFamily: 'Inter-Medium',
    },
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <MaterialCommunityIcons 
        name="magnify" 
        size={ms(24)} 
        color={colors.textSecondary} 
      />
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
    </Animated.View>
  );
}