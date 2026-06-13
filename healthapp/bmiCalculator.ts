const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error("Height or weigth cannot be zero or less");
  }
  const hInM = height / 100;
  const bmi = weight / (hInM * hInM);
  if (bmi < 18.5) {
    return "Underweight range"
  } else if (bmi > 24.9) {
    return "Overweight range"
  } else {
    return "Normal range"
  }
};

console.log(calculateBmi(173, 65));
