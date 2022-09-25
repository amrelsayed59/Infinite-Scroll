import Axios from 'axios';
const API_KEY: string = process.env.REACT_APP_API_KEY as string;

export const fetchJob = async (id: string) => {
  return await Axios
  .get(`${API_KEY}/job/${id}`)
  .then((result) => result.data);
};

export const fetchSkill = async (id: string) => {
  return await Axios
  .get(`${API_KEY}/skill/${id}`)
  .then((result) => result.data);
};

export const searchJob = async (query: string) => {
  return await Axios
  .get(`${API_KEY}/jobs/search?query=${query}`)
  .then((result) => result.data);
};
