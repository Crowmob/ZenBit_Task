import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { ForgotPasswordRoute, RegisterRoute } from "../constants";
import { useState } from "react";

const LoginForm = () => {
  const [hover, setHover] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Typography variant="h5">
        Login
      </Typography>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Email</Typography>
        <TextField fullWidth placeholder="Email" sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }} />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Password</Typography>
        <TextField fullWidth placeholder="Password" type="password" sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }}/>
        <Link 
          to={ForgotPasswordRoute}
          style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}
        >
          <Typography sx={{ fontSize: 12, color: '#B29F7E', '&:hover': { color: '#A08A6B'} }}>Forgot password?</Typography>
        </Link>
      </Box>

      <Button variant="contained" fullWidth sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}>Login</Button>
      <Typography sx={{ fontSize: 14, textAlign: 'center' }}>
        Dont have account?{' '}
        <Link
          to={RegisterRoute}
          style={{
              textDecoration: 'none',
              color: hover ? '#A08A6B' : '#B29F7E',
              cursor: 'pointer'
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Sign Up
        </Link>
      </Typography>      
    </Box>
  ) 
}

export default LoginForm;