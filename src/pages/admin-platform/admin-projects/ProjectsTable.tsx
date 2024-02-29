import styled from "styled-components";
import {
    Badge,
    BadgeColors,
    Menu,
    MenuOption,
    Typography,
    Table,
    TableBody,
    TableBodyCell,
    TableHead,
    TableHeadCell,
    TableRow,
    LinearProgress
} from "../../../design-system";
import { Scrollable } from "../../components";
import { ProjectActions, ProjectWithContributors } from "../../../types";
import { formatAsMMMddYYYY, formatDeadline } from "../../../utils";
import { useState } from "react";

type ProjectsTableProps = {
    data: ProjectWithContributors[];
};

const renderDeadline = (isoDate: string) => {
    const formattedDeadline = formatDeadline(isoDate);
    let className = "";
    if (formattedDeadline.includes("left")) {
        className = "red";
    } else {
        className = "green";
    }

    return (
        <Deadline variant="paragraphSM" weight="medium" className={className}>
            {formattedDeadline}
        </Deadline>
    );
};

const options: MenuOption[] = [
    { label: "Edit", iconName: "edit", value: "edit", color: "primary" },
    {
        label: "Reactivate",
        iconName: "play-in-circle",
        value: "reactivate",
        color: "primary"
    },
    {
        label: "Complete",
        iconName: "check-in-circle",
        value: "complete",
        color: "primary"
    },
    {
        label: "Archive",
        iconName: "archive",
        value: "archive",
        color: "danger"
    },
    {
        label: "Put On Hold",
        iconName: "pause-in-circle",
        value: "onhold",
        color: "danger"
    }
];

const allowedActions = {
    ACTIVE: [options[0], options[2], options[3], options[4]],
    ARCHIVED: [options[0], options[1], options[2], options[4]],
    ONHOLD: [options[0], options[1], options[2], options[3]],
    COMPLETED: [options[0], options[1], options[3], options[4]]
};

const columns = ["20%", "10%", "20%", "15%", "15%", "10%", "10%"];
enum StatusToBadgeColors {
    ACTIVE = "violet",
    ARCHIVED = "gray",
    COMPLETED = "green",
    ONHOLD = "red"
}

const TableContainer = styled(Scrollable)`
    height: calc(100% - 13rem);
`;

const ProjectDescription = styled(Typography)`
    color: var(--jaguar-500);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const AboutProject = styled.div`
    width: 90%;
`;
const ProgressWrapper = styled.div`
    width: 80%;
`;
const Deadline = styled(Typography)`
    &.green {
        color: var(--green-600);
    }
    &.red {
        color: var(--red-orange-600);
    }
`;

const ProjectsTable: React.FC<ProjectsTableProps> = ({ data }) => {
    const [selectedProjectId, setSelectedProjectId] = useState("");

    const handleOnSelectCellMenu = (
        projectId: string,
        value: ProjectActions
    ) => {
        setSelectedProjectId(projectId);
    };
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow columns={columns}>
                        <TableHeadCell>About</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell>Progress</TableHeadCell>
                        <TableHeadCell>Start Date</TableHeadCell>
                        <TableHeadCell>Deadline</TableHeadCell>
                        <TableHeadCell>Contributors</TableHeadCell>
                        <TableHeadCell> </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((project) => {
                        console.log(project);
                        return (
                            <TableRow key={project.id} columns={columns}>
                                <TableBodyCell>
                                    <AboutProject>
                                        <Typography
                                            variant="paragraphSM"
                                            weight="medium"
                                        >
                                            {project.name}
                                        </Typography>
                                        <ProjectDescription
                                            variant="subtitleSM"
                                            weight="medium"
                                        >
                                            {project.description}
                                        </ProjectDescription>
                                    </AboutProject>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Badge
                                        label={project.status}
                                        color={
                                            StatusToBadgeColors[project.status]
                                        }
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </TableBodyCell>
                                <TableBodyCell>
                                    <ProgressWrapper>
                                        <LinearProgress
                                            value={project.progress}
                                            color="blue"
                                            shape="rounded"
                                        />
                                    </ProgressWrapper>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Typography
                                        variant="paragraphSM"
                                        weight="medium"
                                    >
                                        {formatAsMMMddYYYY(project.startDate)}
                                    </Typography>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Typography
                                        variant="paragraphSM"
                                        weight="medium"
                                    >
                                        {renderDeadline(project.endDate)}
                                    </Typography>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Typography
                                        variant="paragraphSM"
                                        weight="medium"
                                    >
                                        {project.contributers?.length || 0}
                                    </Typography>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Menu
                                        options={allowedActions[project.status]}
                                        onSelect={(value) =>
                                            handleOnSelectCellMenu(
                                                project.id,
                                                value as ProjectActions
                                            )
                                        }
                                    />
                                </TableBodyCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export { ProjectsTable };
