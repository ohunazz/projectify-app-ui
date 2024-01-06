import { ForgotPassword } from "./pages/admin-auth/forget-password/ForgetPassword";
import { Login } from "./pages/admin-auth/login/Login";
import { ResetPassword } from "./pages/admin-auth/reset-password/ResetPassword";

const App = () => {
    return (
        <>
            <ForgotPassword />
            <ResetPassword />
            <Login />
        </>
    );
};

export { App };
