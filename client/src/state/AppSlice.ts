import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
	mode: "light",
	// user: {
	// 	// firstName: "fake",
	// 	// lastName: "person",
	// 	// _id: 5287873,
	// 	// picturePath: ''
	// },

	posts: [],
};

const AppSlice = createSlice({
	name: "Auth",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, { payload }) => {
			// state.user = payload.user;
			state.token = payload.token;
		},
		// setLogout: (state) => {
		// 	// state.user = null;
		// 	state.login = null;
		// },
		setFriends: (state, { payload }) => {
			if (state.user) {
				state.user.friends = payload.friends;
			} else {
				console.error("user friends non-existent :(");
			}
		},
		setPosts: (state, { payload }) => {
			state.posts = payload.posts;
		},
		setPost: (state, { payload }) => {
			const updatedPosts = state.posts.map((post: any) => {
				if (post._id === payload._id) {
					return payload.post;
				}
				return post;
			});

			state.posts = updatedPosts;
		},
	},
});

export const { setMode, setLogin, setFriends, setPosts, setPost } =
	AppSlice.actions;
export default AppSlice.reducer;
