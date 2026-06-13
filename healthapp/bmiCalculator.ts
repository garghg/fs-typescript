import { parseIntArgs } from "./utils.ts";

interface Result {
  weight: number;
  height: number;
  bmi: string;
}

export const calculateBmi = (weight: number, height: number): Result => {
  if (height <= 0 || weight <= 0) {
    throw new Error("Height or weigth cannot be zero or less");
  }
  const hInM = height / 100;
  const bmi = weight / (hInM * hInM);
  if (bmi < 18.5) {
    return {
      weight,
      height,
      bmi: "Underweight",
    };
  } else if (bmi > 24.9) {
    return {
      weight,
      height,
      bmi: "Overweight",
    };
  } else {
    return {
      weight,
      height,
      bmi: "Normal Range",
    };
  }
};

if (process.argv[1] === import.meta.filename) {
  const weight = parseIntArgs(process.argv[2]);
  const height = parseIntArgs(process.argv[3]);
  if (weight === null || height === null) {
    throw new Error("Invalid arguments given");
  }
  console.log(calculateBmi(weight, height));
}
