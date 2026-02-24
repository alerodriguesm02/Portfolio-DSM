import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { FadeInView } from '../components/FadeInView';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, spacing } from '../theme';
import { Platform } from 'react-native';

const ALL_PROJECTS = [
    {
        id: '1',
        title: 'Design System Global',
        scope: 'UI/UX Design • React',
        image: null,
    },
    {
        id: '2',
        title: 'Mobile Banking App',
        scope: 'Product Design • Prototyping',
        image: null,
    },
    {
        id: '3',
        title: 'E-commerce Redesign',
        scope: 'React Native • TypeScript',
        image: null,
    },
    {
        id: '4',
        title: 'Dashboard Analítico',
        scope: 'UI/UX Design • Frontend',
        image: null,
    },
    // We can duplicate them here just to show it's a dedicated page with more items
    {
        id: '5',
        title: 'Plataforma E-learning',
        scope: 'UX Research • React',
        image: null,
    },
    {
        id: '6',
        title: 'App de Fintech',
        scope: 'UI Design • React Native',
        image: null,
    }
];

export const ProjectsPage = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    // Optional: Scroll to top effect when loading this page
    // Needs a ref to ScrollView in App.tsx ideally, but this is a pure component.

    return (
        <Container style={styles.container}>
            <View style={styles.pageHeader}>
                <FadeInView direction="up">
                    <Text variant="h1" align={isMobile ? 'center' : 'auto'}>Meus Projetos.</Text>
                    <Text variant="body" align={isMobile ? 'center' : 'auto'} style={styles.subtitle}>
                        Um mergulho detalhado nos cases de sucesso, layouts focados no usuário e interfaces premium.
                    </Text>
                </FadeInView>
            </View>

            <View style={styles.grid}>
                {ALL_PROJECTS.map((item, index) => (
                    <PortfolioCard key={item.id} item={item} index={index} />
                ))}
            </View>
        </Container>
    );
};

const PortfolioCard = ({ item, index }: { item: any, index: number }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    });

    return (
        <FadeInView delay={index * 100} direction="up" style={styles.cardWrapper}>
            <Animated.View
                style={[styles.card, animatedStyle]}
                // @ts-ignore
                onMouseEnter={() => { if (Platform.OS === 'web') scale.value = withSpring(1.02) }}
                onMouseLeave={() => { if (Platform.OS === 'web') scale.value = withSpring(1) }}
            >
                <View style={styles.imagePlaceholder}>
                    <Text variant="body" color="#666">Imagem do Projeto</Text>
                </View>
                <View style={styles.cardContent}>
                    <Text variant="h3">{item.title}</Text>
                    <Text variant="body" color={colors.primary}>{item.scope}</Text>

                    <Button
                        title="Ver Case Completo"
                        variant="outline"
                        style={styles.actionButton}
                    />
                </View>
            </Animated.View>
        </FadeInView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xxxl,
        minHeight: 800,
    },
    pageHeader: {
        marginBottom: spacing.xxxl,
        gap: spacing.md,
    },
    subtitle: {
        marginTop: spacing.sm,
        maxWidth: 600,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xl,
        justifyContent: 'center',
    },
    cardWrapper: {
        width: '100%',
        maxWidth: 500,
    },
    card: {
        width: '100%',
        backgroundColor: colors.surface,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
    },
    imagePlaceholder: {
        height: 300,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        padding: spacing.xl,
        gap: spacing.sm,
    },
    actionButton: {
        marginTop: spacing.md,
        alignSelf: 'flex-start',
    }
});
