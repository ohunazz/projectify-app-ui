import { useEffect, useState } from "react";
import {
    NoDataPlaceholder,
    Page,
    PageContent,
    PageHeader
} from "../../components";
import { adminTasksService } from "../../../api";
import { useStore } from "../../../hooks";
import { Actions, PopulateTasksAction } from "../../../store";
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
                const action: PopulateTasksAction = {
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
        <Page>
            {!tasksArray.length ? (
                <NoDataPlaceholder
                    illustrationUrl={noTask}
                    text="You don't have any tasks yet!"
                    buttonText="Add a Task"
                    buttonAction={() => setShowCreateTaskModal(true)}
                />
            ) : (
                <PageContent>
                    <PageHeader
                        pageTitle="Tasks"
                        actionButtonText="Create A Task"
                        actionButtonOnClick={() => setShowCreateTaskModal(true)}
                    />
                    <Kanban groupedTasks={groupedTasks} />
                </PageContent>
            )}
            <CreateTaskModal
                show={showCreateTaskModal}
                closeModal={() => setShowCreateTaskModal(false)}
            />
        </Page>
    );
};

export { AdminTasksPage };
