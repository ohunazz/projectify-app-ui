import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage, useStore } from "../hooks";
import { adminService, teamMemberService } from "../api";
import { UserRole } from "../types";
import { Actions, InitUserAction } from "../store";

type ProtectedRouteProps = {
    component: React.ReactElement;
    userType: UserRole;
};

const Private: React.FC<ProtectedRouteProps> = ({ component, userType }) => {
    const [loading, setLoading] = useState(true);
    const { getItem, setItem } = useLocalStorage();
    const { dispatch } = useStore();
    const navigate = useNavigate();
    let isAuthTokenExists = getItem("authToken");

    useEffect(() => {
        if (isAuthTokenExists) {
            const user = {
                admin: adminService,
                teamMember: teamMemberService
            };

            user[userType]
                .getMe()
                .then((data): void => {
                    const action: InitUserAction = {
                        type: Actions.INIT_USER,
                        payload: data.data
                    };
                    dispatch(action);
                    setItem("userRole", data.data.role);
                    setLoading(false);
                })
                .catch((error: Error) => {
                    setLoading(false);
                    const userRole = getItem("userRole");
                    let to = "../";
                    if (userRole) {
                        const navigateTo =
                            userRole === UserRole.admin
                                ? "../admin/platform"
                                : "../team-member/platform";
                        to = navigateTo;
                    }

                    navigate(to);
                });
        }
    }, [userType]);

    if (!isAuthTokenExists) {
        const navigateTo =
            userType === UserRole.admin
                ? "../admin/sign-in"
                : "../team-member/sign-in";
        return <Navigate to={navigateTo} />;
    }
    if (loading) {
        return null;
    }

    const userRole = getItem("userRole");
    const isAuthorized = userType === userRole;

    if (isAuthorized) {
        return component;
    }

    return <Navigate to="../" />;
};

export { Private };
