import axios from "axios";
import type { DiaryEntry, InputDiaryEntry } from "../types";
const baseURL = "/api";

export const getAll = () => {
  return axios.get<DiaryEntry[]>(`${baseURL}/diaries`).then((res) => res.data);
};

export const addEntry = async (entry: InputDiaryEntry) => {
  const res = await axios.post<DiaryEntry>(`${baseURL}/diaries`, entry);
  return res.data;
};

export const getWeathers = () => {
  return axios.get<string[]>(`${baseURL}/diaries/weatherOptions`).then(res => res.data)
}


export const getVisibilities = () => {
  return axios.get<string[]>(`${baseURL}/diaries/visibilityOptions`).then(res => res.data)
}