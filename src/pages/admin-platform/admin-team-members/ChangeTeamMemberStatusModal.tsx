import toast from "react-hot-toast";
import { teamMemberService } from "../../../api";
import { useStore } from "../../../hooks";
import { Actions, AdminChangeTeamMemberStatusAction } from "../../../store";
import { ConfirmationModal } from "../../components";
import {
    AdminTeamMemberActions,
    AdminTeamMemberStatusChange
} from "../../../types";

type ChangeTeamMemberStatusModalProps = {
    show: boolean;
    teamMemberId: string;
    closeModal: () => void;
    changeStatus: AdminTeamMemberStatusChange;
};

enum ActionToStatus {
    deactivate = "DEACTIVATED",
    reactivate = "ACTIVE"
}

const ChangeTeamMemberStatusModal: React.FC<
    ChangeTeamMemberStatusModalProps
> = ({ show, closeModal, teamMemberId, changeStatus }) => {
    const { dispatch } = useStore();

    const changeTeamMemberStatus = () => {
        teamMemberService
            .changeStatus(teamMemberId, changeStatus)
            .then((_) => {
                const action: AdminChangeTeamMemberStatusAction = {
                    type: Actions.ADMIN_CHANGE_TEAM_MEMBER_STATUS,
                    payload: {
                        id: teamMemberId,
                        status: ActionToStatus[changeStatus]
                    }
                };
                dispatch(action);
                closeModal();
                toast.success(
                    `Team Member has been successfully ${changeStatus}d`
                );
            })
            .catch((e) => {
                closeModal();
                const err = e as Error;
                toast.error(err.message);
            });
    };
    return (
        <ConfirmationModal
            confirmationMessage={`Are you sure you want to ${changeStatus} a team member?`}
            show={show}
            cancel={closeModal}
            onConfirm={changeTeamMemberStatus}
        />
    );
};

export { ChangeTeamMemberStatusModal };
