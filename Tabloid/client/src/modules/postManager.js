import { getToken } from "./authManager";

const baseUrl = '/api/post';

export const getAllPosts = () => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get posts.");
      }
    });
  });
};

export const getAllCurrentUserPosts = () => {
  return getToken().then((token) => {
    return fetch(baseUrl + "/myPosts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get user posts.");
      }
    });
  });
};