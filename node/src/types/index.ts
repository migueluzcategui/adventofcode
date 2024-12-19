import { InputParsed, parseStringToVectorOfIntegers } from "../utils/parser";

export type Challenge = {
  parse: typeof parseStringToVectorOfIntegers;
  part1: (data: InputParsed) => number;
  part2: (data: InputParsed) => number;
};

export type ChallengeConfig = {
  year: string;
  day: string;
  challenge: Challenge;
};
