import { useState } from "react";
import styled from "styled-components";
import {
    Input,
    Modal,
    Typography,
    Button,
    Toaster
} from "../../../design-system";

import { NoDataPlaceholder } from "../../components";

import noTeamMember from "../../../assets/illustrations/member.svg";

import toast from "react-hot-toast";
import { adminTeamMembers } from "../../../api/adminTeamMembers";

const PageBase = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const CreateProjectModalTitle = styled(Typography)`
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

const AdminTeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const [showCreateTeamMemberModal, setShowCreateTeamMemberModal] =
        useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

    const isFormSubmittable = firstName && lastName && email && position;

    const handleOnChangeFirstName = (value: string) => {
        setFirstName(value);
    };

    const handleOnChangeLastName = (value: string) => {
        setLastName(value);
    };

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleOnChangePosition = (value: string) => {
        setPosition(value);
    };

    const createTeamMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsFormSubmitting(true);

            const response = await adminTeamMembers.create({
                firstName,
                lastName,
                position,
                email
            });

            setIsFormSubmitting(false);
            setFirstName("");
            setLastName("");
            setPosition("");
            setEmail("");
            setShowCreateTeamMemberModal(false);

            toast.success(response.message);
        } catch (error) {
            if (error instanceof Error) {
                setIsFormSubmitting(false);

                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <PageBase>
                {!teamMembers.length ? (
                    <NoDataPlaceholder
                        illustrationUrl={noTeamMember}
                        text="You don’t have any team members yet!"
                        buttonText="Add a New Member"
                        buttonAction={() => setShowCreateTeamMemberModal(true)}
                    />
                ) : (
                    <h1>Team members</h1>
                )}

                <form onSubmit={createTeamMember}>
                    <Modal show={showCreateTeamMemberModal} position="center">
                        <CreateProjectModalTitle
                            variant="paragraphLG"
                            weight="medium"
                        >
                            New Member
                        </CreateProjectModalTitle>
                        <Inputs>
                            <Input
                                placeholder="First Name"
                                value={firstName}
                                onChange={handleOnChangeFirstName}
                                shape="rounded"
                                size="lg"
                                disabled={isFormSubmitting}
                            />
                            <Input
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleOnChangeLastName}
                                shape="rounded"
                                size="lg"
                                disabled={isFormSubmitting}
                            />
                            <Input
                                placeholder="Position"
                                value={position}
                                onChange={handleOnChangePosition}
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
                        </Inputs>
                        <Buttons>
                            <Button
                                color="secondary"
                                size="lg"
                                shape="rounded"
                                variant="outlined"
                                fullWidth
                                onClick={() =>
                                    setShowCreateTeamMemberModal(false)
                                }
                            >
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                shape="rounded"
                                color="primary"
                                fullWidth
                                disabled={
                                    isFormSubmitting || !isFormSubmittable
                                }
                            >
                                Save
                            </Button>
                        </Buttons>
                    </Modal>
                </form>
            </PageBase>
            <Toaster />
        </>
    );
};

export { AdminTeamMembers };
