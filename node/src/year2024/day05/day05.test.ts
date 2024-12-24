import { describe, expect, test } from "bun:test";

import { day05Challenge } from "./index";

describe("2024 - Day 5", () => {
  test("parse", () => {
    const rawData = `47|53\n\n75,47,61,53,29`;
    expect(day05Challenge.parse(rawData)).toStrictEqual({
      rules: {
        rules: new Set(["47|53"]),
        numbersToEvaluate: new Map([[47, true]]),
      },
      prints: [[75, 47, 61, 53, 29]],
    });
  });
  const rules = {
    rules: new Set([
      "47|53",
      "97|13",
      "97|61",
      "97|47",
      "75|29",
      "61|13",
      "75|53",
      "29|13",
      "97|29",
      "53|29",
      "61|53",
      "97|53",
      "61|29",
      "47|13",
      "75|47",
      "97|75",
      "47|61",
      "75|61",
      "47|29",
      "75|13",
      "53|13",
    ]),
    //  Map { 47 => true, 53 => true, 97 => true, 13 => true, 61 => true, 75 => true, 29 => true }
    numbersToEvaluate: new Map([
      [47, true],
      [53, true],
      [97, true],
      [13, true],
      [61, true],
      [75, true],
      [29, true],
    ]),
  };

  const update1 = [75, 47, 61, 53, 29];
  const update2 = [97, 61, 53, 29, 13];
  const update3 = [75, 29, 13];
  const update4 = [75, 97, 47, 61, 53];
  const update5 = [61, 13, 29];
  const update6 = [97, 13, 75, 29, 47];

  describe("part1", () => {
    test("evaluate valid print", () => {
      expect(
        day05Challenge.part1({
          rules,
          prints: [update1],
        })
      ).toEqual(61);
    });
    test("evaluate valid print", () => {
      expect(
        day05Challenge.part1({
          rules,
          prints: [update2],
        })
      ).toEqual(53);
    });
    test("evaluate valid print", () => {
      expect(
        day05Challenge.part1({
          rules,
          prints: [update3],
        })
      ).toEqual(29);
    });
    test("evaluate valid prints with all valid prints", () => {
      expect(
        day05Challenge.part1({
          rules,
          prints: [update1, update2, update3],
        })
      ).toEqual(143);
    });

    test("evaluate invalid prints", () => {
      expect(
        day05Challenge.part1({
          rules,
          prints: [update4, update5, update6],
        })
      ).toEqual(0);
    });
  });

  describe("part2", () => {

    test("evaluate invalid prints, fix arrays and get total", () => {
        expect(
          day05Challenge.part2({
            rules,
            prints: [update4, update5, update6],
          })
        ).toEqual(123);
      });
  });
});
