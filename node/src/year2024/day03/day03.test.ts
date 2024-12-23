import { describe, expect, test } from "bun:test";

import { day03Challenge } from "./index";

describe("2024 - Day 3", () => {
  test("parse", () => {
    const rawData = `mul(39,39)`;
    expect(day03Challenge.parse(rawData)).toStrictEqual(rawData);
  });

  describe("part1", () => {
    test("part1", () => {
      const data = `mul(2,5)`;
      expect(day03Challenge.part1(data)).toBe(10);
    });
    test("part1 with multiple mul", () => {
      const data = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
      expect(day03Challenge.part1(data)).toBe(161);
    });
  });

  describe("part2", () => {
    test.only("part2", () => {
        const data = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
        expect(day03Challenge.part2(data)).toBe(48);
    });
  })
});
