import styled from "styled-components";
import { ProjectContributor as ProjectContributorType } from "../../../types";
import {
    Badge,
    BadgeColors,
    Icon,
    Switch,
    Typography
} from "../../../design-system";
import { Scrollable } from "../../components";
import { ProjectContributor } from "./ProjectContributor";
import { formatAsMMMddYYYY } from "../../../utils";

type Props = {
    contributors: ProjectContributorType[] | undefined;
    projectId: string;
    closeModal: () => void;
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
    }
`;

const ContributorBase = styled.div`
    height: 12.2rem;
    padding: var(--space-16);
    border-bottom: 1px solid var(--jaguar-100);
    display: flex;
    justify-content: space-between;
`;

const StatusToSwitchState = {
    ACTIVE: true,
    INACTIVE: false
};

const StatusToBadgeColor = {
    ACTIVE: "green",
    INACTIVE: "red"
};

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
const AssignedContributors: React.FC<Props> = ({
    projectId,
    contributors,
    closeModal
}) => {
    return (
        <>
            <Header>
                <Typography variant="paragraphLG" weight="medium">
                    Contributors
                </Typography>
                <Icon iconName="x" onClick={closeModal} />
            </Header>
            <Scrollable>
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
                                            onSwitch={(value) => {}}
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
            </Scrollable>
        </>
    );
};

export { AssignedContributors };
