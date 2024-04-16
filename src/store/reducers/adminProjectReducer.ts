import { produce } from "immer";
import { ProjectState } from "../state";
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

import {
    AssignedContrubtorsState,
    NotAssignedContributorsState,
    ProjectContributor,
    ProjectContributorBase
} from "../../types";

const adminProjectsReducer = produce(
    (draft: ProjectState, action: ActionType) => {
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

            default:
                return draft;
        }
    }
);

export { adminProjectsReducer };
