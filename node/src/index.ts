import { day01Challenge, day02Challenge, day03Challenge } from "./year2024";

import { ChallengeConfig } from "./types";
import chalk from 'chalk';
import path from "path";
import { performance } from "perf_hooks";
import { readFileSync } from "fs";

// Improve this code to handle better argument validation
const extractYearAndDay = (): { year?: string; day?: string } => {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    const [arg] = args;
    if (arg.includes("day")) {
      const [year, day] = arg.split("::");
      return { year, day };
    }

    if (arg.includes("year")) {
      return { year: arg, day: undefined };
    }

    throw new Error("Invalid argument");
  }
  return { year: undefined, day: undefined };
};

const challenges: ChallengeConfig[] = [
  {
    day: "day01",
    year: "year2024",
    challenge: day01Challenge,
  },
  {
    day: "day02",
    year: "year2024",
    challenge: day02Challenge,
  },
  {
    day: "day03",
    year: "year2024",
    challenge: day03Challenge,
  },
];

const start = (): void => {
  const { year, day } = extractYearAndDay();

  // Filter the challenges based on the year and day provided
  const availableChallenges = challenges.filter((challenge) => {
    if (day !== undefined) {
      return challenge.year === year && challenge.day === day;
    }
    if (year !== undefined) {
      return challenge.year === year;
    }
    return true;
  });

  // Read the input files for the challenges
  const inputsMap: Map<string, string> = new Map();
  availableChallenges.map((challenge) => {
    const pathName = `input/${challenge.year}/${challenge.day}.txt`;
    const filePath = path.resolve(__dirname, "../../", pathName);
    const fileContents = readFileSync(filePath, "utf-8");
    inputsMap.set(`${challenge.year}/${challenge.day}`, fileContents);
  });

  // Execute the challenges
  const start = performance.now();
  availableChallenges.forEach((challenge) => {
    const fileContents = inputsMap.get(`${challenge.year}/${challenge.day}`);
    if (!fileContents) {
      throw new Error("Input file not found");
    }
    const parsedData = challenge.challenge.parse(fileContents);
   
    const part1Start = performance.now();
    const part1Result = challenge.challenge.part1(parsedData);
    const part1End = performance.now();
   
    const part2Start = performance.now();
    const part2Result = challenge.challenge.part2(parsedData);
    const part2End = performance.now();
    
    console.log(
      chalk.bold(`\n${chalk.greenBright(`Year: ${challenge.year}, Day: ${challenge.day}`)}`)
    );
    console.log(
      chalk.blueBright(
        `   Part 1: ${chalk.yellow(part1Result)}, ms: ${chalk.magenta((part1End - part1Start).toFixed(2))}`
      )
    );
    console.log(
      chalk.blueBright(
        `   Part 2: ${chalk.yellow(part2Result)}, ms: ${chalk.magenta((part2End - part2Start).toFixed(2))}`
      )
    );
  });

  const end = performance.now();

  console.log(
    chalk.bold(
      chalk.red(
        `\nExecution time: ${chalk.white((end - start).toFixed(2))} milliseconds\n`
      )
    )
  );
};

start();
