import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useVerifyUserMutation } from "../api/authApi";
import { useFingerprint } from "../hooks/useFingerprint";
import { HomeRoute } from "../constants";


const VerifyUserForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [verifyUser, { isLoading: verifyingUser }] = useVerifyUserMutation();
  const { fingerprint, loading: loadingFingerprint } = useFingerprint();

  useEffect(() => {
    const handleVerify = async () => {
      if (token && fingerprint) {
        try {
          await verifyUser({ token, fingerprint }).unwrap();
          navigate(HomeRoute);
        } catch (err) {
          const error = err as { status: number }
          if (error.status === 401) {
            setErrorMessage('Verification link expired. Try Sign Up again!')
          } else {
            setErrorMessage('Something went wrong!')
          }
        }
      }
    }

    handleVerify();
  }, [fingerprint, token, verifyUser, navigate])

  return (
    <Box>
      {(verifyingUser || loadingFingerprint) ? (
        <Typography>Loading...</Typography>
      ) : (
        <Typography color="error">{errorMessage}</Typography>
      )}
    </Box>
  )
}

export default VerifyUserForm;