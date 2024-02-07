import { useEffect, useState } from "react";
import styled from "styled-components";
import { parseISO } from "date-fns";
import {
    Modal,
    Typography,
    Button,
    Input,
    DatePickerV1,
    Select,
    Option
} from "../../../design-system";
import { useStore } from "../../../hooks";
import { TaskStatus } from "../../../types";
import { TaskUpdateInput, adminTasksService } from "../../../api";
import toast from "react-hot-toast";
import { Actions, UpdateTaskAction } from "../../../store";

type EditTaskModalProps = {
    show: boolean;
    closeModal: () => void;
    taskId: string;
};

const statusOptions = [
    {
        value: "TODO",
        label: "To Do"
    },
    {
        value: "INPROGRESS",
        label: "In Progress"
    },
    { value: "DONE", label: "Done" }
];

const EditTaskModalTitle = styled(Typography)`
    margin-bottom: var(--space-24);
`;

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    margin-bottom: var(--space-24);
`;

const Buttons = styled.div`
    display: flex;
    gap: var(--space-10);
`;
const EditTaskModal: React.FC<EditTaskModalProps> = ({
    show,
    closeModal,
    taskId
}) => {
    const {
        dispatch,
        state: { adminPersonalTasks }
    } = useStore();

    const [taskDue, setTaskDue] = useState<Date>();
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<Option | undefined>();
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    useEffect(() => {
        const task = adminPersonalTasks.find((task) => task.id === taskId);

        if (task) {
            setTaskDue(parseISO((task?.due).toString()));
            setTaskDescription(task.description);
            setTaskTitle(task?.title);
            setSelectedStatus({ value: task.status, label: task.status });
        }

        /* Task Id, We setting task id in Kanban.tsx when someone clicks the menu. So, initially taskId would be undefined when component mounts. But, when taskId is set, then we want to make sure this useEffect will run and set inputs default fields.   */
    }, [taskId]);

    const updateTask = () => {
        const updatedTask: TaskUpdateInput = {
            title: taskTitle,
            description: taskDescription,
            due: taskDue,
            status: selectedStatus?.value as TaskStatus
        };
        setIsFormSubmitting(true);
        adminTasksService
            .updateTask(taskId, updatedTask)
            .then((_) => {
                setIsFormSubmitting(false);
                const action: UpdateTaskAction = {
                    type: Actions.UPDATE_TASK,
                    payload: {
                        id: taskId,
                        title: taskTitle,
                        description: taskDescription,
                        due: taskDue as Date,
                        status: selectedStatus?.value as TaskStatus
                    }
                };
                dispatch(action);
                closeModal();
            })
            .catch((e) => {
                const err = e as Error;
                setIsFormSubmitting(true);
                toast.error(err.message);
            });
    };

    return (
        <Modal show={show} position="center">
            <EditTaskModalTitle variant="paragraphLG" weight="medium">
                Edit Task
            </EditTaskModalTitle>
            <Inputs>
                <Input
                    value={taskTitle}
                    onChange={(value) => setTaskTitle(value)}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="textarea"
                    value={taskDescription}
                    onChange={(value) => {
                        setTaskDescription(value);
                    }}
                    shape="rounded"
                    size="lg"
                />
                <DatePickerV1
                    inputSize="lg"
                    shape="rounded"
                    placeholder="Due Date"
                    selected={taskDue}
                    onChange={(date) => setTaskDue(date)}
                />
                <Select
                    options={statusOptions}
                    value={selectedStatus?.value}
                    onSelect={(option) => setSelectedStatus(option)}
                    headerPlaceholder="Select Due Data"
                    shape="rounded"
                    size="lg"
                />
            </Inputs>
            <Buttons>
                <Button
                    color="secondary"
                    size="lg"
                    shape="rounded"
                    variant="outlined"
                    fullWidth
                    onClick={closeModal}
                    disabled={isFormSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    size="lg"
                    shape="rounded"
                    color="primary"
                    fullWidth
                    onClick={updateTask}
                    disabled={isFormSubmitting}
                >
                    Update
                </Button>
            </Buttons>
        </Modal>
    );
};

export { EditTaskModal };
