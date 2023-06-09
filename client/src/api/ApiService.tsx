import axios from "axios";
import {initialValueType} from "../pages/LoginPage/Form";

const API = axios.create({
  baseURL: `https://my-social-app-gqkj.onrender.com`,
});
//  Auth Register
export const registerPostApi = async (formData: initialValueType) => {
  const {data} = await API.post("/auth/register", formData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      maxBodyLength: 10000000,
      maxContentLength: 10000000,
      emulateJSON: true,
    },
  });
  return data;
};
// Auth Login
export const loginPostApi = async (formData: initialValueType) => {
  const {data} = await API.post("/auth/login", formData);

  return data;
};

// Api Posts
export const PostApi = async (formData: any, token: string) => {
  const {data} = await API.post("/posts", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      maxBodyLength: 10000000,
      maxContentLength: 10000000,
      emulateJSON: true,
    },
  });

  return data;
};
// Api GVet Posts
export const getPostApi = async (token: string) => {
  const {data} = await API.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  });

  return data;
};
// ?Get User Posts
export const getUserSocialPostsApi = async (userId: string, token: string) => {
  const {data} = await API.get(`/posts/${userId}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  });

  return data;
};

// ?Get Friends
export const getFriendsApi = async (userId: string, token: string) => {
  const {data} = await API.get(`/user/${userId}/friends`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  });

  return data;
};

// ?Patch Friends
export const patchFriendApi = async (
  userId: string,
  friendId: any,
  token: string
) => {
  const {data} = await API.patch(`/user/${userId}/${friendId}`, "", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  });

  return data;
};

// ?Patch Friends
export const patchLikeAPI = async (
  userId: any,
  postId: string,
  token: string
) => {
  const {data} = await API.patch(
    `/posts/${postId}/like`,
    JSON.stringify(userId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return data;
};
