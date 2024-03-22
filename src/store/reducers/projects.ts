import { produce } from "immer";
import {
    ActionType,
    Actions,
    AddProjectAction,
    AdminChangeProjectStatusAction,
    AdminPopulateProjectContributorsAction,
    AdminPopulateProjectsAction,
    AdminUpdateProjectAction,
    AdminUpdateProjectContributorStatus
} from "../actions";
import { ProjectState } from "../state";
import { act } from "react-dom/test-utils";

const projectsReducer = produce((draft: ProjectState, action: ActionType) => {
    switch (action.type) {
        case Actions.ADMIN_ADD_PROJECT: {
            const payload = action.payload as AddProjectAction["payload"];
            draft[payload.id] = { ...payload, numberOfContributors: 0 };
            return draft;
        }

        case Actions.ADMIN_POPULATE_PROJECTS: {
            const payload =
                action.payload as AdminPopulateProjectsAction["payload"];
            return payload.reduce((acc: ProjectState, project) => {
                acc[project.id] = project;
                return acc;
            }, {});
        }
        case Actions.ADMIN_CHANGE_PROJECT_STATUS: {
            const payload =
                action.payload as AdminChangeProjectStatusAction["payload"];
            const project = draft[payload.id];
            if (project) {
                project.status = payload.status;
            }

            return draft;
        }
        case Actions.ADMIN_UPDATE_PROJECT: {
            const payload =
                action.payload as AdminUpdateProjectAction["payload"];
            draft[payload.id] = {
                ...draft[payload.id],
                ...payload.data
            };
            return draft;
        }
        case Actions.ADMIN_POPULATE_PROJECT_CONTRIBUTORS: {
            const payload =
                action.payload as AdminPopulateProjectContributorsAction["payload"];
            draft[payload.id].contributors = payload.data;

            return draft;
        }

        case Actions.ADMIN_UPDATE_PROJECT_CONTRIBUTOR_STATUS: {
            const { id, status, teamMemberId } =
                action.payload as AdminUpdateProjectContributorStatus["payload"];
            const contributors = draft[id].contributors?.assignedContributors;

            if (contributors?.length) {
                for (let i = 0; i < contributors.length; i++) {
                    const contributor = contributors[i];
                    if (contributor.id === teamMemberId) {
                        contributor.status = status;
                        if (status === "ACTIVE") {
                            draft[id].numberOfContributors += 1;
                        } else {
                            draft[id].numberOfContributors -= 1;
                        }
                        break;
                    }
                }
            }

            return draft;
        }
    }
});

export { projectsReducer };
