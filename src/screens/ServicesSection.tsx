import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { FadeInView } from '../components/FadeInView';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, spacing } from '../theme';
import { Platform } from 'react-native';

export const ServicesSection = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <Container style={styles.container}>
            <FadeInView style={[styles.header, isMobile && { alignItems: 'center' }]}>
                <Text variant="h3" color={colors.primary} align={isMobile ? 'center' : 'auto'}>Histórico Profissional</Text>
                <Text variant="h2" align={isMobile ? 'center' : 'auto'}>Experiência &{'\n'}Serviços de Destaque.</Text>
            </FadeInView>

            <View style={styles.grid}>
                <ServiceCard
                    delay={100}
                    title="Diretor de UI/UX"
                    description="Liderança de design estratégico, criação de design systems e foco total em experiência do usuário."
                    tags={['Figma', 'Prototyping', 'Design System']}
                />
                <ServiceCard
                    delay={200}
                    title="Desenvolvedor React"
                    description="Desenvolvimento front-end avançado utilizando React e React Native para web e mobile."
                    tags={['React', 'React Native', 'TypeScript']}
                />
                <ServiceCard
                    delay={300}
                    title="Designer de Produtos"
                    description="Concepção de produtos digitais do zero ao lançamento, unindo regras de negócio e usabilidade."
                    tags={['Product Strategy', 'Research', 'UX']}
                />
                <ServiceCard
                    delay={400}
                    title="Designer Digital"
                    description="Criação de identidade visual, materiais gráficos e interfaces ricas e dinâmicas."
                    tags={['Adobe XD', 'Photoshop', 'Illustrator']}
                />
            </View>
        </Container>
    );
};

const ServiceCard = ({ title, description, tags, delay }: { title: string, description: string, tags: string[], delay: number }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    });

    return (
        <FadeInView delay={delay} direction="up" style={styles.cardWrapper}>
            <Animated.View
                style={[styles.card, animatedStyle]}
                // @ts-ignore - web only hover handlers
                onMouseEnter={() => { if (Platform.OS === 'web') scale.value = withSpring(1.02) }}
                onMouseLeave={() => { if (Platform.OS === 'web') scale.value = withSpring(1) }}
            >
                <Text variant="h3" style={styles.cardTitle}>{title}</Text>
                <Text variant="body" style={styles.cardDescription}>{description}</Text>
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text variant="caption" color={colors.primary}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </Animated.View>
        </FadeInView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xxxl,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    header: {
        gap: spacing.sm,
        marginBottom: spacing.xxl,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.lg,
    },
    cardWrapper: {
        flex: 1,
        minWidth: 300,
    },
    card: {
        flex: 1,
        backgroundColor: colors.surface,
        padding: spacing.xl,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.md,
    },
    cardTitle: {
        marginBottom: spacing.xs,
    },
    cardDescription: {
        marginBottom: spacing.sm,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginTop: 'auto',
    },
    tag: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        backgroundColor: 'rgba(201, 243, 29, 0.1)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(201, 243, 29, 0.2)',
    }
});
