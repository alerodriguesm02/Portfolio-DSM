import { StyleSheet } from 'react-native';

export const colors = {
  background: '#1A1A1A', // Dark grey/black from reference
  surface: '#242424',
  primary: '#ffd51e', // Amarelo solicitado
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#333333',
};

export const typography = StyleSheet.create({
  h1: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontFamily: 'Outfit_700Bold', // Will use expo-font
  },
  h2: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontFamily: 'Outfit_700Bold',
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Outfit_600SemiBold',
  },
  body: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
});

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
