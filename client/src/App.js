import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import {Home,Dashboard, Layout, AddCommittees , Login, AllCommittees,Convenors, AddConvenor, CreateEvent, ApproveEvents, EventDetails, PastEvents, ConvenorPastEvents, AdminEventLog} from "./scenes"
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
                    <Route path="/EventDetails/:eventId" element={<EventDetails/>} />
                    <Route  path="/Login" element={!isAuth ? <Login /> : <Navigate to="/Dashboard" />}  />
                    <Route element={<Layout />} >
                        {/* admin Routes */}
                        <Route path="/Dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/Login" />}  />  
                        <Route path="/ApproveEvents" element={isAuth && user.role === "admin" ? <ApproveEvents /> : <Navigate to="/Login" />}  />
                        <Route path="/PastEvents" element={isAuth && user.role === "admin" ? <PastEvents /> : isAuth && user.role === "convenor"? <ConvenorPastEvents />: <Navigate to="/Login" />}  />
                        <Route path="/EventLog" element={isAuth && user.role === "admin" ? <AdminEventLog /> :  <Navigate to="/Login" />}  />
                        <Route path="/AddCommittees" element={isAuth && user.role === "admin" ? <AddCommittees /> : <Navigate to="/Login" />}  />
                        <Route path="/ViewCommittees" element={isAuth && user.role === "admin" ? <AllCommittees /> : <Navigate to="/Login" />}  />
                        <Route path="/Convenors" element={isAuth && user.role === "admin"  ? <Convenors /> : <Navigate to="/Login" />}  />
                        <Route path="/AddConvenors" element={isAuth && user.role === "admin" ? <AddConvenor /> : <Navigate to="/Login" />}  />
                        {/* convenor routes */}
                        <Route path="/CreateEvent" element={isAuth && user.role === "convenor" ? <CreateEvent /> : <Navigate to="/Login" />}  />

                    </Route> 
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
