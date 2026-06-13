import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { parseIntArgs } from "./utils.ts";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = parseIntArgs(req.query.height);
  const weight = parseIntArgs(req.query.weight);
  if (weight === null || height === null) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  res.json({ bmi: calculateBmi(weight, height) });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
