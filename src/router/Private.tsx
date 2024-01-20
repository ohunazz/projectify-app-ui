import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage, useStore } from "../hooks";
import { admin, teamMember } from "../api";
import { UserRole } from "../types";
import { Actions, InitUserAction } from "../store";

type ProtectedRouteProps = {
    component: React.ReactElement;
    userType: UserRole;
};

const Private: React.FC<ProtectedRouteProps> = ({ component, userType }) => {
    const { getItem, setItem } = useLocalStorage();
    const { dispatch } = useStore();
    const navigate = useNavigate();

    let isAuthTokenExists = getItem("authToken");

    useEffect(() => {
        if (isAuthTokenExists) {
            if (userType === UserRole.admin) {
                admin
                    .getMe()
                    .then((data): void => {
                        const action: InitUserAction = {
                            type: Actions.INIT_USER,
                            payload: data.data
                        };
                        dispatch(action);
                        setItem("userRole", data.data.role);
                    })
                    .catch((error: Error) => {
                        navigate("../");
                    });
            } else if (userType === UserRole.teamMember) {
                teamMember
                    .getMe()
                    .then((data): void => {
                        const action: InitUserAction = {
                            type: Actions.INIT_USER,
                            payload: data.data
                        };
                        dispatch(action);
                        setItem("userRole", data.data.role);
                    })
                    .catch((error: Error) => {
                        navigate("../");
                    });
            }
        }
    }, [userType]);

    const userRole = getItem("userRole");
    const isAuthorized = userType === userRole;

    if (!isAuthTokenExists) {
        const navigateTo =
            userType === UserRole.admin
                ? "../admin/sign-in"
                : "../team-member/sign-in";
        return <Navigate to={navigateTo} />;
    } else if (isAuthorized) {
        return component;
    } else if (!isAuthorized) {
        const navigateTo =
            userRole === UserRole.admin
                ? "../admin/platform"
                : "../team-member/platform";
        return <Navigate to={navigateTo} />;
    }

    return <Navigate to="../" />;
};

export { Private };
