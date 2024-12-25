import { InputParsed, day07Challenge } from ".";
import { describe, expect, test } from "bun:test";

describe("2024 - Day 7", () => {
  const rawData = `190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20`;
  const inputData: InputParsed = [
    {
      result: 190,
      values: [10, 19],
    },
    {
      result: 3267,
      values: [81, 40, 27],
    },
    {
      result: 83,
      values: [17, 5],
    },
    {
      result: 156,
      values: [15, 6],
    },
    {
      result: 7290,
      values: [6, 8, 6, 15161011],
    },
    {
      result: 192,
      values: [17, 8, 14],
    },
    {
      result: 21037,
      values: [9, 7, 18, 13],
    },
    {
      result: 292,
      values: [11, 6, 16, 20],
    },
  ];
  describe("parse", () => {
    test("parse", () => {
      expect(day07Challenge.parse(rawData)).toStrictEqual(inputData);
    });
  });

  describe("part 1", () => {
    test.each([
      [inputData[0].result, inputData[0].values, inputData[0].result],
      [inputData[1].result, inputData[1].values, inputData[1].result],
      [inputData[2].result, inputData[2].values, 0],
      [inputData[3].result, inputData[3].values, 0],
      [inputData[4].result, inputData[4].values, 0],
      [inputData[5].result, inputData[5].values, 0],
      [inputData[6].result, inputData[6].values, 0],
      [inputData[7].result, inputData[7].values, inputData[7].result],
    ])(
      "check valid test value for %p with options: %p it should be %p",
      (result, values, expected) => {
        expect(
          day07Challenge.part1([
            {
              result,
              values,
            },
          ])
        ).toEqual(expected);
      }
    );

    test("check all the input data", () => {
      expect(day07Challenge.part1(inputData)).toEqual(3749);
    });

    test("check all the input data", () => {
      expect(
        day07Challenge.part1([
          {
            result: 146,
            values: [86, 1, 60],
          },
        ])
      ).toEqual(146);
    });
  });

  describe("part 2", () => {
    test("check input with secret operator", () => {
      expect(day07Challenge.part2([inputData[3]])).toEqual(inputData[3].result);
    });

    test("check all the input data", () => {
        expect(day07Challenge.part2(inputData)).toEqual(4097);
      });
  });
});
