import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../state/AppSlice";
export const store = configureStore({
	reducer: {
		app: AppReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
