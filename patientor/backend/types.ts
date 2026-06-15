import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  male: "male",
  female: "female",
  other: "other",
} as const;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type Gender = (typeof Gender)[keyof typeof Gender];
export type NewPatient = z.infer<typeof NewPatientSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;