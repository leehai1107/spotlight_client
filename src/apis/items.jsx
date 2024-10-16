import axiosClient from "../services/axios/config";

// API get items with pagination
export const getItemsAPI = async (page = 1, limit = 10) => {
  try {
    const response = await axiosClient.get(
      "/items?page=" + page + "&limit=" + limit
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// API create item
export const createItemAPI = async (data) => {
  try {
    const response = await axiosClient.post("/items", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// API get all items by shop_id with pagination
export const getItemsByShopAPI = async (shop_id, page = 1, limit = 10) => {
  try {
    const response = await axiosClient.get(
      "/shop-items/" + shop_id + "?page=" + page + "&limit=" + limit
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// API get item by id
export const getItemByIdAPI = async (id) => {
  try {
    const response = await axiosClient.get("/items/" + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// API Search items by name
export const searchItemsAPI = async (query, page = 1, limit = 10) => {
  try {
    const response = await axiosClient.get(
      "/items/?item_name=" + query + "&page=" + page + "&limit=" + limit
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
