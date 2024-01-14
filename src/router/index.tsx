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
    AdminResetPassword,
    AdminPlatform
} from "../pages";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route path="/admin/sign-up" element={<AdminSignup />} />
            <Route path="/admin/sign-in" element={<AdminSignin />} />
            <Route
                path="/admin/forgot-password"
                element={<AdminForgotPassword />}
            />
            <Route
                path="/admin/reset-password"
                element={<AdminResetPassword />}
            />

            <Route path="/platform" element={<AdminPlatform />}>
                <Route path="projects" />
                <Route path="stories" />
                <Route path="personal-tasks" />
                <Route path="team-members" />
            </Route>
        </>
    )
);
