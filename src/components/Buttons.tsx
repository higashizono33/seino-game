import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function PrimaryButton({ label, onPress, variant = 'primary' }: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        isPrimary ? styles.btnPrimary : styles.btnSecondary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.btnLabel, isPrimary && styles.btnLabelPrimary]}>{label}</Text>
    </Pressable>
  );
}

interface NumberChoiceProps {
  value: number;
  disabled?: boolean;
  selected?: boolean;
  onPress: (value: number) => void;
  size?: number;
}

export function NumberChoice({ value, disabled, selected, onPress, size = 54 }: NumberChoiceProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onPress(value)}
      style={({ pressed }) => [
        styles.choice,
        { width: size, height: size, borderRadius: size / 2.6 },
        disabled && styles.choiceDisabled,
        selected && styles.choiceSelected,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.choiceText, disabled && styles.choiceTextDisabled]}>{value}</Text>
    </Pressable>
  );
}

interface HandChoiceProps {
  label: string;
  hand: string;
  disabled?: boolean;
  onPress: () => void;
}

export function HandChoice({ label, hand, disabled, onPress }: HandChoiceProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.handChoice,
        disabled && styles.choiceDisabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.handEmoji}>{hand}</Text>
      <Text style={styles.handLabel}>{label}</Text>
    </Pressable>
  );
}

export function Row({ children, gap = 12 }: { children: React.ReactNode; gap?: number }) {
  return <View style={[styles.row, { gap }]}>{children}</View>;
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.ink,
    alignItems: 'center',
    minWidth: 200,
  },
  btnPrimary: {
    backgroundColor: colors.ink,
  },
  btnSecondary: {
    backgroundColor: colors.paper,
  },
  btnLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.ink,
  },
  btnLabelPrimary: {
    color: colors.white,
  },
  choice: {
    borderWidth: 1.5,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paper,
  },
  choiceDisabled: {
    borderColor: colors.line,
    borderStyle: 'dashed',
    opacity: 0.35,
    backgroundColor: 'transparent',
  },
  choiceSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  choiceText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
  },
  choiceTextDisabled: {
    color: colors.sub,
  },
  handChoice: {
    width: 88,
    height: 88,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paper,
    gap: 4,
  },
  handEmoji: {
    fontSize: 30,
  },
  handLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.sub,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
