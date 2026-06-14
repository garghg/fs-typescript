import type { NewPatient } from "./types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Invalid name");
  }
  return name;
};

const parseDOB = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) {
    throw new Error("Invalid cate of birth");
  }
  return dob;
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
      gender: parseString(object.gender),
      occupation: parseString(object.occupation),
    };

    return newPatient;
  }

  throw new Error("Incorrect data or missing fields");
};
