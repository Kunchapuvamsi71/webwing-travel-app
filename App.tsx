import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { Header } from './src/components/Header';
import { Navigation, TabType } from './src/components/Navigation';
import { HomeScreen } from './src/screens/HomeScreen';
import { ExploreScreen } from './src/screens/ExploreScreen';
import { FlightHotelScreen } from './src/screens/FlightHotelScreen';
import { TripPlannerScreen } from './src/screens/TripPlannerScreen';
import { ToolsScreen } from './src/screens/ToolsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { COLORS } from './src/theme/colors';
import { Destination } from './src/types/travel';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setActiveTab('explore');
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onSelectDestination={handleSelectDestination}
            onNavigateTab={setActiveTab}
          />
        );
      case 'explore':
        return <ExploreScreen />;
      case 'booking':
        return <FlightHotelScreen />;
      case 'planner':
        return <TripPlannerScreen />;
      case 'tools':
        return <ToolsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return (
          <HomeScreen
            onSelectDestination={handleSelectDestination}
            onNavigateTab={setActiveTab}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgDark} />
      <Header onOpenAlerts={() => setActiveTab('home')} />
      <View style={styles.contentArea}>{renderActiveScreen()}</View>
      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  contentArea: {
    flex: 1,
  },
});
