import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { MapPin, Star, CloudSun, Calendar, ShieldCheck, X, CheckCircle } from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { DESTINATIONS } from '../services/mockData';
import { Destination } from '../types/travel';

export const ExploreScreen: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Cyber', 'Gotham City', 'Mountain', 'Beach'];

  const filtered = DESTINATIONS.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.title}>Spidey Web-Map Discovery</Text>
        <Text style={styles.subtitle}>Explore high-altitude locations & superhero destinations</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, activeCategory === cat && styles.catChipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.catChipText, activeCategory === cat && { color: COLORS.webCyan }]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.destList} showsVerticalScrollIndicator={false}>
        {filtered.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => setSelectedDest(item)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.tagPill}>
                  <Text style={styles.tagText}>{item.heroTag}</Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <MapPin size={14} color={COLORS.textSecondary} />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>

              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

              <View style={styles.cardFooter}>
                <View style={styles.ratingBox}>
                  <Star size={14} color={COLORS.batGold} fill={COLORS.batGold} />
                  <Text style={styles.ratingText}>{item.rating} ({item.reviewsCount})</Text>
                </View>
                <Text style={styles.priceText}>
                  <Text style={styles.priceNum}>${item.pricePerNight}</Text> / night
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Destination Details Modal */}
      {selectedDest && (
        <Modal visible={true} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedDest(null)}>
                <X size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: selectedDest.image }} style={styles.modalImage} />

                <View style={styles.modalBody}>
                  <Text style={styles.modalTag}>{selectedDest.heroTag}</Text>
                  <Text style={styles.modalTitle}>{selectedDest.title}</Text>
                  <Text style={styles.modalLoc}>{selectedDest.location}</Text>

                  <Text style={styles.modalDesc}>{selectedDest.description}</Text>

                  <View style={styles.infoGrid}>
                    <View style={styles.infoCard}>
                      <CloudSun size={18} color={COLORS.webCyan} />
                      <Text style={styles.infoCardTitle}>Weather Radar</Text>
                      <Text style={styles.infoCardSub}>{selectedDest.weather}</Text>
                    </View>

                    <View style={styles.infoCard}>
                      <Calendar size={18} color={COLORS.batGold} />
                      <Text style={styles.infoCardTitle}>Best Season</Text>
                      <Text style={styles.infoCardSub}>{selectedDest.bestTimeToVisit}</Text>
                    </View>
                  </View>

                  <Text style={styles.attractionsHeader}>Top Hero Attractions</Text>
                  {selectedDest.attractions.map((att, idx) => (
                    <View key={idx} style={styles.attractionRow}>
                      <CheckCircle size={16} color={COLORS.spideyRed} />
                      <Text style={styles.attractionText}>{att}</Text>
                    </View>
                  ))}

                  <TouchableOpacity style={styles.bookBtn} onPress={() => setSelectedDest(null)}>
                    <ShieldCheck size={18} color={COLORS.bgDark} />
                    <Text style={styles.bookBtnText}>Plan Trip to {selectedDest.title}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  headerArea: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  catRow: {
    marginTop: 12,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginRight: 8,
  },
  catChipActive: {
    borderColor: COLORS.webCyan,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  catChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  destList: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  card: {
    borderRadius: 16,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    flex: 1,
  },
  tagPill: {
    backgroundColor: '#0F1522',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  tagText: {
    color: COLORS.webCyan,
    fontSize: 10,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
  desc: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '700',
  },
  priceText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  priceNum: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.batGold,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '85%',
    backgroundColor: COLORS.bgDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: '100%',
    height: 220,
  },
  modalBody: {
    padding: 20,
  },
  modalTag: {
    color: COLORS.spideyRed,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  modalLoc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  modalDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 12,
    lineHeight: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoCard: {
    width: '48%',
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  infoCardTitle: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 6,
  },
  infoCardSub: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  attractionsHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  attractionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  attractionText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginLeft: 8,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.batGold,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 30,
  },
  bookBtnText: {
    color: COLORS.bgDark,
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 8,
  },
});
