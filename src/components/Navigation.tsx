import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Compass, Plane, Calendar, Wrench, User } from 'lucide-react-native';
import { COLORS } from '../theme/colors';

export type TabType = 'home' | 'explore' | 'booking' | 'planner' | 'tools' | 'profile';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'home', label: 'Radar', icon: Home },
    { id: 'explore', label: 'Web Map', icon: Compass },
    { id: 'booking', label: 'Wing Stays', icon: Plane },
    { id: 'planner', label: 'Itinerary', icon: Calendar },
    { id: 'tools', label: 'Gadgets', icon: Wrench },
    { id: 'profile', label: 'HQ', icon: User },
  ] as const;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const iconColor = isActive
          ? tab.id === 'home' || tab.id === 'planner'
            ? COLORS.spideyRed
            : tab.id === 'booking' || tab.id === 'tools'
            ? COLORS.batGold
            : COLORS.webCyan
          : COLORS.textMuted;

        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => onSelectTab(tab.id as TabType)}
            activeOpacity={0.7}
          >
            <Icon size={20} color={iconColor} />
            <Text style={[styles.tabLabel, { color: isActive ? COLORS.textPrimary : COLORS.textMuted }]}>
              {tab.label}
            </Text>
            {isActive && <View style={[styles.activeIndicator, { backgroundColor: iconColor }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#0A0E17',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  activeTabButton: {
    transform: [{ translateY: -2 }],
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 14,
    height: 3,
    borderRadius: 2,
  },
});
