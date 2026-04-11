import { Box, Button, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../api/authApi";
import { LoginRoute } from "../constants";
import { clearToken } from "../slices/authSlice";

const LogoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    dispatch(clearToken());
    localStorage.setItem('token', '');
    await logout().unwrap();
    navigate(LoginRoute);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Typography variant="h5">
        Logout
      </Typography>

      <Typography variant="h6">
        Are you sure you want to logout?
      </Typography>

      <Button 
        variant="contained" 
        fullWidth 
        disabled={isLoading}
        sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}
        onClick={handleLogout}
      >
        Logout
      </Button>   
    </Box>
  ) 
}

export default LogoutForm;