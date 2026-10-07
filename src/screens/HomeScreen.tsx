import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, Zap, ShieldAlert, Star, MapPin, ArrowRight, ShieldCheck, Flame } from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { DESTINATIONS, SPIDER_SENSE_ALERTS } from '../services/mockData';
import { Destination } from '../types/travel';

interface HomeScreenProps {
  onSelectDestination: (dest: Destination) => void;
  onNavigateTab: (tab: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectDestination, onNavigateTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Spidey Web', 'Bat Cave', 'Cyber', 'Mountain', 'Beach'];

  const filteredDestinations = DESTINATIONS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Spidey Web'
        ? item.heroTag === 'Spidey Web Spot'
        : selectedCategory === 'Bat Cave'
        ? item.heroTag === 'Bat Cave Hideout'
        : item.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Spider-Sense Radar Alert Banner */}
      <View style={styles.alertBanner}>
        <View style={styles.alertHeaderRow}>
          <View style={styles.radarPill}>
            <Zap size={14} color={COLORS.batGold} />
            <Text style={styles.radarPillText}>SPIDER-SENSE RADAR ACTIVE</Text>
          </View>
          <Text style={styles.alertTime}>Live Updates</Text>
        </View>

        {SPIDER_SENSE_ALERTS.slice(0, 1).map((alert) => (
          <View key={alert.id} style={styles.alertContent}>
            <ShieldAlert size={20} color={COLORS.spideyRed} />
            <View style={styles.alertTextGroup}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDesc}>{alert.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Hero Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Search size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Gotham, Queens, Tokyo, Swiss Alps..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Hero Category Selector */}
      <View style={styles.categorySection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected && { color: cat === 'Spidey Web' ? COLORS.spideyRed : cat === 'Bat Cave' ? COLORS.batGold : COLORS.webCyan }
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Trending Hero Destinations */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Flame size={20} color={COLORS.spideyRed} />
          <Text style={styles.sectionTitle}>Trending Web & Wing Destinations</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigateTab('explore')}>
          <Text style={styles.seeAllText}>View Web Map</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.destScroll}>
        {filteredDestinations.map((dest) => (
          <TouchableOpacity
            key={dest.id}
            style={styles.destCard}
            onPress={() => onSelectDestination(dest)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: dest.image }} style={styles.destImage} />
            <View style={styles.badgeOverlay}>
              <Text
                style={[
                  styles.badgeText,
                  {
                    color:
                      dest.heroTag === 'Spidey Web Spot'
                        ? COLORS.spideyRed
                        : dest.heroTag === 'Bat Cave Hideout'
                        ? COLORS.batGold
                        : COLORS.webCyan,
                  },
                ]}
              >
                {dest.heroTag}
              </Text>
            </View>

            <View style={styles.destInfo}>
              <Text style={styles.destTitle} numberOfLines={1}>{dest.title}</Text>
              <View style={styles.locationRow}>
                <MapPin size={14} color={COLORS.textSecondary} />
                <Text style={styles.locationText}>{dest.location}</Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.ratingRow}>
                  <Star size={14} color={COLORS.batGold} fill={COLORS.batGold} />
                  <Text style={styles.ratingText}>{dest.rating} ({dest.reviewsCount})</Text>
                </View>
                <Text style={styles.priceText}>
                  <Text style={styles.priceAmount}>${dest.pricePerNight}</Text>/night
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Stealth Shortcuts */}
      <View style={styles.shortcutContainer}>
        <View style={styles.shortcutHeader}>
          <ShieldCheck size={20} color={COLORS.batGold} />
          <Text style={styles.shortcutTitle}>Webwing Quick Tactical Actions</Text>
        </View>

        <View style={styles.shortcutGrid}>
          <TouchableOpacity style={styles.shortcutCard} onPress={() => onNavigateTab('booking')}>
            <Text style={styles.shortcutCardTitle}>Wing Stealth Flights</Text>
            <Text style={styles.shortcutCardSub}>Instant Flight & Room Vouchers</Text>
            <ArrowRight size={16} color={COLORS.batGold} style={styles.shortcutArrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.shortcutCard} onPress={() => onNavigateTab('tools')}>
            <Text style={styles.shortcutCardTitle}>Bat-Gadget Tools</Text>
            <Text style={styles.shortcutCardSub}>Currency & SOS Signal</Text>
            <ArrowRight size={16} color={COLORS.webCyan} style={styles.shortcutArrow} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  alertBanner: {
    margin: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.spideyRed,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  radarPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 199, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  radarPillText: {
    color: COLORS.batGold,
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  alertTime: {
    color: COLORS.textMuted,
    fontSize: 10,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTextGroup: {
    marginLeft: 10,
    flex: 1,
  },
  alertTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  alertDesc: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    marginLeft: 8,
    fontSize: 13,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginRight: 8,
  },
  categoryChipActive: {
    borderColor: COLORS.webCyan,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  categoryChipText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginLeft: 6,
  },
  seeAllText: {
    fontSize: 12,
    color: COLORS.webCyan,
    fontWeight: '700',
  },
  destScroll: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  destCard: {
    width: 240,
    borderRadius: 16,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginRight: 14,
    overflow: 'hidden',
  },
  destImage: {
    width: '100%',
    height: 140,
  },
  badgeOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(11, 14, 20, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  destInfo: {
    padding: 12,
  },
  destTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 4,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  priceAmount: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.batGold,
  },
  shortcutContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginBottom: 30,
  },
  shortcutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shortcutTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  shortcutGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcutCard: {
    width: '48%',
    backgroundColor: '#0F1522',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    position: 'relative',
  },
  shortcutCardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  shortcutCardSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  shortcutArrow: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
