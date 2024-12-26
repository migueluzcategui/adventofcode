import { Challenge } from "../../types";

type Antennas = Map<string, { x: number; y: number }[]>;

type InputParsed = {
  mapField: string[][];
  antennas: Antennas;
};

const checkNodes = (
  input: InputParsed,
  limitDistantForResonance?: number
): number => {
  const { mapField, antennas } = input;
  const uniqueLocations = new Set<string>();

  // Evaluate each antenna
  for (const antennasInfo of antennas) {
    const positions = antennasInfo[1];
    // Evaluate each position
    for (const currentAntennaPosition of positions) {
      for (const otherAntennaPositions of positions) {
        if (currentAntennaPosition === otherAntennaPositions) {
          continue;
        }
        const diffOnX = currentAntennaPosition.x - otherAntennaPositions.x;
        const diffOnY = currentAntennaPosition.y - otherAntennaPositions.y;
        // If limitDistantForResonance is defined, we only need to check the point for that resonance, otherwise we need to check all points
        if (limitDistantForResonance) {
          const pointX =
            currentAntennaPosition.x - diffOnX * limitDistantForResonance;
          const pointY =
            currentAntennaPosition.y - diffOnY * limitDistantForResonance;
          if (mapField[pointY] && mapField[pointY]?.[pointX]) {
            uniqueLocations.add(`${pointY},${pointX}`);
            mapField[pointY][pointX] = "#";
          }
        } else {
          let currentX = currentAntennaPosition.x;
          let currentY = currentAntennaPosition.y;
          let pointX = currentX - diffOnX;
          let pointY = currentY - diffOnY;
          while (mapField[pointY]?.[pointX]) {
            uniqueLocations.add(`${pointY},${pointX}`);
            mapField[pointY][pointX] = "#";
            currentX -= diffOnX;
            currentY -= diffOnY;
            pointX = currentX - diffOnX;
            pointY = currentY - diffOnY;
          }
        }
      }
    }
  }
  return uniqueLocations.size;
};

export const day08Challenge: Challenge<InputParsed> = {
  parse: (data: string): InputParsed => {
    const mapField = [];
    const antennas: Antennas = new Map();
    data.split("\n").map((line, rowIndex) => {
      const columns = line.split("");
      mapField.push(columns);
      for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
        const cell = columns[columnIndex];
        if (cell !== ".") {
          const antennaPositions = antennas.get(cell) ?? [];
          antennaPositions.push({ x: columnIndex, y: rowIndex });
          antennas.set(cell, antennaPositions);
        }
      }
    });
    return {
      mapField,
      antennas,
    };
  },
  part1: (input: InputParsed) => {
    return checkNodes(input, 2);
  },
  part2: (input: InputParsed) => {
    return checkNodes(input);
  },
};
