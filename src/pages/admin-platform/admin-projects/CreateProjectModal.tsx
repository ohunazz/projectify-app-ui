import styled from "styled-components";
import {
    Input,
    Button,
    Typography,
    DatePickerV1,
    Modal,
    DatePickerOnChangeDateType
} from "../../../design-system";
import { useState } from "react";
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
    const onChangeDatePicker = (dates: DatePickerOnChangeDateType) => {
        if (Array.isArray(dates)) {
            const [startDate, endDate] = dates;
            setStartDate(startDate);
            setEndDate(endDate);
        }
    };
    return (
        <Modal show={show} position="center">
            <ModalTitle variant="paragraphLG" weight="medium">
                New Project
            </ModalTitle>
            <Inputs>
                <Input
                    placeholder="Project Name"
                    value=""
                    onChange={() => {}}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="textarea"
                    placeholder="Project Description"
                    value=""
                    onChange={() => {}}
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
                    onClick={() => closeModal()}
                >
                    Cancel
                </Button>
                <Button size="lg" shape="rounded" color="primary" fullWidth>
                    Save
                </Button>
            </Buttons>
        </Modal>
    );
};
export { CreateProjectModal };
