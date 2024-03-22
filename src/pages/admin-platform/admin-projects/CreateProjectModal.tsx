import styled from "styled-components";
import toast from "react-hot-toast";
import {
    Input,
    Button,
    Typography,
    DatePickerV1,
    Modal
} from "../../../design-system";
import { useState } from "react";
import { projectService } from "../../../api";
import { toIso8601 } from "../../../utils";
import { useStore } from "../../../hooks";
import { Actions, AddProjectAction } from "../../../store";

type CreateProjectModalProps = {
    show: boolean;
    closeModal: () => void;
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
const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
    show,
    closeModal
}) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const { dispatch } = useStore();

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeDescription = (value: string) => {
        setDescription(value);
    };

    const isFormSubmittable = name && description && startDate && endDate;

    const clearFields = () => {
        setName("");
        setDescription("");
        setStartDate(null);
        setEndDate(null);
    };

    const cancel = () => {
        clearFields();
        closeModal();
    };

    const createProject = () => {
        const input = {
            name,
            description,
            startDate: toIso8601(startDate!),
            endDate: toIso8601(endDate!)
        };
        try {
            projectService
                .create(input)
                .then((data) => {
                    const action: AddProjectAction = {
                        type: Actions.ADMIN_ADD_PROJECT,
                        payload: data.data
                    };
                    dispatch(action);
                    clearFields();
                    closeModal();
                    toast.success("Project has been successfully created"!);
                })
                .catch((e) => {
                    const err = e as Error;
                    toast.error(err.message);
                });
        } catch (error) {}
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
                    placeholder="Start Date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                <DatePickerV1
                    inputSize="lg"
                    shape="rounded"
                    placeholder="End Date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                />
            </Inputs>
            <Buttons>
                <Button
                    color="secondary"
                    size="lg"
                    shape="rounded"
                    variant="outlined"
                    fullWidth
                    onClick={cancel}
                >
                    Cancel
                </Button>
                <Button
                    size="lg"
                    shape="rounded"
                    color="primary"
                    fullWidth
                    disabled={isFormSubmitting || !isFormSubmittable}
                    onClick={createProject}
                >
                    Save
                </Button>
            </Buttons>
        </Modal>
    );
};
export { CreateProjectModal };
