import {
  Direction,
  InputParsedChallenge06,
  day06Challenge,
  evaluateMovements,
} from "./index";
import { describe, expect, test } from "bun:test";

describe("2024 - Day 6", () => {
  const inputParsedData: InputParsedChallenge06 = {
    map: [
      //0    1    2    3    4    5    6    7    8    9
      [".", ".", ".", ".", "#", ".", ".", ".", ".", "."], //0
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"], //1
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."], //2
      [".", ".", "#", ".", ".", ".", ".", ".", ".", "."], //3
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."], //4
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."], //5
      [".", "#", ".", ".", "^", ".", ".", ".", ".", "."], //6
      [".", ".", ".", ".", ".", ".", ".", ".", "#", "."], //7  
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."], //8
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."], //9
    ],
    vigilant: {
      x: 4,
      y: 6,
      direction: Direction.UP,
    },
  };
  describe("parse", () => {
    test("parse", () => {
      const rawData = `....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...`;
      expect(day06Challenge.parse(rawData)).toStrictEqual(inputParsedData);
    });
  });

  describe("part 1", () => {
    test("check how many movements", () => {
      expect(day06Challenge.part1(inputParsedData)).toEqual(41);
    });
  });

  describe("part 2", () => {
    test("check how many obstacles", () => {
      expect(day06Challenge.part2(inputParsedData)).toEqual(6);
    });

    test("check one obstacle", () => {
      expect(evaluateMovements(inputParsedData, { x: 3, y: 6 }).size).toEqual(4);
    });
  });
});
