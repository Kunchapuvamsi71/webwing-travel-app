import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Calendar, DollarSign, CheckSquare, Square, Plus, Trash2, PieChart } from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import { ItineraryItem } from '../types/travel';

export const TripPlannerScreen: React.FC = () => {
  const [targetBudget, setTargetBudget] = useState<number>(1500);
  const [items, setItems] = useState<ItineraryItem[]>([
    { id: '1', day: 1, time: '09:00 AM', title: 'Arrival at Queens NYC Spidey Base', location: 'Queens, NY', cost: 45, completed: true },
    { id: '2', day: 1, time: '02:00 PM', title: 'High-Altitude Rooftop Skyline Walk', location: 'Manhattan', cost: 60, completed: true },
    { id: '3', day: 2, time: '10:00 AM', title: 'Bat-Cave Haven Underground Tour', location: 'Gotham Center', cost: 85, completed: false },
    { id: '4', day: 2, time: '07:30 PM', title: 'Night Stealth Harbor Dinner Cruise', location: 'Gotham Harbor', cost: 120, completed: false },
    { id: '5', day: 3, time: '11:00 AM', title: 'Helicopter Batwing Flight Pass', location: 'Metropolis Hub', cost: 290, completed: false },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newDay, setNewDay] = useState('1');

  const totalCost = items.reduce((acc, curr) => acc + curr.cost, 0);
  const remainingBudget = targetBudget - totalCost;

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, completed: !it.completed } : it))
    );
  };

  const addItem = () => {
    if (!newTitle.trim()) return;
    const item: ItineraryItem = {
      id: Date.now().toString(),
      day: parseInt(newDay, 10) || 1,
      time: '12:00 PM',
      title: newTitle,
      location: 'Custom Spot',
      cost: parseFloat(newCost) || 0,
      completed: false,
    };
    setItems([...items, item]);
    setNewTitle('');
    setNewCost('');
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Spidey Web Itinerary Weaver</Text>
        <Text style={styles.subtitle}>Weave day-by-day travel plans & budget tracking</Text>
      </View>

      {/* Budget Summary Card */}
      <View style={styles.budgetCard}>
        <View style={styles.budgetTitleRow}>
          <PieChart size={18} color={COLORS.batGold} />
          <Text style={styles.budgetTitle}>Mission Travel Budget</Text>
        </View>

        <View style={styles.budgetGrid}>
          <View style={styles.budgetCol}>
            <Text style={styles.budgetLabel}>Target Budget</Text>
            <Text style={styles.budgetValue}>${targetBudget}</Text>
          </View>
          <View style={styles.budgetCol}>
            <Text style={styles.budgetLabel}>Spent So Far</Text>
            <Text style={[styles.budgetValue, { color: COLORS.spideyRed }]}>${totalCost}</Text>
          </View>
          <View style={styles.budgetCol}>
            <Text style={styles.budgetLabel}>Remaining</Text>
            <Text style={[styles.budgetValue, { color: remainingBudget >= 0 ? COLORS.neonGreen : COLORS.spideyRed }]}>
              ${remainingBudget}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(100, (totalCost / targetBudget) * 100)}%`,
                backgroundColor: totalCost > targetBudget ? COLORS.spideyRed : COLORS.webCyan,
              },
            ]}
          />
        </View>
      </View>

      {/* Add New Activity */}
      <View style={styles.addSection}>
        <Text style={styles.addHeading}>Add Web Activity</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Activity (e.g. Roof Zip-line)"
            placeholderTextColor={COLORS.textMuted}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 8 }]}
            placeholder="Cost ($)"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            value={newCost}
            onChangeText={setNewCost}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addItem}>
            <Plus size={20} color={COLORS.bgDark} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Itinerary Day-by-Day Timeline */}
      <Text style={styles.timelineHeading}>Web Itinerary Activities ({items.length})</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <TouchableOpacity onPress={() => toggleItem(item.id)}>
            {item.completed ? (
              <CheckSquare size={22} color={COLORS.neonGreen} />
            ) : (
              <Square size={22} color={COLORS.textMuted} />
            )}
          </TouchableOpacity>

          <View style={styles.itemInfo}>
            <View style={styles.itemDayRow}>
              <View style={styles.dayPill}>
                <Text style={styles.dayText}>Day {item.day}</Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={[styles.itemTitle, item.completed && styles.strikeText]}>
              {item.title}
            </Text>
            <Text style={styles.itemLoc}>{item.location}</Text>
          </View>

          <View style={styles.itemRight}>
            <Text style={styles.itemCost}>${item.cost}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.trashBtn}>
              <Trash2 size={16} color={COLORS.spideyRed} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  budgetCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginVertical: 10,
  },
  budgetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginLeft: 6,
  },
  budgetGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  budgetCol: {
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#0F1522',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  addSection: {
    marginVertical: 12,
  },
  addHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    color: COLORS.textPrimary,
    fontSize: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  addBtn: {
    backgroundColor: COLORS.webCyan,
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  timelineHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 10,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemDayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayPill: {
    backgroundColor: '#0F1522',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  dayText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.spideyRed,
  },
  timeText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 3,
  },
  strikeText: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  itemLoc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemCost: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.batGold,
  },
  trashBtn: {
    marginTop: 6,
    padding: 4,
  },
});
