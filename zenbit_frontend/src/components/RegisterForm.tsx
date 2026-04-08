import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { LoginRoute } from "../constants";
import { useState } from "react";

const RegisterForm = () => {
  const [hover, setHover] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Typography variant="h5">
        Sign Up
      </Typography>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Email</Typography>
        <TextField fullWidth placeholder="Email" sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }} />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Password</Typography>
        <TextField fullWidth placeholder="Password" type="password" sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }}/>
      </Box>

      <Button variant="contained" fullWidth sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}>Sign Up</Button>
      <Typography sx={{ fontSize: 14, textAlign: 'center' }}>
        Alredy have account?{' '}
        <Link
          to={LoginRoute}
          style={{
              textDecoration: 'none',
              color: hover ? '#A08A6B' : '#B29F7E',
              cursor: 'pointer'
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Login
        </Link>
      </Typography>      
    </Box>
  ) 
}

export default RegisterForm;