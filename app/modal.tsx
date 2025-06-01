import { useTheme } from '@/context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';

export default function ErrorModal() {
  const router = useRouter();
  const { error } = useLocalSearchParams();
  const { colors } = useTheme();

  const styles = ScaledSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
      width: '80%',
      backgroundColor: colors.card,
      borderRadius: "20@ms",
      padding: "25@ms",
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    icon: {
      marginBottom: 15,
    },
    title: {
      fontSize: "20@ms",
      fontWeight: 'bold',
      marginBottom: 15,
      color: colors.text,
      textAlign: 'center',
    },
    message: {
      fontSize: "16@ms",
      marginBottom: 20,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    button: {
      borderRadius: 10,
      padding: "12@ms",
      width: '100%',
      backgroundColor: colors.primary,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: "16@ms",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={ms(48)}
          color={colors.primary}
          style={styles.icon}
        />
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>
          {typeof error === 'string' ? error : 'An unknown error occurred'}
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => router.back()}
          android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
      </View>
    </View>
  );
}