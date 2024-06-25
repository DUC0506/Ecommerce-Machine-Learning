import client from "./client";

export const getCategory = async () => {
  try {
    const { data } = await client.get(`/category/`);

    return data;
  } catch (error) {
    return error;
  }
};
