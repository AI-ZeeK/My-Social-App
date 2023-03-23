import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ApiService from "../api/ApiService";

interface initialProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  user: any[] | null;
  token: string | [];
  mode: string;
  message: string;
  picturePathBase64: string | null;
  posts: any[];
  postState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  friends: [];
  friendsState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
}
const LS: any = localStorage;
const tokenData =
  LS.getItem("token") !== null ? JSON.parse(LS.getItem("token")) : [];
const userData =
  LS.getItem("user") !== null ? JSON.parse(LS.getItem("user")) : [];
const initialState: initialProps = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
  user: userData,
  token: tokenData,
  mode: "light",
  message: "",
  postState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  picturePathBase64: null,
  posts: [],
  friends: [],
  friendsState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
};
export const registerPost: any = createAsyncThunk(
  "auth/register",
  async (userData: any, thunkAPI) => {
    try {
      return await ApiService.registerPostApi(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("rrerere", error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const loginPost: any = createAsyncThunk(
  "posts",
  async (userData: any, thunkAPI) => {
    try {
      return await ApiService.loginPostApi(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const socialPost: any = createAsyncThunk(
  "auth/login",
  async ([userData, token]: any, thunkAPI) => {
    try {
      return await ApiService.PostApi(userData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getSocialPost: any = createAsyncThunk(
  "getPosts",
  async (token: any, thunkAPI) => {
    try {
      return await ApiService.getPostApi(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getUserSocialPosts: any = createAsyncThunk(
  "getUsersPosts",
  async ([userId, token]: any, thunkAPI) => {
    try {
      return await ApiService.getUserSocialPostsApi(userId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getFriends: any = createAsyncThunk(
  "getFreinds",
  async ([userId, token]: any, thunkAPI) => {
    try {
      return await ApiService.getFriendsApi(userId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const patchFriend: any = createAsyncThunk(
  "patchFriends",
  async ([userId, friendId, token]: any, thunkAPI) => {
    try {
      return await ApiService.patchFriendApi(userId, friendId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const patchLike: any = createAsyncThunk(
  "patchLike",
  async ([userId, postId, token]: any, thunkAPI) => {
    try {
      return await ApiService.patchLikeAPI(userId, postId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const ApiSlice = createSlice({
  name: "APISERVICE",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
      console.log("ddffff");
    },
    setLogout: (state) => {
      state.token = [];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setPicturePathBase64: (state, { payload }) => {
      state.picturePathBase64 = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPost.pending, (state) => {
        console.log("isPending registerPost");
        state.isLoading = true;
      })
      .addCase(registerPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload.savedUser;
        state.token = payload.token;
        localStorage.setItem("token", JSON.stringify(state.token));
        localStorage.setItem("user", JSON.stringify(state.user));
        console.log("isSuccess registerPost", payload, state.token, state.user);
      })
      .addCase(registerPost.rejected, (state, { payload }) => {
        console.log("isRejected jdfvjdfvkfn", payload);
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        // state.user = null;
      });
    builder
      .addCase(loginPost.pending, (state) => {
        state.isLoading = true;
        console.log("Pending registerPost");
      })
      .addCase(loginPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload.msg) {
          state.isLoading = false;
          state.isError = true;
          state.message = payload.msg;
          console.log(
            "Rejected loginPost",
            state.token,
            state.user,
            payload.msg
          );
        }
        if (!payload.msg) {
          state.isSuccess = true;
          state.user = payload.user;
          state.token = payload.token;
          localStorage.setItem("token", JSON.stringify(state.token));
          localStorage.setItem("user", JSON.stringify(state.user));
          console.log("isSuccess loginPost", state.token, state.user, payload);
        }
      })
      .addCase(loginPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.user = [];
        console.log("isRejected loginPost");
      });
    builder
      .addCase(socialPost.pending, (state) => {
        state.postState.isLoading = true;
        console.log("isPending Social Post");
      })
      .addCase(socialPost.fulfilled, (state, { payload }) => {
        state.postState.isLoading = false;
        state.postState.isSuccess = true;
        state.posts = payload;
        console.log("is Success  Social Post");
      })
      .addCase(socialPost.rejected, (state, action) => {
        state.postState.isLoading = false;
        state.postState.isError = true;
        state.message = action.payload;
        state.posts = [];
        console.log("isRejected social Post");
      });
    builder
      .addCase(getSocialPost.pending, (state) => {
        state.postState.isLoading = true;
        console.log("isPending GET Social Post");
      })
      .addCase(getSocialPost.fulfilled, (state, { payload }) => {
        state.postState.isLoading = false;
        state.postState.isSuccess = true;
        state.posts = payload;
        console.log("is Success GETSocial Post", payload);
      })
      .addCase(getSocialPost.rejected, (state, { action }) => {
        console.log("isRejected GET Social Post");
      });
    builder
      .addCase(getUserSocialPosts.pending, (state) => {
        state.postState.isLoading = true;
        console.log("isPending GET Social Post");
      })
      .addCase(getUserSocialPosts.fulfilled, (state, { payload }) => {
        state.postState.isLoading = false;
        state.postState.isSuccess = true;
        state.posts = payload;
        console.log("is Success GETSocialUser Post", payload);
      })
      .addCase(getUserSocialPosts.rejected, (state, { action }) => {
        console.log("isRejected GET SocialUser Post");
      });
    builder
      .addCase(getFriends.pending, (state) => {
        state.friendsState.isLoading = true;
        console.log("isPending GET Friends Post");
      })
      .addCase(getFriends.fulfilled, (state, { payload }) => {
        state.friendsState.isLoading = false;
        state.friendsState.isSuccess = true;
        state.friends = payload;
        console.log("is Success Friends Post", payload);
      })
      .addCase(getFriends.rejected, (state, { payload }) => {
        console.log("isRejected GET Friends Post");
      });
    builder
      .addCase(patchFriend.pending, (state) => {
        state.friendsState.isLoading = true;
        console.log("isPending GET Friends Post");
      })
      .addCase(patchFriend.fulfilled, (state, { payload }) => {
        state.friendsState.isLoading = false;
        state.friendsState.isSuccess = true;
        // state.friends = payload;
        console.log("is Success Friends Post", payload);
      })
      .addCase(patchFriend.rejected, (state, { action }) => {
        console.log("isRejected GET Friends Post");
      });
    builder
      .addCase(patchLike.pending, (state) => {
        state.friendsState.isLoading = true;
        console.log("isPending Patch Friends Like");
      })
      .addCase(patchLike.fulfilled, (state, { payload }) => {
        state.friendsState.isLoading = false;
        state.friendsState.isSuccess = true;
        state.friends = payload;
        console.log("is Success Friends Like Patch", payload);
      })
      .addCase(patchLike.rejected, (state, { action }) => {
        console.log("isRejected Patch Friends Like");
      });
  },
});

export const { reset, setLogout, setMode, setPicturePathBase64 } =
  ApiSlice.actions;
export default ApiSlice.reducer;
