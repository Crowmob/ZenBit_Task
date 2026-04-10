import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom";

import { LoginRoute } from "../constants";
import { useRegisterMutation } from "../api/authApi";
import { useFingerprint } from "../hooks/useFingerprint";
import { validateEmail, validatePassword } from "../utils/validations";

const RegisterForm = () => {
  const [hover, setHover] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [login, { isLoading: loginLoading }] = useRegisterMutation();
  const { fingerprint, loading: fingerprintLoading } = useFingerprint();

  const handleRegister = async () => {
    if (!fingerprint) return;

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Fill all fields")
      setSuccessMessage('');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      setSuccessMessage('');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
      setSuccessMessage('');
      return;
    }

    try {
      await login({ email, password, fingerprint }).unwrap();
      setErrorMessage('');
      setSuccessMessage('Verification link was sent to your email!');
    } catch (err) {
      const error = err as { status: number }
      if (error.status === 409) {
        setErrorMessage('')
        setSuccessMessage('You are already verified! Login')
      }
      else {
        setSuccessMessage('')
        setErrorMessage('Something went wrong!');
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Typography variant="h5">
        Sign Up
      </Typography>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Email</Typography>
        <TextField 
          fullWidth 
          placeholder="Email" 
          sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Password</Typography>
        <TextField 
          fullWidth 
          placeholder="Password" 
          type="password" 
          sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Button 
        variant="contained" 
        fullWidth 
        disabled={fingerprintLoading || loginLoading}
        sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}
        onClick={handleRegister}
      >
        {loginLoading ? 'Signing up...' : 'Sign Up'}
      </Button>

      {errorMessage && <Typography color="error" sx={{ textAlign: 'center', fontSize: 16}}>{errorMessage}</Typography>}
      {successMessage && <Typography color="success" sx={{ textAlign: 'center', fontSize: 16}}>{successMessage}</Typography>}

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