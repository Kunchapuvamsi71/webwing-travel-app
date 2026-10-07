import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Shield, DollarSign, Globe, PhoneCall, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react-native';
import { COLORS } from '../theme/colors';

export const ToolsScreen: React.FC = () => {
  // Currency Converter State
  const [usdAmount, setUsdAmount] = useState<string>('100');
  const [targetCurrency, setTargetCurrency] = useState<'EUR' | 'GBP' | 'JPY' | 'INR' | 'AED'>('EUR');

  const exchangeRates = {
    EUR: 0.92,
    GBP: 0.78,
    JPY: 154.5,
    INR: 83.4,
    AED: 3.67,
  };

  const convertedValue = (parseFloat(usdAmount) || 0) * exchangeRates[targetCurrency];

  const phrases = [
    { text: 'Where is the Bat-Cave / Haven station?', translation: 'Où se trouve la station Haven?' },
    { text: 'I need emergency assistance immediately.', translation: 'J\'ai besoin d\'une assistance d\'urgence.' },
    { text: 'How much for a flight ticket?', translation: 'Combien coûte un billet d\'avion?' },
    { text: 'Thank you very much.', translation: 'Merci beaucoup.' },
  ];

  const handleSos = () => {
    Alert.alert(
      '🚨 BAT-SIGNAL SOS TRANSMITTED',
      'Emergency coordinates and signal dispatched to local emergency services & Bat-Cave HQ hotline.',
      [{ text: 'Acknowledged' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Bat-Gadget Utility Belt</Text>
        <Text style={styles.subtitle}>Tactical travel tools, currency converter & emergency SOS</Text>
      </View>

      {/* Currency Converter */}
      <View style={styles.toolCard}>
        <View style={styles.toolHeader}>
          <DollarSign size={20} color={COLORS.batGold} />
          <Text style={styles.toolTitle}>Real-Time Bat Currency Converter</Text>
        </View>

        <View style={styles.converterRow}>
          <View style={styles.amountBox}>
            <Text style={styles.label}>USD ($)</Text>
            <TextInput
              style={styles.currencyInput}
              keyboardType="numeric"
              value={usdAmount}
              onChangeText={setUsdAmount}
            />
          </View>

          <Text style={styles.equalsText}>=</Text>

          <View style={styles.amountBox}>
            <Text style={styles.label}>{targetCurrency}</Text>
            <Text style={styles.convertedText}>{convertedValue.toFixed(2)}</Text>
          </View>
        </View>

        {/* Currency Selector Pills */}
        <View style={styles.currSelector}>
          {(['EUR', 'GBP', 'JPY', 'INR', 'AED'] as const).map((curr) => (
            <TouchableOpacity
              key={curr}
              style={[styles.currChip, targetCurrency === curr && styles.currChipActive]}
              onPress={() => setTargetCurrency(curr)}
            >
              <Text style={[styles.currChipText, targetCurrency === curr && { color: COLORS.batGold }]}>
                {curr}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bat-Signal Emergency SOS */}
      <TouchableOpacity style={styles.sosCard} onPress={handleSos} activeOpacity={0.8}>
        <View style={styles.sosRow}>
          <AlertTriangle size={28} color={COLORS.spideyRed} />
          <View style={styles.sosTextGroup}>
            <Text style={styles.sosTitle}>TRANSMIT BAT-SIGNAL SOS</Text>
            <Text style={styles.sosSub}>One-tap emergency call & GPS coordinate broadcast</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Multi-Language Stealth Phrasebook */}
      <View style={styles.toolCard}>
        <View style={styles.toolHeader}>
          <Globe size={20} color={COLORS.webCyan} />
          <Text style={styles.toolTitle}>Tactical Travel Phrasebook</Text>
        </View>

        {phrases.map((phrase, idx) => (
          <View key={idx} style={styles.phraseBox}>
            <Text style={styles.phraseOriginal}>"{phrase.text}"</Text>
            <Text style={styles.phraseTrans}>{phrase.translation}</Text>
          </View>
        ))}
      </View>

      {/* Emergency Contacts List */}
      <View style={styles.toolCard}>
        <View style={styles.toolHeader}>
          <PhoneCall size={20} color={COLORS.neonGreen} />
          <Text style={styles.toolTitle}>Global Emergency Hotlines</Text>
        </View>

        <View style={styles.hotlineRow}>
          <Text style={styles.hotlineName}>International SOS / Police</Text>
          <Text style={styles.hotlineNum}>112 / 911</Text>
        </View>
        <View style={styles.hotlineRow}>
          <Text style={styles.hotlineName}>Webwing Tactical Support</Text>
          <Text style={styles.hotlineNum}>+1 (800) WEBWING</Text>
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
  header: {
    paddingTop: 16,
    paddingBottom: 12,
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
  toolCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginBottom: 16,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  converterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  amountBox: {
    width: '42%',
  },
  label: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '700',
    marginBottom: 4,
  },
  currencyInput: {
    backgroundColor: '#0F1522',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    color: COLORS.batGold,
    fontSize: 18,
    fontWeight: '900',
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  equalsText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textMuted,
  },
  convertedText: {
    backgroundColor: '#0F1522',
    borderRadius: 10,
    paddingHorizontal: 12,
    lineHeight: 44,
    height: 44,
    color: COLORS.webCyan,
    fontSize: 18,
    fontWeight: '900',
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  currSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  currChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#0F1522',
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  currChipActive: {
    borderColor: COLORS.batGold,
    backgroundColor: 'rgba(255, 199, 0, 0.1)',
  },
  currChipText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '800',
  },
  sosCard: {
    backgroundColor: 'rgba(255, 46, 77, 0.15)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.spideyRed,
    marginBottom: 16,
  },
  sosRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sosTextGroup: {
    marginLeft: 12,
    flex: 1,
  },
  sosTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.spideyRed,
    letterSpacing: 0.5,
  },
  sosSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  phraseBox: {
    backgroundColor: '#0F1522',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  phraseOriginal: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  phraseTrans: {
    fontSize: 11,
    color: COLORS.webCyan,
    marginTop: 2,
    fontStyle: 'italic',
  },
  hotlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDark,
  },
  hotlineName: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  hotlineNum: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.neonGreen,
  },
});
