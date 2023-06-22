import {useState, useMemo, useEffect} from "react";
import "./App.css";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {useSelector} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";
import NavBar from "./components/Navbar/NavBar";
import {useNavigate} from "react-router-dom";

function App() {
  const mode = useSelector((state: any) => state.mode);
  const navigate = useNavigate();
  const router = useLocation();
  console.log(router, 12);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuthL = useSelector((state: any) => state.token);
  const isAuth = isAuthL.length !== 0 ? true : false;

  useEffect(() => {
    if (!isAuth) navigate("/");

    return;
  }, [isAuth]);
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
