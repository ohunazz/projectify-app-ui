import React from "react";

import { Logo } from "../Logo";
import "./SideBar.css";

type SideBarProps = {
    children: React.ReactNode;
};

const SideBar: React.FC<SideBarProps> = ({ children }) => {
    return (
        <nav className="side-bar">
            <div className="side-bar__logo-wrapper">
                <Logo size="sm" layout="horizontal" />
            </div>
            {children}
        </nav>
    );
};

export { SideBar };
