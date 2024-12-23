import { Challenge } from "../../types";

type InputParsed = string;

export const day03Challenge: Challenge<InputParsed> = {
  parse: (data: string): string => data,
  part1: (data: InputParsed): number => {
    const patterns = data
      .matchAll(/mul\((\d+),(\d+)\)/g)
      .map((match: string[]) => parseFloat(match[1]) * parseFloat(match[2]));
    const total = patterns.reduce((acc, curr) => acc + curr, 0);
    return total;
  },
  part2: (data: InputParsed): number => {
    let total = 0;
    const patterns = data.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);

    let isEnable = true;

    for (const match of patterns) {
      if (match[0] === "don't()") {
        isEnable = false;
        continue;
      }

      if (match[0] === "do()") {
        isEnable = true;
        continue;
      }

      if (isEnable) {
        total += parseFloat(match[1]) * parseFloat(match[2]);
      }
    }

    return total;
  },
};
