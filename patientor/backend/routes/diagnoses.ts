import { Router, type Response } from "express";
import type { Diagnosis } from "../types.ts";
import { getCodes, getDiagnoses } from "../services/diagnoseService.ts";

const router = Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(getDiagnoses());
});

router.get("/codes", (_req, res: Response<string[]>) => {
  res.send(getCodes());
});

export default router;
