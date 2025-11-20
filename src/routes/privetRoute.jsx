/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const privetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const loaction = useLocation();

  if (loading) {
    return <>Loading......</>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return { children };
};
export default privetRoute;
