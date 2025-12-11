import { createBrowserRouter } from "react-router";
import AppLayout from "../Layouts/AppLayout";
import Home from "../pages/Home";
import Coverage from "../pages/Coverage";
import About from "../pages/About";
import ServicesUs from "../pages/ServicesUs";
import AuthLayout from "../pages/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Rider from "../pages/Rider";
import PrivetRoute from "./privetRoute";
import SendPercel from "../pages/SendPercel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcel from "../pages/Dashboard/MyParcel";
import Payment from "../pages/Dashboard/Payment";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import ApproveRider from "../pages/Dashboard/ApproveRider";
import UsersManagement from "../pages/Dashboard/UsersManagement";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: "Loading....",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "rider",
        loader: () => fetch("/servise-center.json").then((res) => res.json()),
        element: (
          <PrivetRoute>
            <Rider />
          </PrivetRoute>
        ),
      },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () => fetch("/servise-center.json").then((res) => res.json()),
      },
      { path: "about-us", element: <About /> },
      { path: "services-us", element: <ServicesUs /> },
      {
        path: "send-percel",
        element: (
          <PrivetRoute>
            <SendPercel />
          </PrivetRoute>
        ),
        loader: () => fetch("/servise-center.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcel />,
      },
      {
        path: "payment/:parcelId",
        element: <Payment />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "approve-rider",
        element: (
          <AdminRoute>
            <ApproveRider />
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
    ],
  },
]);
