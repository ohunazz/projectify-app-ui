import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { GroupedTasks } from "../../../utils";
import { useStore } from "../../../hooks";
import { Actions, ChangeTaskStatusAction } from "../../../store";
import { adminTasksService } from "../../../api";
import { Typography } from "../../../design-system";
import { TaskStatus } from "../../../types";
import { KanbanCard } from "../../components";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";

type KanbanProps = {
    groupedTasks: GroupedTasks;
};

enum StatusToTitle {
    TODO = "To Do",
    INPROGRESS = "In Progress",
    DONE = "Done"
}

enum StatusToColor {
    TODO = "var(--jaguar-500)",
    INPROGRESS = "var(--sunglow-700)",
    DONE = "var(--green-500)"
}

const TasksColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-30);
    height: calc(100vh - 12.8rem);
`;

const TasksColumn = styled.div`
    padding: 2.2rem 1rem 1rem 1rem;
    background-color: var(--jaguar-25);
    border-radius: var(--border-radius-16);
    border: 0.15rem solid var(--jaguar-100);
`;

const TasksColumnTitle = styled(Typography)<{ color: string }>`
    margin-bottom: var(--space-16);
    color: ${(props) => props.color};
`;

const Kanban: React.FC<KanbanProps> = ({ groupedTasks }) => {
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState("");

    const { dispatch } = useStore();
    const onDrop = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
        const task = JSON.parse(e.dataTransfer.getData("application/json"));

        adminTasksService
            .updateTask(task.id, { status: status })
            .then((_) => {
                const action: ChangeTaskStatusAction = {
                    type: Actions.CHANGE_TASK_STATUS,
                    payload: {
                        id: task.id,
                        status: status
                    }
                };
                dispatch(action);
            })
            .catch((e) => {
                toast.error("Something went wrong! Try Later.");
            });
    };

    const onSelectKanbanCardMenuAction = (value: string, taskId: string) => {
        setSelectedTaskId(taskId);
        if (value === "editTask") {
            setShowEditTaskModal(true);
        } else {
            setShowDeleteTaskModal(true);
        }
    };
    return (
        <>
            <TasksColumns>
                {Object.keys(groupedTasks).map((groupName) => {
                    return (
                        <TasksColumn
                            key={groupName}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => onDrop(e, groupName as TaskStatus)}
                        >
                            <TasksColumnTitle
                                variant="paragraphSM"
                                weight="semibold"
                                color={StatusToColor[groupName as TaskStatus]}
                            >
                                {StatusToTitle[groupName as TaskStatus]}{" "}
                                <span>({groupedTasks[groupName].length})</span>
                            </TasksColumnTitle>

                            {groupedTasks[groupName].map((task) => {
                                return (
                                    <KanbanCard
                                        key={task.id}
                                        task={task}
                                        menuActions={[
                                            {
                                                label: "Edit",
                                                value: "editTask",
                                                color: "primary",
                                                iconName: "edit"
                                            },
                                            {
                                                label: "Delete",
                                                value: "deleteTask",
                                                color: "danger",
                                                iconName: "delete"
                                            }
                                        ]}
                                        onSelectMenuAction={
                                            onSelectKanbanCardMenuAction
                                        }
                                    />
                                );
                            })}
                        </TasksColumn>
                    );
                })}
            </TasksColumns>
            <EditTaskModal
                show={showEditTaskModal}
                closeModal={() => setShowEditTaskModal(false)}
                taskId={selectedTaskId}
            />

            <DeleteTaskModal
                show={showDeleteTaskModal}
                closeModal={() => setShowDeleteTaskModal(false)}
                taskId={selectedTaskId}
            />
        </>
    );
};

export { Kanban };
