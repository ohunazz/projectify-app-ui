import { useEffect, useState } from "react";

import { NoDataPlaceholder, PageHeader } from "../../components";
import toast from "react-hot-toast";
import { Option } from "../../../design-system";
import { useStore } from "../../../hooks";
import { projectService } from "../../../api";
import { Actions, PopulateProjectsAction } from "../../../store";
import { CreateProjectModal } from "./CreateProjectModal";
import { ProjectsFilters } from "./ProjectsFilters";
import { ProjectStatus } from "../../../types";
import noProject from "../../../assets/illustrations/no-project.svg";
import { ProjectsTable } from "./ProjectsTable";
import { EditProjectModal } from "./EditProjectModal";

const AdminProjectsPage = () => {
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [isProjectsFetching, setIsProjectsFetching] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const [sortedBy, setSortedBy] = useState("");
    const {
        state: { projects },
        dispatch
    } = useStore();

    useEffect(() => {
        projectService
            .getAll()
            .then((data) => {
                const action: PopulateProjectsAction = {
                    type: Actions.POPULATE_PROJECTS,
                    payload: data.data
                };
                dispatch(action);
                setIsProjectsFetching(false);
            })
            .catch((e) => {
                const err = e as Error;
                toast.error(err.message);
            });
    }, []);

    if (isProjectsFetching) return null;

    const handleSetStatusFilter = (filter: Option) => {
        setStatusFilter(filter.value as ProjectStatus);
    };
    const handleSetSortBy = (sortedBy: Option) => {
        setSortedBy(sortedBy.value as string);
    };

    const projectsArr = Object.values(projects);

    return (
        <>
            {!projectsArr.length ? (
                <NoDataPlaceholder
                    illustrationUrl={noProject}
                    text="You don’t have any projects yet!"
                    buttonText="Add a Project"
                    buttonAction={() => setShowCreateProjectModal(true)}
                />
            ) : (
                <>
                    <PageHeader
                        pageTitle="Projects"
                        actionButtonText="Create A Project"
                        actionButtonOnClick={() =>
                            setShowCreateProjectModal(true)
                        }
                    />
                    <ProjectsFilters
                        sortedBy={sortedBy}
                        setSortedBy={handleSetSortBy}
                        selectedStatus={statusFilter}
                        setSelectedStatus={handleSetStatusFilter}
                    />
                    <ProjectsTable data={projectsArr} />
                </>
            )}
            <CreateProjectModal
                show={showCreateProjectModal}
                closeModal={() => setShowCreateProjectModal(false)}
            />
        </>
    );
};

export { AdminProjectsPage };
