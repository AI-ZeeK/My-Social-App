import { useState, useMemo } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import NavBar from "./components/Navbar/NavBar";
function App() {
	const mode = useSelector((state: any) => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	const isAuth = Boolean(useSelector((state: any) => state.token));
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route
						path="/home"
						element={isAuth ? <HomePage /> : <Navigate to="/" />}
					/>
					<Route
						path="/profile/:userId"
						element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
					/>
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;
