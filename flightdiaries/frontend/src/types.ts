export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface InputDiaryEntry {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}