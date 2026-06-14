import { Router, type Response, type Request } from "express";
import type { NewPatient, PatientNoSsn, Patient } from "../types.ts";
import { getPaitents, addPatient } from "../services/patientServices.ts";
import { newPatientParser, errorMiddleware } from "../src/middleware.ts";

const router = Router();

router.get("/", (_req, res: Response<PatientNoSsn[]>) => {
  res.send(getPaitents());
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
