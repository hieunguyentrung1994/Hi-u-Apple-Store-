import axios from "axios";
import { baseUrl } from "./Userservice";

const showAllList = async () => {
  let response = await axios.get(`${baseUrl}/products`);
  return response;
};

const showListHeadphone = async () => {
  let response = await axios.get(
    `${baseUrl}/products/searchByCategory/5`
  );
  return response;
};

const showListPhone = async () => {
  let response = await axios.get(
    `${baseUrl}/products/searchByCategory/1`
  );
  return response;
};

const showListComputer = async () => {
  let response = await axios.get(
    `${baseUrl}/products/searchByCategory/3`
  );
  return response;
};
const showListTablate = async () => {
  let response = await axios.get(
    `${baseUrl}/products/searchByCategory/2`
  );
  return response;
};
const showListwatch = async () => {
  let response = await axios.get(
    `${baseUrl}/products/searchByCategory/4`
  );
  return response;
};
const showListAccessories = async () => {
  let response = await axios.get(
    `${baseUrl}/products/searchByCategory/6`
  );
  return response;
};

const showListHeart = async (email) => {
  let response = await axios.get(`${baseUrl}/favourite/${email}`);
  return response;
};

const addHeart = async (productId, email) => {
  let response = await axios.post(
    `${baseUrl}/favourite/${productId}/to/${email}`
  );
  return response;
};

const removeHeart = async (productId, email) => {
  try {
    let response = await axios.delete(
      `${baseUrl}/favourite/${productId}/from/${email}`
    );
    // window.location.reload();
    return response;
  } catch (error) {
    alert(error.message);
  }
};

export {
  showListTablate,
  showListwatch,
  showListAccessories,
  showListComputer,
  showListHeadphone,
  showListPhone,
  showListHeart,
  addHeart,
  removeHeart,
  showAllList,
};
