import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { FadeInView } from '../components/FadeInView';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, spacing } from '../theme';
import { Platform } from 'react-native';

const SKILLS = [
    'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'C', 'C++',
    'Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator'
];

export const SkillsSection = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <Container style={styles.container}>
            <View style={styles.content}>
                <FadeInView style={styles.header}>
                    <Text variant="h3" color={colors.primary} align={isMobile ? 'center' : 'auto'}>Minhas Habilidades</Text>
                    <Text variant="h2" align={isMobile ? 'center' : 'auto'}>Tecnologias & Ferramentas</Text>
                </FadeInView>

                <View style={styles.skillsGrid}>
                    {SKILLS.map((skill, index) => (
                        <SkillBadge key={index} skill={skill} delay={index * 50} />
                    ))}
                </View>
            </View>
        </Container>
    );
};

const SkillBadge = ({ skill, delay }: { skill: string, delay: number }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    });

    return (
        <FadeInView delay={delay} direction="up">
            <Animated.View
                style={[styles.skillBadge, animatedStyle]}
                // @ts-ignore
                onMouseEnter={() => { if (Platform.OS === 'web') scale.value = withSpring(1.05) }}
                onMouseLeave={() => { if (Platform.OS === 'web') scale.value = withSpring(1) }}
            >
                <Text variant="body" style={styles.skillText}>{skill}</Text>
            </Animated.View>
        </FadeInView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xxxl,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.surface,
    },
    content: {
        alignItems: 'center',
        gap: spacing.xl,
    },
    header: {
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing.md,
        maxWidth: 800,
    },
    skillBadge: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        backgroundColor: colors.background,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS & Web shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    skillText: {
        fontWeight: '600',
    }
});
