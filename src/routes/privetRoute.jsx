/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const loaction = useLocation();
  console.log("location", loaction);

  if (loading) {
    return <>Loading......</>;
  }

  if (!user) {
    return <Navigate state={loaction.pathname} to={"/login"} />;
  }

  return children;
};
export default PrivetRoute;
