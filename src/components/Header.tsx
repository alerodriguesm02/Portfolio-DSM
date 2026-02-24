import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { colors, spacing } from '../theme';

import { PageType } from '../../App';

interface HeaderProps {
    onNavigate?: (page: PageType) => void;
    onProjectsClick?: () => void;
    onContactClick?: () => void;
}

export const Header = ({ onNavigate, onProjectsClick, onContactClick }: HeaderProps) => {
    return (
        <View style={styles.wrapper}>
            <Container>
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => onNavigate?.('home')}>
                        <Text variant="h3" style={styles.logo}>
                            Ale<Text variant="h3" color={colors.primary}>.</Text>
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.nav}>
                        <TouchableOpacity onPress={() => onNavigate?.('home')}><Text variant="body" style={styles.navLink}>Início</Text></TouchableOpacity>
                        <TouchableOpacity onPress={onContactClick}><Text variant="body" style={styles.navLink}>Sobre</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => onNavigate?.('home')}><Text variant="body" style={styles.navLink}>Serviços</Text></TouchableOpacity>
                        <TouchableOpacity onPress={onProjectsClick}><Text variant="body" style={styles.navLink}>Meus Projetos</Text></TouchableOpacity>
                    </View>

                    <Button title="Contato" variant="outline" style={styles.contactBtn} onPress={onContactClick} />
                </View>
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
        // Provide a small sticky effect if supported
        position: 'relative',
        zIndex: 100,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
    },
    logo: {
        fontWeight: '900',
    },
    nav: {
        flexDirection: 'row',
        gap: spacing.lg,
        display: 'none', // Will hide on small screens initially
    },
    navLink: {
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: 14,
        letterSpacing: 1,
    },
    contactBtn: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    }
});
