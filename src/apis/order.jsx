import axiosClient from "../services/axios/config";

// API create order
export const createOrderAPI = async (data) => {
  try {
    const response = await axiosClient.post("/orders", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// API get all orders by user_id with pagination
export const getOrdersByUserAPI = async (user_id, page = 1, limit = 10) => {
  try {
    const response = await axiosClient.get(
      `/user/orders/${user_id}?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// API get all orders by shop_id with pagination
export const getOrdersByShopAPI = async (shop_id, page = 1, limit = 10) => {
  try {
    const response = await axiosClient.get(
      `/orders/${shop_id}?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
