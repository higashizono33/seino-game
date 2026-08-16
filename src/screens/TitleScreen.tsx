import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/Buttons';
import { colors } from '../theme';

interface Props {
  onStart: () => void;
}

export function TitleScreen({ onStart }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✊🖐️</Text>
      <Text style={styles.title}>せーの！</Text>
      <Text style={styles.subtitle}>親指チャレンジ</Text>
      <View style={styles.spacer} />
      <PrimaryButton label="はじめる" onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paper,
    gap: 8,
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.sub,
  },
  spacer: {
    height: 32,
  },
});
