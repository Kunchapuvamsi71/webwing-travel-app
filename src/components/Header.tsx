import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shield, Zap, Bell, Compass } from 'lucide-react-native';
import { COLORS } from '../theme/colors';

interface HeaderProps {
  alertCount?: number;
  onOpenAlerts?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ alertCount = 2, onOpenAlerts }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <View style={styles.badgeContainer}>
          <Shield size={24} color={COLORS.spideyRed} />
          <Zap size={14} color={COLORS.batGold} style={styles.zapIcon} />
        </View>
        <View style={styles.titleColumn}>
          <View style={styles.titleRow}>
            <Text style={styles.titleWeb}>WEB</Text>
            <Text style={styles.titleWing}>WING</Text>
          </View>
          <Text style={styles.subtitle}>Spidey Network • Bat Stealth Travel</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.alertButton} onPress={onOpenAlerts}>
        <Bell size={20} color={COLORS.webCyan} />
        {alertCount > 0 && (
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>{alertCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: COLORS.bgDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDark,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'relative',
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.spideyRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  zapIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  titleColumn: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWeb: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.spideyRed,
    letterSpacing: 1.5,
  },
  titleWing: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.batGold,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 1,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  alertButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  alertBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.spideyRed,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
