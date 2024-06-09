import { getToken } from "../utils/hepler";
import client from "./client";

export const getExpenses = async ({ pagination }) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/expense?page=${pagination}&limit=10`, {
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
export const getTotalExpenses = async () => {
  const token = getToken();
  try {
    const { data } = await client.get(`/expense/total/totalExpense`, {
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
export const getExpenseDetails = async (idExpense) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/expense/${idExpense}`, {
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
export const addExpense = async (contentExpense) => {
  console.log(contentExpense);

  const token = getToken();
  try {
    const { data } = await client.post(`/expense/`, contentExpense, {
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
export const removeExpense = async (idExpense) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/expense/${idExpense}`, {
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
export const getDistance = async (origins, destinations, weightProduct) => {
  const token = getToken();
  const obj = {
    origins,
    destinations,
    weightProduct,
  };
  console.log(obj);

  try {
    const { data } = await client.post(`/expense/distance`, obj, {
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
