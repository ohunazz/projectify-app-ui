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
import { ProjectWithContributors } from "../../../types";
import { formatAsMMMddYYYY } from "../../../utils";

const TableContainer = styled(Scrollable)`
    height: calc(100% - 13rem);
`;

type ProjectsTableProps = {
    data: ProjectWithContributors[];
};

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

const columns = ["20%", "10%", "20%", "15%", "15%", "10%", "10%"];
enum StatusToBadgeColors {
    ACTIVE = "violet",
    ARCHIVED = "gray",
    COMPLETED = "green",
    ONHOLD = "red"
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ data }) => {
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
                        return (
                            <TableRow columns={columns}>
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
                                            value={75}
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
                                        {formatAsMMMddYYYY(project.endDate)}
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
                                        options={[]}
                                        onSelect={(value) => console.log(value)}
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
