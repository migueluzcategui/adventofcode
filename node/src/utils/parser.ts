export type InputParsed = {
  firstVector: number[];
  secondVector: number[];
};

export const parseStringToVectorOfIntegers = (data: string): InputParsed => {
  const lines = data.split("\n");
  const firstVector: number[] = [];
  const secondVector: number[] = [];

  lines.forEach((line) => {
    const [valueA, valueB] = line.split(" ");
    firstVector.push(parseInt(valueA, 10));
    secondVector.push(parseInt(valueB, 10));
  });

  return { firstVector, secondVector };
};
