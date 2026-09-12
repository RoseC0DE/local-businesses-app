import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import Colors from '@/constants/Colors';
import { Text, View, useThemeColor } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import type { LocalBusiness } from '@/data/businesses';

type Props = {
  business: LocalBusiness;
};

export function BusinessCard({ business }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const muted = useThemeColor({}, 'muted');

  return (
    <Link href={`/business/${business.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${business.name}, ${business.category}`}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: card, borderColor: border, opacity: pressed ? 0.86 : 1 },
        ]}>
        <View style={[styles.emojiWrap, { backgroundColor: palette.background }]}>
          <Text style={styles.emoji}>{business.emoji}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>{business.name}</Text>
          <Text style={[styles.tagline, { color: muted }]}>{business.tagline}</Text>
          <Text style={[styles.meta, { color: palette.accent }]}>
            {business.category} · {business.rating.toFixed(1)} ({business.reviewCount})
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  emojiWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 28,
    lineHeight: 34,
  },
  body: {
    flex: 1,
    backgroundColor: 'transparent',
    gap: 3,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
  },
  tagline: {
    fontSize: 14,
  },
  meta: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '600',
  },
});
