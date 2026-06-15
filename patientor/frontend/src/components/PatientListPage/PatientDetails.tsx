import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient, Diagnosis } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientDetails = () => {
  const [curPatient, setCurPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const { id } = useParams();

  useEffect(() => {
    patientService.getDiagnoses().then((res) => setDiagnoses(res));
  }, []);

  useEffect(() => {
    if (id) {
      patientService.getPatientbyId(id).then((res) => setCurPatient(res));
    }
  }, [id]);

  if (!curPatient || !diagnoses) {
    return <div>loading...</div>;
  }

  const getDiagnosisDesc = (code) => {
    const foundDiagnosis = diagnoses.find((d) => d.code === code);
    return foundDiagnosis?.name;
  };

  const genderIcon = () => {
    if (curPatient.gender === "male") {
      return <MaleIcon />;
    } else if (curPatient.gender === "female") {
      return <FemaleIcon />;
    } else {
      return <TransgenderIcon />;
    }
  };

  return (
    <div>
      <h2>
        {curPatient.name} | {genderIcon()}{" "}
      </h2>
      <p>ssn: {curPatient.ssn}</p>
      <p>occupation: {curPatient.occupation}</p>
      <p>date of birth: {curPatient.dateOfBirth}</p>
      {curPatient.entries.length !== 0 && <h3>Entries</h3>}
      <div>
        {curPatient.entries.map((e) => (
          <div key={e.id}>
            <p>{e.date}</p>
            <p>{e.description}</p>
            <ul>
              {e.diagnosisCodes?.map((c) => (
                <li key={c}>{c}: {getDiagnosisDesc(c)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDetails;
