import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NumberChoice, Row } from '../components/Buttons';
import { TopBar } from '../components/TopBar';
import { colors } from '../theme';

interface Props {
  playerArms: number;
  aiArms: number;
  onSelect: (call: number) => void;
}

export function CallSelectScreen({ playerArms, aiArms, onSelect }: Props) {
  const maxCall = playerArms + aiArms;
  const options = [0, 1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <TopBar playerArms={playerArms} aiArms={aiArms} centerLabel="あなたが コール" />
      <View style={styles.body}>
        <Text style={styles.instruction}>ごうけいを よそくして タップ</Text>
        <Row gap={10}>
          {options.map((n) => (
            <NumberChoice key={n} value={n} disabled={n > maxCall} onPress={onSelect} size={52} />
          ))}
        </Row>
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
    gap: 24,
    padding: 24,
  },
  instruction: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
});
