import { produce } from "immer";
import { ProjectState } from "../state";
import { ActionType, Actions, AdminAddProjectAction } from "../actions";

const adminProjectsReducer = produce(
    (draft: ProjectState, action: ActionType) => {
        switch (action.type) {
            case Actions.ADMIN_ADD_PROJECT: {
                const payload =
                    action.payload as AdminAddProjectAction["payload"];
                console.log(payload);

                draft[payload.id] = payload;
                console.log(draft);

                return draft;
            }

            default:
                return draft;
        }
    }
);

export { adminProjectsReducer };
