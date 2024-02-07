import styled from "styled-components";
import { Button, ButtonColor, Modal, Typography } from "../../design-system";

type ConfirmationModalProps = {
    show: boolean;
    cancel: () => void;
    onConfirm: () => void;
    confirmationMessage: string;
    confirmButtonText?: string;
    confirmButtonColor?: ButtonColor;
    cancelButtonColor?: ButtonColor;
    cancelButtonText?: string;
};

const ConfirmationText = styled(Typography)`
    margin-bottom: var(--space-24);
`;

const Actions = styled.div`
    display: flex;
    gap: var(--space-12);
`;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    show,
    cancel,
    onConfirm,
    confirmationMessage,
    confirmButtonText,
    confirmButtonColor,
    cancelButtonText,
    cancelButtonColor
}) => {
    return (
        <Modal show={show} position="center">
            {confirmationMessage && (
                <ConfirmationText variant="paragraphSM">
                    {confirmationMessage}
                </ConfirmationText>
            )}
            <Actions>
                <Button
                    variant="outlined"
                    color={cancelButtonColor || "secondary"}
                    size="lg"
                    shape="rounded"
                    onClick={cancel}
                    fullWidth
                >
                    {cancelButtonText || "Cancel"}
                </Button>
                <Button
                    variant="contained"
                    color={confirmButtonColor || "danger"}
                    size="lg"
                    shape="rounded"
                    onClick={onConfirm}
                    fullWidth
                >
                    {confirmButtonText || "Confirm"}
                </Button>
            </Actions>
        </Modal>
    );
};

export { ConfirmationModal };
