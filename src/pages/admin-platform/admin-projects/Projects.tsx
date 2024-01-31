import { useState } from "react";
import styled from "styled-components";
import { Input, Modal, Typography, Button } from "../../../design-system";
import { NoDataPlaceholder } from "../../components";
import noProject from "../../../assets/illustrations/no-project.svg";

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

const Projects = () => {
    const [projects, setProject] = useState<string[]>([]);
    const [showCreateProjectModal, setShowCreateProjectModal] =
        useState<boolean>(false);

    return (
        <PageBase>
            {!projects.length ? (
                <NoDataPlaceholder
                    illustrationUrl={noProject}
                    text="You don’t have any projects yet!"
                    buttonText="Add a Project"
                    buttonAction={() => setShowCreateProjectModal(true)}
                />
            ) : (
                <h1>Projects</h1>
            )}

            <Modal show={showCreateProjectModal} position="center">
                <CreateProjectModalTitle variant="paragraphLG" weight="medium">
                    New Project
                </CreateProjectModalTitle>
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
                    <Button size="lg" shape="rounded" color="primary" fullWidth>
                        Save
                    </Button>
                </Buttons>
            </Modal>
        </PageBase>
    );
};

export { Projects as AdminProjects };
