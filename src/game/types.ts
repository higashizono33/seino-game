export type Phase =
  | 'title'
  | 'callSelect'
  | 'countdown'
  | 'tapInput'
  | 'result'
  | 'matchEnd';

export type Winner = 'player' | 'ai';

export interface RoundResult {
  call: number;
  callerIsPlayer: boolean;
  playerThrow: number;
  aiThrow: number;
  sum: number;
  hit: boolean;
  /** Arms each side had going into this round, before any deduction. */
  playerArmsBefore: number;
  aiArmsBefore: number;
}

export interface GameState {
  phase: Phase;
  playerArms: number;
  aiArms: number;
  /** True when the player is the caller (offense) for the current/upcoming round. */
  callerIsPlayer: boolean;
  call: number | null;
  /** AI's planned throw when AI is the caller, decided at call time but only used at the "seeno" moment. */
  aiPlannedThrow: number | null;
  playerThrow: number | null;
  aiThrow: number | null;
  /** Last N throws the player has made, session-persisted across matches. */
  humanHistory: number[];
  /** Session-persisted consecutive match win count for the player. */
  winStreak: number;
  matchWinner: Winner | null;
  lastRound: RoundResult | null;
}
