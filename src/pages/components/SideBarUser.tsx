import React from "react";
import styled from "styled-components";
import { Avatar } from "../../design-system/Avatar";
import { Icon, Typography } from "../../design-system";

const UserBase = styled.div`
    width: calc(100% - 1.6rem);
    margin: 0 auto;
    background-color: var(--jaguar-25);
    border-radius: var(--border-radius-16);
    padding: var(--space-12) var(--space-12) var(--space-12) var(--space-8);

    display: flex;
    align-items: center;
    gap: var(--space-12);
    cursor: pointer;
`;

const UserDetails = styled.div`
    margin-right: auto;
`;

type UserDetailsType = {
    firstName: string;
    lastName: string;
    imageUrl?: string;
    email: string;
};

type UserProps = {
    details: UserDetailsType;
    onClick?: () => void;
};

const EmailTypography = styled(Typography)`
    color: var(--jaguar-500);
`;

const SideBarUser: React.FC<UserProps> = ({ details, onClick }) => {
    return (
        <UserBase onClick={onClick}>
            <Avatar
                firstName={details.firstName}
                lastName={details.lastName}
                imageUrl={details.imageUrl}
                size="lg"
                shape="rounded"
            />
            <UserDetails>
                <Typography variant="paragraphSM" weight="medium">
                    {details.firstName} {details.lastName}
                </Typography>
                <EmailTypography variant="subtitleSM" weight="medium">
                    {details.email}
                </EmailTypography>
            </UserDetails>
            <Icon iconName="chevron-right" />
        </UserBase>
    );
};

export { SideBarUser };
