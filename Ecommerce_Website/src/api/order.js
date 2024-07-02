import client from "./client";
import { getToken } from "../utils/hepler";

export const createOrder = async (order) => {
  const token = getToken();
  console.log(order);

  try {
    const { data } = await client.post(`/order/orderBySeller`, order, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const getTotalSales = async () => {
  const token = getToken();

  try {
    const { data } = await client.get(`/order/totalSales`, {
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
export const getTotalOrders = async (
  number = null,
  sellerId = null,
  pagination
) => {
  const token = getToken();

  try {
    let url = "/order/totalOrders";
    if (sellerId) {
      url = `/order/orderBySeller?seller=${sellerId}&limit=${number}&page=${pagination}&sort=-createdAt`;
    } else if (number) {
      url = `/order/totalOrders?limits=${number}&page=${pagination} `;
    }
    const { data } = await client.get(url, {
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
export const getTotalOrdersNotification = async (
  number = null,
  sellerId = null
) => {
  const token = getToken();

  try {
    const { data } = await client.get(
      `order/notifications?seller=${sellerId}&limit=${number}&status=Not Processed`,
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

export const orderStatus = async (id, status) => {
  const token = getToken();
  console.log(status);

  try {
    const { data } = await client.patch(
      `/order/${id}`,
      { status },
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

export const getAllOrders = async (id) => {
  const token = getToken();

  try {
    const url = `/order`;

    const { data } = await client.get(url, {
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
export const getAllOrdersByUser = async (id) => {
  const token = getToken();

  try {
    const { data } = await client.get(`/order/?sort=-createdAt`, {
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

export const getTotalSalesBySeller = async (id, pagination) => {
  const token = getToken();

  try {
    const { data } = await client.get(
      `/order/totalSalesBySeller/${id}/?limit=10&page=${pagination}`,
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
export const getAllTotalSalesBySeller = async (id, period) => {
  const token = getToken();
  let url;
  if (period) {
    url = `/order/totalSalesBySeller/${id}?period=${period}`;
  } else {
    url = `/order/totalSalesBySeller/${id}`;
  }
  console.log(url);
  try {
    const { data } = await client.get(url, {
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
export const getOrder = async (id) => {
  const token = getToken();

  try {
    const { data } = await client.get(`/order/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const cancelOrder = async (id) => {
  const token = getToken();

  try {
    const { data } = await client.delete(`/order/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
