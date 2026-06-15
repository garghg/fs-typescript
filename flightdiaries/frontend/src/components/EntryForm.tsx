import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import {
  addEntry,
  getWeathers,
  getVisibilities,
} from "../services/diaryService";
import type { DiaryEntry } from "../types";

interface EntryFormProps {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setNotify: React.Dispatch<React.SetStateAction<string>>;
}

const EntryForm = ({ entries, setEntries, setNotify }: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [weathers, setWeathers] = useState<string[]>([]);
  const [visibilities, setVisibilities] = useState<string[]>([]);

  useEffect(() => {
    getWeathers().then((data) => setWeathers(data));
    getVisibilities().then((data) => setVisibilities(data));
  }, []);

  const handleAddEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await addEntry({ date, weather, visibility, comment });
      setEntries(entries.concat(response));
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
    } catch (error) {
      if (error instanceof AxiosError) {
        const issues = error.response?.data.error;
        const messages = issues
          .map(({ path }: { path: string[] }) => `Error: Invalid ${path[0]}`)
          .join(", ");
        setNotify(messages);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleAddEntry}>
        <label>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          weather
          {weathers.map((w) => (
            <label key={w}>
              {w}
              <input
                type="radio"
                value={w}
                checked={weather === w}
                onChange={(e) => setWeather(e.target.value)}
              />
            </label>
          ))}
        </label>
        <br />
        <label>
          visibility
          {visibilities.map((v) => (
            <label key={v}>
              {v}
              <input
                type="radio"
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value)}
              />
            </label>
          ))}
        </label>
        <br />
        <label>
          comment
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
