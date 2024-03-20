import { produce } from "immer";
import {
    ActionType,
    Actions,
    AddProjectAction,
    ChangeProjectStatusAction,
    PopulateProjectContributorsAction,
    PopulateProjectsAction,
    UpdateProjectAction,
    UpdateProjectContributorsNumberAction
} from "../actions";
import { ProjectState } from "../state";
import { act } from "react-dom/test-utils";

const projectsReducer = produce((draft: ProjectState, action: ActionType) => {
    switch (action.type) {
        case Actions.ADD_PROJECT: {
            const payload = action.payload as AddProjectAction["payload"];
            draft[payload.id] = { ...payload, numberOfContributors: 0 };
            return draft;
        }

        case Actions.POPULATE_PROJECTS: {
            const payload = action.payload as PopulateProjectsAction["payload"];
            return payload.reduce((acc: ProjectState, project) => {
                acc[project.id] = project;
                return acc;
            }, {});
        }
        case Actions.CHANGE_PROJECT_STATUS: {
            const payload =
                action.payload as ChangeProjectStatusAction["payload"];
            const project = draft[payload.id];
            if (project) {
                project.status = payload.status;
            }

            return draft;
        }
        case Actions.UPDATE_PROJECT: {
            const payload = action.payload as UpdateProjectAction["payload"];
            draft[payload.id] = {
                ...draft[payload.id],
                ...payload.data
            };
            return draft;
        }
        case Actions.UPDATE_PROJECT_CONTRIBUTORS_NUMBER: {
            const payload =
                action.payload as UpdateProjectContributorsNumberAction["payload"];

            if (payload.data.operation === "SUBTRACT") {
                draft[payload.id].numberOfContributors -= payload.data.quantity;
            } else if (payload.data.operation === "ADD") {
                draft[payload.id].numberOfContributors += payload.data.quantity;
            }

            return draft;
        }

        case Actions.POPULATE_PROJECT_CONTRIBUTORS: {
            const payload =
                action.payload as PopulateProjectContributorsAction["payload"];
            draft[payload.id].contributors = payload.data;

            return draft;
        }
    }
});

export { projectsReducer };
