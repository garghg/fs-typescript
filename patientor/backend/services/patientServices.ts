import patientData from "../data/patientsData.ts";
import type { NewPatient, NonSensitivePatient, Patient, EntryWithoutId, Entry } from "../types.ts";
import { v1 as uuid } from "uuid";

export const getPaitents = (): NonSensitivePatient[] => {
  return patientData.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
    entries: p.entries
  }));
};

export const addPatient = (patientToAdd: NewPatient): NonSensitivePatient => {
  const id: string = uuid();
  const newPatient = {
    id,
    entries: [],
    ...patientToAdd,
  };
  patientData.push(newPatient);
  return newPatient;
};

export const getPatientbyId = (id: string): Patient | undefined => {
  return patientData.find(p => p.id === id);
};

export const addEntry = (entryToAdd: EntryWithoutId, patientId: string): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entryToAdd
  };
  const patient = patientData.find(p => p.id === patientId);
  if (patient) {
    patient.entries.push(newEntry);
    return newEntry;
  } else {
    throw new Error("Invalid Patient ID");
  }
};