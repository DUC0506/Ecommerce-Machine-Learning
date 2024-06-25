import { getToken } from "../utils/hepler";
import client from "./client";

export const getFavoriteProducts = async () => {
  const token = getToken();
  try {
    const { data } = await client.get(`/favorite`, {
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

export const addFavoriteProduct = async (productId) => {
  console.log(productId);
  const token = getToken();
  try {
    const { data } = await client.post(
      `/favorite/`,
      { productId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const removeFavorite = async (idProduct) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/favorite/${idProduct}`, {
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
