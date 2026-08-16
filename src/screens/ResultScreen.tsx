import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HandDisplay } from '../components/HandDisplay';
import { PrimaryButton } from '../components/Buttons';
import { TopBar } from '../components/TopBar';
import { RoundResult } from '../game/types';
import { colors } from '../theme';

interface Props {
  playerArms: number;
  aiArms: number;
  round: RoundResult;
  onNext: () => void;
}

export function ResultScreen({ playerArms, aiArms, round, onNext }: Props) {
  const { call, callerIsPlayer, playerThrow, aiThrow, sum, hit, playerArmsBefore, aiArmsBefore } = round;

  // A hit advances whoever made the call; a miss advances nobody. So a round is
  // good news for the player exactly when the caller's outcome matches who called:
  // the player hit their own call, or the AI whiffed on its call.
  const favorableToPlayer = hit === callerIsPlayer;

  const message = hit
    ? callerIsPlayer
      ? 'コール的中！あなたの腕が1本下がった'
      : 'コール的中…AIの腕が1本下がった'
    : callerIsPlayer
      ? 'コールと不一致…あなたの腕はそのまま'
      : 'ラッキー！AIのコールがハズレた（AIの腕はそのまま）';

  return (
    <View style={styles.container}>
      <TopBar playerArms={playerArms} aiArms={aiArms} centerLabel="結果" />
      <View style={styles.body}>
        <Text style={styles.reveal}>
          {callerIsPlayer ? 'あなたのコールは' : 'AIのコールは'} <Text style={styles.revealNum}>{call}</Text> だった
        </Text>
        <View style={styles.hands}>
          <View style={styles.handCol}>
            <Text style={styles.handLabel}>あなた</Text>
            <HandDisplay arms={playerArmsBefore} count={playerThrow} size={26} />
          </View>
          <Text style={styles.plus}>＋</Text>
          <View style={styles.handCol}>
            <Text style={styles.handLabel}>AI</Text>
            <HandDisplay arms={aiArmsBefore} count={aiThrow} size={26} />
          </View>
        </View>
        <Text style={styles.sum}>＝{sum}</Text>
        <View style={[styles.badge, favorableToPlayer ? styles.badgeGood : styles.badgeBad]}>
          <Text style={[styles.badgeText, favorableToPlayer ? styles.badgeTextGood : styles.badgeTextBad]}>
            {hit ? '○' : '✕'}
          </Text>
        </View>
        <Text style={[styles.message, favorableToPlayer ? styles.messageGood : styles.messageBad]}>{message}</Text>
        <View style={styles.nextButton}>
          <PrimaryButton label="つぎへ！" onPress={onNext} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    padding: 24,
  },
  reveal: {
    fontSize: 15,
    color: colors.ink,
  },
  revealNum: {
    fontWeight: '800',
    color: colors.accent,
  },
  hands: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  handCol: {
    alignItems: 'center',
    gap: 4,
  },
  handLabel: {
    fontSize: 12,
    color: colors.sub,
    fontWeight: '600',
  },
  plus: {
    fontSize: 16,
    color: colors.sub,
  },
  sum: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGood: {
    borderColor: colors.hit,
  },
  badgeBad: {
    borderColor: colors.miss,
  },
  badgeText: {
    fontSize: 24,
    fontWeight: '800',
  },
  badgeTextGood: {
    color: colors.hit,
  },
  badgeTextBad: {
    color: colors.miss,
  },
  message: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  messageGood: {
    color: colors.hit,
  },
  messageBad: {
    color: colors.miss,
  },
  nextButton: {
    marginTop: 8,
  },
});
