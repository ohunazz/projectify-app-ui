import toast from "react-hot-toast";
import styled from "styled-components";
import { ProjectContributor as ProjectContributorType } from "../../../types";
import { Button, Checkbox, Icon, Typography } from "../../../design-system";
import { Scrollable } from "../../components";
import { ProjectContributor } from "./ProjectContributor";
import { useState } from "react";

type Props = {
    goBack: () => void;
    notAssignedContributors: ProjectContributorType[] | undefined;
};

const Header = styled.div`
    height: 6rem;
    padding: 0 var(--space-16);
    display: flex;
    align-items: center;
    gap: var(--space-16);
    border-bottom: 1px solid var(--jaguar-100);
    svg {
        fill: var(--primary-500);
        cursor: pointer;
    }
`;

const ContributorBase = styled.div`
    height: 7.4rem;
    padding: 0 var(--space-16);
    border-bottom: 1px solid var(--jaguar-100);
    display: flex;
    align-items: center;
    gap: var(--space-12);
`;

const ConfirmButtonWrapper = styled.div`
    padding: 0 var(--space-16);
    height: 7.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    bottom: 0;
`;

const Contributors = styled(Scrollable)`
    height: calc(100% - 6rem - 7.2rem);
`;

const NotAssignedContributors: React.FC<Props> = ({
    goBack,
    notAssignedContributors
}) => {
    const [selectedTeamMembers, setSelectedTeamMembers] = useState(() => {
        return notAssignedContributors?.map((teamMember) => {
            return {
                checked: false,
                id: teamMember.id
            };
        });
    });

    const handleTeamMemberSelect = (value: boolean, idx: number) => {
        setSelectedTeamMembers((prevState) => {
            const copy = prevState?.map((teamMember) => ({ ...teamMember }));
            if (copy) {
                copy[idx].checked = value;
            }
            return copy;
        });
    };

    const isConfirmButtonDisabled =
        !selectedTeamMembers?.length ||
        selectedTeamMembers.every((teamMember) => !teamMember.checked);

    return (
        <>
            <Header>
                <Icon iconName="arrow-left" onClick={goBack} />
                <Typography variant="paragraphLG" weight="medium">
                    Team Members
                </Typography>
            </Header>
            <Contributors>
                {notAssignedContributors &&
                    selectedTeamMembers &&
                    notAssignedContributors.map((teamMember, idx) => {
                        return (
                            <ContributorBase>
                                <Checkbox
                                    checked={selectedTeamMembers[idx].checked}
                                    shape="rounded"
                                    onChange={(checked) =>
                                        handleTeamMemberSelect(checked, idx)
                                    }
                                    id={teamMember.id}
                                />
                                <ProjectContributor
                                    details={teamMember}
                                    layout="sideBySide"
                                />
                            </ContributorBase>
                        );
                    })}
            </Contributors>
            <ConfirmButtonWrapper>
                <Button
                    onClick={() => {}}
                    variant="contained"
                    shape="rounded"
                    color="primary"
                    size="lg"
                    fullWidth
                    disabled={isConfirmButtonDisabled}
                >
                    Confirm
                </Button>
            </ConfirmButtonWrapper>
        </>
    );
};

export { NotAssignedContributors };
