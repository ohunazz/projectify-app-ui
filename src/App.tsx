import { ForgotPassword } from "./pages/admin-auth/forget-password/ForgetPassword";
import { ResetPassword } from "./pages/admin-auth/reset-password/ResetPassword";

const App = () => {
    return (
        <>
            <ForgotPassword />
            <ResetPassword />
        </>
    );
};

export { App };
