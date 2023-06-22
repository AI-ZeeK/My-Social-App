import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as ApiService from "../api/ApiService";
import {initialValueType} from "../pages/LoginPage/Form";

interface initialProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  user: any[] | null;
  token: string | [];
  mode: string;
  message: string;
  // picturePathBase64: string | null;
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
  // picturePathBase64: null,
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
  async (
    userData: initialValueType,
    thunkAPI: {rejectWithValue: (arg0: any) => any}
  ) => {
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
  async (
    userData: initialValueType,
    thunkAPI: {rejectWithValue: (arg0: any) => any}
  ) => {
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
  async (
    [userData, token]: any,
    thunkAPI: {rejectWithValue: (arg0: any) => any}
  ) => {
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
  async (token: any, thunkAPI: {rejectWithValue: (arg0: any) => any}) => {
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
  async (
    [userId, token]: any,
    thunkAPI: {rejectWithValue: (arg0: any) => any}
  ) => {
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
  async (
    [userId, token]: any,
    thunkAPI: {rejectWithValue: (arg0: any) => any}
  ) => {
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
  async (
    [userId, friendId, token]: any,
    thunkAPI: {rejectWithValue: (arg0: any) => any}
  ) => {
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
  async (
    [userId, postId, token]: any,
    thunkAPI: {rejectWithValue: (arg0: any) => any}
  ) => {
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
    reset: (state: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
      errorMsg: string;
    }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
    setLogout: (state: {token: never[]}) => {
      state.token = [];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    setMode: (state: {mode: string}) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // setPicturePathBase64: (state, { payload }) => {
    //   state.picturePathBase64 = payload;
    // },
  },
  extraReducers: (builder: {
    addCase: (
      arg0: any,
      arg1: {
        (state: any): void;
        (state: any): void;
        (state: any): void;
        (state: any): void;
        (state: any): void;
        (state: any): void;
        (state: any): void;
        (state: any): void;
      }
    ) => {
      (): any;
      new (): any;
      addCase: {
        (
          arg0: any,
          arg1: {
            (state: any, {payload}: {payload: any}): void;
            (state: any, {payload}: {payload: any}): void;
            (state: any, {payload}: {payload: any}): void;
            (state: any, {payload}: {payload: any}): void;
            (state: any, {payload}: {payload: any}): void;
            (state: any, {payload}: {payload: any}): void;
            (state: any, {payload}: {payload: any}): void;
            (state: any, {payload}: {payload: any}): void;
          }
        ): {
          (): any;
          new (): any;
          addCase: {
            (
              arg0: any,
              arg1: {
                (state: any, {payload}: {payload: any}): void;
                (state: any, {payload}: {payload: any}): void;
                (state: any, action: any): void;
                (state: any, {action}: {action: any}): void;
                (state: any, {action}: {action: any}): void;
                (state: any, {payload}: {payload: any}): void;
                (state: any, {action}: {action: any}): void;
                (state: any, {action}: {action: any}): void;
              }
            ): void;
            new (): any;
          };
        };
        new (): any;
      };
    };
  }) => {
    builder
      .addCase(
        registerPost.pending,
        (state: {isLoading: boolean; isError: boolean}) => {
          console.log("isPending registerPost");
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addCase(
        registerPost.fulfilled,
        (
          state: {
            isLoading: boolean;
            isSuccess: boolean;
            isError: boolean;
            user: any;
            token: any;
          },
          {payload}: any
        ) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.user = payload.savedUser;
          state.token = payload.token;
          localStorage.setItem("token", JSON.stringify(state.token));
          localStorage.setItem("user", JSON.stringify(state.user));
          console.log(
            "isSuccess registerPost",
            payload,
            state.token,
            state.user
          );
        }
      )
      .addCase(
        registerPost.rejected,
        (
          state: {isLoading: boolean; isError: boolean; message: any},
          {payload}: any
        ) => {
          console.log("isRejected jdfvjdfvkfn", payload);
          state.isLoading = false;
          state.isError = true;

          state.message = payload;
          // state.user = null;
        }
      );
    builder
      .addCase(
        loginPost.pending,
        (state: {isLoading: boolean; isError: boolean}) => {
          state.isLoading = true;
          state.isError = false;

          console.log("Pending registerPost");
        }
      )
      .addCase(
        loginPost.fulfilled,
        (
          state: {
            isLoading: boolean;
            isError: boolean;
            message: any;
            token: any;
            user: any;
            isSuccess: boolean;
          },
          {payload}: any
        ) => {
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
            state.isError = false;
            state.isSuccess = true;
            state.user = payload.user;
            state.token = payload.token;
            localStorage.setItem("token", JSON.stringify(state.token));
            localStorage.setItem("user", JSON.stringify(state.user));
            console.log(
              "isSuccess loginPost",
              state.token,
              state.user,
              payload
            );
          }
        }
      )
      .addCase(
        loginPost.rejected,
        (
          state: {
            isLoading: boolean;
            isError: boolean;
            message: any;
            user: never[];
          },
          {payload}: any
        ) => {
          state.isLoading = false;
          state.isError = true;
          state.message = payload;
          state.user = [];
          console.log("isRejected loginPost", payload);
        }
      );
    builder
      .addCase(
        socialPost.pending,
        (state: {postState: {isLoading: boolean}}) => {
          state.postState.isLoading = true;
          console.log("isPending Social Post");
        }
      )
      .addCase(
        socialPost.fulfilled,
        (
          state: {
            postState: {isLoading: boolean; isSuccess: boolean};
            posts: any;
          },
          {payload}: any
        ) => {
          state.postState.isLoading = false;
          state.postState.isSuccess = true;
          state.posts = payload;
          console.log("is Success  Social Post");
        }
      )
      .addCase(
        socialPost.rejected,
        (
          state: {
            postState: {isLoading: boolean; isError: boolean};
            message: any;
            posts: never[];
          },
          action: {payload: any}
        ) => {
          state.postState.isLoading = false;
          state.postState.isError = true;
          state.message = action.payload;
          state.posts = [];
          console.log("isRejected social Post");
        }
      );
    builder
      .addCase(
        getSocialPost.pending,
        (state: {postState: {isLoading: boolean}}) => {
          state.postState.isLoading = true;
          console.log("isPending GET Social Post");
        }
      )
      .addCase(
        getSocialPost.fulfilled,
        (
          state: {
            postState: {isLoading: boolean; isSuccess: boolean};
            posts: any;
          },
          {payload}: any
        ) => {
          state.postState.isLoading = false;
          state.postState.isSuccess = true;
          state.posts = payload;
          console.log("is Success GETSocial Post", payload);
        }
      )
      .addCase(getSocialPost.rejected, (state: any, {action}: any) => {
        console.log("isRejected GET Social Post");
      });
    builder
      .addCase(
        getUserSocialPosts.pending,
        (state: {postState: {isLoading: boolean}}) => {
          state.postState.isLoading = true;
          console.log("isPending GET Social Post");
        }
      )
      .addCase(
        getUserSocialPosts.fulfilled,
        (
          state: {
            postState: {isLoading: boolean; isSuccess: boolean};
            posts: any;
          },
          {payload}: any
        ) => {
          state.postState.isLoading = false;
          state.postState.isSuccess = true;
          state.posts = payload;
          console.log("is Success GETSocialUser Post", payload);
        }
      )
      .addCase(getUserSocialPosts.rejected, (state: any, {action}: any) => {
        console.log("isRejected GET SocialUser Post");
      });
    builder
      .addCase(
        getFriends.pending,
        (state: {friendsState: {isLoading: boolean}}) => {
          state.friendsState.isLoading = true;
          console.log("isPending GET Friends Post");
        }
      )
      .addCase(
        getFriends.fulfilled,
        (
          state: {
            friendsState: {isLoading: boolean; isSuccess: boolean};
            friends: any;
          },
          {payload}: any
        ) => {
          state.friendsState.isLoading = false;
          state.friendsState.isSuccess = true;
          state.friends = payload;
          console.log("is Success Friends Post", payload);
        }
      )
      .addCase(getFriends.rejected, (state: any, {payload}: any) => {
        console.log("isRejected GET Friends Post");
      });
    builder
      .addCase(
        patchFriend.pending,
        (state: {friendsState: {isLoading: boolean}}) => {
          state.friendsState.isLoading = true;
          console.log("isPending GET Friends Post");
        }
      )
      .addCase(
        patchFriend.fulfilled,
        (
          state: {
            friendsState: {isLoading: boolean; isSuccess: boolean};
            friends: any;
          },
          {payload}: any
        ) => {
          state.friendsState.isLoading = false;
          state.friendsState.isSuccess = true;
          state.friends = payload;
          console.log("is Success Friends Post", payload);
        }
      )
      .addCase(patchFriend.rejected, (state: any, {action}: any) => {
        console.log("isRejected GET Friends Post");
      });
    builder
      .addCase(
        patchLike.pending,
        (state: {friendsState: {isLoading: boolean}}) => {
          state.friendsState.isLoading = true;
          console.log("isPending Patch Friends Like");
        }
      )
      .addCase(
        patchLike.fulfilled,
        (
          state: {
            friendsState: {isLoading: boolean; isSuccess: boolean};
            friends: any;
          },
          {payload}: any
        ) => {
          state.friendsState.isLoading = false;
          state.friendsState.isSuccess = true;
          state.friends = payload;
          console.log("is Success Friends Like Patch", payload);
        }
      )
      .addCase(patchLike.rejected, (state: any, {action}: any) => {
        console.log("isRejected Patch Friends Like");
      });
  },
});

export const {reset, setLogout, setMode} = ApiSlice.actions;
export default ApiSlice.reducer;
