import { Router, type Response } from "express";
import type { Diagnosis } from "../types.ts";
import { getDiagnoses } from "../services/diagnoseService.ts";

const router = Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(getDiagnoses());
});

export default router;
