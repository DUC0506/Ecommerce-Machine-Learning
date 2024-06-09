import client from "./client";
import { getToken } from "../utils/hepler";

export const addItemtoCart = async (product) => {
  const token = getToken();
  console.log(product);

  try {
    const { data } = await client.post(`/cart/`, product, {
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
export const getCart = async (product) => {
  const token = getToken();

  try {
    const { data } = await client.get(`/cart/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
};
export const reduceOneProduct = async (idItem) => {
  const token = getToken();
  console.log(idItem);

  try {
    const { data } = await client.patch(`/cart/reduce-one`, idItem, {
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

export const increaseOneProduct = async (idItem) => {
  const token = getToken();
  console.log(idItem);

  try {
    const { data } = await client.patch(`/cart/increase-one`, idItem, {
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

export const removeItem = async (idItem, dataProduct) => {
  const token = getToken();
  console.log(token);
  try {
    const { data } = await client.delete(`/cart/remove-items/${idItem}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      data: dataProduct,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
