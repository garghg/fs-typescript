import patientData from "../data/patientsData.ts";
import type { NewPatient, Patient, PatientNoSsn } from "../types.ts";
import { v1 as uuid } from "uuid";

export const getPaitents = (): PatientNoSsn[] => {
  return patientData.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
  }));
};

export const addPatient = (patientToAdd: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient = {
    id,
    ...patientToAdd,
  };
  patientData.push(newPatient);
  return newPatient;
};
