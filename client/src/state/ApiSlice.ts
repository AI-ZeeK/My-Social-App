import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  * as  ApiService from '../api/ApiService';


interface initialProps {
    isLoading: boolean;
    isError: boolean
    isSuccess: boolean;
    errorMsg: string;
    user: [];
    token: string
}
const tokenData = 
localStorage.getItem("token") !== null
    ? JSON.parse(localStorage.getItem("token"))
    : [];
const userData = 
localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : [];
const initialState: initialProps = {
	isLoading: false,
    isError: false,
    isSuccess: false,
    errorMsg :'',
    user: userData ,
    token: tokenData
};
export const registerPost = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
            const x = await ApiService.registerPostApi(userData);
            console.log(x,)
			return x
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
                console.log('rrerere' , error)
			return thunkAPI.rejectWithValue(message);
		}
	}
);
export const loginPost = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			return await ApiService.loginPostApi(userData);
		} catch (error) {
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
    name: 'APISERVICE',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.errorMsg = "";
            console.log('ddffff')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerPost.pending, (state) => {
            console.log('isError jdv,dfvndf')
			state.isLoading = true;
		});
        builder.addCase(registerPost.fulfilled, (state, {payload}) => {
            state.isLoading = false;
			state.isSuccess = true;
			state.user = payload.user
			state.token = payload.token
            localStorage.setItem(
				"token",
				JSON.stringify(state.token)
			);
            localStorage.setItem(
				"user",
				JSON.stringify(state.user)
			);
            console.log('isSuccess vndn', state.token, state.user)

		});
		builder.addCase(registerPost.rejected, (state, {payload}) => {
            console.log('isRejected jdfvjdfvkfn', payload)
			state.isLoading = false;
			state.isError = true;
			state.message = payload;
			state.user = null;

		});
        builder.addCase(loginPost.pending, (state) => {
			state.isLoading = true;
            console.log('isError jdv,dfvndf')
		})
        .addCase(loginPost.fulfilled, (state, {payload}) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = payload.user
			state.token = payload.token
            localStorage.setItem(
				"token",
				JSON.stringify(state.token)
			);
            localStorage.setItem(
				"user",
				JSON.stringify(state.user)
			);
            console.log('isSuccess vndn', state.token, state.user)

		})
		.addCase(loginPost.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
			state.user = null;
            console.log('isRejected jdfvjdfvkfn')

		});
    }

})

export const { reset } = ApiSlice.actions;
export default ApiSlice.reducer;