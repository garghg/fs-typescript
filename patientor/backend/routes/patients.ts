import { Router, type Response } from "express";
import type { PatientNoSsn } from "../types.ts";
import { getPaitents, addPatient } from "../services/patientServices.ts";
import { parseNewPatient } from "../utils.ts";
const router = Router();

router.get("/", (_req, res: Response<PatientNoSsn[]>) => {
  res.send(getPaitents());
});

router.post("/", (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
