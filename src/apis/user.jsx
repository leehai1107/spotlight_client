import axiosClient from "../services/axios/config";

export const loginAPI = async (username, password) => {
  try {
    const response = await axiosClient.post("/signin", {
      username,
      password,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const customerRegisterAPI = async (data) => {
  try {
    const response = await axiosClient.post("/signup/customer", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sellerRegisterAPI = async (data) => {
  try {
    const response = await axiosClient.post("/signup/supplier", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersAPI = async (page, limit) => {
  try {
    const response = await axiosClient.get(`/users?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}


