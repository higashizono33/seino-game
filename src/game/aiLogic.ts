import { HISTORY_LIMIT, STRATEGY_RATE } from './constants';

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Random integer in [0, max] inclusive. */
export function randomInRange(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

/** Share of `n` within the player's recent throw history. Uniform (1/3) until there is data. */
export function freqOf(history: number[], n: number): number {
  if (history.length === 0) return 1 / 3;
  const count = history.filter((h) => h === n).length;
  return count / history.length;
}

export function appendHistory(history: number[], n: number): number[] {
  const next = [...history, n];
  return next.length > HISTORY_LIMIT ? next.slice(next.length - HISTORY_LIMIT) : next;
}

export interface AiCallDecision {
  call: number;
  plannedThrow: number;
}

/**
 * AI is the caller (offense). Bets on the player's most frequent recent throw,
 * then picks its own planned throw independently and calls their sum.
 */
export function decideAiCall(
  humanHistory: number[],
  maxSelf: number,
  maxHuman: number
): AiCallDecision {
  let bestFreq = -1;
  let candidates: number[] = [];
  for (let n = 0; n <= maxHuman; n++) {
    const f = freqOf(humanHistory, n);
    if (f > bestFreq) {
      bestFreq = f;
      candidates = [n];
    } else if (f === bestFreq) {
      candidates.push(n);
    }
  }
  const predictedHuman = pickRandom(candidates);
  const plannedThrow = randomInRange(maxSelf);
  return { call: plannedThrow + predictedHuman, plannedThrow };
}

/**
 * AI is the caller (offense), decides its actual throw at the "seeno" moment.
 * Mostly follows its plan, but sometimes throws differently (human-like uncertainty).
 */
export function decideAiThrowAsAttacker(plannedThrow: number, maxSelf: number): number {
  if (Math.random() < STRATEGY_RATE) return plannedThrow;
  return randomInRange(maxSelf);
}

/**
 * AI is the defender. The player's call is already known; AI picks the throw that
 * makes the player's call least likely to be correct, based on recent history.
 */
export function decideAiThrowAsDefender(
  call: number,
  humanHistory: number[],
  maxSelf: number,
  maxHuman: number
): number {
  if (Math.random() < STRATEGY_RATE) {
    let bestFreq = Infinity;
    let candidates: number[] = [];
    for (let x = 0; x <= maxSelf; x++) {
      const need = call - x;
      const f = need >= 0 && need <= maxHuman ? freqOf(humanHistory, need) : 0;
      if (f < bestFreq) {
        bestFreq = f;
        candidates = [x];
      } else if (f === bestFreq) {
        candidates.push(x);
      }
    }
    return pickRandom(candidates);
  }
  return randomInRange(maxSelf);
}
