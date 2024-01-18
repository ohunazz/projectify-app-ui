import React from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks";
import { UserRole } from "../types";

type ProtectedRouteProps = {
    component: React.ReactElement;
    userType: UserRole;
    to: string;
};

const Private: React.FC<ProtectedRouteProps> = ({
    component,
    userType,
    to,
}) => {
    const { getItem } = useLocalStorage();
    let isAuthTokenExists = getItem("authToken");

    if (isAuthTokenExists) {
        return component;
    } else {
        return <Navigate to={to} />;
    }
};

export { Private };
