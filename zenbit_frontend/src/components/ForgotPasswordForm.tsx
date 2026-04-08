import { Box, Button, TextField, Typography } from "@mui/material"
import arrowIcon from '../assets/arrowIcon.png';
import { Link } from "react-router-dom";
import { LoginRoute } from "../constants";

const ForgotPasswordForm = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '90%', sm: '70%', md: '50%' } }}>
      <Link to={LoginRoute}><Box component='img' src={arrowIcon} width={24} height={24} /></Link>

      <Typography variant="h5">
        Forgot your password?
      </Typography>

      <Box>
        <Typography sx={{ fontSize: 15 }}>Email</Typography>
        <TextField fullWidth placeholder="Email" sx={{ backgroundColor: '#e3e3e3', borderRadius: 1, border: 'none' }} />
      </Box>

      <Button variant="contained" fullWidth sx={{ backgroundColor: '#B29F7E', '&:hover': { backgroundColor: '#A08A6B' } }}>Send verification link</Button>     
    </Box>
  ) 
}

export default ForgotPasswordForm;