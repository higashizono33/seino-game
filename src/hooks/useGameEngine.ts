import { useEffect, useReducer, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { gameReducer, initialState } from '../game/gameReducer';
import { COUNTDOWN_STEP_MS, COUNTDOWN_STEPS, INPUT_WINDOW_MS } from '../game/constants';

export function useGameEngine() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const appState = useRef(AppState.currentState);

  // Discard the in-progress round/match if the app leaves the foreground while a timer is running.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (next: AppStateStatus) => {
      const prev = appState.current;
      appState.current = next;
      if (prev === 'active' && next !== 'active') {
        dispatch({ type: 'INTERRUPT' });
      }
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (state.phase !== 'countdown') return;
    const timer = setTimeout(() => dispatch({ type: 'BEGIN_INPUT' }), COUNTDOWN_STEP_MS * COUNTDOWN_STEPS.length);
    return () => clearTimeout(timer);
  }, [state.phase]);

  useEffect(() => {
    if (state.phase !== 'tapInput') return;
    const timer = setTimeout(() => dispatch({ type: 'PLAYER_THROW', n: 0 }), INPUT_WINDOW_MS);
    return () => clearTimeout(timer);
  }, [state.phase]);

  return { state, dispatch };
}
