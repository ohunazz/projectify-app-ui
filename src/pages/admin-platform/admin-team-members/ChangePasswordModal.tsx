import { useState } from "react";
import styled from "styled-components";
import { Modal, Typography, Button, Input } from "../../../design-system";
import { useStore } from "../../../hooks";
import { TeamMemberChangePasswordInput, teamMemberService } from "../../../api";
import toast from "react-hot-toast";
import { Actions, AdminChanePasswordTeamMemberAction } from "../../../store";

type ChangePasswordModalProps = {
    show: boolean;
    closeModal: () => void;
    teamMemberId: string;
};

const ChangePasswordModalTitle = styled(Typography)`
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

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
    show,
    closeModal,
    teamMemberId
}) => {
    const { dispatch } = useStore();

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const isFormSubmittable = newPassword && newPasswordConfirm;

    const changePassword = () => {
        const updatedTeamMember: TeamMemberChangePasswordInput = {
            newPassword: newPassword,
            newPasswordConfirm: newPasswordConfirm
        };
        setIsFormSubmitting(true);
        teamMemberService
            .changePasswordByAdmin(teamMemberId, updatedTeamMember)
            .then((_) => {
                setIsFormSubmitting(false);
                const action: AdminChanePasswordTeamMemberAction = {
                    type: Actions.ADMIN_CHANGE_PASSWORD_TEAM_MEMBER,
                    payload: {
                        id: teamMemberId,
                        password: newPassword
                    }
                };
                dispatch(action);
                closeModal();
                toast.success(
                    "Team Member Password has been successfully updated"
                );
            })
            .catch((e) => {
                const err = e as Error;
                setIsFormSubmitting(true);
                toast.error(err.message);
            });
    };

    return (
        <Modal show={show} position="center">
            <ChangePasswordModalTitle variant="paragraphLG" weight="medium">
                Edit Team Member Password
            </ChangePasswordModalTitle>
            <Inputs>
                <Input
                    type="password"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={(value) => setNewPassword(value)}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="password"
                    value={newPasswordConfirm}
                    placeholder="New Password Confirm"
                    onChange={(value) => setNewPasswordConfirm(value)}
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
                    onClick={changePassword}
                    disabled={isFormSubmitting || !isFormSubmittable}
                >
                    Update
                </Button>
            </Buttons>
        </Modal>
    );
};

export { ChangePasswordModal };
