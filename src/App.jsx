import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NonProtectedRoute from "./Components/NonProtectedRoute/NonProtectedRoute";
import UserContextProvider from "./Context/UserContext";
import ResetPass from "./Components/ResetPassword/ResetPass";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import UpdatePass from "./Components/UpdatePass/UpdatePass";
import ChangePass from "./Components/ChangePassword/ChangePass";


const routes = createBrowserRouter([
  {path: "/", element: <Layout /> , children:[
    {path: "/", element: <ProtectedRoute><Home /></ProtectedRoute>},
    {path: "home", element: <ProtectedRoute><Home /></ProtectedRoute>},
    {path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute>},
    {path: "changepass", element: <ProtectedRoute><ChangePass /></ProtectedRoute>},
    {path: "resetpass", element: <NonProtectedRoute><ResetPass /></NonProtectedRoute>},
    {path: "verifycode", element: <NonProtectedRoute><VerifyCode /></NonProtectedRoute>},
    {path: "updatepass", element: <NonProtectedRoute><UpdatePass /></NonProtectedRoute>},
    {path: "login", element: <NonProtectedRoute><SignIn /></NonProtectedRoute>},
    {path: "register", element: <NonProtectedRoute><Register /></NonProtectedRoute>}
  ]},
]);

function App() {

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routes} />
      </UserContextProvider>
    </>
  )
}

export default App
