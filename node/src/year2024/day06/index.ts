import { Challenge } from "../../types";

export enum Direction {
  UP = "U",
  DOWN = "D",
  LEFT = "L",
  RIGHT = "R",
}

export type InputParsedChallenge06 = {
  map: string[][];
  vigilant: {
    x: number;
    y: number;
    direction: Direction;
  };
};

const movementGuide: {
  [key in Direction]: {
    x: number;
    y: number;
    next: Direction;
  };
} = {
  [Direction.UP]: {
    x: 0, // No movement in x
    y: -1, // Move up
    next: Direction.RIGHT, // 90 degrees means to the right
  },
  [Direction.DOWN]: {
    x: 0, // No movement in x
    y: 1, // Move down
    next: Direction.LEFT, // 90 degrees means to the left
  },
  [Direction.LEFT]: {
    x: -1, // Move left
    y: 0, // No movement in y
    next: Direction.UP, // 90 degrees means up
  },
  [Direction.RIGHT]: {
    x: 1, // Move right
    y: 0, // No movement in y
    next: Direction.DOWN, // 90 degrees means down
  },
};

export const evaluateMovements = (
  { map, vigilant }: InputParsedChallenge06,
  obstaclePosition?: { x: number; y: number }
): Set<string> => {
  const uniqueVisitedMovements = new Set<string>(); // x,y
  const directionChanges = new Set<string>(); // x,y,direction

  // Mark the obstacle position
  if (obstaclePosition) {
    map[obstaclePosition.y][obstaclePosition.x] = "#";
  } else {
    uniqueVisitedMovements.add(`${vigilant.x},${vigilant.y}`);
  }

  // Mark the current position as visited
  map[vigilant.y][vigilant.x] = ".";

  // Check when the position is undefined, because it means that the vigilant is out of the map
  while (map[vigilant.y]?.[vigilant.x]) {
    const nextPosition = { ...vigilant };

    // Move the vigilant until it finds something different than a dot
    while (map[nextPosition.y]?.[nextPosition.x] === ".") {
      if (!obstaclePosition) {
        uniqueVisitedMovements.add(`${nextPosition.x},${nextPosition.y}`);
      }
      const movement = movementGuide[nextPosition.direction];
      nextPosition.x += movement.x;
      nextPosition.y += movement.y;
    }

    if (map[nextPosition.y]?.[nextPosition.x] === "#") {
      const movement = movementGuide[nextPosition.direction];
      // Go back to the last position
      nextPosition.x -= movement.x;
      nextPosition.y -= movement.y;
      nextPosition.direction = movement.next;

      if (
        directionChanges.has(
          `${nextPosition.x},${nextPosition.y},${nextPosition.direction}`
        )
      ) {
        return directionChanges;
      }
      directionChanges.add(
        `${nextPosition.x},${nextPosition.y},${nextPosition.direction}`
      );
    }

    vigilant = nextPosition;
  }

  return obstaclePosition ? undefined : uniqueVisitedMovements;
};

export const day06Challenge: Challenge<InputParsedChallenge06> = {
  parse: (input: string): InputParsedChallenge06 => {
    const map = input.split("\n").map((line) => line.split(""));

    const vigilantYPosition = map.findIndex((line) => line.includes("^"));
    const vigilantXPosition = map[vigilantYPosition].indexOf("^");
    return {
      map,
      vigilant: {
        x: vigilantXPosition,
        y: vigilantYPosition,
        direction: Direction.UP,
      },
    };
  },
  part1: (input: InputParsedChallenge06): number => {
    return evaluateMovements(JSON.parse(JSON.stringify(input))).size;
  },
  part2: (input: InputParsedChallenge06) => {
    let count = 0;
    const movements = evaluateMovements(JSON.parse(JSON.stringify(input)));
    movements.forEach((pos: string) => {
      const [x, y] = pos.split(",").map(Number);
      if (evaluateMovements(JSON.parse(JSON.stringify(input)), { x, y })) {
        count++;
      }
    });
    return count;
  },
};
