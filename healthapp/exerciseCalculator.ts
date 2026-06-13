interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseIntArgs = (args: string[]): number[] => {
  const intArr: number[] = [];
  for (const arg of args) {
    if (isNaN(Number(arg))) {
      throw new Error("Provided values were not numbers!");
    } else {
      intArr.push(Number(arg));
    }
  }
  return intArr;
};

const calculateexercises = (): Result => {
  const args = parseIntArgs(process.argv.slice(2));
  const target = args[0];
  const exercises = args.slice(1);
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

console.log(calculateexercises());
