import client from "./client";
import { getToken } from "../utils/hepler";

export const getPredicts = async () => {
  const token = getToken();

  try {
    const { data } = await client.get(`/predict`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getPredict = async (id) => {
  const token = getToken();

  try {
    const { data } = await client.get(`/predict/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const addPredict = async (predict) => {
  const token = getToken();

  try {
    const { data } = await client.post(`/predict/`, predict, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Nếu có dữ liệu lỗi được trả về từ server
      const errorMessage = error.response.data.message;
      console.log(errorMessage); // In ra thông báo lỗi từ server
      return errorMessage;
    } else {
      // Nếu không có dữ liệu lỗi từ server, in ra lỗi mặc định
      console.error("Unexpected error:", error);
      return "An unexpected error occurred. Please try again later.";
    }
  }
};

export const getAnalysisPredict = async (info) => {
  const token = getToken();

  try {
    const { data } = await client.post(`/predict/analysis-predict`, info, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
