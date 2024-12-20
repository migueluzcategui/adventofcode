/**
 * Challenge interface
 */
export type Challenge<T = any> = {
  parse: (data: string) => T;
  part1: (data: T) => number;
  part2: (data: T) => number;
};

/**
 * Configuration for a challenge
 */
export type ChallengeConfig = {
  year: string;
  day: string;
  challenge: Challenge;
};
