import React from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { FadeInView } from '../components/FadeInView';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, spacing } from '../theme';
import { Platform } from 'react-native';

const CASES = [
    {
        id: '1',
        title: 'Longitude Engineering',
        scope: 'UI/UX Design • Digital Design',
        image: require('../assets/longitude01.png'),
        date: 'Outubro 2025',
        team: 'UI/UX Design',
        description: 'A Proper Marine (empresa de projetos de engenharia no setor naval e offshore) foi recentemente adquirida pela inglesa ABL Group (Marca mãe da Longitude). Fui responsável por toda a adaptação gráfica da Proper Marine para a transição de marca aqui no Brasil, passando por diversas reuniões de alinhamento internacionais coordenando a equipe criativa.',
        link: 'https://longitude-engineering.com',
    },
    {
        id: '2',
        title: 'Ridarp',
        scope: 'Design Digital • Desenvolvimento Web',
        image: require('../assets/ridarp02.png'),
        date: 'Agosto 2025',
        team: 'Desenvolvimento Web',
        description: 'Atendo a Ridarp há mais de 3 anos e em todos eles realizei a direção artística de suas redes sociais, campanhas internas e comunicação visual institucional. Também fui responsável pela reestruturação do site no último ano.',
        link: 'https://ridarp.com.br',
    },
    {
        id: '3',
        title: 'Tranenge Construções',
        scope: 'Desenvolvedor Web Front-end',
        image: require('../assets/tranenge03.png'),
        date: 'Maio 2025',
        team: 'Engenharia Frontend, UX',
        description: 'A Tranenge passou recentemente por uma reformulação completa do seu website. Fui responsável pelo design e desenvolvimento desde o levantamento de requisitos até a adequação de segurança do site. Entre os pontos mais interessantes é que criamos um Streaming proprietário de acompanhamento de obras chamado TranengeFlix.',
        link: 'https://tranenge.com.br',
    },
    {
        id: '4',
        title: 'PostApprove - Gestão de Posts',
        scope: 'UI/UX Design • Frontend',
        image: require('../assets/postapprove04.png'),
        date: 'Janeiro 2025',
        team: 'Data Visualization, Frontend',
        description: 'Criação de um painel gerencial de indicadores com gráficos dinâmicos e exportação de relatórios customizados para liderança. Além disso, o sistema conta com um fluxo de aprovação de posts para redes sociais.',
        link: 'https://postapprove.vercel.app',
    },
];

interface PortfolioSectionProps {
    onCaseSelect?: (item: any) => void;
}

export const PortfolioSection = ({ onCaseSelect }: PortfolioSectionProps) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <Container style={styles.container}>
            <FadeInView style={styles.header}>
                <Text variant="h3" color={colors.primary} align={isMobile ? 'center' : 'auto'}>Casos de Sucesso</Text>
                <Text variant="h2" align={isMobile ? 'center' : 'auto'}>Meu Portfólio de Trabalhos</Text>
            </FadeInView>

            <View style={styles.grid}>
                {CASES.map((item, index) => (
                    <PortfolioCard key={item.id} item={item} index={index} onSelect={() => onCaseSelect?.(item)} />
                ))}
            </View>
        </Container>
    );
};

const PortfolioCard = ({ item, index, onSelect }: { item: any, index: number, onSelect: () => void }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    });

    return (
        <FadeInView delay={index * 150} direction="up" style={styles.cardWrapper}>
            <Animated.View
                style={[styles.card, animatedStyle]}
                // @ts-ignore
                onMouseEnter={() => { if (Platform.OS === 'web') scale.value = withSpring(1.02) }}
                onMouseLeave={() => { if (Platform.OS === 'web') scale.value = withSpring(1) }}
            >
                {item.image ? (
                    <Image source={item.image} style={styles.cardImage} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text variant="body" color="#666">Imagem do Projeto</Text>
                    </View>
                )}
                <View style={styles.cardContent}>
                    <Text variant="h3">{item.title}</Text>
                    <Text variant="body" color={colors.primary}>{item.scope}</Text>

                    <Button
                        title="Saiba Mais"
                        variant="outline"
                        style={styles.actionButton}
                        onPress={onSelect}
                    />
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
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xxl,
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
    cardImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
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
