import { useState, useEffect } from "react";
import { getAll } from "./services/diaryService";
import type { DiaryEntry } from "./types";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notify, setNotify] = useState("");

  useEffect(() => {
    getAll().then((entries) => setEntries(entries));
  }, []);

  useEffect(() => {
    if (notify) {
      const timer = setTimeout(() => setNotify(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notify]);

  return (
    <div>
      {notify && (
        <div style={{ color: "red" }}>
          {notify}
        </div>
      )}
      <h1>Diary Entries</h1>
      {entries.map((e) => (
        <div key={e.id}>
          <p>{e.date}</p>
          <p>{e.visibility}</p>
          <p>{e.weather}</p>
        </div>
      ))}
      <EntryForm
        entries={entries}
        setEntries={setEntries}
        setNotify={setNotify}
      />
    </div>
  );
};

export default App;
