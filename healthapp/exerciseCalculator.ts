import { parseIntArgs } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// const parseIntArgs = (args: string[]): number[] => {
//   const intArr: number[] = [];
//   for (const arg of args) {
//     if (isNaN(Number(arg))) {
//       throw new Error("Provided values were not numbers!");
//     } else {
//       intArr.push(Number(arg));
//     }
//   }
//   return intArr;
// };

export const calculateexercises = (
  exercises: number[],
  target: number,
): Result => {
  const periodLength = exercises.length;
  if (periodLength < 1) {
    throw new Error("Please enter some data");
  }
  for (const e of exercises) {
    if (e < 0) {
      throw new Error("Cannot have negative hours");
    }
  }
  if (target <= 0) {
    throw new Error("Invalid target");
  }
  const trainingDays = exercises.reduce((acc, e) => (e > 0 ? acc + 1 : acc), 0);
  const average = exercises.reduce((acc, e) => acc + e, 0) / periodLength;
  let rating;
  let success;
  let ratingDescription;
  if (average / target > 1) {
    rating = 3;
    success = true;
    ratingDescription = "perfect, keep it up.";
  } else if (average / target > 0.8) {
    rating = 2;
    success = false;
    ratingDescription = "almost there";
  } else {
    rating = 1;
    success = false;
    ratingDescription = "must be more consistent";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  const args = process.argv.slice(2);
  const target = parseIntArgs(args[0]);
  if (target === null) {
    throw new Error("invalid target argument given");
  }
  const exercises = args.slice(1).map((e) => {
    const num = parseIntArgs(e);
    if (num === null) {
      throw new Error("invalid argument given");
    }
    return num;
  });
  console.log(calculateexercises(exercises, target));
}
