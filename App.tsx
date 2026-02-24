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
import { CaseStudyPage } from './src/screens/CaseStudyPage';
import { globalStyles } from './src/theme';

export type PageType = 'home' | 'case-study';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [portfolioY, setPortfolioY] = useState(0);
  const [footerY, setFooterY] = useState(0);
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

  const navigateToCase = (caseData: any) => {
    setSelectedCase(caseData);
    setActivePage('case-study');
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  const scrollToPortfolio = () => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: portfolioY, animated: true });
      }, 100);
    } else {
      scrollViewRef.current?.scrollTo({ y: portfolioY, animated: true });
    }
  }

  const scrollToFooter = () => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: footerY, animated: true });
      }, 100);
    } else {
      scrollViewRef.current?.scrollTo({ y: footerY, animated: true });
    }
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />
      <ScrollView ref={scrollViewRef} stickyHeaderIndices={[0]}>
        <Header onNavigate={navigateTo} onProjectsClick={scrollToPortfolio} onContactClick={scrollToFooter} />

        {activePage === 'home' ? (
          <>
            <HeroSection onNavigate={navigateTo} onProjectsClick={scrollToPortfolio} />
            <ServicesSection />
            <SkillsSection />
            <View onLayout={(e) => setPortfolioY(e.nativeEvent.layout.y)}>
              <PortfolioSection onCaseSelect={navigateToCase} />
            </View>
          </>
        ) : activePage === 'case-study' && selectedCase ? (
          <CaseStudyPage caseData={selectedCase} onBack={() => navigateTo('home')} />
        ) : null}

        <View onLayout={(e) => setFooterY(e.nativeEvent.layout.y)}>
          <FooterSection />
        </View>
      </ScrollView>
    </View>
  );
}
