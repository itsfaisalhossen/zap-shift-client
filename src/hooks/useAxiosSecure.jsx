import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({ baseURL: "http://localhost:3000" });

const useAxiosSecure = () => {
  const { user, signOutFunc } = useAuth();
  const navigate = useNavigate();
  // intercept request
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    //  interceptor response
    const resInterCeptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        console.log(err);

        const statusCode = err.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutFunc().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterCeptor);
    };
  }, [user, signOutFunc, navigate]);

  return axiosSecure;
};
export default useAxiosSecure;
