import { InputParsed, parseStringToVectorOfIntegers } from "../utils/parser";

import { Challenge } from "../types";

export const day01Challenge: Challenge = {
  parse: parseStringToVectorOfIntegers,
  part1: (data: InputParsed) => {
    let distance = 0;
    const firstVectorSorted = data.firstVector.sort((a, b) => a - b);
    const secondVectorSorted = data.secondVector.sort((a, b) => a - b);

    for (let i = 0; i < firstVectorSorted.length; i++) {
      distance += Math.abs(firstVectorSorted[i] - secondVectorSorted[i]);
    }
    return distance;
  },
  part2: () => {
    return 0;
  },
};
