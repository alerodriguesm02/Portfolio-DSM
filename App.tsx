import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
  useFonts,
  Outfit_700Bold,
  Outfit_600SemiBold
} from '@expo-google-fonts/outfit';
import {
  Inter_400Regular
} from '@expo-google-fonts/inter';
import { Header } from './src/components/Header';
import { HeroSection } from './src/screens/HeroSection';
import { ServicesSection } from './src/screens/ServicesSection';
import { SkillsSection } from './src/screens/SkillsSection';
import { PortfolioSection } from './src/screens/PortfolioSection';
import { FooterSection } from './src/screens/FooterSection';
import { ProjectsPage } from './src/screens/ProjectsPage';
import { globalStyles } from './src/theme';

export type PageType = 'home' | 'projects';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const scrollViewRef = useRef<ScrollView>(null);

  const [fontsLoaded] = useFonts({
    Outfit_700Bold,
    Outfit_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null; // A proper splash screen can be loaded here
  }

  const navigateTo = (page: PageType) => {
    setActivePage(page);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />
      <ScrollView ref={scrollViewRef} stickyHeaderIndices={[0]}>
        <Header onNavigate={navigateTo} />

        {activePage === 'home' ? (
          <>
            <HeroSection onNavigate={navigateTo} />
            <ServicesSection />
            <SkillsSection />
            <PortfolioSection />
          </>
        ) : (
          <ProjectsPage />
        )}

        <FooterSection />
      </ScrollView>
    </View>
  );
}
