import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { parseIntArgs } from "./utils.ts";
import { calculateexercises } from "./exerciseCalculator.ts";
const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = parseIntArgs(req.body.target);
  if (target === null) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const exercises = (req.body.daily_exercises as unknown[]).map(
      (e: unknown) => {
        const num = parseIntArgs(e);
        if (num === null) {
          throw new Error("malformatted parameters");
        }
        return num;
      },
    );
    res.json(calculateexercises(exercises, target));
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
