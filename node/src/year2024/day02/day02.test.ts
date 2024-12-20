import { describe, expect, test } from "bun:test";

import { day02Challenge } from "./index";

describe("2024 - Day 2", () => {
  test("parse", () => {
    const rawData = `7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9`;
    expect(day02Challenge.parse(rawData)).toStrictEqual([
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ]);
  });
  describe("part1", () => {
    test("part1 when all numbers are the same", () => {
      const data = [[1, 1, 1, 1, 1]];
      expect(day02Challenge.part1(data)).toBe(0);
    });

    test("when order is incorrect", () => {
      const data = [[10, 1, 9, 2, 8]];
      expect(day02Challenge.part1(data)).toBe(0);
    });
    test("when order is decreasing", () => {
      const data = [[5, 4, 3, 2, 1]];
      expect(day02Challenge.part1(data)).toBe(1);
    });
    test("when order is increasing", () => {
      const data = [[1, 2, 3, 4, 5]];
      expect(day02Challenge.part1(data)).toBe(1);
    });
    test("when order is increasing on a value bigger than 3", () => {
      const data = [[1, 2, 7, 8, 9]];
      expect(day02Challenge.part1(data)).toBe(0);
    });
    test("when order is decreasing on a value bigger than 3", () => {
      const data = [[9, 7, 6, 2, 1]];
      expect(day02Challenge.part1(data)).toBe(0);
    });
    test("when values increase and decrease on the same list", () => {
      const data = [[1, 3, 2, 4, 5]];
      expect(day02Challenge.part1(data)).toBe(0);
    });
    test("when values are not increasing and decreasing", () => {
      const data = [[8, 6, 4, 4, 1]];
      expect(day02Challenge.part1(data)).toBe(0);
    });
    test("when values are increasing in value of 1, 2 or 3", () => {
      const data = [[1, 3, 6, 7, 9]];
      expect(day02Challenge.part1(data)).toBe(1);
    });
    test("when the last item is the duplicated", () => {
      const data = [[1, 3, 6, 7, 7]];
      expect(day02Challenge.part1(data)).toBe(0);
    });
  });
});
