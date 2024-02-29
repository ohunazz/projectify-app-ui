import { produce } from "immer";
import {
    ActionType,
    Actions,
    AddProjectAction,
    ChangeProjectStatusAction,
    PopulateProjectsAction
} from "../actions";
import { ProjectState } from "../state";

const projectsReducer = produce((draft: ProjectState, action: ActionType) => {
    switch (action.type) {
        case Actions.ADD_PROJECT: {
            const payload = action.payload as AddProjectAction["payload"];
            draft[payload.id] = payload;
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
    }
});

export { projectsReducer };
