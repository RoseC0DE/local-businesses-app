import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

import { Text, View, useThemeColor } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useFavorites } from '@/context/FavoritesContext';
import { getBusinessById } from '@/data/businesses';

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const business = getBusinessById(String(id));
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const muted = useThemeColor({}, 'muted');
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const { isSaved, toggle } = useFavorites();

  if (!business) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={styles.title}>That shop is not in the sample list.</Text>
        <Link href="/" style={styles.backLink}>
          <Text style={{ color: palette.tint, fontWeight: '700' }}>Back to Discover</Text>
        </Link>
      </View>
    );
  }

  const saved = isSaved(business.id);
  const mapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(`${business.name} ${business.address} ${business.city}`)}`;

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: business.name }} />

      <View style={[styles.hero, { backgroundColor: card, borderColor: border }]}>
        <Text style={styles.emoji}>{business.emoji}</Text>
        <Text style={styles.title}>{business.name}</Text>
        <Text style={[styles.tagline, { color: muted }]}>{business.tagline}</Text>
        <Text style={[styles.rating, { color: palette.accent }]}>
          {business.rating.toFixed(1)} · {business.reviewCount} reviews · {business.category}
        </Text>
      </View>

      <Text style={styles.body}>{business.description}</Text>

      <View style={[styles.panel, { backgroundColor: card, borderColor: border }]}>
        <Text style={styles.panelLabel}>Hours</Text>
        <Text style={styles.panelValue}>{business.hours}</Text>
        <Text style={styles.panelLabel}>Address</Text>
        <Text style={styles.panelValue}>
          {business.address}
          {'\n'}
          {business.city}
        </Text>
        <Text style={styles.panelLabel}>Phone</Text>
        <Text style={styles.panelValue}>{business.phone}</Text>
      </View>

      <Pressable
        onPress={() => toggle(business.id)}
        style={[styles.primaryButton, { backgroundColor: saved ? palette.accent : palette.tint }]}>
        <Text style={styles.primaryLabel}>{saved ? 'Saved to favorites' : 'Save this place'}</Text>
      </Pressable>

      <Pressable onPress={() => Linking.openURL(`tel:${business.phone}`)} style={[styles.secondaryButton, { borderColor: border }]}>
        <Text style={[styles.secondaryLabel, { color: palette.text }]}>Call</Text>
      </Pressable>

      <Pressable onPress={() => Linking.openURL(mapsUrl)} style={[styles.secondaryButton, { borderColor: border }]}>
        <Text style={[styles.secondaryLabel, { color: palette.text }]}>Open in Maps</Text>
      </Pressable>
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
    gap: 14,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  hero: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    gap: 6,
  },
  emoji: {
    fontSize: 44,
    lineHeight: 52,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 15,
    textAlign: 'center',
  },
  rating: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  panelLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  panelValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  secondaryLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  backLink: {
    paddingVertical: 8,
  },
});
