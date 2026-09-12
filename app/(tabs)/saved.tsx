import { ScrollView, StyleSheet } from 'react-native';

import { BusinessCard } from '@/components/BusinessCard';
import { Text, View, useThemeColor } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useFavorites } from '@/context/FavoritesContext';
import { BUSINESSES } from '@/data/businesses';

export default function SavedScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const muted = useThemeColor({}, 'muted');
  const { ids } = useFavorites();
  const saved = BUSINESSES.filter((business) => ids.includes(business.id));

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}>
      <Text style={styles.title}>Saved places</Text>
      <Text style={[styles.subtitle, { color: muted }]}>
        Tap the heart on a business page to keep it here during this session.
      </Text>

      <View style={styles.list}>
        {saved.length === 0 ? (
          <Text style={[styles.empty, { color: muted }]}>
            Nothing saved yet. Open a shop from Discover and tap Save.
          </Text>
        ) : (
          saved.map((business) => <BusinessCard key={business.id} business={business} />)
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
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    gap: 10,
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  empty: {
    paddingVertical: 28,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
  },
});
