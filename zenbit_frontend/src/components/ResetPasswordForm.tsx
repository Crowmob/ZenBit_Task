import { Box, Button, TextField, Typography } from "@mui/material"

const ResetPasswordForm = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Typography variant="h5">
        Reset password
      </Typography>

      <Box>
        <Typography sx={{ fontSize: 15 }}>New password</Typography>
        <TextField fullWidth placeholder="Password" type="password" sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }}/>
      </Box>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Repeat new password</Typography>
        <TextField fullWidth placeholder="Password" type="password" sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }}/>
      </Box>

      <Button variant="contained" fullWidth sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}>Reset</Button>    
    </Box>
  ) 
}

export default ResetPasswordForm;