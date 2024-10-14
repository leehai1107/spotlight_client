import axiosClient from "../services/axios/config";

// API create order
export const createOrderAPI = async (data) => {
    try {
        const response = await axiosClient.post("/orders", data)
        return response
    } catch (error) {
        console.log(error)
    }
};