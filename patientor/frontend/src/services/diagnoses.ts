import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const getCodes = () => {
  return axios.get<string[]>(`${apiBaseUrl}/diagnoses/codes`).then((res) => res.data);
};

export default { getDiagnoses, getCodes };
