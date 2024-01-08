import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

import { App } from "../App";
import {
    AdminSignup,
    AdminSignin,
    AdminForgotPassword,
    AdminResetPassword
} from "../pages";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route path="/admin/sign-up" element={<AdminSignup />} />
            <Route path="/admin/sign-in" element={<AdminSignin />} />
            <Route
                path="/admin/forget-password"
                element={<AdminForgotPassword />}
            />
            <Route
                path="/admin/reset-password"
                element={<AdminResetPassword />}
            />
        </>
    )
);
