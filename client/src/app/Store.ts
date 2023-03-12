import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../state/AppSlice";
import ApiReducer from "../state/ApiSlice";
export const store = configureStore({
	reducer: {
		api: ApiReducer,
		app: AppReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
