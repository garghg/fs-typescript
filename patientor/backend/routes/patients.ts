import { Router, type Response, type Request } from "express";
import type { NewPatient, NonSensitivePatient, Patient } from "../types.ts";
import { getPaitents, addPatient, getPatientbyId } from "../services/patientServices.ts";
import { newPatientParser, errorMiddleware } from "../src/middleware.ts";

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
  (req: Request<unknown, unknown, NewPatient>, res: Response<NonSensitivePatient>) => {
    const addedPatient = addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
