import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { BusinessCard } from '@/components/BusinessCard';
import { Text, View, useThemeColor } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { CATEGORIES, filterBusinesses, type BusinessCategory } from '@/data/businesses';

export default function DiscoverScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const muted = useThemeColor({}, 'muted');
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('All');

  const results = useMemo(() => filterBusinesses(query, category), [query, category]);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>Riverton</Text>
      <Text style={styles.title}>Discover local favorites</Text>
      <Text style={[styles.subtitle, { color: muted }]}>
        Sample shops you can browse in Expo Go, on the web, or later in a real App Store build.
      </Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search coffee, bakers, repairs..."
        placeholderTextColor={muted}
        accessibilityLabel="Search businesses"
        style={[styles.search, { backgroundColor: card, borderColor: border, color: palette.text }]}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {CATEGORIES.map((item) => {
          const selected = item === category;

          return (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? palette.tint : card,
                  borderColor: selected ? palette.tint : border,
                },
              ]}>
              <Text style={[styles.chipLabel, { color: selected ? '#FFFFFF' : palette.text }]}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.list}>
        {results.length === 0 ? (
          <Text style={[styles.empty, { color: muted }]}>No businesses match that search.</Text>
        ) : (
          results.map((business) => <BusinessCard key={business.id} business={business} />)
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 12,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  search: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  chips: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  list: {
    gap: 10,
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  empty: {
    paddingVertical: 24,
    textAlign: 'center',
    fontSize: 15,
  },
});
