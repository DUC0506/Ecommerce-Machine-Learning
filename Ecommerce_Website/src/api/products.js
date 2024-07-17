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
    ? `products-apartment?category=${IdCategory}&page=${numberPage}&limit=15&isApproved=true&sort=-sold`
    : `products-apartment?page=${numberPage}&limit=15&isApproved=true&sort=-createdAt`;
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
export const getTop5ProductsByApartment = async () => {
  const numberPage = 1;
  let url = `products-apartment?page=${numberPage}&limit=5&isApproved=true&sort=-priceDiscount`;

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
export const getProductsByHome = async (IdCategory) => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `/product/products-apartment?category=${IdCategory}&limit=5&isApproved=true&sort=-sold`,
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
export const getProductsSearchByApartment = async (key, numberPage) => {
  console.log(numberPage);
  let url = key
    ? `products-search?keyword=${key}`
    : `/products-apartment?page=${numberPage}&limit=10&sort=-sold`;
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
export const addProductColor = async (productId, color) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/product/color/${productId}`, color, {
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
export const deleteProductColor = async (productId, color) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/product/color/${productId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      data: color,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const addProductSize = async (productId, size) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/product/size/${productId}`, size, {
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
export const deleteProductSize = async (productId, size) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/product/size/${productId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      data: size,
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
