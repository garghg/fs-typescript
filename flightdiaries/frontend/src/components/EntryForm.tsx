import { useState } from "react";
import { addEntry } from "../services/diaryService";
import type { DiaryEntry } from "../types";

interface EntryFormProps {
  entries: DiaryEntry[]
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const EntryForm = ({ entries, setEntries }: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleAddEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
    return addEntry({ date, weather, visibility, comment }).then((res) =>
      setEntries(entries.concat(res)),
    );
  };

  return (
    <div>
      <form onSubmit={handleAddEntry}>
        <label>
          date
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <label>
          weather
          <input type="text" value={weather} onChange={(e) => setWeather(e.target.value)} />
        </label>
        <br />
        <label>
          visibility
          <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value)} />
        </label>
        <br />
        <label>
          comment
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
