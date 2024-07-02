import { getToken } from "../utils/hepler";
import client from "./client";
export const createWithDraw = async (dataTransaction) => {
  const token = getToken();
  console.log(dataTransaction);
  try {
    const { data } = await client.post(`/transaction/`, dataTransaction, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};
export const getTransactions = async (pagination) => {
  const token = getToken();

  try {
    const { data } = await client.get(
      `/transaction?limit=10&page=${pagination}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};
export const updateStatusTransactions = async (id, status) => {
  const token = getToken();

  try {
    const { data } = await client.patch(`/transaction/${id}/details`, status, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};
