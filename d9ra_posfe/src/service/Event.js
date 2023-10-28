import axios from "axios";
import { baseUrl } from "./Userservice";


const showAllListEvent = async () => {
  let response = await axios.get(`${baseUrl}/promotion/all`);
  return response;
};
const addNew = async (formAdd) => {
  let response = await axios.post(`${baseUrl}/promotion/add`,formAdd);
  return response;
};
const update = async (id,request) => {
  let response = await axios.put(`${baseUrl}/promotion/edit/${id}`,request);
  return response;
};
const changesStatus = async (id) => {
  let response = await axios.put(`${baseUrl}/promotion/changes/${id}`);
  return response;
};

export { showAllListEvent, addNew, update, changesStatus};