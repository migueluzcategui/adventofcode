import { Challenge } from "../../types";

type Rules = {
  rules: Set<string>;
  numbersToEvaluate: Map<number, boolean>;
};

type InputParsed = {
  rules: Rules;
  prints: number[][];
};

const isOrderedCorrectly = (
  print: number[],
  rules: Rules,
  shouldProvideFix = false
): {
  isValid: boolean;
  fixOrder?: () => void;
} => {
  // Evaluate al the items in the print array
  for (let i = 0; i < print.length; i++) {
    // if the item is not in the rules, we can skip it
    if (!rules.numbersToEvaluate.has(print[i])) {
      continue;
    }
    const currentItem = print[i];
    // Check all the items that come before the current item
    for (let j = 0; j < i; j++) {
      const previousItem = print[j];
      // if the previous item exists in one of the rules, it's an invalid print
      if (rules.rules.has(`${currentItem}|${previousItem}`)) {
        return {
          isValid: false,
          fixOrder: shouldProvideFix
            ? () => {
                const temp = print[i];
                print[i] = print[j];
                print[j] = temp;
              }
            : undefined,
        };
      }
    }
  }
  return {
    isValid: true,
  };
};

export const day05Challenge: Challenge<InputParsed> = {
  parse: (input: string): InputParsed => {
    const [rulesText, printsText] = input.split("\n\n");
    const rulesList = rulesText.split("\n");
    const rules = new Set(rulesList);
    const numbersToEvaluate = new Map();
    rulesList.forEach((r) => {
      numbersToEvaluate.set(parseInt(r.split("|")[0]), true);
    });
    const prints = printsText.split("\n").map((r) => {
      return r.split(",").map((p) => parseInt(p));
    });
    return {
      rules: {
        rules,
        numbersToEvaluate,
      },
      prints,
    };
  },
  /**
   * This solution is O(n^2) because we have to check all the items in the print array twice.
   */
  part1: (input: InputParsed) => {
    let total = 0;

    for (const print of input.prints) {
      const evaluation = isOrderedCorrectly(print, input.rules);
      if (evaluation.isValid) {
        total += print[(print.length - 1) / 2];
      }
    }
    return total;
  },
  part2: (input: InputParsed) => {
    let total = 0;

    for (const print of input.prints) {
      let evaluation = isOrderedCorrectly(print, input.rules, true);
      if (!evaluation.isValid) {
        while (!evaluation.isValid) {
          evaluation?.fixOrder?.();
          evaluation = isOrderedCorrectly(print, input.rules, true);
        }
        total += print[(print.length - 1) / 2];
      }
    }
    return total;
  },
};
