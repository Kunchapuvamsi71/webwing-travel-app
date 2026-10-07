import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Shield, Award, Heart, Ticket, Settings, ArrowUpRight, CheckCircle2, Smartphone } from 'lucide-react-native';
import { COLORS } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero HQ Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' }}
            style={styles.avatarImage}
          />
          <View style={styles.heroBadge}>
            <Shield size={12} color={COLORS.bgDark} />
          </View>
        </View>

        <Text style={styles.userName}>Agent Webwing</Text>
        <Text style={styles.userRole}>Vigilante Traveler • Class-A Agent</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: COLORS.batGold }]}>4</Text>
            <Text style={styles.statLabel}>Bat Stays</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: COLORS.webCyan }]}>8</Text>
            <Text style={styles.statLabel}>Web Trips</Text>
          </View>
        </View>
      </View>

      {/* Hero Pass Vouchers */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ticket size={18} color={COLORS.batGold} />
          <Text style={styles.sectionTitle}>Digital Boarding Vouchers</Text>
        </View>

        <View style={styles.voucherItem}>
          <View style={styles.vIconBox}>
            <Award size={18} color={COLORS.batGold} />
          </View>
          <View style={styles.vTextGroup}>
            <Text style={styles.vTitle}>Batwing Air • BW-909</Text>
            <Text style={styles.vSub}>Gotham Int. (GTH) → Queens NYC (JFK)</Text>
          </View>
          <View style={styles.confirmedPill}>
            <Text style={styles.confirmedText}>Confirmed</Text>
          </View>
        </View>
      </View>

      {/* Play Store & Release Settings */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Smartphone size={18} color={COLORS.webCyan} />
          <Text style={styles.sectionTitle}>Google Play Store Package Info</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>App Identifier</Text>
          <Text style={styles.infoVal}>com.webwing.travel</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Release Version</Text>
          <Text style={styles.infoVal}>v1.0.0 (Build 1)</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Packaging Type</Text>
          <Text style={[styles.infoVal, { color: COLORS.neonGreen }]}>Standalone FREE APK & Play Store AAB</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Theme Engine</Text>
          <Text style={styles.infoVal}>Spidey Network x Batcave Dark</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.bgCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginTop: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.spideyRed,
  },
  heroBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.batGold,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  userRole: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
    width: '90%',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.spideyRed,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.borderDark,
  },
  sectionCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  voucherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1522',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  vIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 199, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vTextGroup: {
    marginLeft: 10,
    flex: 1,
  },
  vTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  vSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  confirmedPill: {
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  confirmedText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.neonGreen,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDark,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  infoVal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
});
