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

export const getPostById = (id) => {
  return getToken().then((token) => {
    return fetch(baseUrl + `/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get the post.");
      }
    });
  });
};

export const addPost = (post) => {
  console.log('post', post);
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(post)
    }).catch((e) => {
      console.error("ERROR: ", e);
    }) 
    .then((res) => {
      if (res.ok) {
        console.log(res)
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to add a post.");
      }
    });
  });
};


