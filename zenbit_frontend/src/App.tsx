import { CssBaseline } from "@mui/material"
import HomePage from "./pages/HomePage"
import Header from "./components/Header"
import { Route, Routes } from "react-router"
import AuthPage from "./pages/AuthPage"
import { ForgotPasswordRoute, HomeRoute, LoginRoute, RegisterRoute, ResetPasswordRoute } from "./constants"

function App() {

  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path={ HomeRoute } element={<HomePage />} />
        <Route path={LoginRoute} element={<AuthPage />} />
        <Route path={RegisterRoute} element={<AuthPage />} />
        <Route path={ForgotPasswordRoute} element={<AuthPage />} />
        <Route path={ResetPasswordRoute} element={<AuthPage />} />
      </Routes>
      
    </>
  )
}

export default App
