import { Outlet, useNavigate } from "react-router-dom";
import { SideBar, SideBarLinks, SideBarLinksGroup } from "../../design-system";
import { AppPage, AppLayout, SideBarUser } from "../components";
import { useLocalStorage, useStore } from "../../hooks";
import { Actions } from "../../store";

const links: SideBarLinksGroup[] = [
    {
        title: "Menu",
        links: [
            {
                linkText: "Projects",
                linkTo: "projects",
                iconName: "projects"
            },
            {
                linkText: "Stories",
                linkTo: "stories",
                iconName: "stories"
            },
            {
                linkText: "Personal Tasks",
                linkTo: "personal-tasks",
                iconName: "tasks"
            }
        ]
    },
    {
        title: "Settings",
        links: [
            {
                linkText: "Settings",
                linkTo: "settings",
                iconName: "settings"
            },
            {
                linkText: "Support",
                linkTo: "support",
                iconName: "support"
            }
        ]
    }
];

const TeamMemberPlatform = () => {
    const {
        state: { user },
        dispatch
    } = useStore();
    const navigate = useNavigate();
    const { removeItem } = useLocalStorage();

    const logOut = () => {
        removeItem("authToken");
        removeItem("userRole");
        dispatch({ type: Actions.RESET_STATE });

        navigate("/team-member/sign-in");
    };
    return (
        <AppLayout>
            <SideBar>
                <SideBarUser
                    details={{
                        firstName: user?.firstName || "",
                        lastName: user?.lastName || "",
                        imageUrl: "",
                        email: user?.email || ""
                    }}
                />
                <SideBarLinks links={links} logOut={logOut} />
            </SideBar>
            <AppPage>
                <Outlet />
            </AppPage>
        </AppLayout>
    );
};

export { TeamMemberPlatform };
