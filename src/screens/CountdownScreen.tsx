import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COUNTDOWN_STEP_MS, COUNTDOWN_STEPS } from '../game/constants';
import { TopBar } from '../components/TopBar';
import { colors } from '../theme';

interface Props {
  playerArms: number;
  aiArms: number;
  callerIsPlayer: boolean;
}

export function CountdownScreen({ playerArms, aiArms, callerIsPlayer }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timer = setInterval(() => {
      setStep((s) => Math.min(s + 1, COUNTDOWN_STEPS.length - 1));
    }, COUNTDOWN_STEP_MS);
    return () => clearInterval(timer);
  }, []);

  const centerLabel = callerIsPlayer ? 'たいせん中' : 'AIのばん（コール内容は非公開）';

  return (
    <View style={styles.container}>
      <TopBar playerArms={playerArms} aiArms={aiArms} centerLabel={centerLabel} />
      <View style={styles.body}>
        <Text style={[styles.cue, step === COUNTDOWN_STEPS.length - 1 && styles.cueFinal]}>
          {COUNTDOWN_STEPS[step]}
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cue: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.ink,
  },
  cueFinal: {
    color: colors.accent,
  },
});
