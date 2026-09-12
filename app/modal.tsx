import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function HowToTestModal() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const muted = useThemeColor({}, 'muted');

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}>
      <Text style={styles.title}>How to test this app</Text>
      <Text style={[styles.body, { color: muted }]}>
        This project is set up for Expo. You can preview it on your iPhone today. A true iOS
        Simulator still needs a Mac.
      </Text>

      <Text style={styles.heading}>On your iPhone</Text>
      <Text style={styles.body}>
        1. Install Expo Go from the App Store.{'\n'}
        2. Put the phone and this PC on the same Wi‑Fi.{'\n'}
        3. In this project folder, run npm start.{'\n'}
        4. Scan the QR code with the Camera app.
      </Text>

      <Text style={styles.heading}>On this computer</Text>
      <Text style={styles.body}>
        Run npm run web for a browser preview. That is useful for layout, but it is not an iPhone
        emulator. npm run android needs Android Studio if you want a phone-shaped emulator here.
      </Text>

      <Text style={styles.heading}>App Store build later</Text>
      <Text style={styles.body}>
        Create an Expo account, run npx eas-cli login, then npx eas-cli init. After that, npm run
        eas:build:ios compiles a real iOS app in the cloud.
      </Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  heading: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
});
