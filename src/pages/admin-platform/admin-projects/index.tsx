import { useState } from "react";

import { NoDataPlaceholder } from "../../components";
import noProject from "../../../assets/illustrations/no-project.svg";
import { CreateProjectModal } from "./CreateProjectModal";

const AdminProjectsPage = () => {
    const [projects, setProjects] = useState<string[]>([]);
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

    return (
        <>
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
            <CreateProjectModal
                show={showCreateProjectModal}
                closeModal={() => setShowCreateProjectModal(false)}
            />
        </>
    );
};

export { AdminProjectsPage };
