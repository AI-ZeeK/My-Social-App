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
		builder.addCase(registerPost.pending, (state) => {
			console.log("isError jdv,dfvndf");
			state.isLoading = true;
		});
		builder.addCase(registerPost.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = payload.savedUser;
			state.token = payload.token;
			localStorage.setItem("token", JSON.stringify(state.token));
			localStorage.setItem("user", JSON.stringify(state.user));
			console.log("isSuccess vndn", payload, state.token, state.user);
		});
		builder.addCase(registerPost.rejected, (state, { payload }) => {
			console.log("isRejected jdfvjdfvkfn", payload);
			state.isLoading = false;
			state.isError = true;
			state.message = payload;
			// state.user = null;
		});
		builder
			.addCase(loginPost.pending, (state) => {
				state.isLoading = true;
				console.log("Pending jdv,dfvndf");
			})
			.addCase(loginPost.fulfilled, (state, { payload }) => {
				state.isLoading = false;

				if (payload.msg) {
					state.isLoading = false;
					state.isError = true;
					state.message = payload.msg;
					console.log("Rejected vndn", state.token, state.user, payload.msg);
				}
				if (!payload.msg) {
					state.isSuccess = true;
					state.user = payload.user;
					state.token = payload.token;
					localStorage.setItem("token", JSON.stringify(state.token));
					localStorage.setItem("user", JSON.stringify(state.user));
					console.log("isSuccess vndn", state.token, state.user, payload);
				}
			})
			.addCase(loginPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload.msg;
				state.user = [];
				console.log("isRejected jdfvjdfvkfn");
			});
		builder
			.addCase(socialPost.pending, (state) => {
				state.postState.isLoading = true;
				console.log("isError Social Post");
			})
			.addCase(socialPost.fulfilled, (state, { payload }) => {
				state.postState.isLoading = false;
				state.postState.isSuccess = true;
				state.posts = [...state.posts, payload];
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
				console.log("isError GET Social Post");
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
	},
});

export const { reset, setLogout, setMode, setPicturePathBase64 } =
	ApiSlice.actions;
export default ApiSlice.reducer;
