import { produce } from "immer";
import {
    ActionType,
    Actions,
    AddProjectAction,
    AdminChangeProjectStatusAction,
    AdminPopulateProjectContributorsAction,
    AdminPopulateProjectsAction,
    AdminUpdateProjectAction,
    AdminUpdateProjectContributorStatus,
    AdminUpdateProjectContributorsList
} from "../actions";
import { ProjectState } from "../state";
import {
    AssignedContrubtorsState,
    NotAssignedContributorsState,
    ProjectContributor,
    ProjectContributorBase
} from "../../types";

const projectsReducer = produce((draft: ProjectState, action: ActionType) => {
    switch (action.type) {
        case Actions.ADMIN_ADD_PROJECT: {
            const payload = action.payload as AddProjectAction["payload"];
            draft[payload.id] = {
                ...payload,
                numberOfContributors: 0,
                contributors: {
                    assignedContributors: {},
                    notAssignedContributors: {}
                }
            };
            return draft;
        }

        case Actions.ADMIN_POPULATE_PROJECTS: {
            const payload =
                action.payload as AdminPopulateProjectsAction["payload"];
            return payload.reduce((acc: ProjectState, project) => {
                acc[project.id] = project;
                acc[project.id].contributors = {
                    assignedContributors: {},
                    notAssignedContributors: {}
                };
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
            draft[payload.id].contributors = {
                assignedContributors: payload.data.assignedContributors.reduce(
                    (
                        acc: AssignedContrubtorsState,
                        contributor: ProjectContributor
                    ) => {
                        acc[contributor.id] = contributor;
                        return acc;
                    },
                    {}
                ),
                notAssignedContributors:
                    payload.data.notAssignedContributors.reduce(
                        (
                            acc: NotAssignedContributorsState,
                            contributor: ProjectContributorBase
                        ) => {
                            acc[contributor.id] = contributor;
                            return acc;
                        },
                        {}
                    )
            };

            return draft;
        }

        case Actions.ADMIN_UPDATE_PROJECT_CONTRIBUTOR_STATUS: {
            const { id, status, teamMemberId } =
                action.payload as AdminUpdateProjectContributorStatus["payload"];
            draft[id].contributors.assignedContributors[teamMemberId].status =
                status;
            if (status === "ACTIVE") {
                draft[id].numberOfContributors += 1;
            } else {
                draft[id].numberOfContributors -= 1;
            }

            return draft;
        }

        case Actions.ADMIN_UPDATE_PROJECT_CONTRIBUTORS_LIST: {
            const payload =
                action.payload as AdminUpdateProjectContributorsList["payload"];
            const { id, newContributors } = payload;

            const assignedContributors =
                draft[id].contributors.assignedContributors;
            const notAssignedContributors =
                draft[id].contributors.notAssignedContributors;

            newContributors.forEach((contributor) => {
                assignedContributors[contributor.teamMemberId] = {
                    joinedAt: contributor.joinedAt,
                    status: contributor.status,
                    ...notAssignedContributors[contributor.teamMemberId]
                };
                delete notAssignedContributors[contributor.teamMemberId];
            });

            draft[id].numberOfContributors += newContributors.length;

            return draft;
        }
    }
});

export { projectsReducer };
