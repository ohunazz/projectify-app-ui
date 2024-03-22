import toast from "react-hot-toast";
import { projectService } from "../../../api";
import { useStore } from "../../../hooks";
import { Actions, AdminChangeProjectStatusAction } from "../../../store";
import { ConfirmationModal } from "../../components";
import { ProjectStatus } from "../../../types";

type ChangeProjectStatusModalProps = {
    show: boolean;
    projectId: string;
    closeModal: () => void;
    changeStatusTo: ProjectStatus;
};

const generateMessages = (status: ProjectStatus) => {
    const messages = {
        confirmation: "",
        success: ""
    };

    const statusToVerb = {
        ONHOLD: "paused",
        ARCHIVED: "archieved",
        ACTIVE: "actived",
        COMPLETED: "completed"
    };

    messages.confirmation = `Are you sure you want to change the project status to ${status}`;
    messages.success = `Project has been successfully ${statusToVerb[status]} `;
    return messages;
};

const ChangeProjectStatusModal: React.FC<ChangeProjectStatusModalProps> = ({
    show,
    projectId,
    closeModal,
    changeStatusTo
}) => {
    const { dispatch } = useStore();

    const changeProjectStatus = () => {
        projectService
            .changeStatus(projectId, changeStatusTo)
            .then((_) => {
                const action: AdminChangeProjectStatusAction = {
                    type: Actions.ADMIN_CHANGE_PROJECT_STATUS,
                    payload: {
                        id: projectId,
                        status: changeStatusTo
                    }
                };
                dispatch(action);
                closeModal();
                toast.success(generateMessages(changeStatusTo).success);
            })
            .catch((e) => {
                closeModal();
                const err = e as Error;
                toast.error(err.message);
            });
    };
    return (
        <ConfirmationModal
            confirmationMessage={generateMessages(changeStatusTo).confirmation}
            show={show}
            cancel={closeModal}
            onConfirm={changeProjectStatus}
        />
    );
};

export { ChangeProjectStatusModal };
