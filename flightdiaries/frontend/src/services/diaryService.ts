import axios from 'axios'
import type { DiaryEntry, InputDiaryEntry } from "../types"
const baseURL = "/api"

export const getAll = () => {
  return axios.get<DiaryEntry[]>(`${baseURL}/diaries`).then(res => res.data)
}

export const addEntry = (entry: InputDiaryEntry) => {
  return axios.post<DiaryEntry>(`${baseURL}/diaries`, entry).then(res => res.data)
}