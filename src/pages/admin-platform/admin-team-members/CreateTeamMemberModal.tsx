import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
    Input,
    Modal,
    Typography,
    Button,
    DatePickerV1,
    Select,
    Option
} from "../../../design-system";
import { useStore } from "../../../hooks";
import { Actions, AdminAddTeamMemberAction } from "../../../store";
import { teamMemberService } from "../../../api";
import { toIso8601 } from "../../../utils";

type ModalProps = {
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

export const positions: Option[] = [
    { value: "Frontend Engineer", label: "Frontend Engineer" },
    { value: "Backend Engineer", label: "Backend Engineer" },
    { value: "Fullstack Engineer", label: "Fullstack Engineer" },
    { value: "Product Designer", label: "Product Designer" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Frontend Engineer II", label: "Frontend Engineer II" },
    { value: "Frontend Engineer III", label: "Frontend Engineer III" },
    { value: "Senior Frontend Engineer", label: "Senior Frontend Engineer" },
    { value: "Backend Engineer II", label: "Backend Engineer II" },
    { value: "Backend Engineer III", label: "Backend Engineer III" },
    { value: "Senior Backend Engineer", label: "Senior Backend Engineer" },
    { value: "Fullstack Engineer II", label: "Fullstack Engineer II" },
    { value: "Fullstack Engineer III", label: "Fullstack Engineer III" },
    { value: "Senior Fullstack Engineer", label: "Senior Fullstack Engineer" }
];

const CreateTeamMemberModal: React.FC<ModalProps> = ({ show, closeModal }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState<Option>();
    const [joinDate, setJoinDate] = useState<Date>();
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

    const { dispatch } = useStore();

    const handleOnChangeFirstName = (value: string) => {
        setFirstName(value);
    };

    const handleOnChangeLastName = (value: string) => {
        setLastName(value);
    };

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleOnSelectPosition = (option: Option) => {
        setPosition(option);
    };

    const isFormSubmittable =
        firstName && lastName && email && position && joinDate;

    const resetFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPosition(undefined);
        setJoinDate(undefined);
    };

    const createTeamMember = () => {
        const input = {
            firstName,
            lastName,
            email,
            joinDate: toIso8601(joinDate!),
            position: position?.value as string
        };
        try {
            teamMemberService
                .create(input)
                .then((data) => {
                    const action: AdminAddTeamMemberAction = {
                        type: Actions.ADMIN_ADD_TEAM_MEMBER,
                        payload: data.data
                    };
                    dispatch(action);
                    resetFields();
                    closeModal();
                    toast.success("Team Member has been successfully created");
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
                New Member
            </ModalTitle>
            <Inputs>
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleOnChangeFirstName}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleOnChangeLastName}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                />
                <Select
                    options={positions}
                    onSelect={handleOnSelectPosition}
                    value={position?.value}
                    size="lg"
                    shape="rounded"
                    headerPlaceholder="Select Position"
                    searchable
                />
                <DatePickerV1
                    inputSize="lg"
                    shape="rounded"
                    placeholder="Joined Date"
                    selected={joinDate}
                    onChange={(date) => setJoinDate(date)}
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
                >
                    Cancel
                </Button>
                <Button
                    size="lg"
                    shape="rounded"
                    color="primary"
                    fullWidth
                    disabled={isFormSubmitting || !isFormSubmittable}
                    onClick={createTeamMember}
                >
                    Save
                </Button>
            </Buttons>
        </Modal>
    );
};

export { CreateTeamMemberModal };
