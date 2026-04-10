import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom";

import arrowIcon from '../assets/arrowIcon.png';
import { LoginRoute } from "../constants";
import { useForgotPasswordMutation } from "../api/authApi";
import { validateEmail } from "../utils/validations";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPassword = async () => {
    if (!email) {
      setSuccessMessage('')
      setErrorMessage('Please fill email field')
      return;
    }

    if (!validateEmail(email)) {
      setSuccessMessage('')
      setErrorMessage('Invalid email format');
      return;
    }

    try {
      await forgotPassword({ email }).unwrap()
      setErrorMessage('');
      setSuccessMessage('Link was sent to your email!')
    } catch (err) {
      const error = err as { status: number }
      if (error.status === 403) {
        setSuccessMessage('');
        setErrorMessage('You are not verified. Try Sign Up!')
      } else {
        setErrorMessage('Something went wrong!')
        setSuccessMessage('')
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Link to={LoginRoute}><Box component='img' src={arrowIcon} width={24} height={24} /></Link>

      <Typography variant="h5">
        Forgot your password?
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

      <Button 
        variant="contained" 
        fullWidth 
        disabled={isLoading}
        sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}
        onClick={handleForgotPassword}
      >
        Send verification link
      </Button> 

      <Typography color="error" sx={{ fontSize: 16, textAlign: 'center' }}>{errorMessage}</Typography>    
      <Typography color="success" sx={{ fontSize: 16, textAlign: 'center' }}>{successMessage}</Typography>    
    </Box>
  ) 
}

export default ForgotPasswordForm;