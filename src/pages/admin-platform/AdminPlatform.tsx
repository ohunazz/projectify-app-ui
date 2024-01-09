import { Link } from "react-router-dom";
import { SideBar } from "../../design-system";
import { AppContent, AppLayout } from "../components";

const AdminPlatform = () => {
    return (
        <AppLayout>
            <SideBar>Hello</SideBar>
            <AppContent>Content</AppContent>
        </AppLayout>
    );
};

export { AdminPlatform };
