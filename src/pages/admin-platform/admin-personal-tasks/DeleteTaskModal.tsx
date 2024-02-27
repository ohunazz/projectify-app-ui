import { adminTasksService } from "../../../api";
import { useStore } from "../../../hooks";
import { Actions, AdminRemoveTaskAction } from "../../../store";
import { ConfirmationModal } from "../../components";

type DeleteTaskModalProps = {
    show: boolean;
    taskId: string;
    closeModal: () => void;
};

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
    show,
    closeModal,
    taskId
}) => {
    const { dispatch } = useStore();
    const deleteTask = () => {
        adminTasksService
            .deleteTask(taskId)
            .then((_) => {
                const action: AdminRemoveTaskAction = {
                    type: Actions.ADMIN_REMOVE_TASK,
                    payload: { id: taskId }
                };
                dispatch(action);
                closeModal();
            })
            .catch((e) => {});
    };
    return (
        <ConfirmationModal
            confirmationMessage="Are you sure you want to delete the task?"
            show={show}
            cancel={closeModal}
            onConfirm={deleteTask}
        />
    );
};

export { DeleteTaskModal };
