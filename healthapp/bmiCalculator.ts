interface Result {
  weight: number;
  height: number;
}

export const parseIntArgs = (args: string[]): Result => {
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Provided values were not numbers!");
  }
  return {
    weight: Number(args[2]),
    height: Number(args[3]),
  };
};

const calculateBmi = (): string => {
  const args: Result = parseIntArgs(process.argv)
  const weight = args.weight
  const height = args.height
  if (height <= 0 || weight <= 0) {
    throw new Error("Height or weigth cannot be zero or less");
  }
  const hInM = height / 100;
  const bmi = weight / (hInM * hInM);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 24.9) {
    return "Overweight";
  } else {
    return "Normal range";
  }
};

console.log(calculateBmi());
