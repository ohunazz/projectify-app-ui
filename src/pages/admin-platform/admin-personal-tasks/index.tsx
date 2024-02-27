import { useEffect, useState } from "react";
import { NoDataPlaceholder, PageHeader } from "../../components";
import { adminTasksService } from "../../../api";
import { useStore } from "../../../hooks";
import { Actions, AdminPopulateTasksAction } from "../../../store";
import { groupTasksByStatus } from "../../../utils";
import { CreateTaskModal } from "./CreateTaskModal";
import { Kanban } from "./Kanban";
import noTask from "../../../assets/illustrations/no-task.svg";
import toast from "react-hot-toast";

const AdminTasksPage = () => {
    const [isTasksFetching, setIsTasksFetching] = useState(true);

    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    const {
        state: { adminPersonalTasks },
        dispatch
    } = useStore();

    useEffect(() => {
        adminTasksService
            .getTasks()
            .then((data) => {
                setIsTasksFetching(false);
                const action: AdminPopulateTasksAction = {
                    type: Actions.POPULATE_TASKS,
                    payload: data.data.tasks
                };
                dispatch(action);
            })
            .catch((e) => {
                const err = e as Error;
                setIsTasksFetching(false);
                toast.error(err.message);
            });
    }, []);

    if (isTasksFetching) {
        return null;
    }
    const tasksArray = Object.values(adminPersonalTasks);

    const groupedTasks = groupTasksByStatus(tasksArray);
    return (
        <>
            {!tasksArray.length ? (
                <NoDataPlaceholder
                    illustrationUrl={noTask}
                    text="You don't have any tasks yet!"
                    buttonText="Add a Task"
                    buttonAction={() => setShowCreateTaskModal(true)}
                />
            ) : (
                <>
                    <PageHeader
                        pageTitle="Tasks"
                        actionButtonText="Create A Task"
                        actionButtonOnClick={() => setShowCreateTaskModal(true)}
                    />
                    <Kanban groupedTasks={groupedTasks} />
                </>
            )}
            <CreateTaskModal
                show={showCreateTaskModal}
                closeModal={() => setShowCreateTaskModal(false)}
            />
        </>
    );
};

export { AdminTasksPage };
