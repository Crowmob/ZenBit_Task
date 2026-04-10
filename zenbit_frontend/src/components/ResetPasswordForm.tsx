import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material"

import { useResetPasswordMutation } from "../api/authApi";
import { validatePassword } from "../utils/validations";
import { LoginRoute } from "../constants";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword1, setNewPassword1] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    if (!newPassword1 || !newPassword2) {
      setErrorMessage('Please fill all fields');
      return;
    }

    if (!validatePassword(newPassword1)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character')
      return;
    }

    if (newPassword1 !== newPassword2) {
      setErrorMessage('Passwords must match');
      return;
    }

    if (token)
      try {
        setErrorMessage('')
        await resetPassword({ token, newPassword: newPassword1 }).unwrap()
        navigate(LoginRoute);
      } catch (err) {
        const error = err as { status: number }
        if (error.status === 401) {
          setErrorMessage('Invalid link')
        } else if (error.status === 403) {
          setErrorMessage('You are not verified. Try Sign Up!')
        } else {
          setErrorMessage('Something went wrong!')
        }
      }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Typography variant="h5">
        Reset password
      </Typography>

      <Box>
        <Typography sx={{ fontSize: 15 }}>New password</Typography>
        <TextField 
          fullWidth 
          placeholder="Password" 
          type="password" 
          sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }}
          value={newPassword1}
          onChange={(e) => setNewPassword1(e.target.value)}
          autoComplete="off"
        />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Repeat new password</Typography>
        <TextField 
          fullWidth 
          placeholder="Password" 
          type="password" 
          sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }}
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
          autoComplete="off"
        />
      </Box>

      <Button 
        variant="contained" 
        fullWidth 
        disabled={isLoading}
        sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}
        onClick={handleResetPassword}
      >
        Reset
      </Button>   

      <Typography color="error" sx={{ fontSize: 16, textAlign: 'center'}}>{errorMessage}</Typography> 
    </Box>
  ) 
}

export default ResetPasswordForm;