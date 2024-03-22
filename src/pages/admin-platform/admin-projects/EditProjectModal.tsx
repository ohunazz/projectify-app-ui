import styled from "styled-components";
import toast from "react-hot-toast";

import {
    Input,
    Button,
    Typography,
    DatePickerV1,
    Modal
} from "../../../design-system";
import { useEffect, useState } from "react";
import { projectService } from "../../../api";
import { toDateObj, toIso8601 } from "../../../utils";
import { useStore } from "../../../hooks";
import { Actions, AdminUpdateProjectAction } from "../../../store";
import { ProjectUpdate } from "../../../types";

type EditProjectModalProps = {
    show: boolean;
    closeModal: () => void;
    projectId: string;
};

const ModalTitle = styled(Typography)`
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

const EditProjectModal: React.FC<EditProjectModalProps> = ({
    show,
    closeModal,
    projectId
}) => {
    const { state, dispatch } = useStore();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const { projects } = state;
    const project = projects[projectId];

    useEffect(() => {
        if (project) {
            setName(project.name);
            setDescription(project.description);
            setStartDate(toDateObj(project.startDate));
            setEndDate(toDateObj(project.endDate));
        }
    }, [projectId]);

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeDescription = (value: string) => {
        setDescription(value);
    };

    const onChangeStartDate = (date: Date) => {
        setStartDate(date);
    };

    const onChangeEndDate = (date: Date) => {
        setEndDate(date);
    };

    const clearFiealds = () => {
        setName("");
        setDescription("");
        setStartDate(null);
        setEndDate(null);
    };

    const done = () => {
        clearFiealds();
        closeModal();
    };

    const updateProject = () => {
        const input: ProjectUpdate = {};
        if (name) {
            input.name = name;
        }
        if (description) {
            input.description = description;
        }
        if (startDate && endDate) {
            input.startDate = toIso8601(startDate);
            input.endDate = toIso8601(endDate);
        }

        projectService
            .update(projectId, input)
            .then((_) => {
                const action: AdminUpdateProjectAction = {
                    type: Actions.ADMIN_UPDATE_PROJECT,
                    payload: {
                        id: projectId,
                        data: input
                    }
                };
                dispatch(action);
                done();
                toast.success("Project has been successfully updated"!);
            })
            .catch((e) => {
                const err = e as Error;
                toast.error(err.message);
            });
    };
    return (
        <Modal show={show} position="center">
            <ModalTitle variant="paragraphLG" weight="medium">
                New Project
            </ModalTitle>
            <Inputs>
                <Input
                    placeholder="Project Name"
                    value={name}
                    onChange={onChangeName}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="textarea"
                    placeholder="Project Description"
                    value={description}
                    onChange={onChangeDescription}
                    shape="rounded"
                    size="lg"
                />
                <DatePickerV1
                    inputSize="lg"
                    shape="rounded"
                    placeholder="Star Date"
                    onChange={onChangeStartDate}
                    selected={startDate}
                />
                <DatePickerV1
                    inputSize="lg"
                    shape="rounded"
                    placeholder="End Date"
                    onChange={onChangeEndDate}
                    selected={endDate}
                />
            </Inputs>
            <Buttons>
                <Button
                    color="secondary"
                    size="lg"
                    shape="rounded"
                    variant="outlined"
                    fullWidth
                    onClick={done}
                >
                    Cancel
                </Button>
                <Button
                    size="lg"
                    shape="rounded"
                    color="primary"
                    fullWidth
                    onClick={updateProject}
                >
                    Save
                </Button>
            </Buttons>
        </Modal>
    );
};

export { EditProjectModal };
