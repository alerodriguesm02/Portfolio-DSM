import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography, colors } from '../theme';

interface TextProps extends RNTextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
    color?: string;
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = ({ variant = 'body', color = colors.textPrimary, align = 'auto', style, ...props }: TextProps) => {
    return (
        <RNText
            style={[
                typography[variant],
                { color, textAlign: align },
                style
            ]}
            {...props}
        />
    );
}
