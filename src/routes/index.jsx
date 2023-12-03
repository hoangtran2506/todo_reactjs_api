import { Suspense, lazy } from "react";
import { createBrowserRouter, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import GuestGuard from "../guards/GuestGuard";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

// Authentication
const Register = Loadable(lazy(() => import("../screens/Authori/Register")));
const Dashboard = Loadable(lazy(() => import("../screens/Dashboard")));
const Login = Loadable(lazy(() => import("../screens/Authori/Login")));
const Todo = Loadable(lazy(() => import("../screens/Todo")));
// Dashboard

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/todo",
    element: <Todo />,
  }
]);

// export const Router = () => useRoutes([
//   {
//     path: "/",
//     element: <Dashboard />,
//   },
//   {
//     path: "auth",
//     element: <Dashboard />,
//     // children: [
//     //   {
//     //     path: "login",
//     //     element: (
//     //       // <GuestGuard>
//     //         <Login />
//     //       // </GuestGuard>
//     //     ),
//     //   },
//     //   {
//     //     path: "register",
//     //     element: (
//     //       <GuestGuard>
//     //         <Register />
//     //       </GuestGuard>
//     //     ),
//     //   },
//     // ],
//   },
// ]);
