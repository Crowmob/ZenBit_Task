import { Box, Button, Typography } from "@mui/material"
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { LoginRoute, RegisterRoute, HomeRoute, ForgotPasswordRoute, ResetPasswordRoute, VerifyUserRoute, LogoutRoute } from "../constants";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { token, isLoading } = useSelector((state: RootState) => state.auth);

  return (
    <Box sx={{ backgroundColor: 'rgb(12, 12, 20)', pt: 1, pb: 1 }}>
      {pathname === HomeRoute ? (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            px: { xs: 1, sm: 2, md: 3, lg: 10 },
            gap: 1,
        }}>
          { isLoading ? (
            <Typography variant="h4">Loading...</Typography>
          ) : !token ? (
            <>
            <Button 
              onClick={() => navigate(LoginRoute)}
              sx={{
                  border: '1px solid #B29F7E',
                  width: 150,
                  color: '#B29F7E',
                  '&: hover' :{
                  color: '#A08A6B'
                  }
              }}>
              Login
            </Button>
            
            <Button 
              onClick={() => navigate(RegisterRoute)}
              variant="contained" 
              sx={{
                width: 150,
                color: 'white',
                backgroundColor: '#B29F7E',
                '&: hover' :{
                    backgroundColor: '#A08A6B'
                }
              }}
            >
              Sign Up
            </Button>
          </>
          ) : (
            <Button 
              onClick={() => navigate(LogoutRoute)}
              variant="contained" 
              sx={{
                width: 150,
                color: 'white',
                backgroundColor: '#B29F7E',
                '&: hover' :{
                    backgroundColor: '#A08A6B'
                }
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      ) : 
        pathname === LoginRoute || 
        pathname === RegisterRoute || 
        pathname === ForgotPasswordRoute || 
        pathname === LogoutRoute ||
        matchPath({ path: ResetPasswordRoute, end: true }, pathname) || 
        matchPath({ path: VerifyUserRoute, end: true }, pathname)
      ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', px: 2 }}>
          <Button onClick={() => navigate(HomeRoute)} sx={{ color: '#B29F7E' }}>
            ← Back to Home
          </Button>
        </Box>
      ) : null
    }
    </Box>
  )
}

export default Header;