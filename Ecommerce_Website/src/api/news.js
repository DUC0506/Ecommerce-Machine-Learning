import { getToken } from "../utils/hepler";
import client from "./client";
export const getNewsByApartment = async (idApartment, idAuthor, pagination) => {
  let url = idAuthor
    ? `?author=${idAuthor}&limit=10&page=${pagination}`
    : `?apartment=${idApartment}&limit=10&page=${pagination}`;
  console.log(url);
  const token = getToken();
  try {
    const { data } = await client.get(`/news/${url}`, {
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
export const getNews = async (isApproved) => {
  console.log(isApproved);
  let url = "";
  if (isApproved === true || isApproved === false) {
    url = isApproved ? `?isApproved=true` : `?isApproved=false`;
  }
  console.log(url);
  const token = getToken();
  try {
    const { data } = await client.get(`/news/all-news${url}`, {
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
export const updateNewsDetails = async (idNews, contentNews) => {
  console.log(idNews, contentNews);

  const token = getToken();
  try {
    const { data } = await client.patch(
      `/news/${idNews}/details`,
      contentNews,
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
export const updateNewsApproval = async (idNews, contentNews) => {
  console.log(idNews, contentNews);

  const token = getToken();
  try {
    const { data } = await client.patch(
      `/news/${idNews}/approval`,
      contentNews,
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
export const addNews = async (contentNews) => {
  console.log(contentNews);

  const token = getToken();
  try {
    const { data } = await client.post(`/news/`, contentNews, {
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
export const removeNews = async (idNews) => {
  console.log(idNews);

  const token = getToken();
  try {
    const { data } = await client.delete(`/news/${idNews}`, {
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
