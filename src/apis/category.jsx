import axiosClient from "../services/axios/config";

//  API get all categories
export const getCategoriesAPI = async () => {
  try {
    const response = await axiosClient.get("/categories");
    return response;
  } catch (error) {
    console.log(error);
  }
};
