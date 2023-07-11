import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import {Home,Dashboard, Layout, AddCommittees , Login, AllCommittees,Convenors, AddConvenor,CreateEvent, ApproveEvents, EventDetails, PastEvents, ConvenorPastEvents, AdminEventLog, AudienceDetails, ConvenorEventLog, CommitteeDashboard, AddMember, AddCommitteeMember, Members, CommitteeMembers} from "./scenes"

function App() { 
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));
    const user = useSelector((state)=> state.user);
    const admin = isAuth && user.role === 'admin';
    const member = isAuth && user.role === 'member';
    const convenor = isAuth && user.role === "convenor";
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
                        <Route path="/Dashboard" element={admin ? <Dashboard /> : convenor ? <CommitteeDashboard />: member ? <CommitteeDashboard /> : <Navigate to="/Login" />}  />
                        <Route path="/ApproveEvents" element={admin ? <ApproveEvents /> : <Navigate to="/Login" />}  />
                        <Route path="/PastEvents" element={admin ? <PastEvents /> : convenor? <ConvenorPastEvents />: member ? <ConvenorPastEvents /> : <Navigate to="/Login" />}  />
                        <Route path="/EventLog" element={admin ? <AdminEventLog /> : convenor? <ConvenorEventLog />: member ? <ConvenorEventLog /> : <Navigate to="/Login" />}  />
                        <Route path="/AddCommittees" element={admin ? <AddCommittees /> : <Navigate to="/Login" />}  />
                        <Route path="/ViewCommittees" element={admin ? <AllCommittees /> : <Navigate to="/Login" />}  />
                        <Route path="/Convenors" element={admin  ? <Convenors /> : <Navigate to="/Login" />}  />
                        <Route path="/Members" element={admin ? <Members /> : convenor ? <CommitteeMembers />: member ? <CommitteeMembers /> : <Navigate to="/Login" />}  />

                        <Route path="/Registrations/:eventId" element={isAuth && (user.role === "admin" || user.role === "convenor" || user.role === "member")  ? <AudienceDetails /> : <Navigate to="/Login" />}  />

                        <Route path="/AddConvenors" element={admin ? <AddConvenor /> : <Navigate to="/Login" />}  />
                        <Route path="/AddMember" element={admin ? <AddMember /> : convenor ? <AddCommitteeMember /> :<Navigate to="/Login" />}  />
                        {/* convenor routes */}
                        <Route path="/CreateEvent" element={convenor ? <CreateEvent /> : member ? <CreateEvent />: <Navigate to="/Login" />}  />

                    </Route> 
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
