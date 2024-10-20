import axiosClient from "../services/axios/config";

export const getRevenueByIdAndMonth = async (shop_id, year= 2024, month = 10) => {
    try {
        const response = await axiosClient.get(
            `/getRevenueByMonth/${shop_id}/${year}/${month}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getRevenueByMonth = async (year = 2024, month = 10) => {
    try {
        const response = await axiosClient.get(
            `/getRevenueByMonth/${year}/${month}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getRevenueByToday = async () => {
    try {
        const response = await axiosClient.get(
            `/getRevenueByToday/`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getRevenueByIdAndToday = async (shop_id) => {
    try {
        const response = await axiosClient.get(
            `/getRevenueByToday/${shop_id}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};