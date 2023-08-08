import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { themeSettings } from "theme";
import {
  Home,
  Dashboard,
  Layout,
  AddCommittees,
  Login,
  AllCommittees,
  Convenors,
  AddConvenor,
  CreateEvent,
  ApproveEvents,
  EventDetails,
  PastEvents,
  ConvenorPastEvents,
  AdminEventLog,
  AudienceDetails,
  ConvenorEventLog,
  CommitteeDashboard,
  AddMember,
  AddCommitteeMember,
  Members,
  CommitteeMembers,
  ChangePassword,
} from "./scenes";
import { ToastContainer } from "react-toastify";
import UnapprovedEvents from "scenes/CommitteeScenes/UnapprovedEvents/UnapprovedEvents";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.global.user));
  const user = useSelector((state) => state.global.user);
  const isAdmin = isAuth && user.role === "admin";
  const isMember = isAuth && user.role === "member";
  const isConvenor = isAuth && user.role === "convenor";
  return (
    <div className='app'>
      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        progress={undefined}
        theme='colored'
      />

      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='*' element={<Navigate to='/' />} />
            <Route path='/' element={<Home />} />
            <Route path='/EventDetails/:eventId' element={<EventDetails />} />
            <Route
              path='/Login'
              element={!isAuth ? <Login /> : <Navigate to='/Dashboard' />}
            />
            {isAdmin && (
              <Route element={<Layout />}>
                <Route path='/Dashboard' element={<Dashboard />} />
                <Route path='/ApproveEvents' element={<ApproveEvents />} />
                <Route path='/PastEvents' element={<PastEvents />} />
                <Route path='/EventLog' element={<AdminEventLog />} />
                <Route path='/ViewCommittees' element={<AllCommittees />} />
                <Route path='/AddCommittees' element={<AddCommittees />} />
                <Route path='/Convenors' element={<Convenors />} />
                <Route path='/AddConvenors' element={<AddConvenor />} />
                <Route path='/Members' element={<Members />} />
                <Route path='/AddMember' element={<AddMember />} />
                <Route path='/ChangePassword' element={<ChangePassword />} />
                <Route
                  path='/Registrations/:eventId'
                  element={<AudienceDetails />}
                />
              </Route>
            )}
            {(isConvenor || isMember) && (
              <Route element={<Layout />}>
                <Route path='/Dashboard' element={<CommitteeDashboard />} />
                <Route path='/CreateEvent' element={<CreateEvent />} />
                <Route path='/Unapproved' element={<UnapprovedEvents />} />
                <Route path='/PastEvents' element={<ConvenorPastEvents />} />
                <Route path='/EventLog' element={<ConvenorEventLog />} />
                <Route path='/Members' element={<CommitteeMembers />} />
                <Route path='/ChangePassword' element={<ChangePassword />} />
                <Route
                  path='/Registrations/:eventId'
                  element={<AudienceDetails />}
                />
                {isConvenor && (
                  <Route path='/AddMember' element={<AddCommitteeMember />} />
                )}
              </Route>
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
