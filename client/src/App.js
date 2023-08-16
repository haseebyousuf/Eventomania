import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { themeSettings } from "theme";
import { adminRoutes, committeeRoutes } from "routesConfig";
const Home = lazy(() => import("./scenes/Home/Home"));
const About = lazy(() => import("./scenes/About/About"));
const Login = lazy(() => import("./scenes/Login/Login"));
const EventDetails = lazy(() =>
  import("./components/EventDetails/EventDetails")
);
const HomeLayout = lazy(() => import("./scenes/Layout/HomeLayout"));

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
            <Route
              element={
                <Suspense>
                  <HomeLayout />
                </Suspense>
              }
            >
              <Route
                path='/'
                element={
                  <Suspense>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path='/About'
                element={
                  <Suspense fallback={<div></div>}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path='/EventDetails/:eventId'
                element={
                  <Suspense fallback={<div></div>}>
                    <EventDetails />
                  </Suspense>
                }
              />
              <Route
                path='/Login'
                element={
                  !isAuth ? (
                    <Suspense fallback={<div></div>}>
                      <Login />
                    </Suspense>
                  ) : (
                    <Navigate to='/Dashboard' />
                  )
                }
              />
            </Route>

            {isAdmin && adminRoutes()}
            {(isConvenor || isMember) && committeeRoutes(isConvenor)}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
