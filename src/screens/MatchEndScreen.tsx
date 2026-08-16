import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/Buttons';
import { Winner } from '../game/types';
import { colors } from '../theme';

interface Props {
  winner: Winner;
  winStreak: number;
  onPlayAgain: () => void;
  onBackToTitle: () => void;
}

export function MatchEndScreen({ winner, winStreak, onPlayAgain, onBackToTitle }: Props) {
  const isPlayerWin = winner === 'player';

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{isPlayerWin ? '🙌' : '🤖'}</Text>
      <Text style={styles.title}>{isPlayerWin ? 'あなたの　かち！' : 'AIの　かち…'}</Text>
      {isPlayerWin && winStreak > 0 && (
        <View style={styles.streakBox}>
          <Text style={styles.streakText}>🔥 {winStreak}れんしょう中</Text>
        </View>
      )}
      <View style={styles.buttons}>
        <PrimaryButton label="もういちど" onPress={onPlayAgain} />
        <PrimaryButton label="タイトルへ" onPress={onBackToTitle} variant="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paper,
    gap: 14,
    padding: 24,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink,
  },
  streakBox: {
    backgroundColor: colors.accentSoft,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  buttons: {
    marginTop: 16,
    gap: 12,
    alignItems: 'center',
  },
});
