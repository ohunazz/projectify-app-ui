import toast from "react-hot-toast";
import { teamMemberService } from "../../../api";
import { useStore } from "../../../hooks";
import { Actions, AdminRemoveTeamMemberAction } from "../../../store";
import { ConfirmationModal } from "../../components";

type DeleteTeamMemberModalProps = {
    show: boolean;
    teamMemberId: string;
    closeModal: () => void;
};

const DeleteTeamMemberModal: React.FC<DeleteTeamMemberModalProps> = ({
    show,
    closeModal,
    teamMemberId
}) => {
    const { dispatch } = useStore();
    const deleteTeamMember = () => {
        teamMemberService
            .delete(teamMemberId)
            .then((_) => {
                const action: AdminRemoveTeamMemberAction = {
                    type: Actions.ADMIN_REMOVE_TEAM_MEMBER,
                    payload: { id: teamMemberId }
                };
                dispatch(action);
                closeModal();
                toast.success("Team Member has been successfully removed");
            })
            .catch((e) => {
                closeModal();
                const err = e as Error;
                toast.error(err.message);
            });
    };
    return (
        <ConfirmationModal
            confirmationMessage="Are you sure you want to delete a team member?"
            show={show}
            cancel={closeModal}
            onConfirm={deleteTeamMember}
        />
    );
};

export { DeleteTeamMemberModal };
