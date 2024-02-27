import styled from "styled-components";
import toast from "react-hot-toast";
import {
    Input,
    Button,
    Typography,
    DatePickerV1,
    Modal,
    DatePickerOnChangeDateType
} from "../../../design-system";
import { useState } from "react";
import { projectService } from "../../../api";
import { toIso8601 } from "../../../utils";

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
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const onChangeDatePicker = (dates: DatePickerOnChangeDateType) => {
        if (Array.isArray(dates)) {
            console.log(dates);
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
        }
    };
    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeDescription = (value: string) => {
        setDescription(value);
    };

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

        projectService
            .create(input)
            .then((data) => {
                clearFields();
                closeModal();
                toast.success("Project has been successfully created"!);
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
                    placeholder="Star Date - End Date"
                    onChange={onChangeDatePicker}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
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
                    onClick={createProject}
                >
                    Save
                </Button>
            </Buttons>
        </Modal>
    );
};
export { CreateProjectModal };
