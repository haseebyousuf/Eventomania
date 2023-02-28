import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard/Dashboard";
import Layout from "scenes/layout/Layout";
import Home from "scenes/home/Home";
function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route element={<Layout/>} >
                        <Route path="/admin" element={<Navigate to="/dashboard" replace />}  />
                        <Route path="/dashboard" element={<Dashboard />} />    
                    </Route> 
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
