import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import Entry from "./Entry";
import EntryForm from "./EntryForm";

const PatientDetails = () => {
  const [curPatient, setCurPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      patientService.getPatientbyId(id).then((res) => setCurPatient(res));
    }
  }, [id]);

  if (!curPatient) {
    return <div>loading...</div>;
  }

  const genderIcon = () => {
    if (curPatient.gender === "male") {
      return <MaleIcon />;
    } else if (curPatient.gender === "female") {
      return <FemaleIcon />;
    } else {
      return <TransgenderIcon />;
    }
  };

  if (!id) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <h2>
        {curPatient.name} | {genderIcon()}{" "}
      </h2>
      <p>ssn: {curPatient.ssn}</p>
      <p>occupation: {curPatient.occupation}</p>
      <p>date of birth: {curPatient.dateOfBirth}</p>
      <EntryForm id={id} setCurPatient={setCurPatient} curPatient={curPatient} />
      {curPatient.entries.length !== 0 && <h3>Entries</h3>}
      <div>
        {curPatient.entries.map((e) => (
          <Entry entry={e} key={e.id} />
        ))}
      </div>
    </div>
  );
};

export default PatientDetails;
