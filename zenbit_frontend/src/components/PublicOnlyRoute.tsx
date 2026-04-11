import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { Typography } from "@mui/material";

import type { RootState } from "../store";
import { HomeRoute } from "../constants";


const PublicOnlyRoute = () => {
  const { token, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) return <Typography>Loading...</Typography>

  if (token) return <Navigate to={HomeRoute} />

  return <Outlet />
}

export default PublicOnlyRoute;