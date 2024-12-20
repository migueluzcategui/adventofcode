import { InputParsed, parseStringToVectorOfIntegers } from "../utils/parser";

import { Challenge } from "../types";

export const day01Challenge: Challenge = {
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
  part2: (data: InputParsed) => {
    let score = 0;
    // Sort the vectors
    const firstVectorSorted = data.firstVector.sort((a, b) => a - b);
    const secondVectorSorted = data.secondVector.sort((a, b) => a - b);

    firstVectorSorted.forEach((value) => {
        let count = 0;
        secondVectorSorted.forEach((value2) => {
            if(value === value2) {
                count++;
            }
        });
        score += value * count;
    });

    return score;
  },
};
