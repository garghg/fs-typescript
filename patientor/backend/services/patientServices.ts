import patientData from "../data/patientsData.ts";
import type { PatientNoSsn } from "../types.ts";

export const getPaitents = (): PatientNoSsn[] => {
  return patientData.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
  }));
};
