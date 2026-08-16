import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HAND_CLOSED, HAND_OPEN } from '../game/constants';

interface Props {
  /** How many arms this player has going into the round (1 or 2) — determines how many hands are drawn. */
  arms: number;
  /** How many fingers/hands are "up" (0..arms). */
  count: number;
  size?: number;
}

export function HandDisplay({ arms, count, size = 28 }: Props) {
  const closedCount = arms - count;
  const hands = Array.from({ length: arms }, (_, i) => (i < closedCount ? HAND_CLOSED : HAND_OPEN));
  return (
    <View style={styles.row}>
      {hands.map((h, i) => (
        <Text key={i} style={{ fontSize: size }}>
          {h}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
});
