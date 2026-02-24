import React from 'react';
import { StyleSheet, View, Image, useWindowDimensions, Platform, Linking } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { FadeInView } from '../components/FadeInView';
import { colors, spacing } from '../theme';

interface CaseStudyPageProps {
    caseData: {
        id: string;
        title: string;
        scope: string;
        date?: string;
        team?: string;
        description?: string;
        link?: string;
        image?: any;
    };
    onBack: () => void;
}

export const CaseStudyPage = ({ caseData, onBack }: CaseStudyPageProps) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const handleOpenLink = () => {
        if (caseData.link) {
            if (Platform.OS === 'web') {
                window.open(caseData.link, '_blank');
            } else {
                Linking.openURL(caseData.link);
            }
        }
    };

    return (
        <Container style={styles.container}>
            <View style={styles.contentWrapper}>

                <FadeInView direction="down" style={styles.backButtonWrapper}>
                    <Button
                        title="← Voltar para a Home"
                        variant="ghost"
                        onPress={onBack}
                        style={styles.backButton}
                    />
                </FadeInView>

                <FadeInView delay={100} style={styles.header}>
                    <Text variant="h1" color={colors.primary} align={isMobile ? 'center' : 'left'}>{caseData.title}</Text>

                    <View style={[styles.metaDataRow, isMobile && { justifyContent: 'center' }]}>
                        {caseData.date && (
                            <View style={styles.metaDataBadge}>
                                <Text variant="caption" color={colors.textSecondary}>🗓 {caseData.date}</Text>
                            </View>
                        )}
                        {caseData.team && (
                            <View style={styles.metaDataBadge}>
                                <Text variant="caption" color={colors.textSecondary}>👥 {caseData.team}</Text>
                            </View>
                        )}
                    </View>
                </FadeInView>

                {caseData.image ? (
                    <FadeInView delay={200} direction="up" style={styles.imageContainer}>
                        <Image source={caseData.image} style={[styles.caseImage, isMobile ? styles.caseImageMobile : styles.caseImageDesktop]} />
                    </FadeInView>
                ) : (
                    <FadeInView delay={200} direction="up" style={styles.imagePlaceholder}>
                        <Text variant="body" color="#666">Imagem Principal do Case</Text>
                    </FadeInView>
                )}

                <FadeInView delay={300} direction="up" style={styles.details}>
                    <View style={styles.sectionBlock}>
                        <Text variant="h3">Sobre o Projeto</Text>
                        <Text variant="body" style={styles.descriptionText}>
                            {caseData.description || 'Descrição detalhada do projeto será adicionada aqui.'}
                        </Text>
                    </View>

                    <View style={styles.sectionBlock}>
                        <Text variant="h3">Meu Papel</Text>
                        <Text variant="body" style={styles.descriptionText}>
                            {caseData.scope}
                        </Text>
                    </View>

                    <View style={styles.actionBlock}>
                        <Button
                            title={caseData.link ? "Acessar o Projeto" : "Link Indisponível"}
                            variant="primary"
                            disabled={!caseData.link}
                            onPress={handleOpenLink}
                            style={styles.linkButton}
                        />
                    </View>
                </FadeInView>

            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xxxl,
        backgroundColor: colors.background,
        minHeight: '100%',
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 900,
        alignSelf: 'center',
        gap: spacing.xl,
    },
    backButtonWrapper: {
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    backButton: {
        paddingHorizontal: 0,
    },
    header: {
        gap: spacing.md,
    },
    metaDataRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginTop: spacing.sm,
    },
    metaDataBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    imageContainer: {
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginVertical: spacing.lg,
    },
    caseImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    caseImageMobile: {
        height: 400,
        resizeMode: 'cover',
    },
    caseImageDesktop: {
        height: 600,
        resizeMode: 'contain',
    },
    imagePlaceholder: {
        width: '100%',
        height: 600,
        backgroundColor: colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.lg,
    },
    details: {
        gap: spacing.xl,
    },
    sectionBlock: {
        gap: spacing.sm,
    },
    descriptionText: {
        lineHeight: 28,
        color: colors.textSecondary,
    },
    actionBlock: {
        marginTop: spacing.xl,
        paddingTop: spacing.xl,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        alignItems: 'flex-start',
    },
    linkButton: {
        paddingHorizontal: spacing.xxxl,
    },
});
