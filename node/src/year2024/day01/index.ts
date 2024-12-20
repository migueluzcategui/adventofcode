import { Challenge } from "../../types";

type InputParsed = {
  firstVector: number[];
  secondVector: number[];
};

const parseStringToVectorOfIntegers = (data: string): InputParsed => {
  const lines = data.split("\n");
  const firstVector: number[] = [];
  const secondVector: number[] = [];

  lines.forEach((line) => {
    const [valueA, valueB] = line.trim().split(/\s+/);
    firstVector.push(parseInt(valueA, 10));
    secondVector.push(parseInt(valueB, 10));
  });

  return { firstVector, secondVector };
};

export const day01Challenge: Challenge<InputParsed> = {
  parse: parseStringToVectorOfIntegers,
  part1: (data: InputParsed) => {
    let distance = 0;
    // Sort the vectors
    const firstVectorSorted = data.firstVector.sort((a, b) => a - b);
    const secondVectorSorted = data.secondVector.sort((a, b) => a - b);

    // pair the vectors, and get the total distance between the pairs
    for (let i = 0; i < firstVectorSorted.length; i++) {
      distance += Math.abs(firstVectorSorted[i] - secondVectorSorted[i]);
    }

    // return the total distance
    return distance;
  },
  /**
   * First approach with 2 lists and looping both of them, with complexity O(n^2)
   */
  // part2: (data: InputParsed) => {
  //   let score = 0;
  //   // Sort the vectors
  //   const firstVectorSorted = data.firstVector.sort((a, b) => a - b);
  //   const secondVectorSorted = data.secondVector.sort((a, b) => a - b);

  //   const valuesEvaluated = new Map<number, number>();

  //   let lastIndexFoundOnSecondVector = 0;

  //   for (
  //     let firstIndex = 0;
  //     firstIndex < firstVectorSorted.length;
  //     firstIndex++
  //   ) {
  //     const value = firstVectorSorted[firstIndex];
  //     if (valuesEvaluated.has(value)) {
  //       score += valuesEvaluated.get(value) ?? 0;
  //       continue;
  //     }
  //     let count = 0;

  //     let hasFoundValueBefore = false;

  //     for (
  //       let secondIndex = lastIndexFoundOnSecondVector;
  //       secondIndex < secondVectorSorted.length;
  //       secondIndex++
  //     ) {
  //       const value2 = secondVectorSorted[secondIndex];
  //       const hasFoundValue = value === value2;
  //       // If we have found the value before, and we have not found the value in the current evaluation, we can break the loop because
  //       // we would not find the value again because it's sorted
  //       if (hasFoundValueBefore && !hasFoundValue) {
  //         continue;
  //       }

  //       if (hasFoundValue) {
  //         hasFoundValueBefore = true;
  //         lastIndexFoundOnSecondVector = secondIndex;
  //         count++;
  //       }
  //     }
  //     valuesEvaluated.set(value, count);
  //     score += value * count;
  //   }

  //   return score;
  // },
  /**
   * Second approach,
   *
   * here I am creating a map with the values of the second vector and the number of times they appear.
   * Then I loop through the first vector, and get the value from the map, if it exists, and add the value * count to the score.
   *
   * This approach has a complexity of O(n)
   */
  part2: (data: InputParsed) => {
    let score = 0;
    // Sort the vectors
    // const firstVectorSorted = data.firstVector.sort((a, b) => a - b);
    // const secondVectorSorted = data.secondVector.sort((a, b) => a - b);
    const valuesSizeOnSecondList = new Map<number, number>();

    for (let i = 0; i < data.secondVector.length; i++) {
      const value = data.secondVector[i];
      const count = valuesSizeOnSecondList.get(value) ?? 0;
      valuesSizeOnSecondList.set(value, count + 1);
    }

    for (let i = 0; i < data.firstVector.length; i++) {
      const value = data.firstVector[i];
      const count = valuesSizeOnSecondList.get(value) ?? 0;
      if (count > 0) {
        score += value * count;
      }
    }

    return score;
  },
};
