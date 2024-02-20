import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
    Typography,
    Modal,
    Input,
    DatePickerV1,
    Button
} from "../../../design-system";

import { useStore } from "../../../hooks";
import { Actions, AdminUpdateTeamMemberAction } from "../../../store";
import { teamMemberService } from "../../../api";
import { parseISO } from "date-fns";

type ModalProps = {
    show: boolean;
    closeModal: () => void;
    teamMemberId: string;
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

const EditTeamMemberModal: React.FC<ModalProps> = ({
    show,
    closeModal,
    teamMemberId
}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [joinDate, setJoinDate] = useState<Date>();
    const {
        dispatch,
        state: { teamMembers }
    } = useStore();

    useEffect(() => {
        const teamMember = teamMembers[teamMemberId];
        if (teamMember) {
            setFirstName(teamMember.firstName);
            setLastName(teamMember.lastName);
            setPosition(teamMember.position);
            setJoinDate(parseISO(teamMember.joinDate.toString()));
        }
    }, [teamMemberId]);

    const handleOnChangeFirstName = (value: string) => {
        setFirstName(value);
    };

    const handleOnChangeLastName = (value: string) => {
        setLastName(value);
    };

    const handlOnChangePosition = (value: string) => {
        setPosition(value);
    };

    const updateTeamMember = () => {
        const updateData = {
            firstName,
            lastName,
            joinDate: joinDate!,
            position
        };

        teamMemberService
            .update(teamMemberId, updateData)
            .then((_) => {
                const action: AdminUpdateTeamMemberAction = {
                    type: Actions.ADMIN_UPDATE_TEAM_MEMBER,
                    payload: { data: updateData, id: teamMemberId }
                };
                dispatch(action);
                closeModal();
                toast.success("Team Member has been successfully updated");
            })
            .catch((e) => {
                const err = e as Error;
                toast.error(err.message);
            });
    };

    return (
        <Modal show={show} position="center">
            <ModalTitle variant="paragraphLG" weight="medium">
                Update Member
            </ModalTitle>
            <Inputs>
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleOnChangeFirstName}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleOnChangeLastName}
                    shape="rounded"
                    size="lg"
                />

                <Input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={handlOnChangePosition}
                    shape="rounded"
                    size="lg"
                />

                <DatePickerV1
                    inputSize="lg"
                    shape="rounded"
                    placeholder="Join Date"
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
                    onClick={updateTeamMember}
                >
                    Save
                </Button>
            </Buttons>
        </Modal>
    );
};

export { EditTeamMemberModal };
