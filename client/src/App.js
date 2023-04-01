import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import {Home,Dashboard, Layout, AddCommiittees, Login, AllCommittees,Convenors, AddConvenor, CreateEvent, PublishEvent} from "./scenes"
function App() { 
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));
    const user = useSelector((state)=> state.user);
  return (
    <div className="app">
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route  path="/admin" element={!isAuth ? <Login /> : <Navigate to="/dashboard" />}  />
                    <Route element={<Layout />} >
                        {/* admin Routes */}
                        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/admin" />}  />  
                        <Route path="/publish-event" element={isAuth && user.role === "admin" ? <PublishEvent /> : <Navigate to="/admin" />}  />
                        <Route path="/add-committees" element={isAuth && user.role === "admin" ? <AddCommiittees /> : <Navigate to="/admin" />}  />
                        <Route path="/view-committees" element={isAuth && user.role === "admin" ? <AllCommittees /> : <Navigate to="/admin" />}  />
                        <Route path="/convenors" element={isAuth && user.role === "admin"  ? <Convenors /> : <Navigate to="/admin" />}  />
                        <Route path="/add-convenors" element={isAuth && user.role === "admin" ? <AddConvenor /> : <Navigate to="/admin" />}  />
                        {/* convenor routes */}
                        <Route path="/create-event" element={isAuth && user.role === "convenor" ? <CreateEvent /> : <Navigate to="/admin" />}  />

                    </Route> 
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
