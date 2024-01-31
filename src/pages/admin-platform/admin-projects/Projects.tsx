import { useState } from "react";
import styled from "styled-components";
import { Input, Modal, Typography, Button } from "../../../design-system";
import { NoDataPlaceholder } from "../../components";
import toast from "react-hot-toast";
import noProject from "../../../assets/illustrations/no-project.svg";
import { adminProjects } from "../../../api/adminProjects";

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

const AdminProjects = () => {
    const [projects, setProject] = useState<string[]>([]);
    const [showCreateProjectModal, setShowCreateProjectModal] =
        useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleOnChangeName = (value: string) => {
        setName(value);
    };

    const handleOnChangeDescription = (value: string) => {
        setDescription(value);
    };

    const isFormSubmittable = name && description;

    const createProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsFormSubmitting(true);
            const response = await adminProjects.create({
                name,
                description
            });
            setIsFormSubmitting(false);
            setName("");
            setDescription("");
            setShowCreateProjectModal(false);

            toast.success(response.message);
        } catch (error) {
            if (error instanceof Error) {
                setIsFormSubmitting(false);
                setIsError(true);
                toast.error(error.message);
            }
        }
    };

    return (
        <PageBase>
            {!projects.length ? (
                <NoDataPlaceholder
                    illustrationUrl={noProject}
                    text="You don't have any projects yet!"
                    buttonText="Add a Project"
                    buttonAction={() => setShowCreateProjectModal(true)}
                />
            ) : (
                <h1>Projects</h1>
            )}

            <Modal show={showCreateProjectModal} position="center">
                <form onSubmit={createProject} noValidate>
                    <CreateProjectModalTitle
                        variant="paragraphLG"
                        weight="medium"
                    >
                        New Project
                    </CreateProjectModalTitle>
                    <Inputs>
                        <Input
                            placeholder="Project Name"
                            value={name}
                            onChange={handleOnChangeName}
                            shape="rounded"
                            size="lg"
                            disabled={isFormSubmitting}
                        />
                        <Input
                            type="textarea"
                            placeholder="Project Description"
                            value={description}
                            onChange={handleOnChangeDescription}
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
                            onClick={() => setShowCreateProjectModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            shape="rounded"
                            color="primary"
                            fullWidth
                            disabled={isFormSubmitting || !isFormSubmittable}
                        >
                            Save
                        </Button>
                    </Buttons>
                </form>
            </Modal>
        </PageBase>
    );
};

export { AdminProjects };
