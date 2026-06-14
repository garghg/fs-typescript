import type { NewPatient } from "./types.ts";
import { Gender } from "./types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return (Object.values(Gender) as string[]).includes(gender);
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Invalid name");
  }
  return name;
};

const parseDOB = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) {
    throw new Error("Invalid date of birth");
  }
  return dob;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender");
  }
  return gender;
};

export const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDOB(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };

    return newPatient;
  }

  throw new Error("Incorrect data or missing fields");
};
