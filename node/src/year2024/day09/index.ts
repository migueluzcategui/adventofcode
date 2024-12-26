import { Challenge } from "../../types";

type InputParsed = (number | string)[];

export const day09Challenge: Challenge<InputParsed> = {
  parse: (data: string): InputParsed => {
    const diskAllocation: InputParsed = [];

    let shouldFillWithEmpty = false;
    let valueToFill = -1;
    for (let i = 0; i < data.length; i++) {
      const length = parseInt(data[i]);
      if (!shouldFillWithEmpty) {
        valueToFill += 1;
      }
      const list = Array(length).fill(shouldFillWithEmpty ? "." : valueToFill);
      shouldFillWithEmpty = !shouldFillWithEmpty;
      diskAllocation.push(...list);
    }
    return diskAllocation;
  },
  part1: (data: InputParsed) => {
    return 0;
  },
  part2: (data: InputParsed) => {
    return 0;
  },
};
