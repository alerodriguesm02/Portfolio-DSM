import React from 'react';
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, typography, spacing } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: React.ReactNode;
}

export const Button = ({ title, variant = 'primary', icon, style, ...props }: ButtonProps) => {
    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity
                style={[
                    styles.button,
                    isPrimary && styles.primary,
                    isOutline && styles.outline,
                    style
                ]}
                activeOpacity={0.8}
                onPressIn={() => { scale.value = withSpring(0.95) }}
                onPressOut={() => { scale.value = withSpring(1) }}
                // @ts-ignore - Web only events for hover
                onMouseEnter={() => { if (Platform.OS === 'web') scale.value = withSpring(1.05) }}
                onMouseLeave={() => { if (Platform.OS === 'web') scale.value = withSpring(1) }}
                {...props}
            >
                <Text style={[
                    styles.text,
                    isPrimary ? styles.textDark : styles.textLight
                ]}>
                    {title}
                </Text>
                {icon && <React.Fragment>{icon}</React.Fragment>}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: 30, // Pill shaped from references
        gap: spacing.sm,
    },
    primary: {
        backgroundColor: colors.primary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
    },
    text: {
        ...typography.body,
        fontWeight: 'bold',
    },
    textDark: {
        color: colors.background,
    },
    textLight: {
        color: colors.textPrimary,
    }
});
