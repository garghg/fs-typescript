import { Router, type Response } from "express";
import type { PatientNoSsn } from "../types.ts";
import { getPaitents } from "../services/patientServices.ts";
const router = Router();

router.get("/", (_req, res: Response<PatientNoSsn[]>) => {
  res.send(getPaitents());
});

export default router;
