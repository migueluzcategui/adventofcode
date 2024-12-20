import { describe, expect, test } from "bun:test";

import { day01Challenge } from "./index";

describe("2024 - Day 1", () => {
  test("Part 1", () => {
    const input = {
      firstVector: [1, 2, 3],
      secondVector: [4, 5, 6],
    };

    const result = day01Challenge.part1(input);
    const expected = 9; // The absolute differences are (1-4), (2-5), (3-6) => 3 + 3 + 3 = 9

    // Assert that the result is correct
    expect(result).toBe(expected);
  });
  test("Part 2", () => {
    const input = {
      firstVector: [1, 2, 3, 4, 5, 6],
      secondVector: [4, 5, 6, 6, 2, 3],
    };

    const result = day01Challenge.part2(input);
    /**
     * // The score is calculated by multiplying the value by the number of times it appears in the second vector
     * and summing them up => 1*0 + 2*1 + 3*1 + 4*1 + 5*1 + 6*2 = 0 + 2 + 3 + 4 + 5 + 12 = 26
     */
    const expected = 26;

    // Assert that the result is correct
    expect(result).toBe(expected);
  });
  test("Part 2 with no matches", () => {
    const input = {
      firstVector: [1, 2, 3, 4, 5, 6],
      secondVector: [7, 8, 9, 10, 11, 12],
    };

    const result = day01Challenge.part2(input);
    const expected = 0;

    // Assert that the result is correct
    expect(result).toBe(expected);
  });
  test("Part 2 with all on the last values", () => {
    const input = {
      firstVector: [1, 2, 3, 4, 5, 6],
      secondVector: [6, 6, 6, 6, 6, 6, 6],
    };

    const result = day01Challenge.part2(input);

    // The score is calculated by multiplying the value by the number of times it appears in the second vector
    // 6*7 = 42
    const expected = 42;

    // Assert that the result is correct
    expect(result).toBe(expected);
  });
});
