import { CssBaseline } from "@mui/material"
import HomePage from "./pages/HomePage"
import Header from "./components/Header"
import { Route, Routes } from "react-router"
import AuthPage from "./pages/AuthPage"
import { ForgotPasswordRoute, HomeRoute, LoginRoute, LogoutRoute, RegisterRoute, ResetPasswordRoute, VerifyUserRoute } from "./constants"
import { useGetMeQuery } from "./api/usersApi"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { finishLoading, setAuthenticated } from "./slices/authSlice"
import { useFingerprint } from "./hooks/useFingerprint"
import PublicOnleRoute from "./components/PublicOnlyRoute"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  const dispatch = useDispatch();
  const { fingerprint, loading: loadingFingerprint } = useFingerprint();
  const { data: me, isLoading: meLoading, isUninitialized } = useGetMeQuery({ fingerprint: fingerprint ?? '' }, { skip: loadingFingerprint });

  useEffect(() => {
    if (isUninitialized) return;

    if (!meLoading && me) {
      dispatch(setAuthenticated())
    } else if (!meLoading && !me) {
      dispatch(finishLoading())
    }
  }, [meLoading, me, dispatch, isUninitialized])

  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path={ HomeRoute } element={<HomePage />} />
        
        <Route element={<PrivateRoute />}>
            <Route path={LogoutRoute} element={<AuthPage />} />
        </Route>

        <Route element={<PublicOnleRoute />}>
          <Route path={LoginRoute} element={<AuthPage />} />
          <Route path={RegisterRoute} element={<AuthPage />} />
          <Route path={ForgotPasswordRoute} element={<AuthPage />} />
          <Route path={ResetPasswordRoute} element={<AuthPage />} />
          <Route path={VerifyUserRoute} element={<AuthPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
