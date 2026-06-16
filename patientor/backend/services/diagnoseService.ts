import data from "../data/diagnosesData.ts";
import type { Diagnosis } from "../types.ts";

export const getDiagnoses = (): Diagnosis[] => {
  return data;
};

export const getCodes = (): string[] => {
  const codes = data.map((d) => d.code);
  return codes;
};
