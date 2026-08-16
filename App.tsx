import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CallSelectScreen } from './src/screens/CallSelectScreen';
import { CountdownScreen } from './src/screens/CountdownScreen';
import { MatchEndScreen } from './src/screens/MatchEndScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { TapInputScreen } from './src/screens/TapInputScreen';
import { TitleScreen } from './src/screens/TitleScreen';
import { useGameEngine } from './src/hooks/useGameEngine';
import { colors } from './src/theme';

export default function App() {
  const { state, dispatch } = useGameEngine();

  return (
    <SafeAreaView style={styles.container}>
      {state.phase === 'title' && <TitleScreen onStart={() => dispatch({ type: 'START' })} />}

      {state.phase === 'callSelect' && (
        <CallSelectScreen
          playerArms={state.playerArms}
          aiArms={state.aiArms}
          onSelect={(call) => dispatch({ type: 'SELECT_CALL', call })}
        />
      )}

      {state.phase === 'countdown' && (
        <CountdownScreen
          playerArms={state.playerArms}
          aiArms={state.aiArms}
          callerIsPlayer={state.callerIsPlayer}
        />
      )}

      {state.phase === 'tapInput' && (
        <TapInputScreen
          arms={state.playerArms}
          isOffense={state.callerIsPlayer}
          call={state.callerIsPlayer ? state.call : null}
          onThrow={(n) => dispatch({ type: 'PLAYER_THROW', n })}
        />
      )}

      {state.phase === 'result' && state.lastRound && (
        <ResultScreen playerArms={state.playerArms} aiArms={state.aiArms} round={state.lastRound} />
      )}

      {state.phase === 'matchEnd' && state.matchWinner && (
        <MatchEndScreen
          winner={state.matchWinner}
          winStreak={state.winStreak}
          nextFirstCaller={state.nextFirstCaller ?? true}
          onPlayAgain={() => dispatch({ type: 'PLAY_AGAIN' })}
          onBackToTitle={() => dispatch({ type: 'BACK_TO_TITLE' })}
        />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
  },
});
