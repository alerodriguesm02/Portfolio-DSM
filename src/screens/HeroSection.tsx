import React from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { FadeInView } from '../components/FadeInView';
import { spacing, colors } from '../theme';

import { PageType } from '../../App';

interface HeroProps {
    onNavigate?: (page: PageType) => void;
    onProjectsClick?: () => void;
}

export const HeroSection = ({ onNavigate, onProjectsClick }: HeroProps) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768; // Definição simples de break point para mobile

    return (
        <Container style={styles.container}>
            <View style={styles.content}>
                <FadeInView delay={0} direction="up" style={[styles.textContent, isMobile && styles.textContentMobile]}>
                    <Text variant="h3" color={colors.primary} style={[styles.greeting, isMobile && styles.textCenter]}>
                        👋 Olá, eu sou Alessandro
                    </Text>
                    <Text variant="h1" style={[styles.title, isMobile && [styles.textCenter, styles.titleMobile]]}>
                        Diretor de UI/UX &{'\n'}
                        <Text variant="h1" style={[styles.title, isMobile && [styles.textCenter, styles.titleMobile]]} color={colors.primary}>React Developer</Text>
                    </Text>
                    <Text variant="body" style={[styles.description, isMobile && styles.textCenter]}>
                        Transformando ideias em experiências digitais incríveis através de design estratégico e código limpo.
                    </Text>
                    <View style={[styles.actions, isMobile && styles.actionsMobile]}>
                        <Button title="Meus Projetos" onPress={onProjectsClick} />
                        <Button
                            title="Download CV"
                            variant="outline"
                            // @ts-ignore
                            onPress={() => window.open('https://www.canva.com/design/DAG4UzgjIt8/8mhOUWV7wkTJSVm9ojojhQ/view?utm_content=DAG4UzgjIt8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb23bcd809b', '_blank')}
                        />
                    </View>
                </FadeInView>

                <FadeInView delay={300} direction="left" style={styles.imageContainer}>
                    <Image
                        source={require('../assets/hero.png')}
                        style={[styles.photo, isMobile && styles.photoMobile]}
                    />
                </FadeInView>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: spacing.xxxl, // paddingBottom removido para imagem encostar na base
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        overflow: 'hidden',
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end', // Alinha elementos pela base
        justifyContent: 'space-between',
        gap: spacing.xl,
    },
    textContent: {
        flex: 1,
        minWidth: 300,
        gap: spacing.lg,
        paddingBottom: spacing.xxxl, // Recria padding bottom apenas para este bloco
    },
    greeting: {
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    title: {
        lineHeight: 56,
        fontSize: 52,
    },
    titleMobile: {
        fontSize: 38,
        lineHeight: 44,
    },
    description: {
        maxWidth: 500,
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginTop: spacing.md,
    },
    imageContainer: {
        flex: 1,
        minWidth: 200,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    photo: {
        height: 600,
        maxWidth: '100%',
        aspectRatio: 1, // Proporção exata de 1:1
        resizeMode: 'cover',
    },
    photoMobile: {
        height: 350,
        alignSelf: 'center', // Garante a centralização se quebrar linha no container
    },
    textContentMobile: {
        alignItems: 'center',
        paddingBottom: spacing.xl,
    },
    textCenter: {
        textAlign: 'center',
    },
    actionsMobile: {
        justifyContent: 'center',
    }
});
