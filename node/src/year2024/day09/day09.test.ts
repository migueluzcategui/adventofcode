import { describe, expect, test } from "bun:test";

import { day09Challenge } from ".";

describe("2024 day 9", () => {
  const rawData = "2333133121414131402";
  const inputParsed = [
    0,
    0,
    ".",
    ".",
    ".",
    1,
    1,
    1,
    ".",
    ".",
    ".",
    2,
    ".",
    ".",
    ".",
    3,
    3,
    3,
    ".",
    4,
    4,
    ".",
    5,
    5,
    5,
    5,
    ".",
    6,
    6,
    6,
    6,
    ".",
    7,
    7,
    7,
    ".",
    8,
    8,
    8,
    8,
    9,
    9,
  ];
  describe("parse", () => {
    test("should parse the input with simple data", () => {
      expect(day09Challenge.parse("12345")).toStrictEqual([
        0,
        ".",
        ".",
        1,
        1,
        1,
        ".",
        ".",
        ".",
        ".",
        2,
        2,
        2,
        2,
        2,
      ]);
    });
    test("should parse the input", () => {
      //00...111...2...333.44.5555.6666.777.888899
      expect(day09Challenge.parse(rawData)).toStrictEqual(inputParsed);
    });
  });

  describe("part 1", () => {
    test("should return the result", () => {
      expect(day09Challenge.part1(inputParsed)).toStrictEqual(0);
    });
  });
});
