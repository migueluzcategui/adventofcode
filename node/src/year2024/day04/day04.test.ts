import { describe, expect, test } from "bun:test";

import { day04Challenge } from "./index";

describe("2024 - Day 4", () => {
  test("parse", () => {
    const rawData = `MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM`;
    expect(day04Challenge.parse(rawData)).toStrictEqual([
      "MMMSXXMASM",
      "MSAMXMSMSA",
      "AMXSXMAAMM",
    ]);
  });

  test("part1", () => {
    const data = [
      "MMMSXXMASM",
      "MSAMXMSMSA",
      "AMXSXMAAMM",
      "MSAMASMSMX",
      "XMASAMXAMM",
      "XXAMMXXAMA",
      "SMSMSASXSS",
      "SAXAMASAAA",
      "MAMMMXMMMM",
      "MXMXAXMASX",
    ];
    expect(day04Challenge.part1(data)).toBe(18);
  });
  describe("part1", () => {
    test("part1 with only one horizontal world", () => {
      const data = [
        "MMMS",
        "XMAS", // <-- This is the only horizontal valid word
        "AMXS",
        "MSAM",
      ];
      expect(day04Challenge.part1(data)).toBe(1);
    });

    test("part1 with only one vertical world", () => {
      const data = [
        "MXMS",
        "MMAS", // <-- This is the only horizontal valid word
        "AAXS",
        "MSAM",
      ];
      expect(day04Challenge.part1(data)).toBe(1);
    });
    test("part1 with only one diagonal word to the right", () => {
      const data = ["XMMS", "MMAS", "AAAS", "MSAS"];
      expect(day04Challenge.part1(data)).toBe(1);
    });
    test("part1 with only one diagonal word to the left", () => {
      const data = ["MMMX", "MMMS", "AAAS", "SSAS"];
      expect(day04Challenge.part1(data)).toBe(1);
    });
  });

  describe("part2", () => {
    test("part2 with only one horizontal world", () => {
        const data = [
          "M.S",
          ".A.", 
          "M.S",
        ];
        expect(day04Challenge.part2(data)).toBe(1);
      });
    test("part2 with only one horizontal world", () => {
        const data = [
            ".M.S......",
            "..A..MSMS.",
            ".M.S.MAA..",
            "..A.ASMSM.",
            ".M.S.M....",
            "..........",
            "S.S.S.S.S.",
            ".A.A.A.A..",
            "M.M.M.M.M.",
            ".........."
        ];
        expect(day04Challenge.part2(data)).toBe(9);
      });
  });
});
