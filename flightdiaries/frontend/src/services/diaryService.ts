import axios from 'axios'
import type { DiaryEntry } from "../types"
const baseURL = "/api"

export const getAll = () => {
  return axios.get<DiaryEntry[]>(`${baseURL}/diaries`).then(res => res.data)
}