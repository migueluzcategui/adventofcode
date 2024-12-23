import { Challenge } from "../../types";

type InputParsed = string[];

export const day04Challenge: Challenge<InputParsed> = {
  parse: (input: string): InputParsed => {
    return input.split("\n");
  },
  /**
   * Solution for part 1,
   *
   * where we check the horizontal, vertical, and diagonal words that can be generated from the input,
   * we don't generate new arrays and we just check the characters in the input array.
   * we need to loop twice, one for the rows and another for the columns.
   *
   * So the complexity is O(n^2) where n is the length of the input array.
   */
  part1: (input: InputParsed) => {
    let validWords = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        // const words = [];
        // Check if the current character is an "X" or an "S", otherwise we know that is not possible to generate a valid word from this point
        const rootCharacter = input[i][j];
        if (rootCharacter === "X" || rootCharacter === "S") {
          // If there is no enough space to generate a valid word, we skip the iteration
          if (i <= input[i].length - 3) {
            const horizontalWord = `${rootCharacter}${input[i + 1]?.[j]}${input[i + 2]?.[j]}${input[i + 3]?.[j]}`;
            if (horizontalWord === "XMAS" || horizontalWord === "SAMX") {
              validWords++;
            }
          }

          if (j <= input[i].length - 3) {
            const verticalWord = `${rootCharacter}${input[i]?.[j + 1]}${input[i]?.[j + 2]}${input[i]?.[j + 3]}`;
            if (verticalWord === "XMAS" || verticalWord === "SAMX") {
              validWords++;
            }
          }

          if (i <= input[i].length - 3 && j <= input[i].length - 3) {
            const diagonalRightWord = `${rootCharacter}${input?.[i + 1]?.[j + 1]}${input[i + 2]?.[j + 2]}${input[i + 3]?.[j + 3]}`;
            if (diagonalRightWord === "XMAS" || diagonalRightWord === "SAMX") {
              validWords++;
            }
          }

          if (i >= 3 && j <= input[i].length - 3) {
            const diagonalLeftWord = `${rootCharacter}${input?.[i - 1]?.[j + 1]}${input[i - 2]?.[j + 2]}${input[i - 3]?.[j + 3]}`;
            if (diagonalLeftWord === "XMAS" || diagonalLeftWord === "SAMX") {
              validWords++;
            }
          }
        }
      }
    }

    return validWords;
  },
  part2: (input: InputParsed) => {
    let validWords = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        const diagonalRightWord = `${input[i][j]}${input?.[i + 1]?.[j + 1]}${input[i + 2]?.[j + 2]}`;
        const diagonalLeftWord = `${input?.[i][j + 2]}${input?.[i + 1]?.[j + 1]}${input?.[i + 2]?.[j]}`;

        if (
          (diagonalRightWord === "MAS" || diagonalRightWord === "SAM") &&
          (diagonalLeftWord === "MAS" || diagonalLeftWord === "SAM")
        ) {
          validWords++;
        }
      }
    }

    return validWords;
  },
};
