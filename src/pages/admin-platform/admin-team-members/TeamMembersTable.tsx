import format from "date-fns/format";
import {
    Badge,
    BadgeColors,
    Menu,
    MenuOption,
    Typography
} from "../../../design-system";
import {
    Table,
    TableBody,
    TableBodyCell,
    TableHead,
    TableHeadCell,
    TableRow
} from "../../../design-system/Table";
import {
    TeamMember,
    AdminTeamMemberActions,
    AdminTeamMemberStatusChange
} from "../../../types";
import { useState } from "react";
import { DeleteTeamMemberModal } from "./DeleteTeamMemberModal";
import { ChangeTeamMemberStatusModal } from "./ChangeTeamMemberStatusModal";
import { EditTeamMemberModal } from "./EditTeamMemberModal";
import { parseISO } from "date-fns";

type TeamMembersTableProps = {
    data: TeamMember[];
};

const options: MenuOption[] = [
    { label: "Edit", iconName: "edit", value: "edit", color: "primary" },
    {
        label: "Reactivate",
        iconName: "check-in-circle",
        value: "reactivate",
        color: "primary"
    },
    { label: "Delete", iconName: "delete", value: "delete", color: "danger" },
    {
        label: "Deactivate",
        iconName: "x-in-circle",
        value: "deactivate",
        color: "danger"
    }
];

const allowedActions = {
    ACTIVE: [options[0], options[3]],
    INACTIVE: [options[0], options[2]],
    DEACTIVATED: [options[0], options[1]]
};

const columns = ["12.5%", "12.5%", "20%", "20%", "15%", "15%", "5%"];
const mapsStatusToBadgeColors = {
    ACTIVE: "violet",
    INACTIVE: "gray",
    DEACTIVATED: "red"
};

const TeamMembersTable: React.FC<TeamMembersTableProps> = ({ data }) => {
    const [selectedTeamMemberId, setSelectedTeamMemberId] = useState("");
    const [showDeleteTeamMemberModal, setShowDeleteTeamMemberModal] =
        useState(false);

    const [changeStatus, setChangeStatus] =
        useState<AdminTeamMemberStatusChange>();
    const [
        showChangeTeamMemberStatusModal,
        setShowChangeTeamMemberStatusModal
    ] = useState(false);

    const [showEditTeamMemberModal, setShowEditTeamMemberModal] =
        useState(false);

    const onSelectActionCellMenu = (
        teamMemberId: string,
        action: AdminTeamMemberActions
    ) => {
        setSelectedTeamMemberId(teamMemberId);
        if (action === AdminTeamMemberActions.delete) {
            setShowDeleteTeamMemberModal(true);
        } else if (
            action === AdminTeamMemberActions.deactivate ||
            action === AdminTeamMemberActions.reactivate
        ) {
            setChangeStatus(action);
            setShowChangeTeamMemberStatusModal(true);
        } else if (action === AdminTeamMemberActions.edit) {
            setShowEditTeamMemberModal(true);
        }
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow columns={columns}>
                        <TableHeadCell>First Name</TableHeadCell>
                        <TableHeadCell>Last Name</TableHeadCell>
                        <TableHeadCell>Position</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
                        <TableHeadCell>Join Date</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell> </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((teamMember) => {
                        return (
                            <TableRow key={teamMember.id} columns={columns}>
                                <TableBodyCell>
                                    <Typography
                                        variant="paragraphSM"
                                        weight="medium"
                                    >
                                        {teamMember.firstName}
                                    </Typography>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Typography
                                        variant="paragraphSM"
                                        weight="medium"
                                    >
                                        {teamMember.lastName}
                                    </Typography>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Typography
                                        variant="paragraphSM"
                                        weight="medium"
                                    >
                                        {teamMember.position}
                                    </Typography>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Typography
                                        variant="paragraphSM"
                                        weight="medium"
                                    >
                                        {teamMember.email}
                                    </Typography>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Typography
                                        variant="paragraphSM"
                                        weight="medium"
                                    >
                                        {format(
                                            parseISO(teamMember.joinDate),
                                            "MMM d, yyyy"
                                        )}
                                    </Typography>
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Badge
                                        color={
                                            mapsStatusToBadgeColors[
                                                teamMember.status
                                            ] as BadgeColors
                                        }
                                        label={teamMember.status}
                                        variant="outlined"
                                        shape="rounded"
                                        status
                                    />
                                </TableBodyCell>
                                <TableBodyCell>
                                    <Menu
                                        options={
                                            allowedActions[teamMember.status]
                                        }
                                        onSelect={(value) =>
                                            onSelectActionCellMenu(
                                                teamMember.id,
                                                value as AdminTeamMemberActions
                                            )
                                        }
                                    />
                                </TableBodyCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <DeleteTeamMemberModal
                show={showDeleteTeamMemberModal}
                teamMemberId={selectedTeamMemberId}
                closeModal={() => setShowDeleteTeamMemberModal(false)}
            />
            <ChangeTeamMemberStatusModal
                show={showChangeTeamMemberStatusModal}
                teamMemberId={selectedTeamMemberId}
                closeModal={() => setShowChangeTeamMemberStatusModal(false)}
                changeStatus={changeStatus!}
            />

            <EditTeamMemberModal
                show={showEditTeamMemberModal}
                teamMemberId={selectedTeamMemberId}
                closeModal={() => setShowEditTeamMemberModal(false)}
            />
        </>
    );
};

export { TeamMembersTable };
