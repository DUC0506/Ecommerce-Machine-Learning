import { getToken } from "../utils/hepler";
import client from "./client";
export const getStatuses = async () => {
  const token = getToken();
  try {
    const { data } = await client.get(`/status/`, {
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
export const addStatus = async (dataStatus) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/status/`, dataStatus, {
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

export const getStatus = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/status/${id}`, {
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
export const updateStatus = async (body, id) => {
  const token = getToken();
  try {
    const { data } = await client.patch(`/status/${id}/details`, body, {
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
