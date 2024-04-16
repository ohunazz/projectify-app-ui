import toast from "react-hot-toast";
import styled from "styled-components";
import {
    ContributorStatus,
    ProjectContributor as ProjectContributorType
} from "../../../types";
import {
    Badge,
    BadgeColors,
    Button,
    Icon,
    Switch,
    Typography
} from "../../../design-system";
import { Scrollable } from "../../components";
import { ProjectContributor } from "./ProjectContributor";
import { formatAsMMMddYYYY } from "../../../utils";
import { projectService } from "../../../api";
import { useStore } from "../../../hooks";
import { Actions, AdminUpdateProjectContributorStatus } from "../../../store";

type Props = {
    contributors: ProjectContributorType[] | undefined;
    projectId: string;
    closeModal: () => void;
    showNotAssignedContributors: () => void;
};
const Header = styled.div`
    height: 6rem;
    padding: 0 var(--space-16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--jaguar-100);
    svg {
        fill: var(--red-orange-500);
        cursor: pointer;
    }
`;
const ContributorBase = styled.div`
    height: 12.2rem;
    padding: var(--space-16);
    border-bottom: 1px solid var(--jaguar-100);
    display: flex;
    justify-content: space-between;
`;

const SwitchWrapper = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
`;
const ContributorControl = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;
const JoinedAt = styled(Typography)`
    color: var(--jaguar-500);
`;

const AddButtonWrapper = styled.div`
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

const StatusToSwitchState = {
    ACTIVE: true,
    INACTIVE: false
};

const SwitchStateToStatus = {
    true: "ACTIVE",
    false: "INACTIVE"
};

const StatusToBadgeColor = {
    ACTIVE: "green",
    INACTIVE: "red"
};

const AssignedContributors: React.FC<Props> = ({
    projectId,
    contributors,
    closeModal,
    showNotAssignedContributors
}) => {
    const { dispatch } = useStore();

    const changeStatus = (value: boolean, teamMemberId: string) => {
        console.log(value);
        const status = SwitchStateToStatus[`${value}`] as ContributorStatus;
        projectService
            .changeContributorStatus(projectId, teamMemberId, status)
            .then((_) => {
                const action: AdminUpdateProjectContributorStatus = {
                    type: Actions.ADMIN_UPDATE_PROJECT_CONTRIBUTOR_STATUS,
                    payload: {
                        teamMemberId,
                        status,
                        id: projectId
                    }
                };
                dispatch(action);
                toast.success(
                    `Contributer's status has been changed to ${status}`
                );
            })
            .catch((e) => {
                const err = e as Error;
                toast.error(err.message);
            });
    };
    return (
        <>
            <Header>
                <Typography variant="paragraphLG" weight="medium">
                    Contributors
                </Typography>
                <Icon iconName="x" onClick={closeModal} />
            </Header>
            <Contributors>
                {contributors &&
                    contributors.map((contributor) => {
                        return (
                            <ContributorBase key={contributor.id}>
                                <ProjectContributor
                                    layout="stack"
                                    details={contributor}
                                />
                                <ContributorControl>
                                    <SwitchWrapper>
                                        <Switch
                                            checked={
                                                StatusToSwitchState[
                                                    contributor.status!
                                                ]
                                            }
                                            id={contributor.id}
                                            shape="circle"
                                            onSwitch={(value) =>
                                                changeStatus(
                                                    value,
                                                    contributor.id
                                                )
                                            }
                                        />
                                    </SwitchWrapper>
                                    <Badge
                                        label={contributor.status!}
                                        shape="circle"
                                        color={
                                            StatusToBadgeColor[
                                                contributor.status!
                                            ] as BadgeColors
                                        }
                                    />
                                    <JoinedAt
                                        variant="subtitleSM"
                                        weight="medium"
                                    >
                                        Joined at{" "}
                                        {formatAsMMMddYYYY(
                                            contributor.joinedAt!
                                        )}
                                    </JoinedAt>
                                </ContributorControl>
                            </ContributorBase>
                        );
                    })}
            </Contributors>
            <AddButtonWrapper>
                <Button
                    onClick={showNotAssignedContributors}
                    variant="contained"
                    shape="rounded"
                    color="primary"
                    size="lg"
                    fullWidth
                >
                    Add Contributor
                </Button>
            </AddButtonWrapper>
        </>
    );
};

export { AssignedContributors };
