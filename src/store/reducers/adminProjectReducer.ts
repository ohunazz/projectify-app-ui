import { produce } from "immer";
import { ProjectState } from "../state";
import { ActionType, Actions, AddProjectAction } from "../actions";

const adminProjectsReducer = produce(
    (draft: ProjectState, action: ActionType) => {
        switch (action.type) {
            case Actions.ADD_PROJECT: {
                const payload = action.payload as AddProjectAction["payload"];
                draft[payload.id] = payload;
                return draft;
            }

            default:
                return draft;
        }
    }
);

export { adminProjectsReducer };
