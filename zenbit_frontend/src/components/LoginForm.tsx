import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";

import { ForgotPasswordRoute, HomeRoute, RegisterRoute } from "../constants";
import { useLoginMutation } from "../api/authApi";
import { useFingerprint } from "../hooks/useFingerprint";
import { validateEmail, validatePassword } from "../utils/validations";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const { fingerprint, loading: fingerprintLoading } = useFingerprint();

  const handleLogin = async () => {
    if (!fingerprint) return;

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Fill all fields")
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Invalid credentials');
      return;
    }

    try {
      const data = await login({ email, password, fingerprint }).unwrap(); 
      console.log(data.token);
      localStorage.setItem('token', data.token);
      dispatch(setToken(data.token));
      navigate(HomeRoute);
      navigate(0);
    } catch (err) {
      const error = err as { status: number }

      if (error.status === 401) {
        setErrorMessage("Invalid credentials");
      } else if (error.status === 403) {
        setErrorMessage("You are not verified");
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Typography variant="h5">
        Login
      </Typography>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Email</Typography>
        <TextField 
          fullWidth 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }} 
        />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Password</Typography>
        <TextField 
          fullWidth 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }}
          autoComplete="off"
        />
        <Link 
          to={ForgotPasswordRoute}
          style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}
        >
          <Typography sx={{ fontSize: 12, color: '#B29F7E', '&:hover': { color: '#A08A6B'} }}>Forgot password?</Typography>
        </Link>
      </Box>

      <Button 
        variant="contained" 
        fullWidth 
        disabled={fingerprintLoading || loginLoading}
        sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}
        onClick={handleLogin}
      >
        {loginLoading ? 'Logging in...' : 'Login'}
      </Button>

      {errorMessage && <Typography color="error" sx={{ textAlign: 'center', fontSize: 16}}>{errorMessage}</Typography>}

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