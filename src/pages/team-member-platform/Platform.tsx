import { Outlet } from "react-router-dom";
import { SideBar, SideBarLinks } from "../../design-system";
import { AppContent, AppLayout, SideBarUser } from "../components";
import user from "../../assets/images/user.jpg";

const links = [
    {
        title: "Menu",
        links: [
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
        ],
    },
];

const Platform = () => {
    return (
        <AppLayout>
            <SideBar>
                <SideBarUser
                    details={{
                        firstName: "Asil",
                        lastName: "Bek",
                        imageUrl: user,
                        email: "asilbek@gmail.com",
                    }}
                />
                <SideBarLinks
                    links={links}
                    loggedOutLink="/team-member/sign-in"
                />
            </SideBar>
            <AppContent>
                <Outlet />
            </AppContent>
        </AppLayout>
    );
};

export { Platform as TeamMemberPlatform };
