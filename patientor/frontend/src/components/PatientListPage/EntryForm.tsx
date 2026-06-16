import {
  TextField,
  Button,
  Box,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import diagnoseService from "../../services/diagnoses";

interface EntryFormProps {
  id: string;
  setCurPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  curPatient: Patient;
}

const EntryForm = ({ id, setCurPatient, curPatient }: EntryFormProps) => {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rating, setRating] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employer, setEmployer] = useState("");
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  useEffect(() => {
    diagnoseService.getCodes().then((res) => setCodes(res));
  }, []);

  const renderForm = () => {
    if (type === "HealthCheck") {
      return (
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Health Check Rating</InputLabel>
          <Select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            label="Health Check Rating"
          >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low Risk</MenuItem>
            <MenuItem value={2}>High Risk</MenuItem>
            <MenuItem value={3}>Critical Risk</MenuItem>
          </Select>
        </FormControl>
      );
    } else if (type === "Hospital") {
      return (
        <>
          <TextField
            label="Discharge Date"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
          <TextField
            label="Criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />
        </>
      );
    } else if (type === "OccupationalHealthcare") {
      return (
        <>
          <TextField
            label="Employer"
            value={employer}
            onChange={(e) => setEmployer(e.target.value)}
          />
          <TextField
            label="Leave Start Date"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={leaveStart}
            onChange={(e) => setLeaveStart(e.target.value)}
          />
          <TextField
            label="Leave End Date"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={leaveEnd}
            onChange={(e) => setLeaveEnd(e.target.value)}
          />
        </>
      );
    } else {
      return null;
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setType("");
    setDate("");
    setDescription("");
    setSpecialist("");
    setRating("");
    setDischargeDate("");
    setCriteria("");
    setEmployer("");
    setLeaveStart("");
    setLeaveEnd("");
    setSelectedCodes([]);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const base = {
      date,
      description,
      specialist,
      diagnosisCodes: selectedCodes.length > 0 ? selectedCodes : undefined,
    };
    let request;
    if (type === "HealthCheck") {
      request = {
        ...base,
        type: "HealthCheck" as const,
        healthCheckRating: Number(rating) as 0 | 1 | 2 | 3,
      };
    } else if (type === "Hospital") {
      request = {
        ...base,
        type: "Hospital" as const,
        discharge: { date: dischargeDate, criteria },
      };
    } else {
      request = {
        ...base,
        type: "OccupationalHealthcare" as const,
        employerName: employer,
        sickLeave: { startDate: leaveStart, endDate: leaveEnd },
      };
    }
    console.log("sending request:", request);
    const addedEntry = await patientService.addEntry(id, request);
    console.log("got response:", addedEntry);
    setCurPatient({
      ...curPatient,
      entries: curPatient.entries.concat(addedEntry),
    });

    resetForm();
  };

  return (
    <>
      <FormControl size="medium" sx={{ width: 300, mb: 2, mt: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setShowForm(true);
          }}
          label="Type"
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>
      </FormControl>
      {showForm && (
        <Box sx={{ border: 1, borderColor: "black", borderRadius: 2, p: 2 }}>
          <Stack spacing={2}>
            <TextField
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Specialist"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Diagnosis Codes</InputLabel>
              <Select
                multiple
                value={selectedCodes}
                onChange={(e) => setSelectedCodes(e.target.value as string[])}
                label="Diagnosis Codes"
              >
                {codes.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {renderForm()}
            <Button variant="contained" onClick={handleSubmit}>
              Add Entry
            </Button>
            <Button variant="contained" onClick={() => resetForm()}>
              Close
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default EntryForm;
