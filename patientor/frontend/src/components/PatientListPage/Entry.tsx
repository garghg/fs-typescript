import { useState, useEffect } from "react";
import diagnoseService from "../../services/diagnoses";
import type { Entry, Diagnosis } from "../../types";
import { HealthCheckRating } from "../../types";
import { Box } from "@mui/material";

const Entry = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const healthCheckLabel = Object.fromEntries(
    Object.entries(HealthCheckRating).map(([key, value]) => [value, key]),
  );

  useEffect(() => {
    diagnoseService.getDiagnoses().then((res) => setDiagnoses(res));
  }, []);

  if (!diagnoses) {
    return <div>loading...</div>;
  }

  const getDiagnosisDesc = (code: string) => {
    const foundDiagnosis = diagnoses.find((d) => d.code === code);
    return foundDiagnosis?.name;
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  const renderDetails = () => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <p>Health Rating: {healthCheckLabel[entry.healthCheckRating]}</p>
        );
      case "Hospital":
        return (
          <>
            <p>{entry.discharge.date}</p>
            <p>{entry.discharge.criteria}</p>
          </>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <p>Employer: {entry.employerName}</p>
            {entry.sickLeave && (
              <div>
                Sick Leave:
                <p>Start: {entry.sickLeave.startDate}</p>
                <p>End: {entry.sickLeave.endDate}</p>
              </div>
            )}
          </div>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box sx={{ border: 2, borderColor: "black", p: 2, m: 2, borderRadius: 2 }}>
      <p>{entry.date}</p>
      <i>{entry.description}</i>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes?.map((c) => (
            <li key={c}>
              {c}: {getDiagnosisDesc(c)}
            </li>
          ))}
        </ul>
      )}
      <p>Diagnose by: {entry.specialist}</p>
      {renderDetails()}
    </Box>
  );
};

export default Entry;
