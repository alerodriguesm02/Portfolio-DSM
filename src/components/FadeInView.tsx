import React, { useEffect } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing
} from 'react-native-reanimated';

interface FadeInViewProps extends ViewProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
}

export const FadeInView = ({
    children,
    delay = 0,
    duration = 600,
    direction = 'up',
    distance = 30,
    style,
    ...props
}: FadeInViewProps) => {
    const opacity = useSharedValue(0);
    const transformVal = useSharedValue(distance);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.exp) }));
        transformVal.value = withDelay(delay, withTiming(0, { duration, easing: Easing.out(Easing.exp) }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        let transform: any[] = [];

        if (direction === 'up') transform = [{ translateY: transformVal.value }];
        if (direction === 'down') transform = [{ translateY: -transformVal.value }];
        if (direction === 'left') transform = [{ translateX: transformVal.value }];
        if (direction === 'right') transform = [{ translateX: -transformVal.value }];

        return {
            opacity: opacity.value,
            transform: direction === 'none' ? [] : transform,
        };
    });

    return (
        <Animated.View style={[animatedStyle, style]} {...props}>
            {children}
        </Animated.View>
    );
};
