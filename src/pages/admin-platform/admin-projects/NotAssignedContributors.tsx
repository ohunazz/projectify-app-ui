import toast from "react-hot-toast";
import styled from "styled-components";
import { ProjectContributorBase } from "../../../types";
import { Button, Checkbox, Icon, Typography } from "../../../design-system";
import { Scrollable } from "../../components";
import { ProjectContributor } from "./ProjectContributor";
import { useState } from "react";
import { projectService } from "../../../api";
import { Actions, AdminUpdateProjectContributorsList } from "../../../store";
import { useStore } from "../../../hooks";

type Props = {
    goBack: () => void;
    notAssignedContributors: ProjectContributorBase[];
    projectId: string;
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
    notAssignedContributors,
    projectId
}) => {
    const [selectedTeamMembers, setSelectedTeamMembers] = useState(() => {
        return notAssignedContributors.map((teamMember) => {
            return {
                checked: false,
                id: teamMember.id
            };
        });
    });

    const { dispatch } = useStore();

    const handleTeamMemberSelect = (value: boolean, idx: number) => {
        setSelectedTeamMembers((prevState) => {
            const copy = prevState?.map((teamMember) => ({ ...teamMember }));
            if (copy) {
                copy[idx].checked = value;
            }
            return copy;
        });
    };

    const addContributors = () => {
        const teamMemberIds = selectedTeamMembers
            ?.filter((teamMember) => teamMember.checked)
            .map((teamMember) => teamMember.id);
        if (!teamMemberIds?.length) return;

        projectService
            .addContributors(teamMemberIds, projectId)
            .then((data) => {
                const action: AdminUpdateProjectContributorsList = {
                    type: Actions.ADMIN_UPDATE_PROJECT_CONTRIBUTORS_LIST,
                    payload: {
                        id: projectId,
                        newContributors: data
                    }
                };
                dispatch(action);
                goBack();
            })
            .catch((e) => {
                const err = e as Error;
                toast.error(err.message);
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
                            <ContributorBase key={teamMember.id}>
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
                    variant="contained"
                    shape="rounded"
                    color="primary"
                    size="lg"
                    fullWidth
                    disabled={isConfirmButtonDisabled}
                    onClick={addContributors}
                >
                    Confirm
                </Button>
            </ConfirmButtonWrapper>
        </>
    );
};

export { NotAssignedContributors };
