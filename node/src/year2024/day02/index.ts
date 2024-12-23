import { Challenge } from "../../types";

type InputParsed = number[][];

const isReportSafe = (row: number[]) => {
  let isSafe = true;
  let isDecreasing: undefined | boolean = undefined;
  for (let j = 0; j < row.length; j++) {
    const current = row[j];
    const next = row[j + 1];

    // Check if the current value is the same as the next value
    if (current === next) {
      isSafe = false;
      break;
    }

    // When undefined, means that we have not checked 2 different values, we don't know if it's increasing or decreasing yet, so we need to check
    // after evaluation we can continue.
    if (isDecreasing === undefined) {
      isDecreasing = current > next;
    }

    // Check if the current value is decreasing or increasing
    if (isDecreasing) {
      if (current < next) {
        isSafe = false;
        break;
      }
    } else {
      if (current > next) {
        isSafe = false;
        break;
      }
    }

    const difference = Math.abs(current - next);
    if (difference > 3) {
      isSafe = false;
      break;
    }
  }
  return isSafe;
};

export const day02Challenge: Challenge<InputParsed> = {
  parse: (data: string): InputParsed => {
    const lines = data.split("\n");
    return lines.map((line) => {
      return line.split(" ").map((value) => parseInt(value, 10));
    });
  },
  /**
   * Code attempt with brute force, this could be improved, but it's a start.
   *
   * This function is more performant that the simple version, but adding this level of complexity could be
   * not the best outside of this context.
   *
   * Complexity: O(n * m) where n is the number of rows and m is the number of columns
   * We do not create extra values, or extra arrays, we just iterate over the data. so the space complexity is O(1)
   */
  part1: (data: InputParsed) => {
    // Check safe report
    let safeReportCount = 0;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      const isSafe = isReportSafe(row);

      if (isSafe) {
        safeReportCount++;
      }
    }
    return safeReportCount;
  },
  /**
   * This approach is simpler, but it's not as performant as the previous one.
   *
   * We iterate over the data at least 2 times, and maximum 3 times, so the complexity is O(n * m).
   * in the previous approach, we iterate over the data only once, so the complexity is O(n).
   * Here we are creating extra arrays, so the space complexity is O(n).
   */
  //   part1: (data: InputParsed) => {
  //     const safeReports = data.filter((row) => {
  //       // List of differences between the elements in the row
  //       const result = row
  //         .map((num, i) => {
  //           // Ignoring the first element, we get the difference between the current element and the previous element
  //           return i > 0 && num - row[i - 1];
  //         })
  //         .slice(1);
  //       return (
  //         // Check if the differences are between 1 and 3 in increasing or decreasing order, and between the values
  //         /**
  //          * Check if the values are between 1 and 3,
  //          * if the difference is always positive, it means that the numbers are increasing
  //          * [1,2,4,7] => [1,2,3]
  //          * [1,3,2,4,5] => [2,-1,2,1] <= Not valid, as the difference is not always positive is not increasing
  //          */
  //         result.every((num) => num >= 1 && num <= 3) ||
  //         /**
  //          * Check if the values are between -1 and -3,
  //          * if the difference is always negative, it means that the numbers are decreasing
  //          * [7,4,2,1] => [-3,-2,-1]
  //          * [9,7,9,8] => [-2,2,-1] <= Not valid, as the difference is not always negative is not decreasing
  //          */
  //         result.every((num) => num <= -1 && num >= -3)
  //       );
  //     });
  //     return safeReports.length;
  //   },
  part2: (data: InputParsed) => {
    // Check safe report
    let safeReportCount = 0;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      let isSafe = false;

      for (let indexInRow = 0; indexInRow < row.length; indexInRow++) {
        const spliceRow = row.toSpliced(indexInRow, 1);
        const reportResult = isReportSafe(spliceRow);
        if (reportResult) {
          isSafe = true;
          break;
        }
      }

      if (isSafe) {
        safeReportCount++;
      }
    }
    return safeReportCount;
  },
};
