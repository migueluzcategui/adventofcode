import { Challenge } from "../../types";

type Input = { result: number; values: number[] };
type InputParsed = Input[];

const isAValidTestValue = (
  input: Input,
  allowSecretOperator = false
): boolean => {
  const { result, values } = input;

  /**
   * Create list to store all possible permutations
   *
   * This list will contain all possible values that can be obtained by summing or multiplying the values
   */
  let possiblePermutations = [];
  possiblePermutations.push(values[0]);

  // Iterate over all values
  for (let j = 1; j < values.length; j++) {
    const currentNumber = values[j];
    const newPermutations = [];
    // Iterate over all possible permutations
    for (let k = 0; k < possiblePermutations.length; k++) {
      const totalValue = possiblePermutations[k];

      const valueAfterSum = totalValue + currentNumber;
      const valueAfterMultiplication = totalValue * currentNumber;

      // Allow secret operator A||B
      if (allowSecretOperator) {
        const secretOperator = Number(`${totalValue}${currentNumber}`);
        if (secretOperator <= result) {
          newPermutations.push(secretOperator);
        }
      }
      
      if (valueAfterSum <= result) {
        newPermutations.push(valueAfterSum);
      }
      if (valueAfterMultiplication <= result) {
        newPermutations.push(valueAfterMultiplication);
      }
    }

    if (newPermutations.length === 0) {
      return false;
    }
    possiblePermutations = newPermutations;
  }
  return possiblePermutations.includes(result);
};

export const day07Challenge: Challenge<InputParsed> = {
  parse: (data: string): InputParsed => {
    return data.split("\n").map((line) => {
      const [result, rawValues] = line.split(": ");
      return {
        result: Number(result),
        values: rawValues.split(" ").map(Number),
      };
    });
  },
  part1: (data: InputParsed): number => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      if (isAValidTestValue(JSON.parse(JSON.stringify(data[i])))) {
        total += data[i].result;
      }
    }
    return total;
  },
  part2: (data: InputParsed): number => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      if (isAValidTestValue(JSON.parse(JSON.stringify(data[i])), true)) {
        total += data[i].result;
      }
    }
    return total;
  },
};
