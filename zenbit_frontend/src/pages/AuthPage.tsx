import { Box } from '@mui/material';
import authPageImg from '../assets/authPageImg.png';
import { useLocation } from 'react-router-dom';
import { ForgotPasswordRoute, LoginRoute, RegisterRoute, ResetPasswordRoute } from '../constants';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import ResetPasswordForm from '../components/ResetPasswordForm';

const AuthPage = () => {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: { xs: '90vh', md: 'calc(100vh - 64px)' },
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: { xs: '1 1 auto', md: 0.4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          order: { xs: 0, md: 1 },
        }}
      >
        {pathname === LoginRoute ? (
            <LoginForm />
        ) : pathname === RegisterRoute ? (
            <RegisterForm />
        ) : pathname === ForgotPasswordRoute ? (
            <ForgotPasswordForm />
        ) : pathname === ResetPasswordRoute && (
          <ResetPasswordForm />
        )}
      </Box>

      <Box
        sx={{
          flex: { xs: '0 0 auto', md: 0.6 },
          display: { xs: 'none', md: 'flex' },
          backgroundImage: `url(${authPageImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          order: { xs: 1, md: 0 },
        }}
      />
    </Box>
  );
};

export default AuthPage;