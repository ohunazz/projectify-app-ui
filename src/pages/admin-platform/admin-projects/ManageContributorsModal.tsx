import { useEffect } from "react";
import { Modal } from "../../../design-system";
import { projectService } from "../../../api";
import { useStore } from "../../../hooks";
import { Actions, PopulateProjectContributorsAction } from "../../../store";
import toast from "react-hot-toast";

type Props = {
    projectId: string;
    show: boolean;
    closeModal: () => void;
};

const ManageContributorsModal: React.FC<Props> = ({
    projectId,
    show,
    closeModal
}) => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        if (projectId) {
            projectService
                .getContributors(projectId)
                .then(({ data }) => {
                    const action: PopulateProjectContributorsAction = {
                        type: Actions.POPULATE_PROJECT_CONTRIBUTORS,
                        payload: {
                            id: projectId,
                            data: data
                        }
                    };
                    dispatch(action);
                })
                .catch((e) => {
                    const err = e as Error;
                    toast.error(err.message);
                });
        }
    }, [projectId]);
    return (
        <Modal show={show} position="right">
            Hi
        </Modal>
    );
};

export { ManageContributorsModal };
