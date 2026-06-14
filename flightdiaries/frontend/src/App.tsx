import { useState, useEffect } from "react"
import { getAll } from "./services/diaryService"
import type { DiaryEntry } from "./types"

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    getAll().then(entries => setEntries(entries))
  }, [])
  return (
    <div>
      <h1>Diary Entries</h1>
      {entries.map(e => (
        <div key={e.id}>
          <p>{e.date}</p>
          <p>{e.visibility}</p>
          <p>{e.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default App