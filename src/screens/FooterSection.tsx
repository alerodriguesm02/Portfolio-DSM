import React from 'react';
import { StyleSheet, View, TouchableOpacity, Linking, Platform, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { colors, spacing } from '../theme';

export const FooterSection = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <Container style={styles.container}>
            <View style={styles.content}>
                <Text variant="h2" align={isMobile ? 'center' : 'auto'}>Tem algum projeto em mente?{'\n'}<Text variant="h2" color={colors.primary} align={isMobile ? 'center' : 'auto'}>ENTRE EM CONTATO</Text></Text>

                <View style={styles.contactInfo}>
                    <View style={styles.infoBlock}>
                        <Text variant="body" style={styles.label}>E-mail</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:alessandro.rfilho@hotmail.com')}>
                            <Text variant="h3">alessandro.rfilho@hotmail.com</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text variant="body" style={styles.label}>Telefone</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('tel:+5515996791095')}>
                            <Text variant="h3">+55 15 99679-1095</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text variant="body" style={styles.label}>Localização</Text>
                        <Text variant="h3">São Paulo - Brasil</Text>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text variant="body" style={styles.label}>Social</Text>
                        <View style={styles.socialGroup}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => {
                                    const url = 'https://www.linkedin.com/in/alessandro-rodrigues-46b9521b8/';
                                    Platform.OS === 'web' ? window.open(url, '_blank') : Linking.openURL(url);
                                }}
                            >
                                <AntDesign name="linkedin" size={28} color={colors.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => {
                                    const url = 'https://github.com/alerodriguesm02';
                                    Platform.OS === 'web' ? window.open(url, '_blank') : Linking.openURL(url);
                                }}
                            >
                                <AntDesign name="github" size={28} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bottomBar}>
                <Text variant="caption" align={isMobile ? 'center' : 'auto'}>© {new Date().getFullYear()} Alessandro Rodrigues. Todos os direitos reservados.</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: spacing.xxxl,
        backgroundColor: colors.background,
    },
    content: {
        alignItems: 'center',
        gap: spacing.xl,
        marginBottom: spacing.xxl,
        textAlign: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xxl,
        marginTop: spacing.xl,
        justifyContent: 'center',
    },
    infoBlock: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    label: {
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    socialGroup: {
        flexDirection: 'row',
        gap: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xs,
    },
    iconButton: {
        padding: spacing.xs,
    },
    bottomBar: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingVertical: spacing.lg,
        alignItems: 'center',
    }
});
