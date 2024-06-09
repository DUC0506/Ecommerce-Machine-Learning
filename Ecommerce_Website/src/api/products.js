import { getToken } from "../utils/hepler";
import client from "./client";

export const getProducts = async () => {
  const token = getToken();
  try {
    const { data } = await client.get(`/product`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};
export const getProductsNotApproved = async () => {
  const token = getToken();
  try {
    const { data } = await client.get(`/product?isApproved=false`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};
export const getProductsByApartment = async (IdCategory, numberPage) => {
  console.log(numberPage);
  let url = IdCategory
    ? `products-apartment?category=${IdCategory}&page=${numberPage}&limit=15`
    : `products-apartment?page=${numberPage}&limit=15`;
  console.log(url);
  const token = getToken();
  try {
    const { data } = await client.get(`/product/${url}`, {
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
export const getProductsSearchByApartment = async (key, numberPage) => {
  console.log(numberPage);
  let url = key
    ? `products-search?keyword=${key}`
    : `/products-apartment?page=${numberPage}&limit=10`;
  console.log(url);
  const token = getToken();
  try {
    const { data } = await client.get(`/product/${url}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
export const createProduct = async (product) => {
  const token = getToken();
  console.log(product);

  try {
    const { data } = await client.post(`/product/`, product, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProduct = async (productId) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/product/${productId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};
export const deleteProduct = async (productId) => {
  const token = getToken();

  try {
    const { data } = await client.delete(`/product/${productId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (productId, product) => {
  const token = getToken();

  try {
    const { data } = await client.patch(
      `/product/${productId}/details`,
      product,
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
export const updateProductApproved = async (productId, product) => {
  const token = getToken();

  try {
    const { data } = await client.patch(
      `/product/${productId}/approved`,
      product,
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
export const getSellerProducts = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/product/products-seller?filter=${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      return errorMessage;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error occurred. Please try again later.";
    }
  }
};
export const getSellerSoldProducts = async (id, pagination) => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `/product/products-seller-sold?filter=${id}&limit=10&page=${pagination}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      return errorMessage;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error occurred. Please try again later.";
    }
  }
};
export const getTop5Cheap = async () => {
  const token = getToken();
  try {
    const { data } = await client.get(`/product/top-5-cheap`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      return errorMessage;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error occurred. Please try again later.";
    }
  }
};
export const getProductsBySeller = async (idSeller, pagination) => {
  console.log(idSeller);
  const token = getToken();
  try {
    const { data } = await client.get(
      `/product/products-seller?seller=${idSeller}&limit=10&page=${pagination}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      return errorMessage;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error occurred. Please try again later.";
    }
  }
};
