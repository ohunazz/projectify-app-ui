import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SideBar, SideBarLinks, Toaster } from "../../design-system";
import { AppContent, AppLayout, SideBarUser } from "../components";
import { GetMeResponseType, admin } from "../../api";
import toast from "react-hot-toast";
import { Actions } from "../../store/actions";
import { useStore } from "../../hooks";

const links = [
    {
        title: "Menu",
        links: [
            {
                linkText: "Project",
                linkTo: "projects",
                iconName: "projects",
            },
            {
                linkText: "Stories",
                linkTo: "stories",
                iconName: "stories",
            },
            {
                linkText: "Personal Tasks",
                linkTo: "personal-tasks",
                iconName: "tasks",
            },
            {
                linkText: "Team Members",
                linkTo: "team-members",
                iconName: "members",
            },
        ],
    },
    {
        title: "Settings",
        links: [
            {
                linkText: "Settings",
                linkTo: "settings",
                iconName: "settings",
            },
            {
                linkText: "Support",
                linkTo: "support",
                iconName: "support",
            },
        ],
    },
];

const Platform = () => {
    const {
        state: { user },
        dispatch,
    } = useStore();
    useEffect(() => {
        admin
            .getMe()
            .then((data): void => {
                dispatch({
                    type: Actions.INIT_USER,
                    payload: data.data,
                });
            })
            .catch((error: Error) => {
                toast.error(error.message);
            });
    }, []);
    return (
        <>
            <AppLayout>
                <SideBar>
                    <SideBarUser
                        details={{
                            firstName: user?.firstName || "",
                            lastName: user?.lastName || "",
                            imageUrl: "",
                            email: user?.email || "",
                        }}
                    />
                    <SideBarLinks
                        links={links}
                        loggedOutLink="/admin/sign-in"
                    />
                </SideBar>
                <AppContent>
                    <Outlet />
                </AppContent>
            </AppLayout>
            <Toaster />
        </>
    );
};

export { Platform as AdminPlatform };
