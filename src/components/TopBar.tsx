import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

interface ArmBadgeProps {
  label: string;
  arms: number;
}

function ArmBadge({ label, arms }: ArmBadgeProps) {
  return (
    <View style={styles.badgeWrap}>
      <Text style={styles.badgeLabel}>{label}</Text>
      <View style={styles.badgeCircle}>
        <Text style={styles.badgeValue}>{arms}</Text>
      </View>
    </View>
  );
}

interface Props {
  playerArms: number;
  aiArms: number;
  centerLabel: string;
}

export function TopBar({ playerArms, aiArms, centerLabel }: Props) {
  return (
    <View style={styles.row}>
      <ArmBadge label="あなた" arms={playerArms} />
      <Text style={styles.center}>{centerLabel}</Text>
      <ArmBadge label="AI" arms={aiArms} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  badgeWrap: {
    alignItems: 'center',
    gap: 4,
  },
  badgeLabel: {
    fontSize: 11,
    color: colors.sub,
    fontWeight: '600',
  },
  badgeCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  center: {
    fontSize: 12,
    color: colors.sub,
    flexShrink: 1,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
