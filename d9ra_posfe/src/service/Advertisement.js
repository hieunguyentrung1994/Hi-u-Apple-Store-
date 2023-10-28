import axios from "axios";
import { baseUrl } from "./Userservice";

const showAllListSlider = async () => {
  let response = await axios.get(`${baseUrl}/Advertisement`);
  return response;
};

const showGetSlider = async (id) => {
  let response = await axios.get(`${baseUrl}/Advertisement/${id}`);
  return response;
};
const addAdvertisement = async (formAdd) => {
  let response = await axios.post(`${baseUrl}/Advertisement`, {
    formAdd
  });
  return response;
};
const editAdvertisement = async (request, id) => {
  let response = await axios.put(
    `${baseUrl}/Advertisement/${id}`,
     request 
  ).then(response => {
     
      console.log(response.data);
      return response.data;}
  ).catch (error => {
 
    console.error("Error updating advertisement:", error)});;
  
};
export { showAllListSlider, addAdvertisement, editAdvertisement,showGetSlider };
