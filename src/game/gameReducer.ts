import { MAX_ARMS } from './constants';
import { GameState, RoundResult } from './types';
import {
  appendHistory,
  decideAiCall,
  decideAiThrowAsAttacker,
  decideAiThrowAsDefender,
  randomInRange,
} from './aiLogic';

export type Action =
  | { type: 'START' }
  | { type: 'SELECT_CALL'; call: number }
  | { type: 'BEGIN_INPUT' }
  | { type: 'PLAYER_THROW'; n: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'GO_MATCH_END' }
  | { type: 'PLAY_AGAIN' }
  | { type: 'BACK_TO_TITLE' }
  | { type: 'INTERRUPT' };

export const initialState: GameState = {
  phase: 'title',
  playerArms: MAX_ARMS,
  aiArms: MAX_ARMS,
  callerIsPlayer: true,
  call: null,
  aiPlannedThrow: null,
  playerThrow: null,
  aiThrow: null,
  humanHistory: [],
  winStreak: 0,
  matchWinner: null,
  lastRound: null,
};

function beginRound(state: GameState, callerIsPlayer: boolean): GameState {
  const base: GameState = {
    ...state,
    callerIsPlayer,
    call: null,
    aiPlannedThrow: null,
    playerThrow: null,
    aiThrow: null,
    lastRound: null,
    phase: callerIsPlayer ? 'callSelect' : 'countdown',
  };
  if (!callerIsPlayer) {
    const { call, plannedThrow } = decideAiCall(state.humanHistory, base.aiArms, base.playerArms);
    base.call = call;
    base.aiPlannedThrow = plannedThrow;
  }
  return base;
}

function startNewMatch(state: GameState): GameState {
  // The player always calls first each match.
  return beginRound(
    {
      ...state,
      playerArms: MAX_ARMS,
      aiArms: MAX_ARMS,
      matchWinner: null,
    },
    true
  );
}

function resetToTitle(state: GameState): GameState {
  return {
    ...state,
    phase: 'title',
    call: null,
    aiPlannedThrow: null,
    playerThrow: null,
    aiThrow: null,
    matchWinner: null,
    lastRound: null,
  };
}

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START':
      return startNewMatch(state);

    case 'SELECT_CALL': {
      if (state.phase !== 'callSelect' || !state.callerIsPlayer) return state;
      const maxCall = state.playerArms + state.aiArms;
      if (action.call < 0 || action.call > maxCall) return state;
      return { ...state, call: action.call, phase: 'countdown' };
    }

    case 'BEGIN_INPUT': {
      if (state.phase !== 'countdown' || state.call === null) return state;
      const aiThrow = state.callerIsPlayer
        ? decideAiThrowAsDefender(state.call, state.humanHistory, state.aiArms, state.playerArms)
        : decideAiThrowAsAttacker(state.aiPlannedThrow ?? randomInRange(state.aiArms), state.aiArms);
      return { ...state, phase: 'tapInput', aiThrow, playerThrow: null };
    }

    case 'PLAYER_THROW': {
      if (
        state.phase !== 'tapInput' ||
        state.playerThrow !== null ||
        state.call === null ||
        state.aiThrow === null
      ) {
        return state;
      }
      const playerThrow = action.n;
      const sum = playerThrow + state.aiThrow;
      const hit = sum === state.call;
      const playerArmsBefore = state.playerArms;
      const aiArmsBefore = state.aiArms;
      let playerArms = playerArmsBefore;
      let aiArms = aiArmsBefore;
      if (hit) {
        if (state.callerIsPlayer) playerArms -= 1;
        else aiArms -= 1;
      }
      const humanHistory = appendHistory(state.humanHistory, playerThrow);
      const lastRound: RoundResult = {
        call: state.call,
        callerIsPlayer: state.callerIsPlayer,
        playerThrow,
        aiThrow: state.aiThrow,
        sum,
        hit,
        playerArmsBefore,
        aiArmsBefore,
      };

      let matchWinner: GameState['matchWinner'] = null;
      let winStreak = state.winStreak;
      if (playerArms === 0 || aiArms === 0) {
        matchWinner = playerArms === 0 ? 'player' : 'ai';
        winStreak = matchWinner === 'player' ? state.winStreak + 1 : 0;
      }

      return {
        ...state,
        phase: 'result',
        playerArms,
        aiArms,
        playerThrow,
        humanHistory,
        lastRound,
        matchWinner,
        winStreak,
        callerIsPlayer: !state.callerIsPlayer,
      };
    }

    case 'NEXT_ROUND': {
      if (state.phase !== 'result' || state.matchWinner) return state;
      return beginRound(state, state.callerIsPlayer);
    }

    case 'GO_MATCH_END': {
      if (state.phase !== 'result' || !state.matchWinner) return state;
      return { ...state, phase: 'matchEnd' };
    }

    case 'PLAY_AGAIN':
      return startNewMatch(state);

    case 'BACK_TO_TITLE':
      return resetToTitle(state);

    case 'INTERRUPT': {
      if (state.phase !== 'countdown' && state.phase !== 'tapInput') return state;
      return resetToTitle(state);
    }

    default:
      return state;
  }
}
