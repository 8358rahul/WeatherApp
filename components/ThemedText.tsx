import { useTheme } from '@/context/ThemeContext';
import { Text, type TextProps } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export type ThemedTextProps = TextProps & { 
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style, 
  type = 'default',
  ...rest
}: ThemedTextProps) { 
  const {colors} = useTheme();

  return (
    <Text
      style={[
        { color: colors.text },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = ScaledSheet.create({
  default: {
    fontSize: "14@ms",
    lineHeight: "24@vs",
    fontFamily: 'Inter-Regular',
  },
  defaultSemiBold: {
    fontSize: "16@ms",
    lineHeight: "24@vs",
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  title: {
    fontSize: "32@ms",
    fontWeight: 'bold',
    lineHeight: "32@vs",
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: "20@s",
    fontWeight: 'bold',
    lineHeight: "30@vs",
    fontFamily: 'Inter-Medium',
  },
  link: {
    lineHeight: "30@vs",
    fontSize: "16@ms",
    color: '#0a7ea4',
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Regular',
  },
});
