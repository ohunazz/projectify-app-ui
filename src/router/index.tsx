import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { App } from "../App";
import {
    AdminSignin,
    AdminSignup,
    AdminForgetPassword,
    AdminResetPassword,
    AdminPlatform,
    AdminProjects,
    AdminTasks,
    TeamMemberSignin,
    TeamMemberForgetPassword,
    TeamMemberResetPassword,
    TeamMemberCreatePassword,
    TeamMemberPlatform,
    TeamMemberPersonalTasks,
} from "../pages";
import { Private } from "./Private";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route path="admin/sign-up" element={<AdminSignup />} />
            <Route path="admin/sign-in" element={<AdminSignin />} />
            <Route
                path="admin/forget-password"
                element={<AdminForgetPassword />}
            />
            <Route
                path="admin/reset-password"
                element={<AdminResetPassword />}
            />
            <Route
                path="admin/platform"
                element={
                    <Private
                        component={<AdminPlatform />}
                        userType="admin"
                        to="../admin/sign-in"
                    />
                }
            >
                <Route path="projects" element={<AdminProjects />} />
                <Route path="stories" element={<h1>Stories</h1>} />
                <Route path="personal-tasks" element={<AdminTasks />} />
                <Route path="team-members" element={<h1>Members</h1>} />
            </Route>

            <Route path="team-member/sign-in" element={<TeamMemberSignin />} />
            <Route
                path="team-member/forget-password"
                element={<TeamMemberForgetPassword />}
            />
            <Route
                path="team-member/reset-password"
                element={<TeamMemberResetPassword />}
            />
            <Route
                path="team-member/create-password"
                element={<TeamMemberCreatePassword />}
            />
            <Route
                path="team-member/platform"
                element={
                    <Private
                        component={<TeamMemberPlatform />}
                        userType="teamMember"
                        to="../team-member/sign-in"
                    />
                }
            >
                <Route path="stories" element={<h1>Stories</h1>} />
                <Route
                    path="personal-tasks"
                    element={<TeamMemberPersonalTasks />}
                />
                <Route path="team-members" element={<h1>Members</h1>} />
            </Route>
        </>
    )
);
