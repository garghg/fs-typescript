import { Router, type Response, type Request } from "express";
import type {
  NewPatient,
  NonSensitivePatient,
  Patient,
  EntryWithoutId,
  Entry,
} from "../types.ts";
import {
  getPaitents,
  addPatient,
  getPatientbyId,
  addEntry,
} from "../services/patientServices.ts";
import { newPatientParser, newEntryParser ,errorMiddleware } from "../src/middleware.ts";

const router = Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(getPaitents());
});

router.get("/:id", (req, res: Response<Patient>) => {
  const id = req.params.id;
  res.send(getPatientbyId(id));
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<NonSensitivePatient>,
  ) => {
    const addedPatient = addPatient(req.body);
    res.json(addedPatient);
  },
);

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry | { error: string }>) => {
  try {
    const addedEntry = addEntry(req.body, req.params.id);
    res.json(addedEntry);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(404).json({ error: message });
  }
}
);

router.use(errorMiddleware);

export default router;
