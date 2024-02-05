import { useState } from "react";
import styled from "styled-components";
import { NoDataPlaceholder } from "../../components";
import noProject from "../../../assets/illustrations/no-project.svg";

const PageBase = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const TeamMemberProjects = () => {
    const [projects, setProject] = useState<string[]>([]);

    return (
        <PageBase>
            {!projects.length ? (
                <NoDataPlaceholder
                    illustrationUrl={noProject}
                    text="You don't have any projects yet!"
                />
            ) : (
                <h1>Projects</h1>
            )}
        </PageBase>
    );
};

export { TeamMemberProjects };
