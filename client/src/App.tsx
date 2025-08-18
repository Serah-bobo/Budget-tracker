import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { RegisterUser } from "features/Register";
import { LoginUser } from "features/Login";
import EmailVerified from './pages/EmailVerified'; 
import VerifyFailed from './pages/VerifyFailed'; 
import { VerifyOtp } from "pages/VerifyOtp"; 
import Home from './pages/Home'
import { ForgotPassword } from "pages/ForgotPassword";
import { ResetPassword } from "pages/ResetPassword";
import { ProtectedRoute } from "./Components/ProtectedRoute"; 
import Layout from "./Components/Layout";
import DashboardLayout from './Components/DashboardLayout'
import DashboardHome from './dashboard/DashboardHome';
import Groups from './dashboard/Groups'
import Expenses from './dashboard/Expenses';
import Goals from './dashboard/Goals';
import Insights from './dashboard/Insights';
import Settings from './dashboard/Settings';
import GroupDetails from './dashboardDetails/GroupDetails';
import CreateGroup from "dashboardDetails/CreateGroup";
import { Toaster } from "react-hot-toast";
import JoinGroup from "dashboardDetails/JoinGroup";
import { VerifyPending } from "pages/VerifyPending";
import ResetLink from "pages/ResetLink";
import PasswordSuccess from "pages/PasswordSuccess";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/signup" element={<RegisterUser />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/verify-success" element={<EmailVerified />} />
      <Route path="/verify-failed" element={<VerifyFailed />} /> 
      <Route path="/verify-pending" element={<VerifyPending />} />
      <Route path="/reset-link-sent" element={<ResetLink />} />
      <Route path="/password-reset-success" element={<PasswordSuccess />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DashboardHome />} />
  <Route path="groups" element={<Groups />} />
  <Route path="groups/create" element={<CreateGroup />} />
  <Route path="groups/:groupId" element={<GroupDetails />} />
  <Route path="groups/join" element={<JoinGroup />} />

  <Route path="expenses" element={<Expenses />} />
  <Route path="goals" element={<Goals />} />
  <Route path="insights" element={<Insights />} />
  <Route path="settings" element={<Settings />} />
</Route>

      </>
    )
  );

  return (
  <>
  <RouterProvider router={router} />;
        <Toaster position="top-right" />
  </>
  )
  

};

export default App;
