import { getToken } from "./authManager";

const commentUrl = '/api/comment';

export const getAllComments = () => {
    return getToken().then((token) => {
      return fetch(commentUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occurred while trying to get comments.");
        }
      });
    });
};

export const getCommentsFromPost = (id) => {
    console.log("triggering?")
    return getToken().then((token) => {
      return fetch(`${commentUrl}/postComments/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occurred while trying to get post comments.");
        }
      });
    });
};

