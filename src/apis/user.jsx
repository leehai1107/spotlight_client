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

