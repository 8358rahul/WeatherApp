import { useTheme } from '@/context/ThemeContext';
import { Switch, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export default function ThemeToggle() {
  const { colors, isDark, toggleTheme } = useTheme();
 


  return (
    <View style={styles.container}>
      {/* <ThemedText type='default'>{
        isDark ? 'Dark Mode' : 'Light Mode'
        }</ThemedText> */}
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={ isDark ? colors.text : colors.primary}
        trackColor={{ false: colors.border, true: colors.primary }} 
      style={styles.switch}
      
      />
    </View>
  );
}

  const styles = ScaledSheet.create({
    container: {
      // flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'space-between', 
    }, 
    switch: {
      transform: [{ scaleX:1.1 }, { scaleY:1.1 }],  
    },
  });
