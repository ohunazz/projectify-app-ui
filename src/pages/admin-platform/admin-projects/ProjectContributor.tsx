import React from "react";
import styled, { css } from "styled-components";
import { Avatar } from "../../../design-system/Avatar";
import { Typography } from "../../../design-system";

type ProjectContributorDetails = {
    firstName: string;
    lastName: string;
    imageUrl?: string;
    position: string;
};

type ProjectContributorLayout = "sideBySide" | "stack";

type ProjectContributorProps = {
    details: ProjectContributorDetails;
    layout: ProjectContributorLayout;
};

const ProjectContributorBase = styled.div<{ layout: ProjectContributorLayout }>`
    display: flex;

    ${(props) =>
        props.layout === "sideBySide" &&
        css`
            align-items: center;
            gap: var(--space-12);
        `}
    ${(props) =>
        props.layout === "stack" &&
        css`
            flex-direction: column;
            gap: var(--space-8);
        `}
`;

const ProjectContributorPosition = styled(Typography)`
    color: var(--jaguar-500);
`;

const ProjectContributor: React.FC<ProjectContributorProps> = ({
    details,
    layout
}) => {
    return (
        <ProjectContributorBase layout={layout}>
            <Avatar
                firstName={details.firstName}
                lastName={details.lastName}
                imageUrl={details.imageUrl}
                size="lg"
                shape="rounded"
            />
            <div>
                <Typography variant="paragraphSM" weight="medium">
                    {details.firstName} {details.lastName}
                </Typography>
                <ProjectContributorPosition
                    variant="subtitleSM"
                    weight="medium"
                >
                    {details.position}
                </ProjectContributorPosition>
            </div>
        </ProjectContributorBase>
    );
};

export { ProjectContributor };
