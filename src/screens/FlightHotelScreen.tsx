import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Plane, Hotel as HotelIcon, ArrowRight, ShieldCheck, CheckCircle, Clock, Award, Ticket } from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { FLIGHTS, HOTELS } from '../services/mockData';
import { Flight, Hotel } from '../types/travel';

export const FlightHotelScreen: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<'flights' | 'hotels'>('flights');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const handleBook = () => {
    setBookingConfirmed(true);
  };

  return (
    <View style={styles.container}>
      {/* Segment Selector */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[styles.segmentBtn, activeSegment === 'flights' && styles.segmentBtnActive]}
          onPress={() => setActiveSegment('flights')}
        >
          <Plane size={16} color={activeSegment === 'flights' ? COLORS.batGold : COLORS.textMuted} />
          <Text style={[styles.segmentText, activeSegment === 'flights' && { color: COLORS.batGold }]}>
            Wing Stealth Flights
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segmentBtn, activeSegment === 'hotels' && styles.segmentBtnActive]}
          onPress={() => setActiveSegment('hotels')}
        >
          <HotelIcon size={16} color={activeSegment === 'hotels' ? COLORS.webCyan : COLORS.textMuted} />
          <Text style={[styles.segmentText, activeSegment === 'hotels' && { color: COLORS.webCyan }]}>
            Bat Shelters & Hotels
          </Text>
        </TouchableOpacity>
      </View>

      {/* Flight List */}
      {activeSegment === 'flights' ? (
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionHeading}>Available Stealth Flight Routes</Text>

          {FLIGHTS.map((flight) => (
            <TouchableOpacity
              key={flight.id}
              style={styles.flightCard}
              onPress={() => {
                setSelectedFlight(flight);
                setBookingConfirmed(false);
              }}
              activeOpacity={0.85}
            >
              <View style={styles.flightHeader}>
                <View style={styles.airlinePill}>
                  <Text style={styles.airlineText}>{flight.airline}</Text>
                  <Text style={styles.flightCode}>{flight.flightCode}</Text>
                </View>

                {flight.stealthMode && (
                  <View style={styles.stealthBadge}>
                    <Award size={12} color={COLORS.batGold} />
                    <Text style={styles.stealthText}>STEALTH MODE</Text>
                  </View>
                )}
              </View>

              <View style={styles.routeRow}>
                <View style={styles.airportBox}>
                  <Text style={styles.codeText}>{flight.fromCode}</Text>
                  <Text style={styles.airportName}>{flight.from}</Text>
                  <Text style={styles.timeText}>{flight.departureTime}</Text>
                </View>

                <View style={styles.flightArrowBox}>
                  <Text style={styles.durationText}>{flight.duration}</Text>
                  <View style={styles.lineRow}>
                    <View style={styles.dot} />
                    <View style={styles.line} />
                    <Plane size={14} color={COLORS.batGold} />
                    <View style={styles.line} />
                    <View style={styles.dot} />
                  </View>
                  <Text style={styles.directText}>Direct Flight</Text>
                </View>

                <View style={[styles.airportBox, { alignItems: 'flex-end' }]}>
                  <Text style={styles.codeText}>{flight.toCode}</Text>
                  <Text style={styles.airportName}>{flight.to}</Text>
                  <Text style={styles.timeText}>{flight.arrivalTime}</Text>
                </View>
              </View>

              <View style={styles.flightFooter}>
                <View style={styles.seatPill}>
                  <Clock size={12} color={COLORS.spideyRed} />
                  <Text style={styles.seatText}>{flight.seatsAvailable} seats remaining</Text>
                </View>
                <Text style={styles.flightPrice}>${flight.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        /* Hotel List */
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionHeading}>Bat-Cave Shelters & Luxury Stays</Text>

          {HOTELS.map((hotel) => (
            <TouchableOpacity
              key={hotel.id}
              style={styles.hotelCard}
              onPress={() => {
                setSelectedHotel(hotel);
                setBookingConfirmed(false);
              }}
              activeOpacity={0.85}
            >
              <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
              <View style={styles.hotelBadgeOverlay}>
                <Text style={styles.hotelBadgeText}>{hotel.badge}</Text>
              </View>

              <View style={styles.hotelBody}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
                <Text style={styles.hotelLoc}>{hotel.location}</Text>

                <View style={styles.amenitiesRow}>
                  {hotel.amenities.slice(0, 2).map((am, i) => (
                    <View key={i} style={styles.amenityPill}>
                      <Text style={styles.amenityText}>{am}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.hotelFooter}>
                  <Text style={styles.hotelRating}>★ {hotel.rating}</Text>
                  <Text style={styles.hotelPrice}>
                    <Text style={styles.hotelPriceNum}>${hotel.pricePerNight}</Text>/night
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Flight Voucher Booking Modal */}
      {selectedFlight && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={styles.modalBg}>
            <View style={styles.voucherCard}>
              {!bookingConfirmed ? (
                <>
                  <View style={styles.voucherHeader}>
                    <Ticket size={24} color={COLORS.batGold} />
                    <Text style={styles.voucherTitle}>Wing Stealth Boarding Pass</Text>
                  </View>

                  <View style={styles.voucherRouteGroup}>
                    <Text style={styles.routeHeader}>
                      {selectedFlight.fromCode} → {selectedFlight.toCode}
                    </Text>
                    <Text style={styles.airlineSub}>
                      {selectedFlight.airline} • Code {selectedFlight.flightCode}
                    </Text>
                  </View>

                  <View style={styles.voucherDetailGrid}>
                    <View style={styles.voucherCol}>
                      <Text style={styles.voucherLabel}>DEPARTURE</Text>
                      <Text style={styles.voucherVal}>{selectedFlight.departureTime}</Text>
                    </View>
                    <View style={styles.voucherCol}>
                      <Text style={styles.voucherLabel}>DURATION</Text>
                      <Text style={styles.voucherVal}>{selectedFlight.duration}</Text>
                    </View>
                    <View style={styles.voucherCol}>
                      <Text style={styles.voucherLabel}>TOTAL FARE</Text>
                      <Text style={[styles.voucherVal, { color: COLORS.batGold }]}>${selectedFlight.price}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.confirmBtn} onPress={handleBook}>
                    <ShieldCheck size={18} color={COLORS.bgDark} />
                    <Text style={styles.confirmBtnText}>Confirm Stealth Booking</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setSelectedFlight(null)}>
                    <Text style={styles.cancelBtnText}>Close</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.successBox}>
                  <CheckCircle size={48} color={COLORS.neonGreen} />
                  <Text style={styles.successTitle}>Booking Verified!</Text>
                  <Text style={styles.successSub}>
                    Your digital pass for {selectedFlight.flightCode} has been saved to your Webwing HQ Profile.
                  </Text>
                  <TouchableOpacity style={styles.doneBtn} onPress={() => setSelectedFlight(null)}>
                    <Text style={styles.doneBtnText}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      )}

      {/* Hotel Booking Modal */}
      {selectedHotel && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={styles.modalBg}>
            <View style={styles.voucherCard}>
              {!bookingConfirmed ? (
                <>
                  <View style={styles.voucherHeader}>
                    <HotelIcon size={24} color={COLORS.webCyan} />
                    <Text style={styles.voucherTitle}>Bat Shelter Pass</Text>
                  </View>

                  <Text style={styles.hotelModalTitle}>{selectedHotel.name}</Text>
                  <Text style={styles.hotelModalLoc}>{selectedHotel.location}</Text>

                  <View style={styles.voucherDetailGrid}>
                    <View style={styles.voucherCol}>
                      <Text style={styles.voucherLabel}>RATING</Text>
                      <Text style={styles.voucherVal}>★ {selectedHotel.rating}</Text>
                    </View>
                    <View style={styles.voucherCol}>
                      <Text style={styles.voucherLabel}>PER NIGHT</Text>
                      <Text style={[styles.voucherVal, { color: COLORS.webCyan }]}>
                        ${selectedHotel.pricePerNight}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity style={[styles.confirmBtn, { backgroundColor: COLORS.webCyan }]} onPress={handleBook}>
                    <ShieldCheck size={18} color={COLORS.bgDark} />
                    <Text style={styles.confirmBtnText}>Reserve Shelter</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setSelectedHotel(null)}>
                    <Text style={styles.cancelBtnText}>Close</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.successBox}>
                  <CheckCircle size={48} color={COLORS.neonGreen} />
                  <Text style={styles.successTitle}>Shelter Reserved!</Text>
                  <Text style={styles.successSub}>
                    Your luxury voucher for {selectedHotel.name} is stored in your Webwing HQ Profile.
                  </Text>
                  <TouchableOpacity style={styles.doneBtn} onPress={() => setSelectedHotel(null)}>
                    <Text style={styles.doneBtnText}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  segmentContainer: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  segmentBtnActive: {
    backgroundColor: '#0F1522',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
  scrollArea: {
    paddingHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  flightCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginBottom: 14,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  airlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airlineText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  flightCode: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 8,
  },
  stealthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 199, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stealthText: {
    fontSize: 9,
    color: COLORS.batGold,
    fontWeight: '800',
    marginLeft: 4,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  airportBox: {
    width: '30%',
  },
  codeText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  airportName: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.webCyan,
    marginTop: 2,
  },
  flightArrowBox: {
    alignItems: 'center',
    width: '38%',
  },
  durationText: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textMuted,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderDark,
    marginHorizontal: 4,
  },
  directText: {
    fontSize: 9,
    color: COLORS.batGold,
    marginTop: 4,
    fontWeight: '700',
  },
  flightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
  },
  seatPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatText: {
    fontSize: 11,
    color: COLORS.spideyRed,
    marginLeft: 4,
    fontWeight: '600',
  },
  flightPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.batGold,
  },
  hotelCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginBottom: 16,
    position: 'relative',
  },
  hotelImage: {
    width: '100%',
    height: 150,
  },
  hotelBadgeOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(11, 14, 20, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  hotelBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.webCyan,
  },
  hotelBody: {
    padding: 14,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  hotelLoc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  amenitiesRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  amenityPill: {
    backgroundColor: '#0F1522',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  amenityText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  hotelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
  },
  hotelRating: {
    fontSize: 12,
    color: COLORS.batGold,
    fontWeight: '800',
  },
  hotelPrice: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  hotelPriceNum: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.webCyan,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  voucherCard: {
    width: '100%',
    backgroundColor: COLORS.bgDark,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  voucherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  voucherTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
  voucherRouteGroup: {
    backgroundColor: COLORS.bgCard,
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  routeHeader: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  airlineSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  voucherDetailGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  voucherCol: {
    alignItems: 'center',
  },
  voucherLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    fontWeight: '800',
  },
  voucherVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.batGold,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  confirmBtnText: {
    color: COLORS.bgDark,
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 6,
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 6,
  },
  cancelBtnText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  successBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  successSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  doneBtn: {
    backgroundColor: COLORS.neonGreen,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  doneBtnText: {
    color: COLORS.bgDark,
    fontWeight: '900',
  },
  hotelModalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  hotelModalLoc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
});
