import React from 'react';
import { StyleSheet, View, ViewProps, useWindowDimensions } from 'react-native';

interface ContainerProps extends ViewProps {
    children: React.ReactNode;
}

export const Container = ({ children, style, ...prop }: ContainerProps) => {
    const { width } = useWindowDimensions();
    // Max width constraint for web, like the reference design
    const maxWidth = 1200;

    return (
        <View style={[styles.wrapper]} {...prop}>
            <View style={[styles.inner, { width: width > maxWidth ? maxWidth : '100%' }, style]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
    },
    inner: {
        paddingHorizontal: 20,
    }
});
