import { ForgotPassword } from "./pages/admin-auth/forget-password/ForgetPassword";
import { Login } from "./pages/admin-auth/login/Login";
import { ResetPassword } from "./pages/admin-auth/reset-password/ResetPassword";
import { Signup } from "./pages/admin-auth/sign-up/SignUp";

const App = () => {
    return (
        <>
            <ForgotPassword />
            <ResetPassword />
            <Login />
            <Signup />
        </>
    );
};

export { App };
