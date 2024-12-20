import { ChallengeConfig } from "./types";
import { day01Challenge } from "./year2024/day01";
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
];

const start = (): void => {
  const { year, day } = extractYearAndDay();

  const availableChallenges = challenges.filter((challenge) => {
    if (day !== undefined) {
      return challenge.year === year && challenge.day === day;
    }
    if (year !== undefined) {
      return challenge.year === year;
    }
    return true;
  });

  const start = performance.now();
  
  availableChallenges.forEach((challenge) => {
    const pathName = `input/${challenge.year}/${challenge.day}.txt`;
    const filePath = path.resolve(__dirname, "../../", pathName);
    const fileContents = readFileSync(filePath, "utf-8");
    const parsedData = challenge.challenge.parse(fileContents);
    const part1Result = challenge.challenge.part1(parsedData);
    const part2Result = challenge.challenge.part2(parsedData);
    console.log(
      `Year: ${challenge.year}, Day: ${challenge.day}, Part 1: ${part1Result}, Part 2: ${part2Result}`
    );
  });
  
  const end = performance.now();
  console.log(`Execution time: ${(end - start).toFixed(2)} milliseconds`);
};

start();
