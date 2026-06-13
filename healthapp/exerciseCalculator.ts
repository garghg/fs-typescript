interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercise: number[], target: number): Result => {
  const periodLength = exercise.length;
  if (periodLength < 1) {
    throw new Error('Please enter some data')
  }
  for (const e of exercise) {
    if (e < 0) {
      throw new Error('Cannot have negative hours')
    }
  }
  if (target <= 0) {
    throw new Error('Invalid target')
  }
  const trainingDays = exercise.reduce((acc, e) => (e > 0 ? acc + 1 : acc), 0);
  const average = exercise.reduce((acc, e) => acc + e, 0) / periodLength;
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


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))