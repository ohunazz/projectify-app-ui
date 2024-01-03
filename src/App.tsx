import { ForgotPassword } from "./pages/admin-auth/forget-password/ForgetPassword";
import { Login } from "./pages/admin-auth/login/Login";
import { Signup } from "./pages/admin-auth/sign-up/SignUp";
import { UpdatePassword } from "./pages/admin-auth/update-password/UpdatePassword";

const App = () => {
    return (
        <>
            <Signup />
            <Login />
            <ForgotPassword />
            <UpdatePassword />
        </>
    );
};

export { App };
