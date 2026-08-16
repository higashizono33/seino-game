import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { HAND_CLOSED, HAND_OPEN, INPUT_WINDOW_MS } from '../game/constants';
import { HandChoice, Row } from '../components/Buttons';
import { colors } from '../theme';

interface Props {
  /** This player's remaining arms — determines how many choices (0/1 vs 0/1/2) are available. */
  arms: number;
  /** True if the player is the caller this round (their own call is shown as a reminder). */
  isOffense: boolean;
  call: number | null;
  onThrow: (n: number) => void;
}

function handsFor(arms: number, count: number): string {
  const closedCount = arms - count;
  return Array.from({ length: arms }, (_, i) => (i < closedCount ? HAND_CLOSED : HAND_OPEN)).join('');
}

export function TapInputScreen({ arms, isOffense, call, onThrow }: Props) {
  const [locked, setLocked] = useState(false);
  const lockedRef = useRef(false);
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    progress.setValue(1);
    Animated.timing(progress, {
      toValue: 0,
      duration: INPUT_WINDOW_MS,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const handleTap = (n: number) => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setLocked(true);
    onThrow(n);
  };

  const options = arms === 1 ? [0, 1] : [0, 1, 2];

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.timerLabel}>のこり時間</Text>
        <View style={styles.timerTrack}>
          <Animated.View
            style={[
              styles.timerFill,
              {
                width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.body}>
        {isOffense && call !== null && <Text style={styles.callReminder}>あなたのコール：{call}</Text>}
        <Text style={styles.instruction}>なんぼん だす？</Text>
        <Row gap={14}>
          {options.map((n) => (
            <HandChoice
              key={n}
              label={`${n}本`}
              hand={handsFor(arms, n)}
              disabled={locked}
              onPress={() => handleTap(n)}
            />
          ))}
        </Row>
        <Text style={styles.caption}>
          {isOffense
            ? 'AIの本数はまだ見えない。コールが当たるように賭ける！'
            : 'AIのコールも本数もまだ見えない。手さぐりでタップ！'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  topbar: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 6,
  },
  timerLabel: {
    fontSize: 12,
    color: colors.sub,
    fontWeight: '600',
  },
  timerTrack: {
    width: '80%',
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    padding: 24,
  },
  callReminder: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  instruction: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  caption: {
    fontSize: 12,
    color: colors.sub,
    textAlign: 'center',
    maxWidth: 280,
  },
});
